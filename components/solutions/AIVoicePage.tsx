'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Phone,
  Globe,
  MessageCircle,
  Headphones,
  Mic,
  Activity,
  Languages,
  Brain,
  Sparkles,
  Workflow,
  CreditCard,
  Clock,
  Zap,
  ShieldCheck,
  TrendingUp,
  PhoneCall,
  Bot,
  Volume2,
  WifiHigh,
} from 'lucide-react';
import LeadForm from '@/components/operators/LeadForm';
import WhatsAppFloat from '@/components/operators/WhatsAppFloat';
import MobileStickyCTA from '@/components/operators/MobileStickyCTA';
import OperatorHeader from '@/components/operators/OperatorHeader';
import OperatorFooter from '@/components/operators/OperatorFooter';
import { CurrencyProvider } from '@/components/operators/CurrencyContext';
import OperatorExitIntent from '@/components/operators/OperatorExitIntent';
import OperatorEcosystem from '@/components/operators/OperatorEcosystem';
import type { OperatorCopy, Locale } from '@/lib/i18n/operators';

interface Props {
  copy: OperatorCopy;
  locale: Locale;
  whatsappNumber: string;
}

// Distinct violet/indigo identity for AI Voice (vs operator-page palettes)
const BASE = '#0F0B1F';

export default function AIVoicePage({ copy, locale, whatsappNumber }: Props) {
  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(copy.whatsapp.prefilledMessage)}`;

  return (
    <CurrencyProvider>
      <OperatorHeader
        category="ai-voice"
        locale={locale}
        whatsappHref={whatsappHref}
        ctaLabel={copy.hero.primaryCta}
        whatsappLabel={copy.hero.secondaryCta}
      />
      <main data-solution-page="ai-voice" className="overflow-hidden bg-white text-slate-900">
        <Hero copy={copy} whatsappHref={whatsappHref} locale={locale} />
        <SocialProof copy={copy} />
        <Pains copy={copy} />
        <Solutions copy={copy} />
        <HowItWorks copy={copy} />
        <VerticalFeatures copy={copy} />
        <Pricing copy={copy} locale={locale} />
        <FAQ copy={copy} />
        <LeadFormSection copy={copy} locale={locale} whatsappNumber={whatsappNumber} />
        <OperatorEcosystem category="ai-voice" locale={locale} />
        <FinalCTA copy={copy} whatsappHref={whatsappHref} locale={locale} />
      </main>
      <OperatorFooter category="ai-voice" locale={locale} whatsappHref={whatsappHref} />

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
      <OperatorExitIntent copy={copy.exitIntent} category="ai-voice" locale={locale} />
    </CurrencyProvider>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 1. HERO — violet/indigo, drifting waveform, glass over photo
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
    <section
      className="relative overflow-hidden pt-32 pb-32 lg:pt-40 lg:pb-40"
      style={{ backgroundColor: BASE }}
    >
      {/* Restrained gradient field */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,_rgba(167,139,250,0.20),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_110%,_rgba(99,102,241,0.14),_transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-screen"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Subtle drifting waveform behind everything */}
      <Waveform />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-300 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-300" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-200/90">
                {copy.hero.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7 }}
              className="mt-8 text-[clamp(2.75rem,5.5vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white"
            >
              {copy.hero.headlineLine1}
              <span className="mt-1.5 block bg-gradient-to-br from-white via-violet-100 to-indigo-300/80 bg-clip-text text-transparent">
                {copy.hero.headlineLine2}
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.7 }}
              className="mt-7 max-w-xl text-lg leading-[1.65] text-slate-300/90 lg:text-[1.18rem]"
            >
              {copy.hero.sub}
            </motion.p>

            {/* CTAs */}
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

            {/* Trust pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-slate-400"
            >
              {copy.hero.pills.map((pill, i) => (
                <div key={pill} className="flex items-center gap-x-5">
                  {i > 0 && <span className="text-slate-600">·</span>}
                  <span className="font-medium">{pill}</span>
                </div>
              ))}
            </motion.div>

            {/* Vertical cross-links — guaranteed-rendered fallback in case the
                deeper OperatorEcosystem section fails to prerender. */}
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12.5px]">
              <span className="font-semibold uppercase tracking-[0.16em] text-slate-500">
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
                  {i > 0 && <span className="text-slate-600">·</span>}
                  <Link
                    href={locale === 'ar' ? `/ar/operators/${v.slug}` : `/operators/${v.slug}`}
                    className="font-medium text-slate-300 underline-offset-4 transition hover:text-white hover:underline"
                  >
                    {v[locale]}
                  </Link>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right hero visual — photo + 2 floating cards */}
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

function Waveform() {
  // Drifting equalizer bars across the bottom — restrained, behind content
  const bars = Array.from({ length: 36 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-40 items-end justify-center gap-[3px] opacity-[0.18]" aria-hidden>
      {bars.map((i) => {
        const baseHeight = 12 + ((i * 7) % 36);
        const peak = 30 + ((i * 11) % 70);
        return (
          <motion.div
            key={i}
            initial={{ height: baseHeight }}
            animate={{ height: [baseHeight, peak, baseHeight] }}
            transition={{
              duration: 1.6 + ((i * 0.07) % 1.2),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (i % 6) * 0.08,
            }}
            className="w-[5px] rounded-full bg-gradient-to-t from-violet-400/0 via-violet-300 to-indigo-200"
          />
        );
      })}
    </div>
  );
}

function HeroVisual({ locale }: { locale: Locale }) {
  return (
    <div className="relative">
      {/* Photo card */}
      <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
        <Image
          src="/images/solutions/ai-voice.jpg"
          alt="AI voice agent answering an inbound call"
          width={1400}
          height={1000}
          priority
          className="h-[540px] w-full object-cover sm:h-[580px]"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${BASE}99 0%, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.06] via-transparent to-indigo-900/[0.18] mix-blend-overlay" />
      </div>

      {/* Floating: inbound call card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`absolute top-7 ${locale === 'ar' ? 'right-7' : 'left-7'} w-[290px] rounded-2xl border border-white/10 bg-white/[0.97] p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] backdrop-blur-md`}
      >
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white">
            <PhoneCall className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
            </span>
          </div>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold tracking-[-0.01em] text-slate-900">
              Inbound call · German · 11pm
            </p>
            <p className="text-[12px] text-slate-500">+49 30 · Hannah K. · 02:14</p>
          </div>
        </div>
        <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-[11px] font-medium text-slate-500">Status</span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-emerald-700 ring-1 ring-emerald-100">
            BOOKED · DINNER CRUISE FOR 4
          </span>
        </div>
      </motion.div>

      {/* Floating: revenue / call ping */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.05, type: 'spring', stiffness: 180, damping: 14 }}
        className={`absolute -bottom-6 ${locale === 'ar' ? '-right-4' : '-left-4'} flex items-center gap-3.5 rounded-2xl border border-violet-100 bg-white p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]`}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 ring-1 ring-violet-100">
          <TrendingUp className="h-5 w-5 text-violet-600" />
        </div>
        <div>
          <p className="text-[1.6rem] font-extrabold leading-none tracking-[-0.02em] text-slate-900">
            +218
          </p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">
            Calls answered this week
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
  const icons = [Clock, Languages, Activity];
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
            const Icon = icons[i] ?? Clock;
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
 * 4. SOLUTIONS — three custom mockups
 * ────────────────────────────────────────────────────────────────────────── */
function Solutions({ copy }: { copy: OperatorCopy }) {
  return (
    <section className="relative bg-gradient-to-b from-slate-50/60 via-white to-white py-28 sm:py-36">
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
          0{index + 1} · Capability
        </p>
        <h3 className="mt-3 text-[2rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-slate-900 sm:text-[2.5rem]">
          {item.title}
        </h3>
        <p className="mt-5 max-w-lg text-[1.05rem] leading-[1.65] text-slate-600">{item.description}</p>
        <ul className="mt-8 space-y-3.5">
          {item.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-600">
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
  if (variant === 0) return <TranscriptMockup />;
  if (variant === 1) return <ChannelRouterMockup />;
  return <AnalyticsMockup />;
}

function MockupShell({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[36px] bg-gradient-to-br from-violet-100/70 via-slate-50 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)]">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-3">
          <span className="text-[12px] font-semibold tracking-[-0.01em] text-slate-700">{title}</span>
          {badge && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-emerald-600">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              {badge}
            </span>
          )}
        </div>
        <div className="p-6 sm:p-7">{children}</div>
      </div>
    </div>
  );
}

/* ── Mockup 1: Live conversation transcript ──────────────────────────────── */
function TranscriptMockup() {
  const turns: { who: 'caller' | 'agent'; lang: string; native: string; en: string; t: string }[] = [
    {
      who: 'caller',
      lang: 'DE',
      native: 'Guten Abend, hätten Sie morgen Abend einen Tisch für vier?',
      en: 'Good evening, do you have a table for four tomorrow?',
      t: '00:04',
    },
    {
      who: 'agent',
      lang: 'DE',
      native: 'Ja sehr gerne — wir haben 19:30 oder 20:30 frei. Welche Uhrzeit passt?',
      en: 'Of course — we have 7:30pm or 8:30pm open. Which suits?',
      t: '00:09',
    },
    {
      who: 'caller',
      lang: 'DE',
      native: '20:30 wäre perfekt. Anniversary dinner.',
      en: '8:30pm would be perfect. Anniversary dinner.',
      t: '00:18',
    },
    {
      who: 'agent',
      lang: 'DE',
      native: 'Glückwunsch. Ich sende Ihnen jetzt einen Link für die Anzahlung per SMS.',
      en: 'Congratulations. I am sending the deposit link by SMS now.',
      t: '00:24',
    },
  ];
  return (
    <MockupShell title="Live transcript · DE → EN" badge="LIVE">
      <div className="space-y-3">
        {turns.map((turn, i) => {
          const isAgent = turn.who === 'agent';
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.18 }}
              className={`flex gap-3 ${isAgent ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                  isAgent
                    ? 'bg-gradient-to-br from-violet-600 to-indigo-700 text-white'
                    : 'bg-slate-900 text-white'
                }`}
              >
                {isAgent ? <Bot className="h-4 w-4" /> : 'HK'}
              </div>
              <div
                className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-[1.55] ${
                  isAgent
                    ? 'bg-violet-50 text-slate-900 ring-1 ring-violet-100'
                    : 'bg-slate-50 text-slate-900 ring-1 ring-slate-100'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="rounded bg-white/80 px-1 py-px text-[9px] font-semibold tracking-wider text-slate-500 ring-1 ring-slate-200">
                    {turn.lang}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">{turn.t}</span>
                </div>
                <p className="mt-1 font-medium">{turn.native}</p>
                <p className="mt-1 text-[11.5px] italic text-slate-500">{turn.en}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-5 flex items-center justify-between rounded-xl border border-emerald-200/70 bg-emerald-50/70 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-700" strokeWidth={1.8} />
          <span className="text-[12.5px] font-medium text-emerald-900">
            Booked · Dinner Cruise · Sat 8:30pm · 4 pax · EUR 312
          </span>
        </div>
      </div>
    </MockupShell>
  );
}

/* ── Mockup 2: Multi-channel router ──────────────────────────────────────── */
function ChannelRouterMockup() {
  const channels: { key: string; label: string; Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; tone: string }[] = [
    { key: 'voice', label: 'Voice', Icon: Phone, tone: 'bg-violet-100 text-violet-700 ring-violet-200' },
    { key: 'whatsapp', label: 'WhatsApp', Icon: MessageCircle, tone: 'bg-emerald-100 text-emerald-700 ring-emerald-200' },
    { key: 'email', label: 'Email', Icon: Headphones, tone: 'bg-amber-100 text-amber-700 ring-amber-200' },
  ];
  return (
    <MockupShell title="One conversation · 3 channels" badge="SAME CONTEXT">
      <div className="space-y-3.5">
        {channels.map((c, i) => (
          <motion.div
            key={c.key}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.15 }}
            className="relative flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5"
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ${c.tone}`}>
              <c.Icon className="h-4 w-4" strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[12.5px] font-semibold tracking-[-0.01em] text-slate-900">
                  {c.label}
                </p>
                <span className="text-[10px] font-medium text-slate-400">
                  {i === 0 ? '14:02' : i === 1 ? '14:08' : '14:21'}
                </span>
              </div>
              <p className="mt-0.5 text-[12px] text-slate-600">
                {i === 0 && 'Inbound call · qualifying group of 8 for liveaboard'}
                {i === 1 && 'Caller asked for SMS — agent moved to WhatsApp, kept context'}
                {i === 2 && 'Booking confirmation + invoice sent · paid via Paymob link'}
              </p>
            </div>
            {i < channels.length - 1 && (
              <div className="absolute -bottom-3 left-[27px] h-3 w-px bg-slate-300" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-slate-100 bg-white px-3 py-2 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Channels</p>
          <p className="mt-0.5 text-[14px] font-extrabold tracking-[-0.01em] text-slate-900">10</p>
        </div>
        <div className="rounded-lg border border-slate-100 bg-white px-3 py-2 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Hand-off</p>
          <p className="mt-0.5 text-[14px] font-extrabold tracking-[-0.01em] text-slate-900">0 ctx loss</p>
        </div>
        <div className="rounded-lg border border-slate-100 bg-white px-3 py-2 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Memory</p>
          <p className="mt-0.5 text-[14px] font-extrabold tracking-[-0.01em] text-slate-900">Persistent</p>
        </div>
      </div>
    </MockupShell>
  );
}

