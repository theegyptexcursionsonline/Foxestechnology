'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Building2,
  Compass,
  Ship,
  UtensilsCrossed,
  Waves,
} from 'lucide-react';
import type { Locale } from '@/lib/i18n/operators';

interface Props {
  /** The solution slug — used to look up the right per-vertical blurb. */
  solution: 'ai-voice' | 'ai-search';
  locale: Locale;
}

interface VerticalCardData {
  slug: 'diving-centres' | 'dinner-cruises' | 'tour-agencies' | 'water-sports' | 'boat-operators';
  title: { en: string; ar: string };
  blurb: { en: string; ar: string };
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  bg: string;
  text: string;
  ring: string;
}

const VOICE_CARDS: VerticalCardData[] = [
  {
    slug: 'diving-centres',
    title: { en: 'Diving centres', ar: 'مراكز الغوص' },
    blurb: {
      en: 'Phone bookings answered 24/7 in 5+ languages. PADI cert questions, dive site briefings, equipment availability — all handled.',
      ar: 'حجوزات هاتفية 24/7 بأكثر من 5 لغات. أسئلة شهادات PADI ومواقع الغوص وتوفر المعدات — كلها تُعالج.',
    },
    icon: Compass,
    bg: 'bg-cyan-50',
    text: 'text-cyan-700',
    ring: 'ring-cyan-200',
  },
  {
    slug: 'dinner-cruises',
    title: { en: 'Dinner cruises', ar: 'رحلات العشاء' },
    blurb: {
      en: 'Take table reservations at 11pm. Handle dietary requirements, group bookings, and seating preferences without a host.',
      ar: 'استقبل حجوزات الطاولات الساعة 11 مساءً. تعامل مع المتطلبات الغذائية والمجموعات وتفضيلات الجلوس بدون مضيف.',
    },
    icon: UtensilsCrossed,
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    ring: 'ring-amber-200',
  },
  {
    slug: 'tour-agencies',
    title: { en: 'Tour agencies', ar: 'وكالات السياحة' },
    blurb: {
      en: 'Inbound RFQs qualified, quoted, and booked in 8+ languages. Ideal for non-English-speaking markets.',
      ar: 'استقبال طلبات العروض، تأهيل، عرض سعر وحجز بأكثر من 8 لغات. مثالي للأسواق غير الناطقة بالإنجليزية.',
    },
    icon: Building2,
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    ring: 'ring-violet-200',
  },
  {
    slug: 'water-sports',
    title: { en: 'Water sports', ar: 'الرياضات المائية' },
    blurb: {
      en: 'A 2pm jet ski request answered in 5 seconds. Frees instructors to actually instruct.',
      ar: 'طلب جت سكي الساعة 2 يُجاب عليه في 5 ثوانٍ. يحرر المدربين للتدريب فعلًا.',
    },
    icon: Waves,
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    ring: 'ring-teal-200',
  },
  {
    slug: 'boat-operators',
    title: { en: 'Boat operators', ar: 'مشغّلو القوارب' },
    blurb: {
      en: 'Charter quote-to-booking automation. Calls answered, qualified, quoted with deposit link by SMS, calendar updated.',
      ar: 'أتمتة عرض السعر إلى الحجز للتأجير. مكالمات تُرد، تأهيل، عرض سعر مع رابط دفعة عبر SMS، تحديث التقويم.',
    },
    icon: Ship,
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    ring: 'ring-sky-200',
  },
];

const SEARCH_CARDS: VerticalCardData[] = [
  {
    slug: 'diving-centres',
    title: { en: 'Diving centres', ar: 'مراكز الغوص' },
    blurb: {
      en: 'Guests find courses, dive sites, and prices instantly without scrolling through menus.',
      ar: 'يجد الضيوف الدورات ومواقع الغوص والأسعار فورًا دون تصفح القوائم.',
    },
    icon: Compass,
    bg: 'bg-cyan-50',
    text: 'text-cyan-700',
    ring: 'ring-cyan-200',
  },
  {
    slug: 'dinner-cruises',
    title: { en: 'Dinner cruises', ar: 'رحلات العشاء' },
    blurb: {
      en: 'Smart search on your booking page so guests find the right cruise (sunset · standard · iftar · group) instantly.',
      ar: 'بحث ذكي على صفحة الحجز ليجد الضيف الرحلة الصحيحة (غروب · عادية · إفطار · مجموعة) فورًا.',
    },
    icon: UtensilsCrossed,
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    ring: 'ring-amber-200',
  },
  {
    slug: 'tour-agencies',
    title: { en: 'Tour agencies', ar: 'وكالات السياحة' },
    blurb: {
      en: 'Drop a smart widget into your agency website. Customers find the right tour without browsing 50+ products.',
      ar: 'ضع أداة ذكية في موقع وكالتك. يجد العملاء الجولة المناسبة دون تصفح 50+ منتج.',
    },
    icon: Building2,
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    ring: 'ring-violet-200',
  },
  {
    slug: 'water-sports',
    title: { en: 'Water sports', ar: 'الرياضات المائية' },
    blurb: {
      en: 'Guests pick the right session (jet ski / parasail / banana / kitesurf) without scrolling.',
      ar: 'يختار الضيف الجلسة المناسبة (جت سكي / باراسيل / بانانا / كايت) بدون تصفح.',
    },
    icon: Waves,
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    ring: 'ring-teal-200',
  },
  {
    slug: 'boat-operators',
    title: { en: 'Boat operators', ar: 'مشغّلو القوارب' },
    blurb: {
      en: 'Guests pick the right boat (speedboat · yacht · fishing · sunset) and date in seconds.',
      ar: 'يختار الضيف القارب المناسب (سرعة · يخت · صيد · غروب) والتاريخ في ثوانٍ.',
    },
    icon: Ship,
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    ring: 'ring-sky-200',
  },
];

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
  const cards = solution === 'ai-voice' ? VOICE_CARDS : SEARCH_CARDS;

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
            {COPY.eyebrow[locale]}
          </p>
          <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.025em] text-slate-900 sm:text-[2.5rem]">
            {COPY.headline[locale]}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-[1.65] text-slate-600">
            {COPY.sub[locale]}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = card.icon;
            const href =
              locale === 'ar' ? `/ar/operators/${card.slug}` : `/operators/${card.slug}`;
            return (
              <motion.div
                key={card.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
