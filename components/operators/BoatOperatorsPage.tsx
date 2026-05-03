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
  Calendar,
  Coins,
  CloudRain,
  Wallet,
  Phone,
  Wind,
  Anchor,
  Ship,
  Compass,
  Sparkles,
  Clock,
  Star,
  TrendingUp,
  MessageCircle,
  Shield,
  CreditCard,
  Users2,
  Hotel,
  ListChecks,
  Repeat,
  Fuel,
  AlertTriangle,
  RefreshCcw,
} from 'lucide-react';
import LeadForm from './LeadForm';
import WhatsAppFloat from './WhatsAppFloat';
import MobileStickyCTA from './MobileStickyCTA';
import type { OperatorCopy, Locale } from '@/lib/i18n/operators';

interface Props {
  copy: OperatorCopy;
  locale: Locale;
  whatsappNumber: string;
}

export default function BoatOperatorsPage({ copy, locale, whatsappNumber }: Props) {
  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(copy.whatsapp.prefilledMessage)}`;

  return (
    <>
      <main data-operator-page="boat-operators" className="overflow-hidden bg-white text-slate-900">
        <Hero copy={copy} whatsappHref={whatsappHref} locale={locale} />
        <SocialProof copy={copy} />
        <Pains copy={copy} />
        <Solutions copy={copy} />
        <HowItWorks copy={copy} />
        <VerticalFeatures copy={copy} />
        <Pricing copy={copy} locale={locale} />
        <FAQ copy={copy} />
        <LeadFormSection copy={copy} locale={locale} whatsappNumber={whatsappNumber} />
        <FinalCTA copy={copy} whatsappHref={whatsappHref} locale={locale} />
      </main>

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
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 1. HERO — aqua-teal recreational charter vibe with drifting waves
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
    <section className="relative overflow-hidden bg-[#07151D] pt-32 pb-32 lg:pt-40 lg:pb-40">
      {/* Aqua-teal recreational gradient field with faint sunset coral */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,_rgba(94,234,212,0.18),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_110%,_rgba(251,113,133,0.10),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_18%_60%,_rgba(45,212,191,0.10),_transparent_70%)]" />
        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-screen"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Drifting horizontal wave lines — distinct from diving's bubbles and dinner's sparkles */}
      <DriftingWaves />

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
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-300" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-100/90">
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
              <span className="mt-1.5 block bg-gradient-to-br from-white via-teal-100 to-teal-300/95 bg-clip-text text-transparent">
                {copy.hero.headlineLine2}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.7 }}
              className="mt-7 max-w-xl text-lg leading-[1.65] text-teal-50/80 lg:text-[1.18rem]"
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
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-teal-100/60"
            >
              {copy.hero.pills.map((pill, i) => (
                <div key={pill} className="flex items-center gap-x-5">
                  {i > 0 && <span className="text-white/20">·</span>}
                  <span className="font-medium">{pill}</span>
                </div>
              ))}
            </motion.div>
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

function DriftingWaves() {
  // 5 thin curving wave lines drifting slowly across the hero
  const waves = [
    { top: '22%', delay: 0, dur: 28, offset: -120 },
    { top: '38%', delay: 6, dur: 34, offset: 60 },
    { top: '55%', delay: 2, dur: 30, offset: -80 },
    { top: '72%', delay: 10, dur: 36, offset: 100 },
    { top: '88%', delay: 4, dur: 32, offset: -40 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {waves.map((w, i) => (
        <motion.svg
          key={i}
          initial={{ x: w.offset, opacity: 0 }}
          animate={{ x: w.offset + 120, opacity: [0, 0.35, 0.35, 0] }}
          transition={{ duration: w.dur, delay: w.delay, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 w-[140%]"
          style={{ top: w.top }}
          viewBox="0 0 1200 18"
          fill="none"
        >
          <path
            d="M0 9 Q 100 0, 200 9 T 400 9 T 600 9 T 800 9 T 1000 9 T 1200 9"
            stroke="rgba(94,234,212,0.45)"
            strokeWidth="1"
            fill="none"
          />
        </motion.svg>
      ))}
    </div>
  );
}

function HeroVisual({ locale }: { locale: Locale }) {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
        <Image
          src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1400&q=85"
          alt=""
          width={1400}
          height={1000}
          priority
          loading="eager"
          className="h-[540px] w-full object-cover sm:h-[580px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07151D]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400/[0.05] via-transparent to-blue-900/[0.18] mix-blend-overlay" />
      </div>

      {/* Charter confirmation card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`absolute top-7 ${locale === 'ar' ? 'right-7' : 'left-7'} w-[300px] rounded-2xl border border-white/10 bg-white/[0.96] p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] backdrop-blur-md`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-white">
            <Anchor className="h-5 w-5" strokeWidth={1.7} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold tracking-[-0.01em] text-slate-900">
              Speedboat Charter · 9am Saturday
            </p>
            <p className="text-[12px] text-slate-500">Captain assigned · Sea Spirit</p>
          </div>
        </div>
        <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-[11px] font-medium text-slate-500">EGP 6,000 · 8 guests</span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-emerald-700 ring-1 ring-emerald-100">
            DEPOSIT PAID
          </span>
        </div>
      </motion.div>

      {/* Revenue ping */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.05, type: 'spring', stiffness: 180, damping: 14 }}
        className={`absolute -bottom-6 ${locale === 'ar' ? '-right-4' : '-left-4'} flex items-center gap-3.5 rounded-2xl border border-teal-100 bg-white p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]`}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 ring-1 ring-teal-100">
          <TrendingUp className="h-5 w-5 text-teal-600" />
        </div>
        <div>
          <p className="text-[1.6rem] font-extrabold leading-none tracking-[-0.02em] text-slate-900">
            +58%
          </p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">
            Direct charters
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
  const icons = [Phone, Wallet, Wind];
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
            const Icon = icons[i] ?? AlertTriangle;
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
 * 4. SOLUTIONS — vertical-specific mockups
 * ────────────────────────────────────────────────────────────────────────── */
function Solutions({ copy }: { copy: OperatorCopy }) {
  return (
    <section className="relative bg-gradient-to-b from-teal-50/30 via-white to-white py-28 sm:py-36">
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
          0{index + 1} · Feature
        </p>
        <h3 className="mt-3 text-[2rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-slate-900 sm:text-[2.5rem]">
          {item.title}
        </h3>
        <p className="mt-5 max-w-lg text-[1.05rem] leading-[1.65] text-slate-600">
          {item.description}
        </p>
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
  if (variant === 0) return <FleetCalendarMockup />;
  if (variant === 1) return <PaymentTimelineMockup />;
  return <WeatherCancelMockup />;
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
      <div className="absolute -inset-6 -z-10 rounded-[36px] bg-gradient-to-br from-teal-50/80 via-cyan-50/40 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)]">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-3">
          <span className="text-[12px] font-semibold tracking-[-0.01em] text-slate-700">
            {title}
          </span>
          {badge && (
            <span className="text-[10px] font-semibold tracking-wider text-emerald-600">
              {badge}
            </span>
          )}
        </div>
        <div className="p-6 sm:p-7">{children}</div>
      </div>
    </div>
  );
}

/* ── Mockup A: Fleet calendar ─────────────────────────────────────────── */
function FleetCalendarMockup() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const vessels = [
    {
      name: 'Sea Spirit',
      sub: 'Speedboat · 12pax',
      bookings: [
        { day: 1, span: 1, label: 'Halse · half day', tone: 'bg-teal-600' },
        { day: 4, span: 2, label: 'Hilton group', tone: 'bg-slate-900' },
      ],
    },
    {
      name: 'Blue Pearl',
      sub: 'Yacht 40ft · 18pax',
      bookings: [{ day: 0, span: 7, label: 'Schmidt party · all week', tone: 'bg-slate-700' }],
    },
    {
      name: 'Red Falcon',
      sub: 'Fishing · 8pax',
      bookings: [
        { day: 2, span: 1, label: 'Ramirez · fishing', tone: 'bg-emerald-700' },
        { day: 5, span: 1, label: 'Khaled · sunset', tone: 'bg-rose-600' },
      ],
    },
  ];

  return (
    <MockupShell title="Fleet · Week of 12 May" badge="LIVE">
      {/* Day header */}
      <div
        className="grid items-center gap-1 text-center"
        style={{ gridTemplateColumns: '120px repeat(7, 1fr)' }}
      >
        <div />
        {days.map((d) => (
          <div key={d} className="text-[10px] font-semibold tracking-wider text-slate-400">
            {d}
          </div>
        ))}
      </div>

      {/* Vessel rows */}
      <div className="mt-2 space-y-2">
        {vessels.map((v, vi) => (
          <motion.div
            key={v.name}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + vi * 0.07 }}
            className="grid items-center gap-1"
            style={{ gridTemplateColumns: '120px repeat(7, 1fr)' }}
          >
            <div className="pe-2">
              <p className="text-[12.5px] font-semibold tracking-[-0.01em] text-slate-900">
                {v.name}
              </p>
              <p className="text-[10.5px] text-slate-500">{v.sub}</p>
            </div>
            <div className="col-span-7 relative h-9 rounded-lg bg-slate-50/70 ring-1 ring-slate-100">
              <div className="absolute inset-0 grid grid-cols-7">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`border-e border-slate-100 ${i === 6 ? 'border-e-0' : ''}`}
                  />
                ))}
              </div>
              {v.bookings.map((b, bi) => (
                <motion.div
                  key={bi}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.25 + vi * 0.06 + bi * 0.05,
                    duration: 0.5,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className={`absolute top-1.5 bottom-1.5 mx-0.5 rounded-md ${b.tone} flex items-center px-2 text-[10px] font-medium text-white shadow-sm`}
                  style={{
                    left: `calc(${(b.day / 7) * 100}% + 2px)`,
                    width: `calc(${(b.span / 7) * 100}% - 4px)`,
                    transformOrigin: 'left',
                  }}
                >
                  <span className="truncate">{b.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-emerald-200/70 bg-emerald-50/70 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-700" strokeWidth={1.8} />
          <span className="text-[12.5px] font-medium text-emerald-900">
            No conflicts · 3 vessels · 5 captains scheduled
          </span>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700">All clear</span>
      </div>
    </MockupShell>
  );
}

/* ── Mockup B: Payment timeline ──────────────────────────────────────── */
function PaymentTimelineMockup() {
  const nodes = [
    {
      label: 'Deposit paid',
      sub: '30 Apr · EGP 2,400',
      icon: Check,
      state: 'done' as const,
    },
    {
      label: 'Balance reminder',
      sub: '16 May · 48h before',
      icon: Clock,
      state: 'pending' as const,
    },
    {
      label: 'Boarding',
      sub: '18 May · 9am',
      icon: Anchor,
      state: 'upcoming' as const,
    },
  ];
  const palette: Record<'done' | 'pending' | 'upcoming', string> = {
    done: 'bg-emerald-600 text-white ring-emerald-100',
    pending: 'bg-amber-500 text-white ring-amber-100',
    upcoming: 'bg-slate-300 text-white ring-slate-100',
  };
  const labelTone: Record<'done' | 'pending' | 'upcoming', string> = {
    done: 'text-emerald-700',
    pending: 'text-amber-700',
    upcoming: 'text-slate-500',
  };

  return (
    <MockupShell title="Charter · Speedboat · 18 May 9am" badge="ON TRACK">
      <div className="rounded-xl border border-slate-200 bg-slate-50/40 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-semibold tracking-[-0.01em] text-slate-900">
              Halse family · 8 guests
            </p>
            <p className="mt-0.5 text-[11.5px] text-slate-500">Half-day speedboat · Sea Spirit</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-emerald-700 ring-1 ring-emerald-100">
            CONFIRMED
          </span>
        </div>

        {/* totals row */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-white p-2.5 ring-1 ring-slate-200">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Total</p>
            <p className="mt-1 text-[13px] font-bold text-slate-900">EGP 6,000</p>
          </div>
          <div className="rounded-lg bg-white p-2.5 ring-1 ring-slate-200">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Deposit 40%
            </p>
            <p className="mt-1 text-[13px] font-bold text-emerald-700">EGP 2,400</p>
          </div>
          <div className="rounded-lg bg-white p-2.5 ring-1 ring-slate-200">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Balance
            </p>
            <p className="mt-1 text-[13px] font-bold text-amber-700">EGP 3,600</p>
          </div>
        </div>
      </div>

      {/* timeline */}
      <div className="relative mt-6">
        <div className="absolute left-4 right-4 top-3 h-0.5 bg-slate-200" />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '50%' }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="absolute left-4 top-3 h-0.5 bg-emerald-500"
        />
        <div className="relative grid grid-cols-3">
          {nodes.map((n, i) => {
            const Icon = n.icon;
            return (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`relative flex h-7 w-7 items-center justify-center rounded-full ring-4 ${palette[n.state]}`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
                </div>
                <p className={`mt-2.5 text-[11.5px] font-semibold ${labelTone[n.state]}`}>
                  {n.label}
                </p>
                <p className="text-[10.5px] text-slate-500">{n.sub}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-amber-200/70 bg-amber-50/70 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <CreditCard className="h-4 w-4 text-amber-700" strokeWidth={1.8} />
          <span className="text-[12.5px] font-medium text-amber-900">
            Balance reminder ready · Vodafone Cash + 3 fallbacks
          </span>
        </div>
        <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-slate-800">
          Send now
        </button>
      </div>
    </MockupShell>
  );
}

/* ── Mockup C: Weather cancellation flow ─────────────────────────────── */
function WeatherCancelMockup() {
  const [policy, setPolicy] = useState<'refund' | 'rebook' | 'partial'>('rebook');
  const policies: { value: 'refund' | 'rebook' | 'partial'; label: string; sub: string }[] = [
    { value: 'refund', label: 'Full refund', sub: 'Return 100%' },
    { value: 'rebook', label: 'Rebook free', sub: 'Same crew, new date' },
    { value: 'partial', label: 'Partial', sub: 'Keep 50%' },
  ];

  return (
    <MockupShell title="Weather alert · Saturday 18 May" badge="ACTION NEEDED">
      {/* warning banner */}
      <div className="flex items-start gap-3 rounded-xl border border-rose-200/70 bg-rose-50/70 p-4">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
          <CloudRain className="h-4 w-4" strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold tracking-[-0.01em] text-rose-900">
            Wind 28kn · gusts 35kn — recommend cancellation
          </p>
          <p className="mt-1 text-[11.5px] leading-[1.55] text-rose-700/90">
            4 charters affected on Sea Spirit and Blue Pearl. Marina advisory issued 06:14.
          </p>
        </div>
      </div>

      {/* policy chooser */}
      <div className="mt-5">
        <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
          Apply policy to all
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {policies.map((p) => {
            const active = policy === p.value;
            return (
              <button
                key={p.value}
                type="button"
                onClick={() => setPolicy(p.value)}
                className={`rounded-lg border px-3 py-2.5 text-start transition ${
                  active
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <p className="text-[12px] font-semibold">{p.label}</p>
                <p className={`mt-0.5 text-[10.5px] ${active ? 'text-white/70' : 'text-slate-500'}`}>
                  {p.sub}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* preview */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/40 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          4 customers will be SMS + email notified
        </p>
        <div className="mt-3 space-y-1.5">
          <PreviewRow name="Halse family · DE" outcome="Rebook to Sun 19 May" tone="emerald" />
          <PreviewRow name="Ramirez · ES" outcome="Rebook to Sun 19 May" tone="emerald" />
          <PreviewRow name="Khaled · EG" outcome="Refund EGP 4,800" tone="rose" />
          <PreviewRow name="Schmidt · DE" outcome="Partial EGP 1,200" tone="amber" />
        </div>
      </div>

      {/* cta */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-[11.5px] text-slate-500">
          Slot re-published to your booking page on confirm.
        </p>
        <button className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-[12px] font-semibold text-white hover:bg-rose-700">
          <RefreshCcw className="h-3.5 w-3.5" strokeWidth={2.5} />
          Confirm cancellation
        </button>
      </div>
    </MockupShell>
  );
}

