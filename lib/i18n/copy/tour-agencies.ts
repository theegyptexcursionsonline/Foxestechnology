import type { OperatorCopy } from '../operators';
import { buildBookingCopy } from './booking-shared';

// Only this trade's own words live here; what the product does is in booking-shared.ts.
export const en: OperatorCopy = buildBookingCopy('en', {
  meta: {
    title: "Booking software for tour agencies in Egypt",
    description:
      "A booking system for tour agencies in Cairo, Hurghada, Luxor and Aswan. Tours, options and prices in one dashboard, a booking widget for your website, vouchers in Arabic or English, and agents who book at a commission. Access by invitation.",
    ogTitle: "All your tours. One dashboard. · Foxes Technology",
  },
  hero: {
    badge: "For tour agencies in Egypt",
    headlineLine1: "All your tours.",
    headlineLine2: "One dashboard.",
    sub: "AI Booking is a booking system for tour agencies. Set up every tour with its options and prices once, take bookings on your website and at the desk, and let agents book at a commission you set.",
  },
  socialProof: { label: "Built for tour agencies in", cities: "Cairo · Hurghada · Luxor · Aswan · Sharm El Sheikh" },
  pains: {
    sectionEyebrow: "The reality of running an agency",
    sectionHeadline: "Forty tours. Five spreadsheets.",
    sectionSub: "Prices in one file, bookings in another and the agent list in a third.",
  },
  pricing: {
    eyebrow: 'Pricing',
    headline: 'Plans that fit the size of your agency.',
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
    sectionHeadline: "See AI Booking with your own tours.",
    business: "Agency name",
    businessPlaceholder: "Your agency",
  },
  finalHeadline: "Ready to run every tour from one dashboard?",
  whatsappMessage: "Hi, I'm interested in Foxes AI Booking for my tour agency.",
  emailPlaceholder: "you@youragency.com",
});

export const ar: OperatorCopy = buildBookingCopy('ar', {
  meta: {
    title: "برنامج حجوزات لوكالات السياحة في مصر",
    description:
      "نظام حجز لوكالات السياحة في القاهرة والغردقة والأقصر وأسوان. الجولات وخياراتها وأسعارها في لوحة واحدة، وأداة حجز لموقعك، وقسائم بالعربية أو الإنجليزية، ووكلاء يحجزون بعمولة. الانضمام بدعوة.",
    ogTitle: "كل جولاتك. لوحة واحدة. · Foxes Technology",
  },
  hero: {
    badge: "لوكالات السياحة في مصر",
    headlineLine1: "كل جولاتك.",
    headlineLine2: "لوحة واحدة.",
    sub: "AI Booking نظام حجز لوكالات السياحة. جهّز كل جولة بخياراتها وأسعارها مرة واحدة، واستقبل الحجوزات من موقعك ومن المكتب، ودع الوكلاء يحجزون بعمولة تحددها أنت.",
  },
  socialProof: { label: "مصمم لوكالات السياحة في", cities: "القاهرة · الغردقة · الأقصر · أسوان · شرم الشيخ" },
  pains: {
    sectionEyebrow: "واقع تشغيل وكالة سياحة",
    sectionHeadline: "أربعون جولة. وخمسة جداول بيانات.",
    sectionSub: "الأسعار في ملف، والحجوزات في ملف آخر، وقائمة الوكلاء في ملف ثالث.",
  },
  pricing: {
    eyebrow: 'الأسعار',
    headline: 'باقات تناسب حجم وكالتك.',
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
    sectionHeadline: "شاهد AI Booking بجولاتك أنت.",
    business: "اسم الوكالة",
    businessPlaceholder: "وكالتك",
  },
  finalHeadline: "هل أنت جاهز لإدارة كل جولاتك من لوحة واحدة؟",
  whatsappMessage: "مرحبًا، أنا مهتم بنظام AI Booking من Foxes لوكالة السياحة.",
  emailPlaceholder: "you@youragency.com",
});
