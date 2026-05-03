// Per-solution / per-vertical cross-link data.
// Kept in lib/ (server-safe data file) — mirroring lib/ecosystem.ts which
// works reliably through Netlify's Next.js Runtime build pipeline.
// (An inline version inside the client component caused the prerender to
// drop the cards on Netlify CI but render fine locally — see commit
// history for the diagnostic trail.)

export type SolutionSlug = 'ai-voice' | 'ai-search';
export type VerticalSlug =
  | 'diving-centres'
  | 'dinner-cruises'
  | 'tour-agencies'
  | 'water-sports'
  | 'boat-operators';

export interface SolutionVerticalCard {
  slug: VerticalSlug;
  title: { en: string; ar: string };
  blurb: { en: string; ar: string };
  iconKey: 'compass' | 'utensils' | 'building' | 'waves' | 'ship';
  bg: string;
  text: string;
  ring: string;
}

const COMMON_VERTICALS = {
  'diving-centres': {
    slug: 'diving-centres' as const,
    title: { en: 'Diving centres', ar: 'مراكز الغوص' },
    iconKey: 'compass' as const,
    bg: 'bg-cyan-50',
    text: 'text-cyan-700',
    ring: 'ring-cyan-200',
  },
  'dinner-cruises': {
    slug: 'dinner-cruises' as const,
    title: { en: 'Dinner cruises', ar: 'رحلات العشاء' },
    iconKey: 'utensils' as const,
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    ring: 'ring-amber-200',
  },
  'tour-agencies': {
    slug: 'tour-agencies' as const,
    title: { en: 'Tour agencies', ar: 'وكالات السياحة' },
    iconKey: 'building' as const,
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    ring: 'ring-violet-200',
  },
  'water-sports': {
    slug: 'water-sports' as const,
    title: { en: 'Water sports', ar: 'الرياضات المائية' },
    iconKey: 'waves' as const,
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    ring: 'ring-teal-200',
  },
  'boat-operators': {
    slug: 'boat-operators' as const,
    title: { en: 'Boat operators', ar: 'مشغّلو القوارب' },
    iconKey: 'ship' as const,
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    ring: 'ring-sky-200',
  },
};

const VOICE_CARDS: SolutionVerticalCard[] = [
  {
    ...COMMON_VERTICALS['diving-centres'],
    blurb: {
      en: 'Phone bookings answered 24/7 in 5+ languages. PADI cert questions, dive site briefings, equipment availability — all handled.',
      ar: 'حجوزات هاتفية 24/7 بأكثر من 5 لغات. أسئلة شهادات PADI ومواقع الغوص وتوفر المعدات — كلها تُعالج.',
    },
  },
  {
    ...COMMON_VERTICALS['dinner-cruises'],
    blurb: {
      en: 'Take table reservations at 11pm. Handle dietary requirements, group bookings, and seating preferences without a host.',
      ar: 'استقبل حجوزات الطاولات الساعة 11 مساءً. تعامل مع المتطلبات الغذائية والمجموعات وتفضيلات الجلوس بدون مضيف.',
    },
  },
  {
    ...COMMON_VERTICALS['tour-agencies'],
    blurb: {
      en: 'Inbound RFQs qualified, quoted, and booked in 8+ languages. Ideal for non-English-speaking markets.',
      ar: 'استقبال طلبات العروض، تأهيل، عرض سعر وحجز بأكثر من 8 لغات. مثالي للأسواق غير الناطقة بالإنجليزية.',
    },
  },
  {
    ...COMMON_VERTICALS['water-sports'],
    blurb: {
      en: 'A 2pm jet ski request answered in 5 seconds. Frees instructors to actually instruct.',
      ar: 'طلب جت سكي الساعة 2 يُجاب عليه في 5 ثوانٍ. يحرر المدربين للتدريب فعلًا.',
    },
  },
  {
    ...COMMON_VERTICALS['boat-operators'],
    blurb: {
      en: 'Charter quote-to-booking automation. Calls answered, qualified, quoted with deposit link by SMS, calendar updated.',
      ar: 'أتمتة عرض السعر إلى الحجز للتأجير. مكالمات تُرد، تأهيل، عرض سعر مع رابط دفعة عبر SMS، تحديث التقويم.',
    },
  },
];

const SEARCH_CARDS: SolutionVerticalCard[] = [
  {
    ...COMMON_VERTICALS['diving-centres'],
    blurb: {
      en: 'Guests find courses, dive sites, and prices instantly without scrolling through menus.',
      ar: 'يجد الضيوف الدورات ومواقع الغوص والأسعار فورًا دون تصفح القوائم.',
    },
  },
  {
    ...COMMON_VERTICALS['dinner-cruises'],
    blurb: {
      en: 'Smart search on your booking page so guests find the right cruise (sunset · standard · iftar · group) instantly.',
      ar: 'بحث ذكي على صفحة الحجز ليجد الضيف الرحلة الصحيحة (غروب · عادية · إفطار · مجموعة) فورًا.',
    },
  },
  {
    ...COMMON_VERTICALS['tour-agencies'],
    blurb: {
      en: 'Drop a smart widget into your agency website. Customers find the right tour without browsing 50+ products.',
      ar: 'ضع أداة ذكية في موقع وكالتك. يجد العملاء الجولة المناسبة دون تصفح 50+ منتج.',
    },
  },
  {
    ...COMMON_VERTICALS['water-sports'],
    blurb: {
      en: 'Guests pick the right session (jet ski / parasail / banana / kitesurf) without scrolling.',
      ar: 'يختار الضيف الجلسة المناسبة (جت سكي / باراسيل / بانانا / كايت) بدون تصفح.',
    },
  },
  {
    ...COMMON_VERTICALS['boat-operators'],
    blurb: {
      en: 'Guests pick the right boat (speedboat · yacht · fishing · sunset) and date in seconds.',
      ar: 'يختار الضيف القارب المناسب (سرعة · يخت · صيد · غروب) والتاريخ في ثوانٍ.',
    },
  },
];

export function getSolutionVerticals(solution: SolutionSlug): SolutionVerticalCard[] {
  return solution === 'ai-voice' ? VOICE_CARDS : SEARCH_CARDS;
}
