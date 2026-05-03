'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Search,
  MessagesSquare,
  Sparkles,
  TrendingUp,
  MessageCircle,
  Clock,
  Shield,
  Globe,
  Code2,
  Languages,
  BrainCircuit,
  LineChart,
  Palette,
  Lock,
  Layers,
  Eye,
  Send,
  Frown,
  ShoppingBag,
} from 'lucide-react';
import LeadForm from '../operators/LeadForm';
import WhatsAppFloat from '../operators/WhatsAppFloat';
import MobileStickyCTA from '../operators/MobileStickyCTA';
import OperatorHeader from '../operators/OperatorHeader';
import OperatorFooter from '../operators/OperatorFooter';
import { CurrencyProvider } from '../operators/CurrencyContext';
import OperatorExitIntent from '../operators/OperatorExitIntent';
import OperatorEcosystem from '@/components/operators/OperatorEcosystem';
import type { OperatorCopy, Locale } from '@/lib/i18n/operators';

interface Props {
  copy: OperatorCopy;
  locale: Locale;
  whatsappNumber: string;
}

export default function AISearchPage({ copy, locale, whatsappNumber }: Props) {
  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(copy.whatsapp.prefilledMessage)}`;

  return (
    <CurrencyProvider>
      <OperatorHeader
        category="ai-search"
        locale={locale}
        whatsappHref={whatsappHref}
        ctaLabel={copy.hero.primaryCta}
        whatsappLabel={copy.hero.secondaryCta}
      />
      <main data-operator-page="ai-search" className="overflow-hidden bg-white text-slate-900">
        <Hero copy={copy} whatsappHref={whatsappHref} locale={locale} />
        <SocialProof copy={copy} />
        <Pains copy={copy} />
        <Solutions copy={copy} />
        <HowItWorks copy={copy} />
        <VerticalFeatures copy={copy} />
        <Pricing copy={copy} locale={locale} />
        <FAQ copy={copy} />
        <LeadFormSection copy={copy} locale={locale} whatsappNumber={whatsappNumber} />
        <OperatorEcosystem category="ai-search" locale={locale} />
        <FinalCTA copy={copy} whatsappHref={whatsappHref} locale={locale} />
      </main>
      <OperatorFooter category="ai-search" locale={locale} whatsappHref={whatsappHref} />

      <WhatsAppFloat
        number={whatsappNumber}
        prefilledMessage={copy.whatsapp.prefilledMessage}
        label={copy.whatsapp.floatLabel}
        locale={locale}
      />
      <MobileStickyCTA
        primaryLabel={copy.mobileStickyCta.primary}
        secondaryLabel={copy.mobileStickyCta.secondary}
        whatsappHref={whatsappHref}
        locale={locale}
      />
      <OperatorExitIntent copy={copy.exitIntent} category="ai-search" locale={locale} />
    </CurrencyProvider>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 1. HERO — deep wine-charcoal base, rose/coral accents, drifting search-bar lines
 * ────────────────────────────────────────────────────────────────────────── */
function Hero({
  copy,
  whatsappHref,
  locale,
}: {
  copy: OperatorCopy;
  whatsappHref: string;
  locale: Locale;
}) {
  return (
    <section className="relative overflow-hidden bg-[#1A0D14] pt-32 pb-32 lg:pt-40 lg:pb-40">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,_rgba(244,63,94,0.20),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_110%,_rgba(251,146,120,0.10),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_15%_50%,_rgba(244,114,182,0.08),_transparent_70%)]" />
        {/* Subtle horizontal scanlines for the search-bar atmosphere */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(180deg, transparent 0, transparent 6px, rgba(255,255,255,0.5) 7px, transparent 8px)',
            backgroundSize: '100% 8px',
            maskImage:
              'radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 75%)',
          }}
        />
      </div>

      <DriftingSearchBars />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-400" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-100/90">
                {copy.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7 }}
              className="mt-8 text-[clamp(2.75rem,5.5vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white"
            >
              {copy.hero.headlineLine1}
              <span className="mt-1.5 block bg-gradient-to-br from-white via-rose-100 to-rose-300/95 bg-clip-text text-transparent">
                {copy.hero.headlineLine2}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.7 }}
              className="mt-7 max-w-xl text-lg leading-[1.65] text-rose-50/75 lg:text-[1.18rem]"
            >
              {copy.hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.6 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="#lead-form"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_30px_-8px_rgba(220,38,38,0.6)] transition hover:bg-red-700 hover:shadow-[0_12px_40px_-8px_rgba(220,38,38,0.7)]"
              >
                <span>{copy.hero.primaryCta}</span>
                <ArrowRight
                  className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`}
                />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-[15px] font-semibold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/[0.08]"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>{copy.hero.secondaryCta}</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-rose-100/55"
            >
              {copy.hero.pills.map((pill, i) => (
                <div key={pill} className="flex items-center gap-x-5">
                  {i > 0 && <span className="text-white/20">·</span>}
                  <span className="font-medium">{pill}</span>
                </div>
              ))}
            </motion.div>

            {/* Vertical cross-links — guaranteed-rendered fallback */}
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12.5px]">
              <span className="font-semibold uppercase tracking-[0.16em] text-rose-100/65">
                {locale === 'ar' ? 'مصمم لـ' : 'Built for'}
              </span>
              {[
                { slug: 'diving-centres', en: 'Diving centres', ar: 'مراكز الغوص' },
                { slug: 'dinner-cruises', en: 'Dinner cruises', ar: 'رحلات العشاء' },
                { slug: 'tour-agencies', en: 'Tour agencies', ar: 'وكالات السياحة' },
                { slug: 'water-sports', en: 'Water sports', ar: 'الرياضات المائية' },
                { slug: 'boat-operators', en: 'Boat operators', ar: 'مشغّلو القوارب' },
              ].map((v, i) => (
                <span key={v.slug} className="flex items-center gap-3">
                  {i > 0 && <span className="text-white/20">·</span>}
                  <Link
                    href={locale === 'ar' ? `/ar/operators/${v.slug}` : `/operators/${v.slug}`}
                    className="font-medium text-rose-100/85 underline-offset-4 transition hover:text-white hover:underline"
                  >
                    {v[locale]}
                  </Link>
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative"
          >
            <HeroVisual locale={locale} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DriftingSearchBars() {
  // Horizontal "search bar" line elements drifting across the hero with subtle pulse — distinct
  // from diving's bubbles, dinner's sparkles, tour-agency's drifting squares, and water-sports' rings.
  const bars = [
    { top: '18%', delay: 0, dur: 14, width: 220, opacity: 0.30 },
    { top: '34%', delay: 4, dur: 18, width: 160, opacity: 0.22 },
    { top: '52%', delay: 1.5, dur: 16, width: 280, opacity: 0.28 },
    { top: '68%', delay: 6, dur: 17, width: 200, opacity: 0.20 },
    { top: '82%', delay: 3, dur: 15, width: 180, opacity: 0.25 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {bars.map((b, i) => (
        <motion.div
          key={i}
          initial={{ x: '-30%', opacity: 0 }}
          animate={{
            x: ['-30%', '120%'],
            opacity: [0, b.opacity, b.opacity, 0],
          }}
          transition={{
            duration: b.dur,
            delay: b.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute flex items-center gap-2 rounded-full border border-rose-300/25 bg-white/[0.03] px-3 py-1.5 backdrop-blur-sm"
          style={{ top: b.top, width: b.width }}
        >
          <Search className="h-3 w-3 text-rose-200/60" strokeWidth={1.8} />
          <motion.span
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.6, delay: b.delay * 0.3, repeat: Infinity }}
            className="block h-1 flex-1 rounded-full bg-gradient-to-r from-rose-300/30 via-rose-200/50 to-transparent"
          />
        </motion.div>
      ))}
    </div>
  );
}

function HeroVisual({ locale }: { locale: Locale }) {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
        <Image
          src="/images/solutions/ai-search.jpg"
          alt=""
          width={1400}
          height={1000}
          priority
          className="h-[540px] w-full object-cover sm:h-[580px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D14]/65 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.08] via-transparent to-rose-900/[0.20] mix-blend-overlay" />
      </div>

      {/* Floating search query card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`absolute top-7 ${locale === 'ar' ? 'right-7' : 'left-7'} w-[320px] rounded-2xl border border-white/10 bg-white/[0.97] p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] backdrop-blur-md`}
      >
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2">
          <Search className="h-3.5 w-3.5 text-rose-600" strokeWidth={2} />
          <span className="truncate text-[12px] font-medium text-slate-800">
            romantic Nile cruise for two — under 60 minutes
          </span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="ms-auto inline-block h-3 w-[1.5px] bg-slate-700"
          />
        </div>
        <div className="mt-3 space-y-1.5">
          {[
            { name: 'Nile Pearl Sunset Felucca', meta: '50 min · couples', match: '98%' },
            { name: 'Cairo Twilight Sail · 2 pax', meta: '45 min · private', match: '94%' },
            { name: 'Maadi Romance Cruise', meta: '55 min · with dinner', match: '89%' },
          ].map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + i * 0.1 }}
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-slate-50"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-rose-500 to-pink-600 text-[9px] font-bold text-white">
                {String(i + 1)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11.5px] font-semibold tracking-[-0.01em] text-slate-900">
                  {r.name}
                </p>
                <p className="truncate text-[10px] text-slate-500">{r.meta}</p>
              </div>
              <span className="rounded-full bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-rose-700 ring-1 ring-rose-100">
                {r.match}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Revenue ping */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.05, type: 'spring', stiffness: 180, damping: 14 }}
        className={`absolute -bottom-6 ${locale === 'ar' ? '-right-4' : '-left-4'} flex items-center gap-3.5 rounded-2xl border border-rose-100 bg-white p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]`}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 ring-1 ring-rose-100">
          <TrendingUp className="h-5 w-5 text-rose-600" />
        </div>
        <div>
          <p className="text-[1.6rem] font-extrabold leading-none tracking-[-0.02em] text-slate-900">
            +47%
          </p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">
            Search to booking
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 2. SOCIAL PROOF
 * ────────────────────────────────────────────────────────────────────────── */
function SocialProof({ copy }: { copy: OperatorCopy }) {
  return (
    <section className="relative -mt-16 z-20 px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-slate-200/80 bg-white/95 px-6 py-7 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)] backdrop-blur sm:px-10 sm:py-9"
        >
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              {copy.socialProof.label}
            </p>
            <p className="mt-2 text-[17px] font-semibold tracking-[-0.01em] text-slate-900 sm:text-[19px]">
              {copy.socialProof.cities}
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-y-6 sm:gap-x-2 lg:grid-cols-4 lg:divide-x lg:divide-slate-200 rtl:lg:divide-x-reverse">
            {copy.socialProof.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="px-4 text-center"
              >
                <div className="text-[1.85rem] font-extrabold tracking-[-0.025em] text-slate-900 sm:text-[2.15rem]">
                  {stat.value}
                </div>
                <div className="mt-1 text-[12.5px] font-medium text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 3. PAIN POINTS
 * ────────────────────────────────────────────────────────────────────────── */
function Pains({ copy }: { copy: OperatorCopy }) {
  const icons = [Search, Languages, Frown];
  return (
    <section className="relative bg-white py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow={copy.pains.sectionEyebrow}
          headline={copy.pains.sectionHeadline}
          sub={copy.pains.sectionSub}
        />
        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl bg-slate-100 lg:grid-cols-3">
          {copy.pains.items.map((item, i) => {
            const Icon = icons[i] ?? Search;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative bg-white p-8 transition hover:bg-slate-50/60 lg:p-10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition group-hover:border-slate-900 group-hover:text-slate-900">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <span className="text-[11px] font-semibold tracking-[0.16em] text-slate-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-7 text-[1.35rem] font-semibold tracking-[-0.02em] text-slate-900 sm:text-[1.45rem]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-slate-600">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 4. SOLUTIONS — three product mockups built fresh for AI Search
 * ────────────────────────────────────────────────────────────────────────── */
function Solutions({ copy }: { copy: OperatorCopy }) {
  return (
    <section className="relative bg-gradient-to-b from-rose-50/30 via-white to-white py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow={copy.solutions.sectionEyebrow}
          headline={copy.solutions.sectionHeadline}
          sub={copy.solutions.sectionSub}
        />
        <div className="mt-24 space-y-28 lg:space-y-36">
          {copy.solutions.items.map((item, i) => (
            <SolutionRow key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionRow({
  item,
  index,
}: {
  item: OperatorCopy['solutions']['items'][number];
  index: number;
}) {
  const reverse = index % 2 === 1;
  return (
    <div
      className={`grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20 ${reverse ? 'lg:[direction:rtl]' : ''}`}
    >
      <motion.div
        initial={{ opacity: 0, x: reverse ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="lg:[direction:ltr]"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          {`0${index + 1}`} · Feature
        </p>
        <h3 className="mt-3 text-[2rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-slate-900 sm:text-[2.5rem]">
          {item.title}
        </h3>
        <p className="mt-5 max-w-lg text-[1.05rem] leading-[1.65] text-slate-600">{item.description}</p>
        <ul className="mt-8 space-y-3.5">
          {item.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-900">
                <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />
              </span>
              <span className="text-[15px] font-medium text-slate-800">{b}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reverse ? -30 : 30, scale: 0.97 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="lg:[direction:ltr]"
      >
        <SolutionMockup variant={index} />
      </motion.div>
    </div>
  );
}

function SolutionMockup({ variant }: { variant: number }) {
  if (variant === 0) return <SearchAsYouTypeMockup />;
  if (variant === 1) return <ZeroResultRescueMockup />;
  return <AnalyticsDashboardMockup />;
}

function MockupShell({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[36px] bg-gradient-to-br from-rose-100/70 via-pink-50/40 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)]">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-3">
          <span className="text-[12px] font-semibold tracking-[-0.01em] text-slate-700">
            {title}
          </span>
          {badge && (
            <span className="text-[10px] font-semibold tracking-wider text-rose-600">{badge}</span>
          )}
        </div>
        <div className="p-6 sm:p-7">{children}</div>
      </div>
    </div>
  );
}

/* Mockup A — Search-as-you-type widget with type-ahead in 3 languages */
function SearchAsYouTypeMockup() {
  const langs: { code: string; query: string; flag: string; results: { name: string; meta: string }[] }[] = [
    {
      code: 'EN',
      query: 'sunset boat trip for couples',
      flag: 'EN',
      results: [
        { name: 'Nile Sunset Felucca · 2 pax', meta: '50 min · private · romantic' },
        { name: 'Hurghada Twilight Speedboat', meta: '60 min · couples package' },
      ],
    },
    {
      code: 'AR',
      query: 'رحلة قارب وقت الغروب',
      flag: 'AR',
      results: [
        { name: 'فلوكا غروب على النيل', meta: '50 د · خصوصي · رومانسي' },
        { name: 'سبيدبوت غروب الغردقة', meta: '60 د · باقة الأزواج' },
      ],
    },
    {
      code: 'FR',
      query: 'balade en bateau au coucher du soleil',
      flag: 'FR',
      results: [
        { name: 'Felouque Nil au coucher du soleil', meta: '50 min · privé · romantique' },
        { name: 'Bateau rapide Hurghada · couples', meta: '60 min · couchant' },
      ],
    },
  ];
  const [active, setActive] = useState(0);
  const cur = langs[active];

  return (
    <MockupShell title="Search widget · multilingual semantic results" badge="LIVE">
      <div className="flex items-center gap-1.5 mb-4">
        {langs.map((l, i) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setActive(i)}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10.5px] font-semibold tracking-wider transition ${
              i === active
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Globe className="h-3 w-3" strokeWidth={2} />
            {l.code}
          </button>
        ))}
        <span className="ms-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[9.5px] font-semibold tracking-wider text-emerald-700 ring-1 ring-emerald-100">
          ANY LANGUAGE
        </span>
      </div>

      {/* Search input */}
      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-rose-600" strokeWidth={2} />
          <motion.span
            key={cur.query}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 text-[13px] font-medium text-slate-900"
          >
            {cur.query}
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block h-4 w-[1.5px] bg-slate-700"
          />
          <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] text-slate-500">
            ESC
          </span>
        </div>

        <div className="mt-3 border-t border-slate-100 pt-3">
          <p className="mb-2 text-[9.5px] font-semibold uppercase tracking-wider text-slate-400">
            Semantic match
          </p>
          <div className="space-y-1.5">
            {cur.results.map((r, i) => (
              <motion.div
                key={`${cur.code}-${r.name}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`flex items-center gap-3 rounded-lg px-2.5 py-2 transition ${
                  i === 0 ? 'bg-rose-50/70 ring-1 ring-rose-100' : 'hover:bg-slate-50'
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[9.5px] font-bold text-white ${
                    i === 0
                      ? 'bg-gradient-to-br from-rose-500 to-pink-600'
                      : 'bg-gradient-to-br from-slate-700 to-slate-900'
                  }`}
                >
                  {String(i + 1)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-semibold tracking-[-0.01em] text-slate-900">
                    {r.name}
                  </p>
                  <p className="truncate text-[10.5px] text-slate-500">{r.meta}</p>
                </div>
                {i === 0 && (
                  <span className="rounded-full bg-white px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-rose-700 ring-1 ring-rose-200">
                    BEST
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-200/70 bg-rose-50/50 px-4 py-3">
        <BrainCircuit className="h-4 w-4 text-rose-700" strokeWidth={1.8} />
        <span className="text-[12.5px] font-medium text-rose-900">
          Beat keyword search · the word romantic was never typed by the customer
        </span>
      </div>
    </MockupShell>
  );
}

/* Mockup B — Zero-result rescue: AI chat says "we do not have it, here are 3 close ones" */
function ZeroResultRescueMockup() {
  return (
    <MockupShell title="Zero-result rescue · conversational fallback" badge="SAVED">
      <div className="rounded-xl border border-slate-200 bg-white p-3">
        {/* Failed query */}
        <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2">
          <Search className="h-3.5 w-3.5 text-slate-500" strokeWidth={2} />
          <span className="flex-1 text-[12px] font-medium text-slate-700">
            jet ski lesson with breakfast included
          </span>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold tracking-wider text-amber-800">
            0 EXACT
          </span>
        </div>

        {/* AI response bubble */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 flex items-start gap-2.5"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
          </div>
          <div className="rounded-2xl rounded-tl-sm border border-slate-200 bg-rose-50/40 px-3.5 py-2.5">
            <p className="text-[12px] leading-[1.5] text-slate-800">
              We do not have that exact tour — but here are three close matches your guests usually
              love:
            </p>
          </div>
        </motion.div>

        {/* 3 close matches */}
        <div className="mt-4 space-y-2">
          {[
            {
              name: 'Jet Ski Beginner Session · 30 min',
              why: 'Skip breakfast — pair with a hotel pickup',
              tag: 'CLOSEST',
            },
            {
              name: 'Hurghada Marine Lesson + Brunch',
              why: 'Brunch instead of breakfast · same beach',
              tag: 'POPULAR',
            },
            {
              name: 'Private Watersports Bundle',
              why: 'Includes coffee & pastries on arrival',
              tag: 'PREMIUM',
            },
          ].map((m, i) => (
            <motion.button
              key={m.name}
              type="button"
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-start transition hover:border-rose-300 hover:bg-rose-50/30"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-rose-100 to-pink-100 text-rose-700">
                <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold tracking-[-0.01em] text-slate-900">
                  {m.name}
                </p>
                <p className="truncate text-[10.5px] text-slate-500">{m.why}</p>
              </div>
              <span className="rounded-full bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-rose-700 ring-1 ring-rose-100">
                {m.tag}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Input row */}
        <div className="mt-4 flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/70 px-3 py-2">
          <span className="flex-1 text-[11.5px] text-slate-500">
            Tell me what you really need
          </span>
          <button className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-600 text-white transition hover:bg-rose-700">
            <Send className="h-3.5 w-3.5" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200/70 bg-emerald-50/60 px-4 py-3">
        <MessagesSquare className="h-4 w-4 text-emerald-700" strokeWidth={1.8} />
        <span className="text-[12.5px] font-medium text-emerald-900">
          37% of zero-result sessions still convert · vs 4% with no rescue
        </span>
      </div>
    </MockupShell>
  );
}

/* Mockup C — Tenant analytics dashboard */
function AnalyticsDashboardMockup() {
  const topQueries = [
    { q: 'pyramids private tour', count: 412, conv: 18 },
    { q: 'felucca sunset for couples', count: 287, conv: 22 },
    { q: 'red sea snorkel half day', count: 233, conv: 14 },
    { q: 'nile dinner cruise group', count: 198, conv: 11 },
  ];
  const zeroResults = [
    { q: 'kid friendly sunset cruise', count: 41 },
    { q: 'wheelchair accessible camel ride', count: 27 },
    { q: 'all-inclusive day with hotel', count: 19 },
  ];

  return (
    <MockupShell title="Analytics · last 30 days · across the widget" badge="LIVE">
      {/* Top metric row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Searches', value: '12,840', delta: '+18%', tone: 'rose' },
          { label: 'Convert', value: '17.4%', delta: '+4.2pt', tone: 'emerald' },
          { label: 'Zero results', value: '3.1%', delta: '-1.5pt', tone: 'emerald' },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-slate-200 bg-slate-50/40 px-3.5 py-3">
            <p className="text-[9.5px] font-semibold uppercase tracking-wider text-slate-500">
              {m.label}
            </p>
            <p className="mt-1.5 text-[19px] font-extrabold tracking-[-0.02em] text-slate-900">
              {m.value}
            </p>
            <p
              className={`mt-1 text-[10.5px] font-semibold ${m.tone === 'rose' ? 'text-rose-600' : 'text-emerald-700'}`}
            >
              {m.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Sparkline */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
        <div className="flex items-baseline justify-between">
          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
            Search to booking · daily
          </p>
          <span className="text-[10.5px] font-medium text-slate-500">30d</span>
        </div>
        <div className="mt-2 flex h-12 items-end gap-1">
          {[35, 42, 38, 56, 49, 61, 55, 67, 73, 70, 81, 76, 88, 84, 91].map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{ height: `${h}%`, transformOrigin: 'bottom' }}
              className="flex-1 rounded-sm bg-gradient-to-t from-rose-500 to-rose-300"
            />
          ))}
        </div>
      </div>

      {/* Top queries */}
      <div className="mt-4">
        <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
          Top queries
        </p>
        <div className="mt-2 space-y-1.5">
          {topQueries.map((row, i) => (
            <motion.div
              key={row.q}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white px-3 py-2"
            >
              <span className="flex-1 truncate text-[11.5px] font-medium text-slate-800">
                {row.q}
              </span>
              <span className="font-mono text-[10.5px] text-slate-500">{row.count}</span>
              <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-emerald-700 ring-1 ring-emerald-100">
                {`${row.conv}% CONV`}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Zero-result row */}
      <div className="mt-4 rounded-xl border border-amber-200/70 bg-amber-50/60 p-3.5">
        <div className="flex items-center justify-between">
          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-amber-800">
            Zero-result · gaps to fill
          </p>
          <span className="text-[10px] font-semibold text-amber-700">3 found</span>
        </div>
        <div className="mt-2 space-y-1">
          {zeroResults.map((row) => (
            <div
              key={row.q}
              className="flex items-center justify-between rounded-md bg-white/70 px-2.5 py-1.5"
            >
              <span className="text-[11.5px] font-medium text-slate-800">{row.q}</span>
              <span className="font-mono text-[10.5px] text-amber-700">{`${row.count}x`}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 5. HOW IT WORKS
 * ────────────────────────────────────────────────────────────────────────── */
function HowItWorks({ copy }: { copy: OperatorCopy }) {
  const stepIcons = [Palette, Code2, BrainCircuit];
  return (
    <section className="relative bg-slate-50/40 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow={copy.howItWorks.sectionEyebrow}
          headline={copy.howItWorks.sectionHeadline}
          sub={copy.howItWorks.sectionSub}
        />
        <div className="mt-20 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {copy.howItWorks.steps.map((step, i) => {
            const Icon = stepIcons[i] ?? Sparkles;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition hover:border-slate-300 hover:shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)] lg:p-10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition group-hover:border-slate-900 group-hover:text-slate-900">
                    <Icon className="h-4 w-4" strokeWidth={1.7} />
                  </div>
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-300">
                    STEP {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-7 text-[1.35rem] font-semibold tracking-[-0.02em] text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-slate-600">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 6. VERTICAL FEATURES — dark grid with rose accents
 * ────────────────────────────────────────────────────────────────────────── */
function VerticalFeatures({ copy }: { copy: OperatorCopy }) {
  const icons = [Code2, Languages, BrainCircuit, MessagesSquare, LineChart, Palette, Lock, Layers];
  return (
    <section className="relative overflow-hidden bg-[#1A0D14] py-28 text-white sm:py-36">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,_rgba(244,63,94,0.14),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,_rgba(244,63,94,0.08),_transparent_70%)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow={copy.features.sectionEyebrow}
          headline={copy.features.sectionHeadline}
          sub={copy.features.sectionSub}
          tone="dark"
        />
        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {copy.features.items.map((feature, i) => {
            const Icon = icons[i] ?? Sparkles;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.06, duration: 0.4 }}
                className="group relative bg-[#1A0D14] p-7 transition hover:bg-[#241019] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-rose-200 transition group-hover:border-rose-300/40 group-hover:text-rose-100">
                    <Icon className="h-4 w-4" strokeWidth={1.7} />
                  </div>
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-white/20">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-7 text-[15.5px] font-semibold tracking-[-0.01em] text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-rose-50/55">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 7. PRICING
 * ────────────────────────────────────────────────────────────────────────── */
function Pricing({ copy, locale }: { copy: OperatorCopy; locale: Locale }) {
  return (
    <section className="relative bg-white py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-rose-50/30 p-10 text-center shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)] sm:p-14"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600">
            {copy.pricing.eyebrow}
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl text-[2.25rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-slate-900 sm:text-[2.75rem]">
            {copy.pricing.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-[1.65] text-slate-600">
            {copy.pricing.sub}
          </p>

          <ul className="mx-auto mt-10 grid max-w-md gap-2.5 text-start">
            {copy.pricing.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900">
                  <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
                </span>
                <span className="text-[14.5px] font-medium text-slate-700">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="#lead-form"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_30px_-8px_rgba(15,23,42,0.5)] transition hover:bg-slate-800"
            >
              <span>{copy.pricing.cta}</span>
              <ArrowRight
                className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`}
              />
            </Link>
            <p className="mx-auto mt-5 max-w-md text-[12.5px] leading-relaxed text-slate-500">
              {copy.pricing.fineprint}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 8. FAQ
 * ────────────────────────────────────────────────────────────────────────── */
function FAQ({ copy }: { copy: OperatorCopy }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative bg-slate-50/40 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeader eyebrow={copy.faq.sectionEyebrow} headline={copy.faq.sectionHeadline} />
        <div className="mt-16 space-y-2">
          {copy.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className={`overflow-hidden rounded-2xl border bg-white transition ${
                  isOpen
                    ? 'border-slate-300 shadow-[0_20px_50px_-25px_rgba(15,23,42,0.2)]'
                    : 'border-slate-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start gap-5 px-6 py-5 text-start sm:px-7 sm:py-6"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1 text-[16px] font-semibold tracking-[-0.01em] text-slate-900 sm:text-[17px]">
                    {item.question}
                  </span>
                  <div
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition ${
                      isOpen
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 text-slate-500'
                    }`}
                  >
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      strokeWidth={2.2}
                    />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                      <div className="px-6 pb-6 text-[15px] leading-[1.7] text-slate-600 sm:px-7 sm:pb-7">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 9. LEAD FORM SECTION
 * ────────────────────────────────────────────────────────────────────────── */
function LeadFormSection({
  copy,
  locale,
  whatsappNumber,
}: {
  copy: OperatorCopy;
  locale: Locale;
  whatsappNumber: string;
}) {
  return (
    <section
      id="lead-form"
      className="relative overflow-hidden bg-white py-28 sm:py-36"
    >
      <div className="absolute inset-0 -z-0 opacity-60">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-rose-100/40 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600">
              {copy.leadForm.sectionEyebrow}
            </p>
            <h2 className="mt-5 text-[2.25rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-slate-900 sm:text-[2.75rem] lg:text-[3.25rem]">
              {copy.leadForm.sectionHeadline}
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.65] text-slate-600">
              {copy.leadForm.sectionSub}
            </p>

            <div className="mt-12 space-y-5">
              {[
                { icon: Clock, text: 'WhatsApp reply within 1 hour' },
                { icon: Eye, text: 'Working preview on a sample of your products' },
                { icon: Shield, text: 'Your data stays private. One message, then no spam.' },
              ].map((b) => (
                <div key={b.text} className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700">
                    <b.icon className="h-4 w-4" strokeWidth={1.7} />
                  </div>
                  <p className="pt-1.5 text-[15px] font-medium text-slate-700">{b.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 hidden rounded-2xl border border-slate-200 bg-white p-5 lg:block">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-[13px] font-semibold text-white">
                  S
                </div>
                <div>
                  <p className="text-[14px] font-semibold tracking-[-0.01em] text-slate-900">
                    Saif · Foxes Operations
                  </p>
                  <p className="text-[12.5px] text-slate-500">
                    Egypt-based · replies in Arabic or English
                  </p>
                </div>
              </div>
            </div>
          </div>

          <LeadForm
            copy={copy.leadForm}
            category="ai-search"
            locale={locale}
            whatsappNumber={whatsappNumber}
            whatsappPrefilledMessage={copy.whatsapp.prefilledMessage}
          />
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 10. FINAL CTA
 * ────────────────────────────────────────────────────────────────────────── */
function FinalCTA({
  copy,
  whatsappHref,
  locale,
}: {
  copy: OperatorCopy;
  whatsappHref: string;
  locale: Locale;
}) {
  return (
    <section className="relative overflow-hidden bg-[#1A0D14] py-28 text-white sm:py-36">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-30%,_rgba(244,63,94,0.20),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_120%,_rgba(251,146,120,0.12),_transparent_70%)]" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[2.5rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[3.5rem]"
        >
          {copy.finalCta.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-[1.65] text-rose-50/65 sm:text-[1.15rem]"
        >
          {copy.finalCta.sub}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="#lead-form"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_30px_-8px_rgba(220,38,38,0.6)] transition hover:bg-red-700"
          >
            <span>{copy.finalCta.primary}</span>
            <ArrowRight
              className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`}
            />
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/[0.08]"
          >
            <MessageCircle className="h-4 w-4 text-emerald-400" />
            <span>{copy.finalCta.secondary}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Shared
 * ────────────────────────────────────────────────────────────────────────── */
function SectionHeader({
  eyebrow,
  headline,
  sub,
  tone = 'light',
}: {
  eyebrow: string;
  headline: string;
  sub?: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${tone === 'dark' ? 'text-rose-300/90' : 'text-red-600'}`}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className={`mt-5 text-[2.25rem] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3rem] ${tone === 'dark' ? 'text-white' : 'text-slate-900'}`}
      >
        {headline}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`mx-auto mt-5 max-w-xl text-[1.05rem] leading-[1.65] sm:text-[1.13rem] ${tone === 'dark' ? 'text-rose-50/55' : 'text-slate-600'}`}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