/* ── Mockup 3: Analytics dashboard ───────────────────────────────────────── */
function AnalyticsMockup() {
  const calls = [
    { who: 'Hannah K.', lang: 'DE', score: 96, sentiment: 'happy', nps: 9 },
    { who: 'Ji-eun P.', lang: 'KO', score: 92, sentiment: 'neutral', nps: 8 },
    { who: 'Marco B.', lang: 'IT', score: 71, sentiment: 'frustrated', nps: 5 },
    { who: 'Anna S.', lang: 'RU', score: 88, sentiment: 'happy', nps: 9 },
  ];
  return (
    <MockupShell title="Today · 142 calls scored" badge="100% QA">
      {/* Headline KPIs */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { k: 'NPS predicted', v: '8.4', tone: 'text-emerald-700 bg-emerald-50 ring-emerald-100' },
          { k: 'CSAT', v: '94%', tone: 'text-violet-700 bg-violet-50 ring-violet-100' },
          { k: 'Churn risk', v: '3', tone: 'text-amber-700 bg-amber-50 ring-amber-100' },
        ].map((kpi) => (
          <div
            key={kpi.k}
            className={`rounded-xl px-3 py-2.5 text-center ring-1 ${kpi.tone}`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">{kpi.k}</p>
            <p className="mt-0.5 text-[18px] font-extrabold tracking-[-0.02em]">{kpi.v}</p>
          </div>
        ))}
      </div>

      {/* Per-call rows with score bars */}
      <div className="mt-5 space-y-2.5">
        {calls.map((c, i) => (
          <motion.div
            key={c.who}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className="rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[12.5px] font-semibold text-slate-900">{c.who}</span>
                <span className="rounded bg-white px-1.5 py-px text-[9px] font-semibold tracking-wider text-slate-500 ring-1 ring-slate-200">
                  {c.lang}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider ${
                    c.sentiment === 'happy'
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
                      : c.sentiment === 'neutral'
                      ? 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
                      : 'bg-amber-50 text-amber-700 ring-1 ring-amber-100'
                  }`}
                >
                  {c.sentiment.toUpperCase()}
                </span>
                <span className="font-mono text-[11px] font-semibold text-slate-900">{c.score}</span>
              </div>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${c.score}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`h-full rounded-full ${c.score < 80 ? 'bg-amber-500' : 'bg-violet-600'}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-violet-200/70 bg-violet-50/70 px-4 py-3">
        <Sparkles className="h-4 w-4 text-violet-700" strokeWidth={1.8} />
        <span className="text-[12.5px] font-medium text-violet-900">
          1 call flagged for coach review · 0 escalations needed
        </span>
      </div>
    </MockupShell>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 5. HOW IT WORKS
 * ────────────────────────────────────────────────────────────────────────── */
function HowItWorks({ copy }: { copy: OperatorCopy }) {
  const stepIcons = [Sparkles, Zap, Volume2];
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition group-hover:border-violet-500 group-hover:text-violet-700">
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
 * 6. VERTICAL FEATURES — dark grid (violet-tinted)
 * ────────────────────────────────────────────────────────────────────────── */
function VerticalFeatures({ copy }: { copy: OperatorCopy }) {
  const icons = [Globe, Workflow, Languages, Mic, Activity, Brain, Clock, CreditCard];
  return (
    <section
      className="relative overflow-hidden py-28 text-white sm:py-36"
      style={{ backgroundColor: BASE }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,_rgba(167,139,250,0.13),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,_rgba(99,102,241,0.08),_transparent_70%)]" />
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
                className="group relative p-7 transition sm:p-8"
                style={{ backgroundColor: BASE }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-violet-200 transition group-hover:border-violet-300/40 group-hover:text-violet-100">
                    <Icon className="h-4 w-4" strokeWidth={1.7} />
                  </div>
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-white/20">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-7 text-[15.5px] font-semibold tracking-[-0.01em] text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-slate-400">
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
 * 7. PRICING TEASER
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
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-violet-50/40 p-10 text-center shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)] sm:p-14"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-700">
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
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-600">
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
                  isOpen ? 'border-slate-300 shadow-[0_20px_50px_-25px_rgba(15,23,42,0.2)]' : 'border-slate-200'
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
                        ? 'border-violet-700 bg-violet-700 text-white'
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
 * 9. LEAD FORM
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
    <section id="lead-form" className="relative overflow-hidden bg-white py-28 sm:py-36">
      <div className="absolute inset-0 -z-0 opacity-60">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-700">
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
                { Icon: Clock, text: 'WhatsApp reply within 1 hour' },
                { Icon: WifiHigh, text: 'Live test call with your real catalogue' },
                { Icon: ShieldCheck, text: 'Your data stays private. One message, then no spam.' },
              ].map((b) => (
                <div key={b.text} className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700">
                    <b.Icon className="h-4 w-4" strokeWidth={1.7} />
                  </div>
                  <p className="pt-1.5 text-[15px] font-medium text-slate-700">{b.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 hidden rounded-2xl border border-slate-200 bg-white p-5 lg:block">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 text-[13px] font-semibold text-white">
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
            category="ai-voice"
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
    <section
      className="relative overflow-hidden py-28 text-white sm:py-36"
      style={{ backgroundColor: BASE }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-30%,_rgba(167,139,250,0.20),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_120%,_rgba(244,63,94,0.10),_transparent_70%)]" />
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
          className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-[1.65] text-slate-400 sm:text-[1.15rem]"
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
        className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${tone === 'dark' ? 'text-violet-300/90' : 'text-violet-700'}`}
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
          className={`mx-auto mt-5 max-w-xl text-[1.05rem] leading-[1.65] sm:text-[1.13rem] ${tone === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
