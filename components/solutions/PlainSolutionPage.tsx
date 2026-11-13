'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  CheckCircle,
  FileSpreadsheet,
  Globe,
  Info,
  Mail,
  MessageSquare,
  QrCode,
  Receipt,
  Search,
  Mic,
  SlidersHorizontal,
  Sparkles,
  Ticket,
  Users,
  type LucideIcon,
} from 'lucide-react';

/**
 * One layout for the short solution pages (online booking, desk bookings, self-service, the
 * booking assistant, reports). Each page passes plain data; the icons are named by key so the
 * page files can stay server components with their own title and description.
 */
const ICONS = {
  calendar: CalendarDays,
  users: Users,
  ticket: Ticket,
  qr: QrCode,
  receipt: Receipt,
  sheet: FileSpreadsheet,
  globe: Globe,
  mail: Mail,
  chat: MessageSquare,
  sparkles: Sparkles,
  sliders: SlidersHorizontal,
  chart: BarChart3,
  search: Search,
  mic: Mic,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof ICONS;

export interface PlainSolution {
  badge: string;
  badgeIcon: IconKey;
  headlineLine1: string;
  headlineLine2: string;
  sub: string;
  pills: string[];
  /** The three facts in the card beside the headline. */
  inShort: string[];
  featuresHeadline: string;
  featuresSub: string;
  features: { icon: IconKey; title: string; description: string }[];
  /** What the product does not do, said plainly. */
  goodToKnow: string[];
  related?: { title: string; description: string; href: string; icon: IconKey }[];
  closingHeadline: string;
  closingSub: string;
  requestHref: string;
}

const REQUEST_LABEL = 'Request access';

export default function PlainSolutionPage({ page }: { page: PlainSolution }) {
  const BadgeIcon = ICONS[page.badgeIcon];
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(239 68 68) 1px, transparent 0)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-red-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/50 px-5 py-2.5 backdrop-blur-sm">
                <BadgeIcon className="h-4 w-4 text-red-400" />
                <span className="text-sm font-bold text-white">{page.badge}</span>
              </div>

              <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                {page.headlineLine1}
                <span className="block bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
                  {page.headlineLine2}
                </span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-gray-300 lg:text-xl">{page.sub}</p>

              <div className="mt-8">
                <Link
                  href={page.requestHref}
                  className="group inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-red-500/30 transition-all hover:bg-red-700 hover:shadow-red-500/50"
                >
                  {REQUEST_LABEL}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {page.pills.map((pill) => (
                  <div key={pill} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/20 backdrop-blur-md">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-semibold text-white">{pill}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 p-8 ring-1 ring-white/10 backdrop-blur-sm">
                <p className="text-sm font-bold uppercase tracking-widest text-red-300">In short</p>
                <ul className="mt-6 space-y-5">
                  {page.inShort.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-green-400" />
                      <span className="text-lg font-semibold leading-snug text-white">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black text-gray-900">{page.featuresHeadline}</h2>
            <p className="text-xl text-gray-600">{page.featuresSub}</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {page.features.map((feature, index) => {
              const Icon = ICONS[feature.icon];
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
                    <Icon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900">Good to know</h2>
          <ul className="mt-8 space-y-4">
            {page.goodToKnow.map((line) => (
              <li key={line} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                <span className="text-base leading-relaxed text-slate-700">{line}</span>
              </li>
            ))}
          </ul>

          {page.related && (
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {page.related.map((item) => {
                const Icon = ICONS[item.icon];
                return (
                  <Link key={item.href} href={item.href} className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100">
                      <Icon className="h-5 w-5 text-red-600" />
                    </span>
                    <span>
                      <span className="flex items-center gap-1.5 text-base font-bold text-gray-900">
                        {item.title}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                      <span className="mt-1 block text-sm text-slate-600">{item.description}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-900 to-slate-950 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mb-6 text-4xl font-black text-white">{page.closingHeadline}</h2>
            <p className="mb-8 text-xl text-gray-300">{page.closingSub}</p>
            <Link
              href={page.requestHref}
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-red-500/30 transition-all hover:bg-red-700"
            >
              {REQUEST_LABEL}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
