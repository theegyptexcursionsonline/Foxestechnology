import type { OperatorCategory, Locale } from './i18n/operators';

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
    badge: { en: 'NEW', ar: 'جديد' },
    title: { en: 'AI Voice Agent', ar: 'وكيل الصوت الذكي' },
    icon: 'phone',
    accent: ACCENTS.voice,
  },
  aiSearch: {
    id: 'ai-search',
    href: '/solutions/ai-search',
    badge: { en: 'NEW', ar: 'جديد' },
    title: { en: 'AI Search Widget', ar: 'أداة البحث الذكية' },
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
    title: { en: 'Online Booking Engine', ar: 'محرك الحجز الأونلاين' },
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
const ECOSYSTEM: Partial<Record<OperatorCategory, CategoryEcosystem>> = {
  'diving-centres': {
    eyebrow: { en: 'The Foxes ecosystem', ar: 'منظومة Foxes' },
    headline: {
      en: 'Pairs well with the rest of the platform.',
      ar: 'يتكامل مع بقية المنصة.',
    },
    sub: {
      en: 'Most dive centres start with the booking platform — then layer on the pieces below as they grow.',
      ar: 'تبدأ معظم مراكز الغوص بمنصة الحجز — ثم تضيف القطع التالية عندما تنمو.',
    },
    picks: [
      {
        key: 'aiVoice',
        blurb: {
          en: 'Capture after-hours phone bookings 24/7. Handles PADI cert questions, pricing, and same-day availability — in Arabic, English, German, Russian, French.',
          ar: 'استقبل الحجوزات الهاتفية بعد الدوام 24/7. يجيب عن أسئلة شهادات PADI والأسعار والتوفر — بالعربية والإنجليزية والألمانية والروسية والفرنسية.',
        },
      },
      {
        key: 'aiSearch',
        blurb: {
          en: 'Embeddable search widget for your dive centre site — guests find courses, dive sites, and prices instantly without browsing menus.',
          ar: 'أداة بحث قابلة للتضمين في موقع مركز الغوص — يجد الضيوف الدورات ومواقع الغوص والأسعار فورًا.',
        },
      },
      {
        key: 'pos',
        blurb: {
          en: 'Dive-shop retail terminal that talks to your booking inventory. Sell rentals, certifications, and gear without manual reconciliation.',
          ar: 'محطة بيع لمتجر الغوص متصلة بمخزون الحجوزات. بِع الإيجارات والشهادات والمعدات دون مطابقة يدوية.',
        },
      },
    ],
  },
  'dinner-cruises': {
    eyebrow: { en: 'The Foxes ecosystem', ar: 'منظومة Foxes' },
    headline: {
      en: 'Built to scale with you.',
      ar: 'مصمم لينمو معك.',
    },
    sub: {
      en: 'Start with direct bookings. Add voice + kiosks when you stop wanting to lose the 11pm phone call.',
      ar: 'ابدأ بالحجوزات المباشرة. أضف الصوت والأكشاك عندما تتوقف عن خسارة المكالمة الهاتفية في الـ 11 مساءً.',
    },
    picks: [
      {
        key: 'aiVoice',
        blurb: {
          en: 'Take table reservations 24/7 in 8+ languages. Handles seating preferences, dietary requirements, and group bookings while your team is below deck.',
          ar: 'استقبل حجوزات الطاولات 24/7 بأكثر من 8 لغات. يتعامل مع تفضيلات الجلوس والمتطلبات الغذائية والمجموعات بينما فريقك مشغول.',
        },
      },
      {
        key: 'kiosk',
        blurb: {
          en: 'Dockside kiosk for last-minute walk-ins. Guests pick a seating, pay, and get an SMS confirmation in under 90 seconds.',
          ar: 'كشك على الرصيف للزائرين في اللحظة الأخيرة. يختار الضيف الميعاد ويدفع ويستلم تأكيدًا عبر SMS في أقل من 90 ثانية.',
        },
      },
      {
        key: 'aiSearch',
        blurb: {
          en: 'Smart search on your booking page so guests find the right cruise (sunset · standard · Ramadan iftar · group) instantly.',
          ar: 'بحث ذكي على صفحة الحجز ليجد الضيف الرحلة الصحيحة (غروب · عادية · إفطار رمضان · مجموعة) فورًا.',
        },
      },
    ],
  },
  'tour-agencies': {
    eyebrow: { en: 'The Foxes ecosystem', ar: 'منظومة Foxes' },
    headline: {
      en: 'A complete agency stack.',
      ar: 'منظومة كاملة لوكالات السياحة.',
    },
    sub: {
      en: 'Most agencies start with the multi-product manager and channel manager. The widget and voice agent come next — they pay back fastest on direct traffic.',
      ar: 'تبدأ معظم الوكالات بمدير المنتجات ومدير القنوات. الأداة ووكيل الصوت تأتي بعد ذلك — هم الأسرع في تحقيق العائد.',
    },
    picks: [
      {
        key: 'aiSearch',
        blurb: {
          en: 'Drop a smart search widget into your agency website. Customers find the right tour without scrolling 50+ products. Conversion goes up, OTA dependence goes down.',
          ar: 'ضع أداة بحث ذكية في موقع وكالتك. يجد العملاء الجولة المناسبة بدون تصفح 50+ منتج. التحويل يرتفع والاعتماد على OTA ينخفض.',
        },
      },
      {
        key: 'aiVoice',
        blurb: {
          en: 'Inbound RFQs handled in 8+ languages. Quote, qualify, book — without your team picking up. Especially good for non-English-speaking markets.',
          ar: 'استقبال طلبات العروض بأكثر من 8 لغات. عرض سعر، تأهيل، حجز — دون أن يرفع فريقك السماعة. مثالي للأسواق غير الناطقة بالإنجليزية.',
        },
      },
      {
        key: 'onlineBooking',
        blurb: {
          en: 'The booking engine that powers it all. Direct payments, channel-manager sync to Viator/GYG/Klook/TripAdvisor, branded vouchers.',
          ar: 'محرك الحجز الذي يدعم كل ما سبق. مدفوعات مباشرة، مزامنة قنوات مع Viator و GYG و Klook و TripAdvisor، فاوتشرات بعلامتك.',
        },
      },
    ],
  },
  'water-sports': {
    eyebrow: { en: 'The Foxes ecosystem', ar: 'منظومة Foxes' },
    headline: {
      en: 'Built for the beach economy.',
      ar: 'مصمم لاقتصاد الشاطئ.',
    },
    sub: {
      en: 'Start with online slots. Add a beach kiosk when walk-ins outnumber online — most operators flip in 90 days.',
      ar: 'ابدأ بالمواعيد الأونلاين. أضف كشكًا على الشاطئ عندما يتجاوز الزائرون العابرون الحجوزات الأونلاين — معظم المشغلين يتحولون خلال 90 يومًا.',
    },
    picks: [
      {
        key: 'kiosk',
        blurb: {
          en: 'Self-service beach kiosk: guests pick a slot, sign a digital waiver, pay, and get a QR boarding pass. No queue, no paperwork.',
          ar: 'كشك خدمة ذاتية على الشاطئ: الضيف يختار ميعادًا، يوقّع تنازلًا رقميًا، يدفع، ويحصل على QR للصعود. بدون طابور، بدون أوراق.',
        },
      },
      {
        key: 'aiVoice',
        blurb: {
          en: 'Phone bookings auto-handled — "Do you have a 2pm jet ski?" — answered in seconds, in any language. Frees instructors to actually instruct.',
          ar: 'الحجوزات الهاتفية تُعالج تلقائيًا — "هل عندكم جت سكي الساعة 2؟" — يُجاب عليها في ثوانٍ بأي لغة. يحرر المدربين للتدريب فعلًا.',
        },
      },
      {
        key: 'aiSearch',
        blurb: {
          en: 'Smart search widget for your site so guests pick the right session (jet ski / parasail / banana / kitesurf) without scrolling.',
          ar: 'أداة بحث ذكية لموقعك ليختار الضيف الجلسة المناسبة (جت سكي / باراسيل / بانانا / كايت) بدون تصفح.',
        },
      },
    ],
  },
  'ai-voice': {
    eyebrow: { en: 'Built for these operators', ar: 'مصمم لهؤلاء المشغلين' },
    headline: {
      en: 'See how operators in your vertical use AI Voice.',
      ar: 'شاهد كيف يستخدم المشغّلون في مجالك الصوت الذكي.',
    },
    sub: {
      en: 'Each vertical gets its own playbook — pick yours to see the full landing page tailored to your operations.',
      ar: 'لكل قطاع منهجه الخاص — اختر قطاعك لترى الصفحة المصممة لعملياتك.',
    },
    picks: [
      {
        key: 'tourAgencies',
        blurb: {
          en: 'Inbound RFQs qualified, quoted, and booked in 8+ languages — ideal for non-English-speaking markets.',
          ar: 'استقبال طلبات العروض، تأهيل، عرض سعر وحجز بأكثر من 8 لغات — مثالي للأسواق غير الناطقة بالإنجليزية.',
        },
      },
      {
        key: 'boatOperators',
        blurb: {
          en: 'Charter quote-to-booking automation. Calls qualified, quoted with deposit link by SMS, calendar updated.',
          ar: 'أتمتة عرض السعر إلى الحجز. مكالمات مؤهلة، عرض سعر مع رابط دفعة عبر SMS، تحديث التقويم.',
        },
      },
      {
        key: 'dinnerCruises',
        blurb: {
          en: 'Take table reservations at 11pm. Handle dietary requirements and group bookings without a host.',
          ar: 'استقبل حجوزات الطاولات الساعة 11 مساءً. تعامل مع المتطلبات الغذائية والمجموعات بدون مضيف.',
        },
      },
    ],
  },
  'ai-search': {
    eyebrow: { en: 'Built for these operators', ar: 'مصمم لهؤلاء المشغلين' },
    headline: {
      en: 'See how operators in your vertical use AI Search.',
      ar: 'شاهد كيف يستخدم المشغّلون في مجالك البحث الذكي.',
    },
    sub: {
      en: 'Each vertical gets its own playbook — pick yours to see the full landing page tailored to your operations.',
      ar: 'لكل قطاع منهجه الخاص — اختر قطاعك لترى الصفحة المصممة لعملياتك.',
    },
    picks: [
      {
        key: 'tourAgencies',
        blurb: {
          en: 'Drop a smart widget into your agency website. Customers find the right tour without browsing 50+ products.',
          ar: 'ضع أداة ذكية في موقع وكالتك. يجد العملاء الجولة المناسبة دون تصفح 50+ منتج.',
        },
      },
      {
        key: 'dinnerCruises',
        blurb: {
          en: 'Smart search on your booking page so guests find the right cruise (sunset · standard · iftar · group) instantly.',
          ar: 'بحث ذكي على صفحة الحجز ليجد الضيف الرحلة الصحيحة (غروب · عادية · إفطار · مجموعة) فورًا.',
        },
      },
      {
        key: 'waterSports',
        blurb: {
          en: 'Guests pick the right session (jet ski / parasail / banana / kitesurf) without scrolling.',
          ar: 'يختار الضيف الجلسة المناسبة (جت سكي / باراسيل / بانانا / كايت) بدون تصفح.',
        },
      },
    ],
  },
  'boat-operators': {
    eyebrow: { en: 'The Foxes ecosystem', ar: 'منظومة Foxes' },
    headline: {
      en: 'A complete charter stack.',
      ar: 'منظومة كاملة لتأجير القوارب.',
    },
    sub: {
      en: 'Vessel calendar is the foundation. Voice agent is the differentiator — most charter quotes come by phone or WhatsApp, and you sleep through half of them.',
      ar: 'تقويم السفن هو الأساس. وكيل الصوت هو الفارق — معظم طلبات التأجير تأتي عبر الهاتف أو واتساب، وأنت تنام عن نصفها.',
    },
    picks: [
      {
        key: 'aiVoice',
        blurb: {
          en: 'Charter quote-to-booking automation. Calls answered 24/7, qualified, quoted with deposit link by SMS, calendar updated. Captains stop missing the morning call.',
          ar: 'أتمتة عرض السعر إلى الحجز للتأجير. مكالمات تُرد 24/7، تأهيل، عرض سعر مع رابط دفعة عبر SMS، تحديث التقويم. الكباتن يتوقفون عن تفويت مكالمة الصباح.',
        },
      },
      {
        key: 'aiSearch',
        blurb: {
          en: 'Smart search widget on your site so guests pick the right boat (speedboat · yacht · fishing · sunset) and date in seconds.',
          ar: 'أداة بحث ذكية على موقعك ليختار الضيف القارب المناسب (سرعة · يخت · صيد · غروب) والتاريخ في ثوانٍ.',
        },
      },
      {
        key: 'onlineBooking',
        blurb: {
          en: 'The vessel calendar + deposit flow + channel-manager sync that keeps your fleet booked without double-bookings.',
          ar: 'تقويم السفن + تدفق الدفعة المقدمة + مزامنة مدير القنوات يحافظ على أسطولك محجوزًا دون حجز مزدوج.',
        },
      },
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
