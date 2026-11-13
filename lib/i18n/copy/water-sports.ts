import type { OperatorCopy } from '../operators';
import { buildBookingCopy } from './booking-shared';

// Only this trade's own words live here; what the product does is in booking-shared.ts.
export const en: OperatorCopy = buildBookingCopy('en', {
  meta: {
    title: "Booking software for water sports operators in Egypt",
    description:
      "A booking system for jet ski, parasailing, kitesurfing, paddleboard and banana boat operators in Hurghada, Sharm El Sheikh, El Gouna and Sahel. Guests reserve a time slot on your website and each slot has its own capacity. Access by invitation.",
    ogTitle: "Fill every time slot · Foxes Technology",
  },
  hero: {
    badge: "For water sports operators in Egypt",
    headlineLine1: "Fill every time slot.",
    headlineLine2: "Take bookings on your own website.",
    sub: "AI Booking is a booking system for water sports. Guests pick a session and a time on your website and reserve it themselves, each slot has its own capacity, and beach-desk bookings share the same availability.",
  },
  socialProof: { label: "Built for water sports operators in", cities: "Hurghada · Sharm El Sheikh · El Gouna · Sahel" },
  pains: {
    sectionEyebrow: "The reality of running water sports",
    sectionHeadline: "A queue at the beach desk. Gaps on the water.",
    sectionSub: "Walk-ins, hotel desks and phone calls all book the same slots from different lists.",
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
    sectionHeadline: "See AI Booking with your own sessions.",
    business: "Water sports centre name",
    businessPlaceholder: "Your business name",
  },
  finalHeadline: "Ready to take session bookings on your own website?",
  whatsappMessage: "Hi, I'm interested in Foxes AI Booking for my water sports business.",
  emailPlaceholder: "you@yourwatersports.com",
});

export const ar: OperatorCopy = buildBookingCopy('ar', {
  meta: {
    title: "برنامج حجوزات لمشغّلي الرياضات المائية في مصر",
    description:
      "نظام حجز لمشغّلي الجت سكي والباراسيلينج والكايت سيرف وألواح التجديف وقوارب الموز في الغردقة وشرم الشيخ والجونة والساحل. يحجز الضيوف موعدًا من موقعك، ولكل موعد سعته. الانضمام بدعوة.",
    ogTitle: "املأ كل موعد · Foxes Technology",
  },
  hero: {
    badge: "لمشغّلي الرياضات المائية في مصر",
    headlineLine1: "املأ كل موعد.",
    headlineLine2: "استقبل الحجوزات من موقعك.",
    sub: "AI Booking نظام حجز للرياضات المائية. يختار الضيف النشاط والوقت من موقعك ويحجز بنفسه، ولكل موعد سعته، وحجوزات مكتب الشاطئ تُخصم من الأماكن نفسها.",
  },
  socialProof: { label: "مصمم لمشغّلي الرياضات المائية في", cities: "الغردقة · شرم الشيخ · الجونة · الساحل" },
  pains: {
    sectionEyebrow: "واقع تشغيل الرياضات المائية",
    sectionHeadline: "طابور عند مكتب الشاطئ. وأوقات فارغة في الماء.",
    sectionSub: "الزبائن المباشرون ومكاتب الفنادق والمكالمات يحجزون المواعيد نفسها من قوائم مختلفة.",
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
    sectionHeadline: "شاهد AI Booking بأنشطتك أنت.",
    business: "اسم مركز الرياضات المائية",
    businessPlaceholder: "اسم نشاطك",
  },
  finalHeadline: "هل أنت جاهز لاستقبال حجوزات أنشطتك من موقعك؟",
  whatsappMessage: "مرحبًا، أنا مهتم بنظام AI Booking من Foxes لنشاط الرياضات المائية.",
  emailPlaceholder: "you@yourwatersports.com",
});
