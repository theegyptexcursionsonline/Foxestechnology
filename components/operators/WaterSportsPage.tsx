'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  AlertTriangle,
  FileSignature,
  Waves,
  Shield,
  TrendingUp,
  MessageCircle,
  Star,
  Sparkles,
  PenLine,
  Camera,
  MapPin,
  Users,
  Anchor,
  Wrench,
  ShieldCheck,
  Eye,
  Zap,
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

const HERO_IMG_PRIMARY =
  'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=1400&q=85';

export default function WaterSportsPage({ copy, locale, whatsappNumber }: Props) {
  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(copy.whatsapp.prefilledMessage)}`;

  return (
    <>
      <main data-operator-page="water-sports" className="overflow-hidden bg-white text-slate-900">
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
 * 1. HERO — deep aqua-black with drifting wave lines, turquoise + amber gradient
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
    <section className="relative overflow-hidden bg-[#031318] pt-32 pb-32 lg:pt-40 lg:pb-40">
      {/* Turquoise + amber gradient field — sunset on water */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,_rgba(45,212,191,0.20),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_92%_115%,_rgba(252,211,77,0.16),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_38%_28%_at_8%_55%,_rgba(20,184,166,0.10),_transparent_70%)]" />
        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-screen"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Drifting horizontal wave lines — distinct from bubbles and sparkles */}
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
              <span className="mt-1.5 block bg-gradient-to-br from-white via-teal-100 to-amber-200/95 bg-clip-text text-transparent">
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

/**
 * Drifting horizontal wave lines — thin strokes that fade in and slide across.
 * Distinct from diving's bubbles and dinner-cruises' sparkles.
 */
function DriftingWaves() {
  const waves = [
    { top: '18%', width: 220, delay: 0, duration: 14, opacity: 0.35 },
    { top: '32%', width: 160, delay: 4, duration: 18, opacity: 0.25 },
    { top: '47%', width: 280, delay: 1, duration: 16, opacity: 0.32 },
    { top: '63%', width: 190, delay: 6, duration: 20, opacity: 0.22 },
    { top: '76%', width: 240, delay: 3, duration: 15, opacity: 0.3 },
    { top: '88%', width: 140, delay: 8, duration: 22, opacity: 0.18 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {waves.map((w, i) => (
        <motion.div
          key={i}
          initial={{ x: '-30%', opacity: 0 }}
          animate={{ x: '130%', opacity: [0, w.opacity, w.opacity, 0] }}
          transition={{
            duration: w.duration,
            delay: w.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent"
          style={{ top: w.top, width: w.width }}
        />
      ))}
      {/* a couple of fainter amber ripples for sunset warmth */}
      {[
        { top: '24%', width: 180, delay: 10, duration: 24 },
        { top: '70%', width: 200, delay: 12, duration: 26 },
      ].map((w, i) => (
        <motion.div
          key={`amber-${i}`}
          initial={{ x: '-30%', opacity: 0 }}
          animate={{ x: '130%', opacity: [0, 0.18, 0.18, 0] }}
          transition={{
            duration: w.duration,
            delay: w.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute h-px bg-gradient-to-r from-transparent via-amber-200/80 to-transparent"
          style={{ top: w.top, width: w.width }}
        />
      ))}
    </div>
  );
}

function HeroVisual({ locale }: { locale: Locale }) {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
        <Image
          src={HERO_IMG_PRIMARY}
          alt=""
          width={1400}
          height={1000}
          priority
          loading="eager"
          className="h-[540px] w-full object-cover sm:h-[580px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#031318]/65 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/[0.05] via-transparent to-amber-700/[0.14] mix-blend-overlay" />
      </div>

      {/* Jet ski session card with capacity bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`absolute top-7 ${locale === 'ar' ? 'right-7' : 'left-7'} w-[300px] rounded-2xl border border-white/10 bg-white/[0.97] p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] backdrop-blur-md`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-white">
            <Waves className="h-5 w-5" strokeWidth={1.7} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold tracking-[-0.01em] text-slate-900">
              Jet Ski Session · 11am
            </p>
            <p className="text-[12px] text-slate-500">Saturday · 30 min · 2 riders</p>
          </div>
        </div>
        <div className="mt-3.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium text-slate-500">Capacity</span>
            <span className="font-semibold text-slate-900">4 booked / 6</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '66%' }}
              transition={{ delay: 1.1, duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="h-full rounded-full bg-gradient-to-r from-teal-500 to-amber-400"
            />
          </div>
        </div>
        <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-[11px] font-medium text-slate-500">EGP 1,200 · waiver signed</span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-emerald-700 ring-1 ring-emerald-100">
            CONFIRMED
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
            +71%
          </p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">
            Online bookings
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
  const icons = [Eye, FileSignature, Wrench];
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
 * 4. SOLUTIONS — three vertical-specific mockups
 * ────────────────────────────────────────────────────────────────────────── */
function Solutions({ copy }: { copy: OperatorCopy }) {
  return (
    <section className="relative bg-gradient-to-b from-teal-50/40 via-white to-white py-28 sm:py-36">
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
  if (variant === 0) return <HourlySlotMockup />;
  if (variant === 1) return <DigitalWaiverMockup />;
  return <EquipmentDashboardMockup />;
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
      <div className="absolute -inset-6 -z-10 rounded-[36px] bg-gradient-to-br from-teal-50/80 via-amber-50/40 to-transparent blur-2xl" />
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

/* ── Mockup 1: hourly slot booking widget ── */
function HourlySlotMockup() {
  type Status = 'open' | 'almost' | 'booked';
  const slots: { time: string; status: Status; left?: string }[] = [
    { time: '10:00 AM', status: 'open' },
    { time: '11:00 AM', status: 'almost', left: '3 left' },
    { time: '12:00 PM', status: 'booked' },
    { time: '1:00 PM', status: 'open' },
    { time: '2:00 PM', status: 'almost', left: '2 left' },
    { time: '3:00 PM', status: 'open' },
    { time: '4:00 PM', status: 'booked' },
    { time: '5:00 PM', status: 'open' },
  ];
  return (
    <MockupShell title="redseajetski.com/book · Saturday 18 May" badge="LIVE">
      <div className="rounded-xl border border-slate-200 bg-slate-50/40 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-semibold text-slate-900">Jet Ski Session · 30 min</p>
            <p className="text-[12px] text-slate-500">Pick a slot · 2 riders per ski</p>
          </div>
          <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-teal-700 ring-1 ring-teal-100">
            BOOKING OPEN
          </span>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {slots.map((s, i) => {
            const selected = i === 1;
            const isBooked = s.status === 'booked';
            return (
              <motion.button
                key={s.time}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 + i * 0.04 }}
                disabled={isBooked}
                className={`relative rounded-lg border px-2 py-2.5 text-center transition ${
                  selected
                    ? 'border-slate-900 bg-slate-900 text-white shadow-[0_8px_24px_-12px_rgba(15,23,42,0.5)]'
                    : isBooked
                      ? 'cursor-not-allowed border-slate-200 bg-slate-100/70 text-slate-400'
                      : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300'
                }`}
              >
                <p className="text-[11.5px] font-semibold leading-tight">{s.time}</p>
                {s.status === 'almost' && (
                  <p
                    className={`mt-1 text-[9.5px] font-semibold ${selected ? 'text-amber-300' : 'text-amber-600'}`}
                  >
                    {s.left}
                  </p>
                )}
                {s.status === 'booked' && (
                  <p className="mt-1 text-[9.5px] font-semibold text-slate-400">Booked out</p>
                )}
                {s.status === 'open' && (
                  <p className={`mt-1 text-[9.5px] ${selected ? 'text-white/60' : 'text-slate-400'}`}>
                    Available
                  </p>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-slate-500">Riders</span>
            <div className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-1">
              <span className="text-[11px] font-bold text-slate-400">−</span>
              <span className="px-1 text-[12px] font-semibold text-slate-900">2</span>
              <span className="text-[11px] font-bold text-slate-400">+</span>
            </div>
          </div>
          <button className="rounded-lg bg-red-600 px-4 py-2 text-[12px] font-semibold text-white shadow-[0_6px_18px_-8px_rgba(220,38,38,0.55)]">
            Continue · EGP 1,200
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
        <Shield className="h-3 w-3" strokeWidth={2} />
        <span>30 min · Includes life jacket and brief · Direct payment</span>
      </div>
    </MockupShell>
  );
}

/* ── Mockup 2: digital waiver signing flow ── */
function DigitalWaiverMockup() {
  return (
    <MockupShell title="Waiver · Mona Salem · Jet Ski 11am" badge="SIGNED">
      <div className="grid grid-cols-[1fr_auto] gap-4">
        {/* Phone-shaped card */}
        <div className="rounded-[26px] border-[6px] border-slate-900 bg-white p-4 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.4)]">
          <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-slate-200" />
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-700">
              Sign your waiver
            </p>
            <p className="mt-1 text-[13px] font-semibold tracking-[-0.01em] text-slate-900">
              Red Sea Jet Ski · 30 min
            </p>

            <div className="mt-3 space-y-2.5">
              <div className="rounded-md border border-slate-200 bg-white px-3 py-2">
                <p className="text-[9.5px] font-semibold uppercase tracking-wider text-slate-400">
                  Full name
                </p>
                <p className="mt-0.5 text-[12px] font-medium text-slate-900">Mona Salem</p>
              </div>
              <div className="rounded-md border border-slate-200 bg-white px-3 py-2">
                <p className="text-[9.5px] font-semibold uppercase tracking-wider text-slate-400">
                  Emergency contact
                </p>
                <p className="mt-0.5 text-[12px] font-medium text-slate-900">
                  Tarek Salem · +20 100 ••• 4271
                </p>
              </div>

              <label className="flex items-start gap-2 rounded-md border border-slate-200 bg-white px-3 py-2">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-teal-600">
                  <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />
                </span>
                <span className="text-[11px] leading-snug text-slate-700">
                  I confirm insurance acknowledgement and accept the operator&apos;s safety brief.
                </span>
              </label>

              <div className="rounded-md border border-dashed border-slate-300 bg-white p-3">
                <p className="text-[9.5px] font-semibold uppercase tracking-wider text-slate-400">
                  Signature
                </p>
                <svg
                  viewBox="0 0 220 56"
                  className="mt-1.5 h-12 w-full"
                  aria-hidden
                >
                  <motion.path
                    d="M5 38 C 22 18, 38 50, 56 28 S 92 14, 112 32 S 152 50, 172 24 S 200 38, 215 22"
                    fill="none"
                    stroke="#0f172a"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                  />
                </svg>
              </div>

              <button className="w-full rounded-lg bg-slate-900 py-2.5 text-[12px] font-semibold text-white">
                Submit signed waiver
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar status pills */}
        <div className="hidden flex-col gap-3 sm:flex">
          {[
            { label: 'Identity', value: 'Verified', tone: 'emerald' as const, Icon: ShieldCheck },
            { label: 'Insurance', value: 'Acknowledged', tone: 'teal' as const, Icon: Shield },
            { label: 'Signed at', value: '9:42 AM', tone: 'slate' as const, Icon: PenLine },
          ].map((p) => {
            const toneCls =
              p.tone === 'emerald'
                ? 'bg-emerald-50 text-emerald-700 ring-emerald-100'
                : p.tone === 'teal'
                  ? 'bg-teal-50 text-teal-700 ring-teal-100'
                  : 'bg-slate-100 text-slate-700 ring-slate-200';
            return (
              <div
                key={p.label}
                className={`flex w-[170px] items-center gap-3 rounded-xl px-3 py-2.5 ring-1 ${toneCls}`}
              >
                <p.Icon className="h-4 w-4" strokeWidth={1.8} />
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
                    {p.label}
                  </p>
                  <p className="text-[12px] font-semibold tracking-[-0.01em]">{p.value}</p>
                </div>
              </div>
            );
          })}
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Audit trail
            </p>
            <p className="mt-1 text-[11.5px] leading-snug text-slate-700">
              Signed PDF + IP + timestamp stored for 7 years.
            </p>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

/* ── Mockup 3: live equipment dashboard ── */
function EquipmentDashboardMockup() {
  type UnitState = 'available' | 'out' | 'service' | 'damaged';
  const sections: { name: string; units: { id: string; state: UnitState; meta?: string }[] }[] = [
    {
      name: 'Jet Skis',
      units: [
        { id: 'J1', state: 'out', meta: 'until 11:30' },
        { id: 'J2', state: 'available' },
        { id: 'J3', state: 'available' },
        { id: 'J4', state: 'out', meta: 'until 11:00' },
        { id: 'J5', state: 'service' },
        { id: 'J6', state: 'available' },
        { id: 'J7', state: 'damaged' },
        { id: 'J8', state: 'available' },
      ],
    },
    {
      name: 'Parasails',
      units: [
        { id: 'P1', state: 'out', meta: 'until 12:15' },
        { id: 'P2', state: 'available' },
        { id: 'P3', state: 'available' },
      ],
    },
    {
      name: 'Paddleboards',
      units: [
        { id: 'B1', state: 'available' },
        { id: 'B2', state: 'available' },
        { id: 'B3', state: 'out', meta: 'until 10:45' },
        { id: 'B4', state: 'service' },
      ],
    },
    {
      name: 'Banana Boats',
      units: [
        { id: 'N1', state: 'available' },
        { id: 'N2', state: 'out', meta: 'until 11:20' },
        { id: 'N3', state: 'available' },
      ],
    },
  ];

  const stateMeta: Record<
    UnitState,
    { label: string; tile: string; dot: string; text: string }
  > = {
    available: {
      label: 'Available',
      tile: 'bg-emerald-50 border-emerald-100 text-emerald-700',
      dot: 'bg-emerald-500',
      text: 'text-emerald-600',
    },
    out: {
      label: 'Out',
      tile: 'bg-sky-50 border-sky-100 text-sky-700',
      dot: 'bg-sky-500',
      text: 'text-sky-600',
    },
    service: {
      label: 'Service',
      tile: 'bg-amber-50 border-amber-100 text-amber-700',
      dot: 'bg-amber-500',
      text: 'text-amber-600',
    },
    damaged: {
      label: 'Damaged',
      tile: 'bg-rose-50 border-rose-100 text-rose-700',
      dot: 'bg-rose-500',
      text: 'text-rose-600',
    },
  };

  return (
    <MockupShell title="Fleet · Hurghada Marina · Live" badge="REAL-TIME">
      <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12.5px] font-semibold tracking-[-0.01em] text-slate-900">
              12 of 18 available right now
            </p>
            <p className="text-[11px] text-slate-500">Auto-blocks new bookings when fleet is full</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-medium">
            {(['available', 'out', 'service', 'damaged'] as UnitState[]).map((s) => (
              <span key={s} className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${stateMeta[s].dot}`} />
                <span className={stateMeta[s].text}>{stateMeta[s].label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {sections.map((section, si) => (
          <motion.div
            key={section.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + si * 0.06 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                {section.name}
              </p>
              <span className="text-[10.5px] font-medium text-slate-400">
                {section.units.filter((u) => u.state === 'available').length}/{section.units.length}{' '}
                available
              </span>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1.5 sm:grid-cols-8">
              {section.units.map((u, ui) => {
                const m = stateMeta[u.state];
                return (
                  <motion.div
                    key={u.id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + si * 0.05 + ui * 0.025 }}
                    className={`relative rounded-md border px-1.5 py-1.5 text-center ${m.tile}`}
                  >
                    <p className="text-[10.5px] font-bold tracking-tight">{u.id}</p>
                    {u.meta && (
                      <p className="text-[8.5px] font-medium leading-tight opacity-80">{u.meta}</p>
                    )}
                    <span
                      className={`absolute right-1 top-1 h-1.5 w-1.5 rounded-full ${m.dot}`}
                      aria-hidden
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl border border-teal-200/60 bg-teal-50/60 px-3.5 py-2.5">
        <div className="flex items-center gap-2.5">
          <Zap className="h-4 w-4 text-teal-700" strokeWidth={1.8} />
          <span className="text-[12px] font-medium text-teal-900">
            J7 flagged damaged — slot reassigned to J6 automatically
          </span>
        </div>
      </div>
    </MockupShell>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 5. HOW IT WORKS
 * ────────────────────────────────────────────────────────────────────────── */
function HowItWorks({ copy }: { copy: OperatorCopy }) {
  const stepIcons = [Sparkles, Clock, MapPin];
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
                <p className="mt-3 text-[15px] leading-[1.65] text-slate-600">
                  {step.description}
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
 * 6. VERTICAL FEATURES — dark aqua grid with teal accent icons
 * ────────────────────────────────────────────────────────────────────────── */
function VerticalFeatures({ copy }: { copy: OperatorCopy }) {
  const icons = [Clock, FileSignature, Waves, Users, MapPin, Shield, Camera, Anchor];
  return (
    <section className="relative overflow-hidden bg-[#031318] py-28 text-white sm:py-36">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,_rgba(45,212,191,0.12),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_100%,_rgba(252,211,77,0.07),_transparent_70%)]" />
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
                className="group relative bg-[#031318] p-7 transition hover:bg-[#06222B] sm:p-8"
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
                <p className="mt-2 text-[13.5px] leading-[1.6] text-teal-100/55">
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
    <section id="lead-form" className="relative overflow-hidden bg-white py-28 sm:py-36">
      <div className="absolute inset-0 -z-0 opacity-60">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-teal-100/40 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl" />
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
            category="water-sports"
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
    <section className="relative overflow-hidden bg-[#031318] py-28 text-white sm:py-36">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-30%,_rgba(45,212,191,0.18),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_120%,_rgba(252,211,77,0.14),_transparent_70%)]" />
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
          className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-[1.65] text-teal-100/60 sm:text-[1.15rem]"
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
        className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${tone === 'dark' ? 'text-teal-300/90' : 'text-red-600'}`}
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
          className={`mx-auto mt-5 max-w-xl text-[1.05rem] leading-[1.65] sm:text-[1.13rem] ${tone === 'dark' ? 'text-teal-100/60' : 'text-slate-600'}`}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