function PreviewRow({
  name,
  outcome,
  tone,
}: {
  name: string;
  outcome: string;
  tone: 'emerald' | 'rose' | 'amber';
}) {
  const toneMap = {
    emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    rose: 'bg-rose-50 text-rose-700 ring-rose-100',
    amber: 'bg-amber-50 text-amber-700 ring-amber-100',
  } as const;
  return (
    <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 ring-1 ring-slate-100">
      <span className="text-[12px] font-medium text-slate-800">{name}</span>
      <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider ring-1 ${toneMap[tone]}`}
      >
        {outcome}
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 5. HOW IT WORKS
 * ────────────────────────────────────────────────────────────────────────── */
function HowItWorks({ copy }: { copy: OperatorCopy }) {
  const stepIcons = [Sparkles, Compass, Ship];
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
 * 6. VERTICAL FEATURES — dark teal grid
 * ────────────────────────────────────────────────────────────────────────── */
function VerticalFeatures({ copy }: { copy: OperatorCopy }) {
  const icons = [Calendar, Coins, Users2, CloudRain, CreditCard, Repeat, Hotel, Fuel];
  return (
    <section className="relative overflow-hidden bg-[#07151D] py-28 text-white sm:py-36">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,_rgba(94,234,212,0.10),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,_rgba(45,212,191,0.06),_transparent_70%)]" />
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
            const Icon = icons[i] ?? ListChecks;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.06, duration: 0.4 }}
                className="group relative bg-[#07151D] p-7 transition hover:bg-[#0B1E2A] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-teal-200 transition group-hover:border-teal-300/40 group-hover:text-teal-100">
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
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/60 p-10 text-center shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)] sm:p-14"
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
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-teal-100/40 blur-3xl" />
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
                { icon: Star, text: 'Free 15-minute walkthrough — no pitch' },
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
            category="boat-operators"
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
    <section className="relative overflow-hidden bg-[#07151D] py-28 text-white sm:py-36">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-30%,_rgba(94,234,212,0.18),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_120%,_rgba(251,113,133,0.12),_transparent_70%)]" />
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
        className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
          tone === 'dark' ? 'text-teal-300/90' : 'text-red-600'
        }`}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className={`mt-5 text-[2.25rem] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3rem] ${
          tone === 'dark' ? 'text-white' : 'text-slate-900'
        }`}
      >
        {headline}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`mx-auto mt-5 max-w-xl text-[1.05rem] leading-[1.65] sm:text-[1.13rem] ${
            tone === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
