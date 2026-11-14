import type { OperatorCategory } from './i18n/operators';

export interface EcosystemCard {
  id: string;
  href: string;
  badge?: { en: string; ar: string };
  title: { en: string; ar: string };
  blurb: { en: string; ar: string };
  /** Lucide icon name — kept as a string so this stays a server-safe data file */
  icon:
    | 'phone'
    | 'search'
    | 'monitor'
    | 'kiosk'
    | 'smartphone'
    | 'mic'
    | 'globe'
    | 'shopping-cart';
  /** Tailwind classes for the icon-tile background + ring */
  accent: { bg: string; text: string; ring: string; badge: string };
}

const ACCENTS = {
  voice: {
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    ring: 'ring-violet-200',
    badge: 'bg-violet-600',
  },
  search: {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    ring: 'ring-rose-200',
    badge: 'bg-rose-600',
  },
  pos: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    ring: 'ring-amber-200',
    badge: 'bg-amber-600',
  },
  kiosk: {
    bg: 'bg-cyan-50',
    text: 'text-cyan-700',
    ring: 'ring-cyan-200',
    badge: 'bg-cyan-600',
  },
  booking: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    ring: 'ring-emerald-200',
    badge: 'bg-emerald-600',
  },
  diving: {
    bg: 'bg-cyan-50',
    text: 'text-cyan-700',
    ring: 'ring-cyan-200',
    badge: 'bg-cyan-600',
  },
  dinner: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    ring: 'ring-amber-200',
    badge: 'bg-amber-600',
  },
  agency: {
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    ring: 'ring-violet-200',
    badge: 'bg-violet-600',
  },
  water: {
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    ring: 'ring-teal-200',
    badge: 'bg-teal-600',
  },
  boat: {
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    ring: 'ring-sky-200',
    badge: 'bg-sky-600',
  },
} as const;

type CardDef = Omit<EcosystemCard, 'blurb'>;

const CARDS: Record<string, CardDef> = {
  aiVoice: {
    id: 'ai-voice',
    href: '/solutions/ai-voice',
    title: { en: 'AI Voice', ar: 'AI Voice' },
    icon: 'phone',
    accent: ACCENTS.voice,
  },
  aiSearch: {
    id: 'ai-search',
    href: '/solutions/ai-search',
    title: { en: 'AI Search', ar: 'AI Search' },
    icon: 'search',
    accent: ACCENTS.search,
  },
  pos: {
    id: 'pos-hardware',
    href: '/solutions/pos-hardware',
    title: { en: 'POS Hardware', ar: 'أجهزة نقاط البيع' },
    icon: 'monitor',
    accent: ACCENTS.pos,
  },
  kiosk: {
    id: 'kiosk',
    href: '/solutions/kiosk',
    title: { en: 'Self-Service Kiosks', ar: 'أكشاك الخدمة الذاتية' },
    icon: 'kiosk',
    accent: ACCENTS.kiosk,
  },
  onlineBooking: {
    id: 'online-booking',
    href: '/solutions/online-booking',
    title: { en: 'AI Booking', ar: 'AI Booking' },
    icon: 'globe',
    accent: ACCENTS.booking,
  },
  // Operator-vertical cards used on solution pages (cross-link back to ops)
  divingCentres: {
    id: 'diving-centres',
    href: '/operators/diving-centres',
    title: { en: 'Diving centres', ar: 'مراكز الغوص' },
    icon: 'monitor',
    accent: ACCENTS.diving,
  },
  dinnerCruises: {
    id: 'dinner-cruises',
    href: '/operators/dinner-cruises',
    title: { en: 'Dinner cruises', ar: 'رحلات العشاء' },
    icon: 'monitor',
    accent: ACCENTS.dinner,
  },
  tourAgencies: {
    id: 'tour-agencies',
    href: '/operators/tour-agencies',
    title: { en: 'Tour agencies', ar: 'وكالات السياحة' },
    icon: 'monitor',
    accent: ACCENTS.agency,
  },
  waterSports: {
    id: 'water-sports',
    href: '/operators/water-sports',
    title: { en: 'Water sports', ar: 'الرياضات المائية' },
    icon: 'monitor',
    accent: ACCENTS.water,
  },
  boatOperators: {
    id: 'boat-operators',
    href: '/operators/boat-operators',
    title: { en: 'Boat operators', ar: 'مشغّلو القوارب' },
    icon: 'monitor',
    accent: ACCENTS.boat,
  },
};

type CardKey = keyof typeof CARDS;

interface CategoryEcosystem {
  eyebrow: { en: string; ar: string };
  headline: { en: string; ar: string };
  sub: { en: string; ar: string };
  picks: {
    key: CardKey;
    blurb: { en: string; ar: string };
  }[];
}

