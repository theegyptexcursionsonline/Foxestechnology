import type { OperatorCopy } from '../operators';
import { buildBookingCopy } from './booking-shared';

// Only this trade's own words live here; what the product does is in booking-shared.ts.
export const en: OperatorCopy = buildBookingCopy('en', {
  meta: {
    title: "Booking software for diving centres in Egypt",
    description:
      "A booking system for dive centres in Hurghada, Sharm El Sheikh, Marsa Alam and Dahab. Guests reserve dive trips on your website, each boat trip has its own capacity, and guides and boats are assigned per booking. Access by invitation.",
    ogTitle: "Dive bookings in one place · Foxes Technology",
  },
  hero: {
    badge: "For diving centres in Egypt",
    headlineLine1: "Every dive booking",
    headlineLine2: "in one place.",
    sub: "AI Booking is a booking system for dive centres. Guests reserve dive trips on your website, each boat has its own capacity, and you assign a guide and a boat to every booking.",
  },
  socialProof: { label: "Built for dive centres in", cities: "Hurghada · Sharm El Sheikh · Marsa Alam · Dahab" },
  pains: {
    sectionEyebrow: "The reality of running a dive centre",
    sectionHeadline: "Twelve divers booked. Space for ten.",
    sectionSub: "Bookings by email, WhatsApp and hotel desk never add up to the same boat list.",
  },
  pricing: {
    eyebrow: 'Pricing',
    headline: 'Plans that fit the size of your dive centre.',
    sub: 'Plans scale with your monthly bookings, team size and product range. Tell us how you work and we will recommend the right one.',
    bullets: [
      'Plans scale with your bookings and team',
      'Arabic + English support',
      'Prices confirmed before you sign up',
    ],
    cta: 'Ask us for pricing',
    ctaHref: '/request-access?solution=booking&source=foxestechnology',
    fineprint: 'We share current plans and prices when you request access.',
  },
  leadForm: {
    sectionHeadline: "See AI Booking with your own dive trips.",
    business: "Dive centre name",
    businessPlaceholder: "Your dive centre",
  },
  finalHeadline: "Ready to take dive bookings on your own website?",
  whatsappMessage: "Hi, I'm interested in Foxes AI Booking for my dive centre.",
  emailPlaceholder: "you@yourdivecentre.com",
});

export const ar: OperatorCopy = buildBookingCopy('ar', {
  meta: {
    title: "برنامج حجوزات لمراكز الغوص في مصر",
    description:
      "نظام حجز لمراكز الغوص في الغردقة وشرم الشيخ ومرسى علم ودهب. يحجز الضيوف رحلات الغوص من موقعك، ولكل رحلة قارب سعتها، ويُعيَّن المرشدون والقوارب لكل حجز. الانضمام بدعوة.",
    ogTitle: "حجوزات الغوص في مكان واحد · Foxes Technology",
  },
  hero: {
    badge: "لمراكز الغوص في مصر",
    headlineLine1: "كل حجوزات الغوص",
    headlineLine2: "في مكان واحد.",
    sub: "AI Booking نظام حجز لمراكز الغوص. يحجز الضيوف رحلات الغوص من موقعك، ولكل قارب سعته، وتعيّن مرشدًا وقاربًا لكل حجز.",
  },
  socialProof: { label: "مصمم لمراكز الغوص في", cities: "الغردقة · شرم الشيخ · مرسى علم · دهب" },
  pains: {
    sectionEyebrow: "واقع تشغيل مركز غوص",
    sectionHeadline: "اثنا عشر غواصًا محجوزًا. ومكان لعشرة.",
    sectionSub: "حجوزات البريد وواتساب ومكاتب الفنادق لا تتطابق أبدًا مع قائمة القارب.",
  },
  pricing: {
    eyebrow: 'الأسعار',
    headline: 'باقات تناسب حجم مركز الغوص لديك.',
    sub: 'تتدرّج الباقات حسب عدد حجوزاتك الشهرية وحجم فريقك وتنوّع منتجاتك. أخبرنا كيف تعمل وسنرشّح لك الباقة المناسبة.',
    bullets: [
      'باقات تنمو مع حجوزاتك وفريقك',
      'دعم بالعربية والإنجليزية',
      'تأكيد الأسعار قبل التسجيل',
    ],
    cta: 'اسألنا عن الأسعار',
    ctaHref: '/request-access?solution=booking&source=foxestechnology',
    fineprint: 'نشاركك الباقات والأسعار الحالية عند تقديم طلب الانضمام.',
  },
  leadForm: {
    sectionHeadline: "شاهد AI Booking برحلات الغوص الخاصة بك.",
    business: "اسم مركز الغوص",
    businessPlaceholder: "مركز الغوص الخاص بك",
  },
  finalHeadline: "هل أنت جاهز لاستقبال حجوزات الغوص من موقعك؟",
  whatsappMessage: "مرحبًا، أنا مهتم بنظام AI Booking من Foxes لمركز الغوص.",
  emailPlaceholder: "you@yourdivecentre.com",
});
