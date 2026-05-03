'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Layers,
  Coins,
  FileText,
  Sparkles,
  TrendingUp,
  MessageCircle,
  Clock,
  Star,
  Shield,
  Globe,
  Users,
  Wallet,
  Database,
  Hotel,
  Settings2,
  QrCode,
  Send,
  MapPin,
  Plane,
  Ship,
  Building2,
  Mountain,
  Repeat,
  Tag,
} from 'lucide-react';
import LeadForm from './LeadForm';
import WhatsAppFloat from './WhatsAppFloat';
import MobileStickyCTA from './MobileStickyCTA';
import OperatorHeader from './OperatorHeader';
import OperatorFooter from './OperatorFooter';
import { CurrencyProvider, useCurrency } from './CurrencyContext';
import { formatPrice } from '@/lib/currency';
import type { OperatorCopy, Locale } from '@/lib/i18n/operators';

interface Props {
  copy: OperatorCopy;
  locale: Locale;
  whatsappNumber: string;
}

export default function TourAgenciesPage({ copy, locale, whatsappNumber }: Props) {
  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(copy.whatsapp.prefilledMessage)}`;

  return (
    <CurrencyProvider>
      <OperatorHeader category="tour-agencies" locale={locale} whatsappHref={whatsappHref} ctaLabel={copy.hero.primaryCta} whatsappLabel={copy.hero.secondaryCta} />
      <main data-operator-page="tour-agencies" className="overflow-hidden bg-white text-slate-900">
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

      <OperatorFooter category="tour-agencies" locale={locale} whatsappHref={whatsappHref} />

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
    </CurrencyProvider>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 1. HERO — deep navy-charcoal, violet/indigo accents, drifting geometric shapes
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
    <section className="relative overflow-hidden bg-[#0B0F1F] pt-32 pb-32 lg:pt-40 lg:pb-40">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,_rgba(139,92,246,0.18),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_110%,_rgba(244,63,94,0.10),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_15%_50%,_rgba(99,102,241,0.08),_transparent_70%)]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 75%)',
          }}
        />
      </div>

      <DriftingShapes />

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
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-300 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-300" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-100/90">
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
              <span className="mt-1.5 block bg-gradient-to-br from-white via-violet-100 to-indigo-300/95 bg-clip-text text-transparent">
                {copy.hero.headlineLine2}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.7 }}
              className="mt-7 max-w-xl text-lg leading-[1.65] text-violet-50/75 lg:text-[1.18rem]"
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
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-violet-100/55"
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

function DriftingShapes() {
  // Small rotating squares drifting upward — distinct from diving's bubbles and dinner's sparkles.
  const shapes = [
    { left: '8%', top: '78%', delay: 0, size: 14, dur: 14, rotate: 360 },
    { left: '22%', top: '62%', delay: 3, size: 10, dur: 16, rotate: -360 },
    { left: '36%', top: '88%', delay: 1.5, size: 18, dur: 18, rotate: 360 },
    { left: '54%', top: '70%', delay: 4, size: 12, dur: 15, rotate: -360 },
    { left: '70%', top: '82%', delay: 2, size: 16, dur: 17, rotate: 360 },
    { left: '84%', top: '55%', delay: 5, size: 11, dur: 13, rotate: -360 },
    { left: '46%', top: '40%', delay: 6, size: 9, dur: 12, rotate: 360 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0, rotate: 0 }}
          animate={{
            opacity: [0, 0.45, 0.45, 0],
            y: [0, -180],
            rotate: [0, s.rotate],
          }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute rounded-[3px] border border-violet-300/30"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            background:
              'linear-gradient(135deg, rgba(139,92,246,0.10), rgba(99,102,241,0.04))',
            boxShadow: '0 0 12px rgba(139,92,246,0.18)',
          }}
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
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85"
          alt=""
          width={1400}
          height={1000}
          priority
          className="h-[540px] w-full object-cover sm:h-[580px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1F]/65 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.06] via-transparent to-indigo-900/[0.20] mix-blend-overlay" />
      </div>

      {/* Synced product card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`absolute top-7 ${locale === 'ar' ? 'right-7' : 'left-7'} w-[300px] rounded-2xl border border-white/10 bg-white/[0.97] p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] backdrop-blur-md`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white">
            <Layers className="h-5 w-5" strokeWidth={1.7} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold tracking-[-0.01em] text-slate-900">
              Cairo Day Tour
            </p>
            <p className="text-[12px] text-slate-500">8 products synced</p>
          </div>
        </div>
        <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex -space-x-1.5">
            {['V', 'G', 'T', 'K'].map((c, i) => (
              <div
                key={c}
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white ring-2 ring-white ${
                  ['bg-rose-500', 'bg-amber-500', 'bg-emerald-600', 'bg-sky-600'][i]
                }`}
              >
                {c}
              </div>
            ))}
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[9px] font-bold text-white ring-2 ring-white">
              +
            </div>
          </div>
          <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-violet-700 ring-1 ring-violet-100">
            ALL CHANNELS
          </span>
        </div>
      </motion.div>

      {/* Revenue ping */}
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
            +38%
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
  const icons = [Layers, Coins, FileText];
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
            const Icon = icons[i] ?? Layers;
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
    <section className="relative bg-gradient-to-b from-violet-50/30 via-white to-white py-28 sm:py-36">
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
  if (variant === 0) return <ProductManagerMockup />;
  if (variant === 1) return <VoucherMockup />;
  return <ResellerPortalMockup />;
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
      <div className="absolute -inset-6 -z-10 rounded-[36px] bg-gradient-to-br from-violet-100/70 via-indigo-50/40 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)]">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-3">
          <span className="text-[12px] font-semibold tracking-[-0.01em] text-slate-700">
            {title}
          </span>
          {badge && (
            <span className="text-[10px] font-semibold tracking-wider text-violet-600">{badge}</span>
          )}
        </div>
        <div className="p-6 sm:p-7">{children}</div>
      </div>
    </div>
  );
}

