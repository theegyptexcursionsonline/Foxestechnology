'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Globe,
  Mic,
  Monitor,
  Phone,
  Search,
  ShoppingCart,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import { getEcosystemForCategory, type EcosystemCard } from '@/lib/ecosystem';
import type { OperatorCategory, Locale } from '@/lib/i18n/operators';

interface Props {
  category: OperatorCategory;
  locale: Locale;
}

// Lucide doesn't ship a literal "kiosk" icon — using Monitor is closest in
// the absence of dedicated artwork.
const ICON_MAP: Record<EcosystemCard['icon'], LucideIcon> = {
  phone: Phone,
  search: Search,
  monitor: Monitor,
  kiosk: Monitor,
  smartphone: Smartphone,
  mic: Mic,
  globe: Globe,
  'shopping-cart': ShoppingCart,
};

export default function OperatorEcosystem({ category, locale }: Props) {
  const data = getEcosystemForCategory(category);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 sm:py-28">
      <div className="absolute inset-0 -z-10 opacity-60">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-red-600">
            {data.eyebrow[locale]}
          </p>
          <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.025em] text-slate-900 sm:text-[2.5rem]">
            {data.headline[locale]}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-[1.65] text-slate-600">
            {data.sub[locale]}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {data.cards.map((card, i) => {
            const Icon = ICON_MAP[card.icon];
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={card.href}
                  className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)] sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${card.accent.bg} ${card.accent.text} ring-1 ${card.accent.ring}`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </div>
                    {card.badge && (
                      <span
                        className={`rounded-full ${card.accent.badge} px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white`}
                      >
                        {card.badge[locale]}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-7 text-[1.2rem] font-semibold tracking-[-0.015em] text-slate-900">
                    {card.title[locale]}
                  </h3>
                  <p className="mt-3 flex-1 text-[14.5px] leading-[1.65] text-slate-600">
                    {card.blurb[locale]}
                  </p>
                  <div className="mt-7 flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-700 transition group-hover:text-red-700">
                    <span>
                      {locale === 'ar' ? 'استكشف' : 'Explore'}
                    </span>
                    <ArrowUpRight
                      className={`h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${locale === 'ar' ? 'scale-x-[-1]' : ''}`}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
