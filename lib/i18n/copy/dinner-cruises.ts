import type { OperatorCopy } from '../operators';
import { buildBookingCopy } from './booking-shared';

// Only this trade's own words live here; what the product does is in booking-shared.ts.
export const en: OperatorCopy = buildBookingCopy('en', {
  meta: {
    title: "Booking software for dinner cruise operators in Egypt",
    description:
      "A booking system for Nile dinner cruises and Red Sea dinner boats. Guests reserve a sailing on your website, each sailing has its own capacity, add-ons are priced by the system, and every guest gets a voucher in Arabic or English. Access by invitation.",
    ogTitle: "Fill every sailing · Foxes Technology",
  },
  hero: {
    badge: "For dinner cruise operators in Egypt",
    headlineLine1: "Fill every sailing.",
    headlineLine2: "Take bookings on your own website.",
    sub: "AI Booking is a booking system for dinner cruises. Guests pick a sailing and reserve on your website, each sailing has its own capacity, and add-ons such as a window table or transfers are priced by the system.",
  },
  socialProof: { label: "Built for dinner cruise operators in", cities: "Cairo · Giza · Luxor · Aswan · Hurghada" },
  pains: {
    sectionEyebrow: "The reality of running dinner cruises",
    sectionHeadline: "A full boat on paper. Empty seats on the water.",
    sectionSub: "Bookings arrive by phone, hotel desk and agent, and nobody sees the same number.",
  },
  pricing: {
    eyebrow: 'Pricing',
    headline: 'Plans that fit the size of your operation.',
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
    sectionHeadline: "See AI Booking with your own sailings.",
    business: "Cruise or boat name",
    businessPlaceholder: "Your business name",
  },
  finalHeadline: "Ready to take dinner cruise bookings on your own website?",
  whatsappMessage: "Hi, I'm interested in Foxes AI Booking for my dinner cruise.",
  emailPlaceholder: "you@yourcruise.com",
});

export const ar: OperatorCopy = buildBookingCopy('ar', {
  meta: {
    title: "برنامج حجوزات لمشغّلي رحلات العشاء في مصر",
    description:
      "نظام حجز لرحلات العشاء النيلية وقوارب العشاء في البحر الأحمر. يحجز الضيوف الرحلة من موقعك، ولكل رحلة سعتها، ويسعّر النظام الإضافات، ويصل كل ضيف قسيمة بالعربية أو الإنجليزية. الانضمام بدعوة.",
    ogTitle: "املأ كل رحلة · Foxes Technology",
  },
  hero: {
    badge: "لمشغّلي رحلات العشاء في مصر",
    headlineLine1: "املأ كل رحلة.",
    headlineLine2: "استقبل الحجوزات من موقعك.",
    sub: "AI Booking نظام حجز لرحلات العشاء. يختار الضيف الرحلة ويحجز من موقعك، ولكل رحلة سعتها، ويسعّر النظام الإضافات مثل طاولة بجوار النافذة أو التوصيل.",
  },
  socialProof: { label: "مصمم لمشغّلي رحلات العشاء في", cities: "القاهرة · الجيزة · الأقصر · أسوان · الغردقة" },
  pains: {
    sectionEyebrow: "واقع تشغيل رحلات العشاء",
    sectionHeadline: "قارب ممتلئ على الورق. ومقاعد فارغة على الماء.",
    sectionSub: "تصل الحجوزات بالهاتف ومن مكاتب الفنادق والوكلاء، ولا أحد يرى الرقم نفسه.",
  },
  pricing: {
    eyebrow: 'الأسعار',
    headline: 'باقات تناسب حجم عملك.',
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
    sectionHeadline: "شاهد AI Booking برحلاتك أنت.",
    business: "اسم الرحلة أو القارب",
    businessPlaceholder: "اسم نشاطك",
  },
  finalHeadline: "هل أنت جاهز لاستقبال حجوزات رحلات العشاء من موقعك؟",
  whatsappMessage: "مرحبًا، أنا مهتم بنظام AI Booking من Foxes لرحلات العشاء.",
  emailPlaceholder: "you@yourcruise.com",
});