/* Mockup A — Multi-product manager dashboard */
function ProductManagerMockup() {
  const { currency } = useCurrency();
  const products = [
    {
      icon: Mountain,
      tone: 'amber',
      name: 'Cairo Pyramids Day Tour',
      type: 'Tour · 8h',
      price: formatPrice(1250, currency),
      channels: ['V', 'G', 'T', 'D'],
      status: 'Active',
    },
    {
      icon: MapPin,
      tone: 'rose',
      name: 'Luxor 2-Day Package',
      type: 'Package · 2 nights',
      price: formatPrice(4800, currency),
      channels: ['V', 'G', 'D'],
      status: 'Active',
    },
    {
      icon: Plane,
      tone: 'sky',
      name: 'Airport Transfer · Hurghada',
      type: 'Transfer · Sedan',
      price: formatPrice(480, currency),
      channels: ['V', 'D'],
      status: 'Active',
    },
    {
      icon: Ship,
      tone: 'violet',
      name: 'Nile Felucca Sunset',
      type: 'Activity · 2h',
      price: formatPrice(350, currency),
      channels: ['G', 'T', 'D'],
      status: 'Active',
    },
    {
      icon: Building2,
      tone: 'emerald',
      name: 'Red Sea Snorkel Trip',
      type: 'Day trip · 6h',
      price: formatPrice(950, currency),
      channels: ['V', 'G', 'D'],
      status: 'Draft',
    },
  ];
  const toneMap: Record<string, string> = {
    amber: 'from-amber-500 to-orange-500',
    rose: 'from-rose-500 to-pink-500',
    sky: 'from-sky-500 to-cyan-500',
    violet: 'from-violet-500 to-indigo-500',
    emerald: 'from-emerald-500 to-teal-500',
  };
  const channelColor: Record<string, string> = {
    V: 'bg-rose-500',
    G: 'bg-amber-500',
    T: 'bg-emerald-600',
    K: 'bg-sky-600',
    D: 'bg-slate-900',
  };

  return (
    <MockupShell title="Catalog · 152 products · all channels" badge="LIVE">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10.5px] font-semibold tracking-wider text-violet-700 ring-1 ring-violet-100">
            ALL · 152
          </span>
          <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[10.5px] font-semibold tracking-wider text-slate-600 ring-1 ring-slate-200">
            Tours · 64
          </span>
          <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[10.5px] font-semibold tracking-wider text-slate-600 ring-1 ring-slate-200">
            Transfers · 38
          </span>
        </div>
        <button className="rounded-md bg-slate-900 px-2.5 py-1 text-[10.5px] font-semibold text-white">
          + Product
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
        <div className="grid grid-cols-[1.6fr_1fr_0.8fr_0.6fr] gap-3 border-b border-slate-100 bg-slate-50/70 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          <span>Product</span>
          <span>Channels</span>
          <span>Price</span>
          <span>Status</span>
        </div>
        <div className="divide-y divide-slate-100">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="grid grid-cols-[1.6fr_1fr_0.8fr_0.6fr] items-center gap-3 px-3.5 py-3 transition hover:bg-slate-50/60"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${toneMap[p.tone]} text-white`}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-semibold tracking-[-0.01em] text-slate-900">
                      {p.name}
                    </p>
                    <p className="truncate text-[10.5px] text-slate-500">{p.type}</p>
                  </div>
                </div>
                <div className="flex -space-x-1.5">
                  {p.channels.map((c) => (
                    <div
                      key={c}
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white ring-2 ring-white ${channelColor[c]}`}
                    >
                      {c}
                    </div>
                  ))}
                </div>
                <span className="text-[12px] font-semibold text-slate-900">{p.price}</span>
                <span
                  className={`justify-self-start rounded-full px-2 py-0.5 text-[9.5px] font-semibold tracking-wider ring-1 ${
                    p.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 ring-emerald-100'
                      : 'bg-amber-50 text-amber-700 ring-amber-100'
                  }`}
                >
                  {p.status.toUpperCase()}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl border border-violet-200/70 bg-violet-50/60 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <Repeat className="h-4 w-4 text-violet-700" strokeWidth={1.8} />
          <span className="text-[12.5px] font-medium text-violet-900">
            Update once · syncs to website, OTAs, resellers in 8s
          </span>
        </div>
      </div>
    </MockupShell>
  );
}

