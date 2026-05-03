'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle, Menu, X, Check } from 'lucide-react';
import type { OperatorCategory, Locale } from '@/lib/i18n/operators';
import { CURRENCY_OPTIONS, type Currency } from '@/lib/currency';
import { useCurrency } from './CurrencyContext';

interface Props {
  category: OperatorCategory;
  locale: Locale;
  whatsappHref: string;
  ctaLabel: string;
  whatsappLabel: string;
}

const COPY = {
  switchLang: { en: 'العربية', ar: 'English' },
  backToFoxes: { en: 'Foxes Technology', ar: 'Foxes Technology' },
  forOperators: { en: 'For operators', ar: 'للمشغلين' },
  solutions: { en: 'Solutions', ar: 'الحلول' },
};

const OPERATOR_PAGES: { slug: OperatorCategory; en: string; ar: string }[] = [
  { slug: 'diving-centres', en: 'Diving centres', ar: 'مراكز الغوص' },
  { slug: 'dinner-cruises', en: 'Dinner cruises', ar: 'رحلات العشاء' },
  { slug: 'tour-agencies', en: 'Tour agencies', ar: 'وكالات السياحة' },
  { slug: 'water-sports', en: 'Water sports', ar: 'الرياضات المائية' },
  { slug: 'boat-operators', en: 'Boat operators', ar: 'مشغّلو القوارب' },
];

interface SolutionPage {
  slug: 'ai-voice' | 'ai-search' | 'online-booking' | 'pos-hardware' | 'kiosk';
  en: string;
  ar: string;
}

const SOLUTION_PAGES: SolutionPage[] = [
  { slug: 'ai-voice', en: 'AI Voice Agent', ar: 'وكيل الصوت الذكي' },
  { slug: 'ai-search', en: 'AI Search Widget', ar: 'أداة البحث الذكية' },
  { slug: 'online-booking', en: 'Online Booking', ar: 'الحجز الإلكتروني' },
  { slug: 'pos-hardware', en: 'POS Hardware', ar: 'أجهزة نقاط البيع' },
  { slug: 'kiosk', en: 'Self-service Kiosk', ar: 'كشك الخدمة الذاتية' },
];

const SOLUTION_SLUGS = new Set<string>(['ai-voice', 'ai-search']);