// Partial because the OperatorCategory union also includes solution-page categories
// (ai-voice, ai-search) which don't have a sibling-product ecosystem section themselves.
// What each page says about the other Foxes products. Every blurb states what that product does
// today; nothing here names hardware, phone lines, payment or channel connections.
const ECOSYSTEM: Partial<Record<OperatorCategory, CategoryEcosystem>> = {
  'diving-centres': {
    eyebrow: { en: 'More from Foxes', ar: 'المزيد من Foxes' },
    headline: { en: 'Two more tools for the same website.', ar: 'أداتان أخريان للموقع نفسه.' },
    sub: { en: 'Each product is requested and set up separately.', ar: 'يُطلب كل منتج ويُجهَّز على حدة.' },
    picks: [
      { key: 'aiVoice', blurb: { en: 'A voice concierge on your website. Guests tap to talk in Arabic or English, and it takes booking requests for your team to confirm.', ar: 'مساعد صوتي على موقعك. يضغط الضيف ليتحدث بالعربية أو الإنجليزية، ويستقبل طلبات الحجز ليؤكدها فريقك.' } },
      { key: 'aiSearch', blurb: { en: 'A search and chat widget. Visitors ask in their own words and get your own tours back, each one opening the right tour page.', ar: 'أداة بحث ومحادثة. يسأل الزائر بكلماته فتظهر له رحلاتك أنت، وكل نتيجة تفتح صفحة الرحلة الصحيحة.' } },
      { key: 'onlineBooking', blurb: { en: 'The booking system this page describes: a widget for your website, desk bookings, vouchers and the four-stage day board.', ar: 'نظام الحجز الذي تصفه هذه الصفحة: أداة لموقعك، وحجوزات المكتب، والقسائم، ولوحة اليوم بمراحلها الأربع.' } },
    ],
  },
  'dinner-cruises': {
    eyebrow: { en: 'More from Foxes', ar: 'المزيد من Foxes' },
    headline: { en: 'Two more tools for the same website.', ar: 'أداتان أخريان للموقع نفسه.' },
    sub: { en: 'Each product is requested and set up separately.', ar: 'يُطلب كل منتج ويُجهَّز على حدة.' },
    picks: [
      { key: 'aiVoice', blurb: { en: 'A voice concierge on your website. Guests tap to talk in Arabic or English, and it takes booking requests for your team to confirm.', ar: 'مساعد صوتي على موقعك. يضغط الضيف ليتحدث بالعربية أو الإنجليزية، ويستقبل طلبات الحجز ليؤكدها فريقك.' } },
      { key: 'aiSearch', blurb: { en: 'A search and chat widget. Visitors ask in their own words and get your own tours back, each one opening the right tour page.', ar: 'أداة بحث ومحادثة. يسأل الزائر بكلماته فتظهر له رحلاتك أنت، وكل نتيجة تفتح صفحة الرحلة الصحيحة.' } },
      { key: 'onlineBooking', blurb: { en: 'The booking system this page describes: a widget for your website, desk bookings, vouchers and the four-stage day board.', ar: 'نظام الحجز الذي تصفه هذه الصفحة: أداة لموقعك، وحجوزات المكتب، والقسائم، ولوحة اليوم بمراحلها الأربع.' } },
    ],
  },
  'tour-agencies': {
    eyebrow: { en: 'More from Foxes', ar: 'المزيد من Foxes' },
    headline: { en: 'Two more tools for the same website.', ar: 'أداتان أخريان للموقع نفسه.' },
    sub: { en: 'Each product is requested and set up separately.', ar: 'يُطلب كل منتج ويُجهَّز على حدة.' },
    picks: [
      { key: 'aiVoice', blurb: { en: 'A voice concierge on your website. Guests tap to talk in Arabic or English, and it takes booking requests for your team to confirm.', ar: 'مساعد صوتي على موقعك. يضغط الضيف ليتحدث بالعربية أو الإنجليزية، ويستقبل طلبات الحجز ليؤكدها فريقك.' } },
      { key: 'aiSearch', blurb: { en: 'A search and chat widget. Visitors ask in their own words and get your own tours back, each one opening the right tour page.', ar: 'أداة بحث ومحادثة. يسأل الزائر بكلماته فتظهر له رحلاتك أنت، وكل نتيجة تفتح صفحة الرحلة الصحيحة.' } },
      { key: 'onlineBooking', blurb: { en: 'The booking system this page describes: a widget for your website, desk bookings, vouchers and the four-stage day board.', ar: 'نظام الحجز الذي تصفه هذه الصفحة: أداة لموقعك، وحجوزات المكتب، والقسائم، ولوحة اليوم بمراحلها الأربع.' } },
    ],
  },
  'water-sports': {
    eyebrow: { en: 'More from Foxes', ar: 'المزيد من Foxes' },
    headline: { en: 'Two more tools for the same website.', ar: 'أداتان أخريان للموقع نفسه.' },
    sub: { en: 'Each product is requested and set up separately.', ar: 'يُطلب كل منتج ويُجهَّز على حدة.' },
    picks: [
      { key: 'aiVoice', blurb: { en: 'A voice concierge on your website. Guests tap to talk in Arabic or English, and it takes booking requests for your team to confirm.', ar: 'مساعد صوتي على موقعك. يضغط الضيف ليتحدث بالعربية أو الإنجليزية، ويستقبل طلبات الحجز ليؤكدها فريقك.' } },
      { key: 'aiSearch', blurb: { en: 'A search and chat widget. Visitors ask in their own words and get your own tours back, each one opening the right tour page.', ar: 'أداة بحث ومحادثة. يسأل الزائر بكلماته فتظهر له رحلاتك أنت، وكل نتيجة تفتح صفحة الرحلة الصحيحة.' } },
      { key: 'onlineBooking', blurb: { en: 'The booking system this page describes: a widget for your website, desk bookings, vouchers and the four-stage day board.', ar: 'نظام الحجز الذي تصفه هذه الصفحة: أداة لموقعك، وحجوزات المكتب، والقسائم، ولوحة اليوم بمراحلها الأربع.' } },
    ],
  },
  'boat-operators': {
    eyebrow: { en: 'More from Foxes', ar: 'المزيد من Foxes' },
    headline: { en: 'Two more tools for the same website.', ar: 'أداتان أخريان للموقع نفسه.' },
    sub: { en: 'Each product is requested and set up separately.', ar: 'يُطلب كل منتج ويُجهَّز على حدة.' },
    picks: [
      { key: 'aiVoice', blurb: { en: 'A voice concierge on your website. Guests tap to talk in Arabic or English, and it takes booking requests for your team to confirm.', ar: 'مساعد صوتي على موقعك. يضغط الضيف ليتحدث بالعربية أو الإنجليزية، ويستقبل طلبات الحجز ليؤكدها فريقك.' } },
      { key: 'aiSearch', blurb: { en: 'A search and chat widget. Visitors ask in their own words and get your own tours back, each one opening the right tour page.', ar: 'أداة بحث ومحادثة. يسأل الزائر بكلماته فتظهر له رحلاتك أنت، وكل نتيجة تفتح صفحة الرحلة الصحيحة.' } },
      { key: 'onlineBooking', blurb: { en: 'The booking system this page describes: a widget for your website, desk bookings, vouchers and the four-stage day board.', ar: 'نظام الحجز الذي تصفه هذه الصفحة: أداة لموقعك، وحجوزات المكتب، والقسائم، ولوحة اليوم بمراحلها الأربع.' } },
    ],
  },
  'ai-voice': {
    eyebrow: { en: 'For these operators', ar: 'لهؤلاء المشغّلين' },
    headline: { en: 'Taking bookings as well?', ar: 'هل تستقبل الحجوزات أيضًا؟' },
    sub: { en: 'AI Booking has a page for each kind of operator.', ar: 'لدى AI Booking صفحة لكل نوع من المشغّلين.' },
    picks: [
      { key: 'tourAgencies', blurb: { en: 'All your tours, options and prices in one dashboard, with agents who book at a commission you set.', ar: 'كل جولاتك وخياراتها وأسعارها في لوحة واحدة، مع وكلاء يحجزون بعمولة تحددها أنت.' } },
      { key: 'boatOperators', blurb: { en: 'Charters reserved on your own website, with the last place on a boat sold only once.', ar: 'رحلات بحرية تُحجز من موقعك، وآخر مكان على القارب يُباع مرة واحدة فقط.' } },
      { key: 'dinnerCruises', blurb: { en: 'Each sailing has its own capacity, and add-ons are priced by the system.', ar: 'لكل رحلة سعتها، ويسعّر النظام الإضافات.' } },
    ],
  },
  'ai-search': {
    eyebrow: { en: 'For these operators', ar: 'لهؤلاء المشغّلين' },
    headline: { en: 'Taking bookings as well?', ar: 'هل تستقبل الحجوزات أيضًا؟' },
    sub: { en: 'AI Booking has a page for each kind of operator.', ar: 'لدى AI Booking صفحة لكل نوع من المشغّلين.' },
    picks: [
      { key: 'tourAgencies', blurb: { en: 'All your tours, options and prices in one dashboard, with agents who book at a commission you set.', ar: 'كل جولاتك وخياراتها وأسعارها في لوحة واحدة، مع وكلاء يحجزون بعمولة تحددها أنت.' } },
      { key: 'dinnerCruises', blurb: { en: 'Each sailing has its own capacity, and add-ons are priced by the system.', ar: 'لكل رحلة سعتها، ويسعّر النظام الإضافات.' } },
      { key: 'waterSports', blurb: { en: 'Time slots with their own capacity, reserved by guests on your website.', ar: 'مواعيد لكل منها سعته، يحجزها الضيوف من موقعك.' } },
    ],
  },
};

export function getEcosystemForCategory(category: OperatorCategory) {
  const config = ECOSYSTEM[category];
  if (!config) {
    throw new Error(`No ecosystem config for ${category}`);
  }
  return {
    eyebrow: config.eyebrow,
    headline: config.headline,
    sub: config.sub,
    cards: config.picks.map((pick) => ({
      ...CARDS[pick.key],
      blurb: pick.blurb,
    })),
  };
}

export function getCategoriesUsingProduct(productId: string): OperatorCategory[] {
  const result: OperatorCategory[] = [];
  for (const [cat, conf] of Object.entries(ECOSYSTEM) as [
    OperatorCategory,
    CategoryEcosystem,
  ][]) {
    if (conf.picks.some((pick) => CARDS[pick.key].id === productId)) {
      result.push(cat);
    }
  }
  return result;
}