/* Mockup B — Branded voucher generator */
function VoucherMockup() {
  const { currency } = useCurrency();
  return (
    <MockupShell title="Voucher · #FX-08291 · auto-generated" badge="READY">
      <div className="rounded-xl border border-slate-200 bg-gradient-to-b from-white to-violet-50/30 p-5">
        {/* Voucher header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 text-white">
              <Mountain className="h-4 w-4" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[12px] font-bold tracking-[-0.01em] text-slate-900">
                Pyramid Travel Egypt
              </p>
              <p className="text-[9.5px] uppercase tracking-wider text-slate-500">Booking voucher</p>
            </div>
          </div>
          <div className="text-end">
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Ref</p>
            <p className="text-[11.5px] font-bold text-slate-900">#FX-08291</p>
          </div>
        </div>

        {/* Tour title */}
        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-700">
            Confirmed
          </p>
          <h4 className="mt-1 text-[15px] font-bold tracking-[-0.01em] text-slate-900">
            Cairo Pyramids Day Tour
          </h4>
          <p className="mt-0.5 text-[11px] text-slate-500">Saturday, 18 May · 08:00 · 8 hours</p>
        </div>

        {/* Customer + QR row */}
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-4">
          <div className="space-y-2 text-[11px]">
            <DetailRow label="Guest" value="Sarah Müller" />
            <DetailRow label="Pax" value="2 adults · 1 child" />
            <DetailRow label="Pickup" value="Steigenberger Hurghada · 06:30" />
            <DetailRow label="Total paid" value={`${formatPrice(4250, currency)} · Card`} valueClass="text-emerald-700" />
          </div>
          <QRMock />
        </div>

        {/* Terms */}
        <div className="mt-4 border-t border-slate-200 pt-3">
          <p className="text-[9px] leading-relaxed text-slate-500">
            Terms · Cancellation up to 24h before pickup. Bring this voucher (printed or on phone).
            Driver will scan QR at pickup. For changes WhatsApp +20 100 000 0000.
          </p>
        </div>
      </div>

      {/* Action row */}
      <div className="mt-4 flex items-center gap-2">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2.5 text-[12px] font-semibold text-white transition hover:bg-slate-800">
          <FileText className="h-3.5 w-3.5" strokeWidth={2} />
          Download PDF
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2.5 text-[12px] font-semibold text-white transition hover:bg-emerald-700">
          <Send className="h-3.5 w-3.5" strokeWidth={2} />
          Send WhatsApp
        </button>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
        <Sparkles className="h-3 w-3 text-violet-500" strokeWidth={2} />
        <span>Generated in 0.8s · branded with your colors and logo</span>
      </div>
    </MockupShell>
  );
}

