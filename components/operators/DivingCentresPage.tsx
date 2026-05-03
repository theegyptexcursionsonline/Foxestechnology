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
  FileText,
  Calendar,
  Wrench,
  Users2,
  Shield,
  Map,
  BookOpen,
  AlertTriangle,
  Sparkles,
  Clock,
  Star,
  TrendingUp,
  MessageCircle,
  Award,
  Compass,
  Anchor,
} from 'lucide-react';
import LeadForm from './LeadForm';
import WhatsAppFloat from './WhatsAppFloat';
import MobileStickyCTA from './MobileStickyCTA';
import OperatorHeader from './OperatorHeader';
import OperatorFooter from './OperatorFooter';
import { CurrencyProvider } from './CurrencyContext';
import OperatorExitIntent from './OperatorExitIntent';
import type { OperatorCopy, Locale } from '@/lib/i18n/operators';

interface Props {
  copy: OperatorCopy;
  locale: Locale;
  whatsappNumber: string;
}

export default function DivingCentresPage({ copy, locale, whatsappNumber }: Props) {
  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(copy.whatsapp.prefilledMessage)}`;

  return (
    <CurrencyProvider>
      <OperatorHeader
        category="diving-centres"
        locale={locale}
        whatsappHref={whatsappHref}
        ctaLabel={copy.hero.primaryCta}
        whatsappLabel={copy.hero.secondaryCta}
      />
      <main data-operator-page="diving-centres" className="overflow-hidden bg-white text-slate-900">
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
      <OperatorFooter category="diving-centres" locale={locale} whatsappHref={whatsappHref} />

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
      <OperatorExitIntent copy={copy.exitIntent} category="diving-centres" locale={locale} />
    </CurrencyProvider>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 1. HERO  — restrained, confident, more breathing room
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
    <section className="relative overflow-hidden bg-[#06121F] pt-32 pb-32 lg:pt-40 lg:pb-40">
      {/* Single restrained gradient field */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,_rgba(56,189,248,0.18),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_110%,_rgba(244,63,94,0.10),_transparent_70%)]" />
        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-screen"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* 4 quiet bubbles, slow */}
      <FloatingBubbles />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Eyebrow badge — minimal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200/90">
                {copy.hero.badge}
              </span>
            </motion.div>

            {/* Headline — confident, single weight, refined gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7 }}
              className="mt-8 text-[clamp(2.75rem,5.5vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white"
            >
              {copy.hero.headlineLine1}
              <span className="mt-1.5 block bg-gradient-to-br from-white via-cyan-100 to-cyan-300/90 bg-clip-text text-transparent">
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

            {/* Trust pills — clean dot separators, no icons */}
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
          </motion.div>

          {/* Right hero visual — only 2 floating cards now */}
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

function FloatingBubbles() {
  const bubbles = [
    { left: '14%', size: 5, delay: 0, duration: 22 },
    { left: '38%', size: 7, delay: 5, duration: 26 },
    { left: '64%', size: 4, delay: 2, duration: 20 },
    { left: '88%', size: 6, delay: 8, duration: 28 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '-10%', opacity: [0, 0.4, 0.4, 0] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full bg-cyan-200/20 ring-1 ring-cyan-200/20"
          style={{ left: b.left, width: b.size, height: b.size, bottom: 0 }}
        />
      ))}
    </div>
  );
}

function HeroVisual({ locale }: { locale: Locale }) {
  return (
    <div className="relative">
      {/* Photo card with subtle frame */}
      <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
        <Image
          src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1400&q=85"
          alt=""
          width={1400}
          height={1000}
          priority
          className="h-[540px] w-full object-cover sm:h-[580px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06121F]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-blue-900/[0.15] mix-blend-overlay" />
      </div>

      {/* Floating cert card — single, refined */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`absolute top-7 ${locale === 'ar' ? 'right-7' : 'left-7'} w-[280px] rounded-2xl border border-white/10 bg-white/[0.96] p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] backdrop-blur-md`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-white">
            <Award className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold tracking-[-0.01em] text-slate-900">
              PADI Open Water · Verified
            </p>
            <p className="text-[12px] text-slate-500">Diver #2847 · Expires 2031</p>
          </div>
        </div>
        <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-[11px] font-medium text-slate-500">Equipment ready</span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-emerald-700 ring-1 ring-emerald-100">
            CHECKED IN
          </span>
        </div>
      </motion.div>

      {/* Revenue ping — single accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.05, type: 'spring', stiffness: 180, damping: 14 }}
        className={`absolute -bottom-6 ${locale === 'ar' ? '-right-4' : '-left-4'} flex items-center gap-3.5 rounded-2xl border border-emerald-100 bg-white p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]`}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <p className="text-[1.6rem] font-extrabold leading-none tracking-[-0.02em] text-slate-900">
            +62%
          </p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">
            Direct bookings
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 2. SOCIAL PROOF — refined, more breathing room
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
 * 3. PAIN POINTS — index numbers, outlined icons, more restraint
 * ────────────────────────────────────────────────────────────────────────── */
function Pains({ copy }: { copy: OperatorCopy }) {
  const icons = [FileText, Wrench, Calendar];
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
 * 4. SOLUTIONS — cleaner mockups, monochrome accents
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
          0{index + 1} · Feature
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
  if (variant === 0) return <CertVaultMockup />;
  if (variant === 1) return <EquipmentMockup />;
  return <SchedulerMockup />;
}

function MockupShell({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[36px] bg-gradient-to-br from-cyan-50/80 via-slate-50 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)]">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-3">
          <span className="text-[12px] font-semibold tracking-[-0.01em] text-slate-700">{title}</span>
          {badge && (
            <span className="text-[10px] font-semibold tracking-wider text-emerald-600">{badge}</span>
          )}
        </div>
        <div className="p-6 sm:p-7">{children}</div>
      </div>
    </div>
  );
}

function CertVaultMockup() {
  const certs = [
    { name: 'Sara Mahmoud', cert: 'PADI Advanced Open Water', expires: '2029', status: 'verified' },
    { name: 'Karim Adel', cert: 'PADI Open Water', expires: '2031', status: 'verified' },
    { name: 'Layla Ibrahim', cert: 'SSI Rescue Diver', expires: '2024', status: 'expiring' },
    { name: 'Ahmed Hossam', cert: 'PADI Divemaster', expires: '2030', status: 'verified' },
  ];
  return (
    <MockupShell title="Certifications · 186 active divers" badge="LIVE">
      <div className="space-y-2">
        {certs.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 transition hover:border-slate-200 hover:bg-slate-50"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-[11px] font-semibold text-white">
              {c.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] font-semibold tracking-[-0.01em] text-slate-900">
                {c.name}
              </p>
              <p className="text-[12px] text-slate-500">{c.cert} · Exp {c.expires}</p>
            </div>
            <div
              className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wider ${
                c.status === 'verified'
                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
                  : 'bg-amber-50 text-amber-700 ring-1 ring-amber-100'
              }`}
            >
              {c.status === 'verified' ? 'VERIFIED' : 'EXPIRING'}
            </div>
          </motion.div>
        ))}
      </div>
    </MockupShell>
  );
}

