'use client';

import { useState, useId, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Loader2, MessageCircle } from 'lucide-react';
import type { OperatorCopy, OperatorCategory, Locale } from '@/lib/i18n/operators';

interface LeadFormProps {
  copy: OperatorCopy['leadForm'];
  category: OperatorCategory;
  locale: Locale;
  whatsappNumber: string;
  whatsappPrefilledMessage: string;
  variant?: 'card' | 'inline';
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

function readUtm(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const v = params.get(key);
    if (v) utm[key] = v;
  }
  const ref = document.referrer;
  if (ref) utm.referrer = ref;
  return utm;
}

export default function LeadForm({
  copy,
  category,
  locale,
  whatsappNumber,
  whatsappPrefilledMessage,
  variant = 'card',
}: LeadFormProps) {
  const baseId = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [whatsapp, setWhatsapp] = useState('+20 ');
  const [monthlyBookings, setMonthlyBookings] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [sourcePath, setSourcePath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSourcePath(window.location.pathname + window.location.search);
    }
  }, []);

  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(whatsappPrefilledMessage)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          business,
          whatsapp,
          monthlyBookings,
          category,
          locale,
          source: sourcePath,
          utm: readUtm(),
          honeypot,
        }),
      });

      if (res.status === 429) {
        setStatus('error');
        setErrorMessage(copy.errorRateLimit);
        return;
      }

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(copy.errorGeneric);
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (data?.ok) {
        setStatus('success');
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'lead_submitted', {
            category,
            locale,
            monthly_bookings: monthlyBookings,
          });
        }
        if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
          (window as any).fbq('track', 'Lead', { category });
        }
      } else {
        setStatus('error');
        setErrorMessage(copy.errorGeneric);
      }
    } catch {
      setStatus('error');
      setErrorMessage(copy.errorGeneric);
    }
  };

  const wrapperClasses =
    variant === 'card'
      ? 'rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10 sm:p-8 lg:p-10'
      : '';

  const fieldClasses =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10';

  const labelClasses = 'mb-2 block text-sm font-semibold text-slate-700';

  return (
    <div className={wrapperClasses}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30"
            >
              <Check className="h-8 w-8 text-white" strokeWidth={3} />
            </motion.div>
            <h3 className="mt-6 text-2xl font-black text-slate-900">{copy.successTitle}</h3>
            <p className="mt-3 text-base text-slate-600">{copy.successBody}</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-500 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-green-500/30 transition hover:bg-green-600 hover:shadow-xl"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{copy.successWhatsapp}</span>
            </a>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
          >
            {variant === 'card' && (
              <div className="mb-2">
                <p className="text-xs font-bold uppercase tracking-wider text-red-600">{copy.sectionEyebrow}</p>
                <h3 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">{copy.sectionHeadline}</h3>
                <p className="mt-2 text-base text-slate-600">{copy.sectionSub}</p>
              </div>
            )}

            <div>
              <label htmlFor={`${baseId}-name`} className={labelClasses}>
                {copy.fields.name}
              </label>
              <input
                id={`${baseId}-name`}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={copy.fields.namePlaceholder}
                autoComplete="name"
                required
                minLength={2}
                maxLength={120}
                className={fieldClasses}
              />
            </div>

            <div>
              <label htmlFor={`${baseId}-business`} className={labelClasses}>
                {copy.fields.business}
              </label>
              <input
                id={`${baseId}-business`}
                type="text"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                placeholder={copy.fields.businessPlaceholder}
                autoComplete="organization"
                required
                minLength={2}
                maxLength={200}
                className={fieldClasses}
              />
            </div>

            <div>
              <label htmlFor={`${baseId}-whatsapp`} className={labelClasses}>
                {copy.fields.whatsapp}
              </label>
              <input
                id={`${baseId}-whatsapp`}
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder={copy.fields.whatsappPlaceholder}
                autoComplete="tel"
                required
                pattern="[+\d\s\-()]{7,25}"
                inputMode="tel"
                className={fieldClasses}
                dir="ltr"
              />
            </div>

            <div>
              <label htmlFor={`${baseId}-bookings`} className={labelClasses}>
                {copy.fields.monthlyBookings}
              </label>
              <select
                id={`${baseId}-bookings`}
                value={monthlyBookings}
                onChange={(e) => setMonthlyBookings(e.target.value)}
                required
                className={`${fieldClasses} appearance-none bg-[length:20px_20px] bg-no-repeat`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2364748b'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 011.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E\")",
                  backgroundPosition: locale === 'ar' ? 'left 1rem center' : 'right 1rem center',
                  paddingInlineEnd: '2.75rem',
                }}
              >
                <option value="" disabled>
                  —
                </option>
                {copy.fields.monthlyBookingsOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Honeypot — hidden from users, visible to bots */}
            <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
              <label htmlFor={`${baseId}-website`}>Website</label>
              <input
                id={`${baseId}-website`}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                role="alert"
              >
                {errorMessage}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-red-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {status === 'submitting' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>{copy.submitting}</span>
                </>
              ) : (
                <>
                  <span>{copy.submit}</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </>
              )}
            </button>

            <p className="text-center text-xs leading-relaxed text-slate-500">{copy.privacy}</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