function DetailRow({
  label,
  value,
  valueClass = 'text-slate-900',
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-slate-100 pb-1.5 last:border-0 last:pb-0">
      <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{label}</span>
      <span className={`text-end text-[11.5px] font-semibold ${valueClass}`}>{value}</span>
    </div>
  );
}

function QRMock() {
  // 7x7 stylized QR pattern
  const matrix = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  // Random-feeling middle data
  const dataMatrix = [
    [1, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1],
    [1, 1, 0, 1, 0, 1, 1],
    [0, 0, 1, 1, 1, 0, 0],
    [1, 0, 1, 0, 0, 1, 1],
    [0, 1, 1, 0, 1, 1, 0],
    [1, 1, 0, 1, 0, 0, 1],
  ];
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="grid grid-cols-7 gap-[1.5px] rounded-md border border-slate-200 bg-white p-1.5">
        {matrix.flatMap((row, r) =>
          row.map((cell, c) => {
            // Use finder pattern in corners, data elsewhere
            const inFinder =
              (r < 7 && c < 7 && (r < 3 || r > 3 || c < 3 || c > 3) && cell === 1) || cell === 1;
            const useData =
              r >= 0 && c >= 0 && !(r <= 1 && c <= 1) && !(r <= 1 && c >= 5) && !(r >= 5 && c <= 1);
            const filled = useData ? dataMatrix[r][c] : inFinder;
            return (
              <div
                key={`${r}-${c}`}
                className={`h-[5px] w-[5px] rounded-[1px] ${filled ? 'bg-slate-900' : 'bg-transparent'}`}
              />
            );
          })
        )}
      </div>
      <div className="flex items-center gap-1 text-[9px] font-medium text-slate-500">
        <QrCode className="h-2.5 w-2.5" strokeWidth={2} />
        Scan at pickup
      </div>
    </div>
  );
}