export default function OperatorHeader({
  category,
  locale,
  whatsappHref,
  ctaLabel,
  whatsappLabel,
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const oppositeLocale: Locale = locale === 'ar' ? 'en' : 'ar';
  const isSolution = SOLUTION_SLUGS.has(category);
  const basePath = isSolution ? 'solutions' : 'operators';
  const switchLangHref =
    locale === 'ar'
      ? `/${basePath}/${category}`
      : `/ar/${basePath}/${category}`;
  const dropdownLabel = isSolution ? COPY.solutions[locale] : COPY.forOperators[locale];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200/70 bg-white/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Foxes Technology"
            width={32}
            height={32}
            priority
            className="h-7 w-7 sm:h-8 sm:w-8"
          />
          <span
            className={`hidden text-[14px] font-bold tracking-[-0.01em] transition sm:inline-block ${scrolled ? 'text-slate-900' : 'text-white'}`}
            style={!scrolled ? { textShadow: '0 1px 12px rgba(0,0,0,0.35)' } : undefined}
          >
            Foxes <span className="font-medium opacity-70">Technology</span>
          </span>
        </Link>

        {/* Sibling vertical dropdown — desktop */}
        <nav className="hidden lg:block">
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition ${
                scrolled
                  ? 'text-slate-700 hover:bg-slate-100'
                  : 'text-white/90 hover:bg-white/10'
              }`}
              style={!scrolled ? { textShadow: '0 1px 12px rgba(0,0,0,0.35)' } : undefined}
            >
              {dropdownLabel}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" aria-hidden>
                <path d="M0 1l5 4 5-4-1-1L5 4 1 0 0 1z" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute end-0 mt-1 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/15">
                {(isSolution ? SOLUTION_PAGES : OPERATOR_PAGES).map((p) => {
                  const itemBase = isSolution ? 'solutions' : 'operators';
                  const href =
                    locale === 'ar' ? `/ar/${itemBase}/${p.slug}` : `/${itemBase}/${p.slug}`;
                  const isCurrent = p.slug === category;
                  return (
                    <Link
                      key={p.slug}
                      href={href}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium transition ${
                        isCurrent
                          ? 'bg-slate-100 text-slate-900'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span>{p[locale]}</span>
                      {isCurrent && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-red-600">
                          Now
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Currency switcher */}
          <div
            className="relative hidden sm:block"
            onMouseEnter={() => setCurrencyOpen(true)}
            onMouseLeave={() => setCurrencyOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCurrencyOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={currencyOpen}
              className={`inline-flex h-9 items-center gap-1 rounded-full border px-3 text-[12.5px] font-semibold transition ${
                scrolled
                  ? 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  : 'border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-white/40 hover:bg-white/15'
              }`}
            >
              <span>{currency}</span>
              <svg width="9" height="6" viewBox="0 0 10 6" fill="currentColor" aria-hidden>
                <path d="M0 1l5 4 5-4-1-1L5 4 1 0 0 1z" />
              </svg>
            </button>
            {currencyOpen && (
              <div
                role="listbox"
                className="absolute end-0 mt-1 w-56 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl shadow-slate-900/15"
              >
                {CURRENCY_OPTIONS.map((opt) => {
                  const isSelected = opt.code === currency;
                  return (
                    <button
                      key={opt.code}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setCurrency(opt.code);
                        setCurrencyOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-start text-[13px] font-medium transition ${
                        isSelected
                          ? 'bg-slate-100 text-slate-900'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check className="h-3.5 w-3.5 text-red-600" strokeWidth={2.5} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            href={switchLangHref}
            className={`hidden h-9 items-center rounded-full border px-3.5 text-[12.5px] font-semibold transition sm:inline-flex ${
              scrolled
                ? 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                : 'border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-white/40 hover:bg-white/15'
            }`}
          >
            {COPY.switchLang[locale]}
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden h-9 items-center gap-1.5 rounded-full border px-3.5 text-[12.5px] font-semibold transition sm:inline-flex ${
              scrolled
                ? 'border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50'
                : 'border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-white/40 hover:bg-white/15'
            }`}
            aria-label={whatsappLabel}
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
            <span className="hidden md:inline">{whatsappLabel}</span>
          </a>
          <Link
            href="#lead-form"
            className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-red-600 px-4 text-[12.5px] font-semibold text-white shadow-md shadow-red-600/20 transition hover:bg-red-700"
          >
            <span>{ctaLabel}</span>
            <ArrowRight
              className={`h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`}
            />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`rounded-lg border p-2 lg:hidden ${
              scrolled
                ? 'border-slate-200 text-slate-700'
                : 'border-white/20 bg-white/10 text-white backdrop-blur-md'
            }`}
            aria-label="Open menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 lg:hidden">
          <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {dropdownLabel}
          </p>
          <nav className="flex flex-col gap-1">
            {(isSolution ? SOLUTION_PAGES : OPERATOR_PAGES).map((p) => {
              const itemBase = isSolution ? 'solutions' : 'operators';
              const href =
                locale === 'ar' ? `/ar/${itemBase}/${p.slug}` : `/${itemBase}/${p.slug}`;
              const isCurrent = p.slug === category;
              return (
                <Link
                  key={p.slug}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-[14px] font-medium ${
                    isCurrent ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{p[locale]}</span>
                  {isCurrent && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-red-600">
                      Now
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="mt-5">
              <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Currency
              </p>
              <div className="flex gap-2">
                {CURRENCY_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => setCurrency(opt.code)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-[12.5px] font-semibold transition ${
                      currency === opt.code
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {opt.code}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href={switchLangHref}
                onClick={() => setOpen(false)}
                className="rounded-lg border border-slate-200 px-3 py-2.5 text-center text-[13px] font-semibold text-slate-700"
              >
                {COPY.switchLang[locale]}
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2.5 text-[13px] font-semibold text-slate-700"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
                {whatsappLabel}
              </a>
            </div>
            <Link
              href="#lead-form"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-600 px-3 py-2.5 text-[13px] font-semibold text-white"
            >
              <span>{ctaLabel}</span>
              <ArrowRight
                className={`h-3.5 w-3.5 ${locale === 'ar' ? 'rotate-180' : ''}`}
              />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