function EquipmentMockup() {
  const items = [
    { label: 'Tanks (12L)', total: 48, available: 42 },
    { label: 'BCDs', total: 30, available: 26 },
    { label: 'Regulators', total: 28, available: 24 },
    { label: 'Wetsuits 5mm', total: 35, available: 22 },
  ];
  return (
    <MockupShell title="Equipment · Live availability" badge="UPDATED 2s AGO">
      <div className="space-y-4">
        {items.map((item, i) => {
          const pct = (item.available / item.total) * 100;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.07 }}
            >
              <div className="flex items-center justify-between text-[13.5px]">
                <span className="font-medium text-slate-700">{item.label}</span>
                <span className="font-mono text-[12px] font-semibold text-slate-900">
                  {item.available}/{item.total}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="h-full rounded-full bg-slate-900"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-between rounded-xl border border-amber-200/70 bg-amber-50/70 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-700" strokeWidth={1.8} />
          <span className="text-[12.5px] font-medium text-amber-900">
            3 regulators due for service
          </span>
        </div>
        <button className="text-[12px] font-semibold text-amber-800 underline-offset-4 hover:underline">
          Review
        </button>
      </div>
    </MockupShell>
  );
}

function SchedulerMockup() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const courses = [
    { day: 0, span: 4, title: 'Open Water · Group A', tone: 'bg-slate-900' },
    { day: 1, span: 2, title: 'Advanced · Karim', tone: 'bg-emerald-700' },
    { day: 3, span: 2, title: 'Rescue · Sara', tone: 'bg-amber-700' },
    { day: 2, span: 3, title: 'Divemaster track', tone: 'bg-slate-600' },
  ];
  return (
    <MockupShell title="This week · No conflicts" badge="ALL CLEAR">
      <div className="grid grid-cols-5 gap-1.5 text-center">
        {days.map((d) => (
          <div key={d} className="text-[10px] font-semibold tracking-wider text-slate-400">
            {d}
          </div>
        ))}
      </div>
      <div className="relative mt-2 h-32">
        <div className="absolute inset-0 grid grid-cols-5 gap-1.5">
          {[0, 1, 2, 3, 4].map((d) => (
            <div key={d} className="rounded-md border border-dashed border-slate-200 bg-slate-50/50" />
          ))}
        </div>
        <div className="absolute inset-0 grid grid-cols-5 gap-1.5">
          {courses.map((c, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                gridColumnStart: c.day + 1,
                gridColumnEnd: `span ${c.span}`,
                marginTop: 8 + (i % 3) * 28,
                transformOrigin: 'left',
              }}
              className={`relative flex h-6 items-center rounded-md ${c.tone} px-2.5 text-[10px] font-medium text-white shadow-sm`}
            >
              <span className="truncate">{c.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-200/70 bg-emerald-50/70 px-4 py-3">
        <CheckCircle2 className="h-4 w-4 text-emerald-700" strokeWidth={1.8} />
        <span className="text-[12.5px] font-medium text-emerald-900">
          All 4 divemasters available · Zero double-bookings
        </span>
      </div>
    </MockupShell>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 5. HOW IT WORKS — refined steps, more breathing
 * ────────────────────────────────────────────────────────────────────────── */
function HowItWorks({ copy }: { copy: OperatorCopy }) {
  const stepIcons = [Sparkles, BookOpen, Compass];
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
 * 6. VERTICAL FEATURES — restrained dark grid, more breathing room
 * ────────────────────────────────────────────────────────────────────────── */
function VerticalFeatures({ copy }: { copy: OperatorCopy }) {
  const icons = [Award, Wrench, Calendar, Users2, Shield, Map, Anchor, BookOpen];
  return (
    <section className="relative overflow-hidden bg-[#06121F] py-28 text-white sm:py-36">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,_rgba(56,189,248,0.10),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,_rgba(56,189,248,0.06),_transparent_70%)]" />
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
                className="group relative bg-[#06121F] p-7 transition hover:bg-[#0A1A2D] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-cyan-200 transition group-hover:border-cyan-300/40 group-hover:text-cyan-100">
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
 * 7. PRICING — confident, single column, refined
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
 * 8. FAQ — cleaner accordion
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
 * 9. LEAD FORM SECTION — refined split layout
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
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl" />
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
            category="diving-centres"
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
 * 10. FINAL CTA — restrained gradient, confident
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
    <section className="relative overflow-hidden bg-[#06121F] py-28 text-white sm:py-36">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-30%,_rgba(56,189,248,0.18),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_120%,_rgba(244,63,94,0.12),_transparent_70%)]" />
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
        className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${tone === 'dark' ? 'text-cyan-300/90' : 'text-red-600'}`}
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