/* Mockup C — B2B reseller portal */
function ResellerPortalMockup() {
  const { currency } = useCurrency();
  const stats = [
    { label: 'Bookings · May', value: '286', tone: 'violet', icon: Database },
    { label: 'Commission earned', value: formatPrice(142000, currency, { compact: true }), tone: 'emerald', icon: Wallet },
    { label: 'Active resellers', value: '24', tone: 'indigo', icon: Users },
  ];
  const resellers = [
    {
      initial: 'H',
      tone: 'from-violet-500 to-indigo-500',
      name: 'Hurghada Concierge Co',
      city: 'Hurghada · 6 hotels',
      bookings: 64,
      commission: formatPrice(38400, currency),
      status: 'Active',
    },
    {
      initial: 'L',
      tone: 'from-rose-500 to-pink-500',
      name: 'Luxor Hotels Group',
      city: 'Luxor · 4 hotels',
      bookings: 42,
      commission: formatPrice(26500, currency),
      status: 'Active',
    },
    {
      initial: 'C',
      tone: 'from-amber-500 to-orange-500',
      name: 'Cairo Travel Desk',
      city: 'Cairo · 3 hotels',
      bookings: 31,
      commission: formatPrice(18900, currency),
      status: 'Active',
    },
    {
      initial: 'R',
      tone: 'from-sky-500 to-cyan-500',
      name: 'Red Sea Resellers',
      city: 'El Gouna · Marsa Alam',
      bookings: 18,
      commission: formatPrice(11200, currency),
      status: 'Pending',
    },
  ];

  return (
    <MockupShell title="B2B Portal · Reseller dashboard" badge="LIVE">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 + i * 0.06 }}
              className="rounded-xl border border-slate-200 bg-white p-3"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                    s.tone === 'violet'
                      ? 'bg-violet-50 text-violet-700 ring-1 ring-violet-100'
                      : s.tone === 'emerald'
                        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
                        : 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                </div>
              </div>
              <p className="mt-2.5 text-[16.5px] font-extrabold tracking-[-0.02em] text-slate-900">
                {s.value}
              </p>
              <p className="text-[9.5px] font-medium uppercase tracking-wider text-slate-500">
                {s.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Reseller list */}
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
        <div className="border-b border-slate-100 bg-slate-50/70 px-3.5 py-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Top resellers · this month
          </span>
        </div>
        <div className="divide-y divide-slate-100">
          {resellers.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className="flex items-center gap-3 px-3.5 py-3 transition hover:bg-slate-50/60"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${r.tone} text-[12px] font-bold text-white`}
              >
                {r.initial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-semibold tracking-[-0.01em] text-slate-900">
                  {r.name}
                </p>
                <p className="truncate text-[10.5px] text-slate-500">{r.city}</p>
              </div>
              <div className="text-end">
                <p className="text-[12px] font-bold text-slate-900">{r.bookings}</p>
                <p className="text-[9.5px] uppercase tracking-wider text-slate-500">bookings</p>
              </div>
              <div className="text-end">
                <p className="text-[12px] font-bold text-emerald-700">{r.commission}</p>
                <p className="text-[9.5px] uppercase tracking-wider text-slate-500">YTD</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-semibold tracking-wider ring-1 ${
                  r.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 ring-emerald-100'
                    : 'bg-amber-50 text-amber-700 ring-amber-100'
                }`}
              >
                {r.status.toUpperCase()}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl border border-violet-200/70 bg-violet-50/60 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <Wallet className="h-4 w-4 text-violet-700" strokeWidth={1.8} />
          <span className="text-[12.5px] font-medium text-violet-900">
            Auto commission statements · paid 1st of every month
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
  const stepIcons = [Sparkles, Database, Globe];
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
 * 6. VERTICAL FEATURES — dark grid, violet/indigo
 * ────────────────────────────────────────────────────────────────────────── */
function VerticalFeatures({ copy }: { copy: OperatorCopy }) {
  const icons = [Layers, FileText, Users, Globe, Wallet, Database, Hotel, Settings2];
  return (
    <section className="relative overflow-hidden bg-[#0B0F1F] py-28 text-white sm:py-36">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,_rgba(139,92,246,0.10),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,_rgba(99,102,241,0.06),_transparent_70%)]" />
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
            const Icon = icons[i] ?? Tag;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.06, duration: 0.4 }}
                className="group relative bg-[#0B0F1F] p-7 transition hover:bg-[#101630] sm:p-8"
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
                <p className="mt-2 text-[13.5px] leading-[1.6] text-violet-100/55">
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
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-indigo-100/40 blur-3xl" />
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
            category="tour-agencies"
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
    <section className="relative overflow-hidden bg-[#0B0F1F] py-28 text-white sm:py-36">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-30%,_rgba(139,92,246,0.18),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_120%,_rgba(99,102,241,0.14),_transparent_70%)]" />
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
          className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-[1.65] text-violet-100/65 sm:text-[1.15rem]"
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
        className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${tone === 'dark' ? 'text-violet-300/90' : 'text-red-600'}`}
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
          className={`mx-auto mt-5 max-w-xl text-[1.05rem] leading-[1.65] sm:text-[1.13rem] ${tone === 'dark' ? 'text-violet-100/60' : 'text-slate-600'}`}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
