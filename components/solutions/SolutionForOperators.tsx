import Link from 'next/link';
import {
  ArrowUpRight,
  Building2,
  Compass,
  Ship,
  UtensilsCrossed,
  Waves,
  type LucideIcon,
} from 'lucide-react';
import {
  getSolutionVerticals,
  type SolutionSlug,
  type SolutionVerticalCard,
} from '@/lib/solution-verticals';
import type { Locale } from '@/lib/i18n/operators';

interface Props {
  solution: SolutionSlug;
  locale: Locale;
}

const ICONS: Record<SolutionVerticalCard['iconKey'], LucideIcon> = {
  compass: Compass,
  utensils: UtensilsCrossed,
  building: Building2,
  waves: Waves,
  ship: Ship,
};

const COPY = {
  eyebrow: { en: 'Built for these operators', ar: 'مصمم لهؤلاء المشغلين' },
  headline: {
    en: 'See how operators in your vertical use it.',
    ar: 'اطّلع على كيفية استخدام المشغلين في مجالك له.',
  },
  sub: {
    en: 'Each vertical has its own playbook. Pick yours to see the full landing page tailored to your operations.',
    ar: 'لكل قطاع منهجه الخاص. اختر قطاعك لترى الصفحة الكاملة المصممة لعملياتك.',
  },
  cta: { en: 'See the page', ar: 'شاهد الصفحة' },
};

export default function SolutionForOperators({ solution, locale }: Props) {
  const cards = getSolutionVerticals(solution);

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
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-red-600">
            {COPY.eyebrow[locale]}
          </p>
          <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.025em] text-slate-900 sm:text-[2.5rem]">
            {COPY.headline[locale]}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-[1.65] text-slate-600">
            {COPY.sub[locale]}
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = ICONS[card.iconKey];
            const href =
              locale === 'ar' ? `/ar/operators/${card.slug}` : `/operators/${card.slug}`;
            return (
              <Link
                key={card.slug}
                href={href}
                className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)] sm:p-7"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${card.bg} ${card.text} ring-1 ${card.ring}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </div>
                <h3 className="mt-6 text-[1.15rem] font-semibold tracking-[-0.015em] text-slate-900">
                  {card.title[locale]}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-slate-600">
                  {card.blurb[locale]}
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-700 transition group-hover:text-red-700">
                  <span>{COPY.cta[locale]}</span>
                  <ArrowUpRight
                    className={`h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${locale === 'ar' ? 'scale-x-[-1]' : ''}`}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
