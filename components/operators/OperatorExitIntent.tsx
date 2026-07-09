'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Gift, Loader2, Mail, X } from 'lucide-react';
import type { OperatorCategory, OperatorCopy, Locale } from '@/lib/i18n/operators';

interface Props {
  copy: OperatorCopy['exitIntent'];
  category: OperatorCategory;
  locale: Locale;
  /** Override session-once behavior (testing only). */
  forceShow?: boolean;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const SESSION_KEY = 'foxes:exit-intent-shown';
const DESKTOP_VIEWPORT_BREAKPOINT = 768;
const MOBILE_INACTIVITY_MS = 35_000;
const MOBILE_MIN_SCROLL_DEPTH = 0.45;
const MOUNT_GRACE_MS = 4_000;

export default function OperatorExitIntent({ copy, category, locale, forceShow = false }: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const triggeredRef = useRef(false);
  const mountedAtRef = useRef<number>(0);
  const sourcePathRef = useRef<string>('');
  const inputId = useId();

  // Trigger detection: desktop mouseleave + mobile inactivity / scroll-up
  useEffect(() => {
    if (typeof window === 'undefined') return;

    mountedAtRef.current = Date.now();
    sourcePathRef.current = window.location.pathname + window.location.search;

    if (!forceShow) {
      try {
        if (window.sessionStorage.getItem(SESSION_KEY) === '1') return;
      } catch {
        // sessionStorage may throw in private browsing — fall through and show normally
      }
    }

    const fire = () => {
      if (triggeredRef.current) return;
      if (Date.now() - mountedAtRef.current < MOUNT_GRACE_MS) return;
      triggeredRef.current = true;
      setOpen(true);
      try {
        window.sessionStorage.setItem(SESSION_KEY, '1');
      } catch {}
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'exit_intent_shown', { category, locale });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (window.innerWidth < DESKTOP_VIEWPORT_BREAKPOINT) return;
      // Only fire when mouse actually exits the document upward (toward URL bar / tabs)
      if (e.clientY > 0) return;
      if (e.relatedTarget != null) return;
      fire();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Mobile + desktop fallback for actual exits / tab switches
        fire();
      }
    };

    let inactivityTimer: ReturnType<typeof setTimeout> | null = null;
    const handleScrollMobile = () => {
      if (window.innerWidth >= DESKTOP_VIEWPORT_BREAKPOINT) return;
      const depth =
        (window.scrollY + window.innerHeight) /
        Math.max(document.documentElement.scrollHeight, 1);
      if (depth < MOBILE_MIN_SCROLL_DEPTH) return;
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(fire, MOBILE_INACTIVITY_MS);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('scroll', handleScrollMobile, { passive: true });

    if (forceShow) fire();

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', handleScrollMobile);
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, [category, locale, forceShow]);

  // Lock body scroll while open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (open) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  const readUtm = (): Record<string, string> => {
    if (typeof window === 'undefined') return {};
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      const v = params.get(k);
      if (v) utm[k] = v;
    }
    if (document.referrer) utm.referrer = document.referrer;
    return utm;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/leads/magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          category,
          magnet: copy.headline,
          locale,
          source: sourcePathRef.current,
          utm: readUtm(),
          honeypot,
        }),
      });

      if (res.status === 429) {
        setStatus('error');
        setErrorMessage('Too many requests. Try again in a minute.');
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setStatus('success');
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'exit_intent_submitted', { category, locale });
        }
        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
          window.fbq('track', 'Lead', { category, magnet: copy.headline });
        }
      } else {
        setStatus('error');
        setErrorMessage('Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          aria-modal
          role="dialog"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute end-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>

            {status === 'success' ? (
              <div className="px-7 pt-12 pb-9 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-600/30">
                  <Check className="h-6 w-6 text-white" strokeWidth={3} />
                </div>
                <h2 className="mt-6 text-[1.65rem] font-extrabold tracking-[-0.025em] text-slate-900">
                  {copy.successTitle}
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-[14.5px] leading-[1.6] text-slate-600">
                  {copy.successBody}
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-7 inline-flex items-center justify-center gap-1.5 rounded-full bg-slate-900 px-6 py-2.5 text-[13.5px] font-semibold text-white transition hover:bg-slate-800"
                >
                  Got it
                </button>
              </div>
            ) : (
              <div className="relative">
                {/* Decorative gradient header strip */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-600 via-amber-400 to-rose-600" />

                <div className="px-7 pt-9 pb-7 sm:px-9 sm:pt-10 sm:pb-9">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/70 px-3 py-1">
                    <Gift className="h-3.5 w-3.5 text-rose-600" strokeWidth={1.8} />
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                      {copy.eyebrow}
                    </span>
                  </div>
                  <h2 className="mt-5 text-[1.7rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-slate-900 sm:text-[1.85rem]">
                    {copy.headline}
                  </h2>
                  <p className="mt-3.5 text-[14.5px] leading-[1.6] text-slate-600">{copy.sub}</p>

                  {copy.bullets && copy.bullets.length > 0 && (
                    <ul className="mt-5 space-y-2">
                      {copy.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-[13.5px] text-slate-700">
                          <span className="mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                            <Check className="h-2 w-2 text-emerald-700" strokeWidth={3.5} />
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <form onSubmit={handleSubmit} noValidate className="mt-6">
                    <label htmlFor={inputId} className="sr-only">
                      Email
                    </label>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0 sm:rounded-full sm:border sm:border-slate-300 sm:bg-white sm:p-1">
                      <div className="relative flex flex-1 items-center">
                        <Mail className="pointer-events-none absolute start-4 h-4 w-4 text-slate-400" />
                        <input
                          id={inputId}
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={copy.emailPlaceholder}
                          autoComplete="email"
                          dir="ltr"
                          className="w-full rounded-full border border-slate-300 bg-white py-3 pe-4 ps-11 text-[14.5px] text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 sm:rounded-full sm:border-0 sm:py-2.5 sm:focus:ring-0"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-red-600 px-5 py-3 text-[13.5px] font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70 sm:py-2.5"
                      >
                        {status === 'submitting' ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            <span>{copy.submittingLabel}</span>
                          </>
                        ) : (
                          <>
                            <span>{copy.submitLabel}</span>
                            <ArrowRight
                              className={`h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`}
                            />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Honeypot */}
                    <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
                      <label htmlFor={`${inputId}-website`}>Website</label>
                      <input
                        id={`${inputId}-website`}
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    {errorMessage && (
                      <p className="mt-3 text-center text-[12.5px] font-medium text-rose-700" role="alert">
                        {errorMessage}
                      </p>
                    )}
                    <p className="mt-4 text-center text-[12px] text-slate-500">{copy.privacy}</p>
                  </form>

                  <button
                    type="button"
                    onClick={close}
                    className="mt-2 block w-full text-center text-[12px] font-medium text-slate-400 transition hover:text-slate-600"
                  >
                    {copy.dismissLabel}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
