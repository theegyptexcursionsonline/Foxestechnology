import type { OperatorCopy } from '../operators';
import { buildBookingCopy } from './booking-shared';

// Only this trade's own words live here; what the product does is in booking-shared.ts.
export const en: OperatorCopy = buildBookingCopy('en', {
  meta: {
    title: "Booking software for boat and charter operators in Egypt",
    description:
      "A booking system for speedboat, fishing, sunset cruise and yacht charter operators in Hurghada, Sharm El Sheikh, El Gouna and Dahab. Guests reserve on your website, desk bookings share the same availability, and every guest gets a voucher in Arabic or English. Access by invitation.",
    ogTitle: "Stop double bookings · Foxes Technology",
  },
  hero: {
    badge: "For boat and charter operators in Egypt",
    headlineLine1: "Stop double bookings.",
    headlineLine2: "Take charters on your own website.",
    sub: "AI Booking is a booking system for speedboat, fishing, sunset and yacht charters. Guests reserve on your website, your team adds desk and phone bookings to the same list, and the last place on a boat cannot be sold twice.",
  },
  socialProof: { label: "Built for charter operators in", cities: "Hurghada · Sharm El Sheikh · El Gouna · Dahab" },
  pains: {
    sectionEyebrow: "The reality of running charters",
    sectionHeadline: "Two groups. One boat. Same morning.",
    sectionSub: "A paper diary and a busy phone are how double bookings happen.",
  },
  pricing: {
    eyebrow: 'Pricing',
    headline: 'Plans that fit the size of your fleet.',
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
    sectionHeadline: "See AI Booking with your own charters.",
    business: "Charter or boat operator name",
    businessPlaceholder: "Your business name",
  },
  finalHeadline: "Ready to take charter bookings on your own website?",
  whatsappMessage: "Hi, I'm interested in Foxes AI Booking for my boat / charter business.",
  emailPlaceholder: "you@yourcharter.com",
});

export const ar: OperatorCopy = buildBookingCopy('ar', {
  meta: {
    title: "برنامج حجوزات لمشغّلي القوارب والرحلات البحرية في مصر",
    description:
      "نظام حجز لمشغّلي القوارب السريعة ورحلات الصيد ورحلات الغروب واليخوت في الغردقة وشرم الشيخ والجونة ودهب. يحجز الضيوف من موقعك، وحجوزات المكتب تُخصم من الأماكن نفسها، ويصل كل ضيف قسيمة بالعربية أو الإنجليزية. الانضمام بدعوة.",
    ogTitle: "أوقف الحجز المزدوج · Foxes Technology",
  },
  hero: {
    badge: "لمشغّلي القوارب والرحلات البحرية في مصر",
    headlineLine1: "أوقف الحجز المزدوج.",
    headlineLine2: "استقبل حجوزات رحلاتك من موقعك.",
    sub: "AI Booking نظام حجز لرحلات القوارب السريعة والصيد والغروب واليخوت. يحجز الضيوف من موقعك، ويضيف فريقك حجوزات المكتب والهاتف إلى القائمة نفسها، وآخر مكان على القارب لا يُباع مرتين.",
  },
  socialProof: { label: "مصمم لمشغّلي الرحلات البحرية في", cities: "الغردقة · شرم الشيخ · الجونة · دهب" },
  pains: {
    sectionEyebrow: "واقع تشغيل الرحلات البحرية",
    sectionHeadline: "مجموعتان. قارب واحد. الصباح نفسه.",
    sectionSub: "دفتر ورقي وهاتف لا يهدأ: هكذا يحدث الحجز المزدوج.",
  },
  pricing: {
    eyebrow: 'الأسعار',
    headline: 'باقات تناسب حجم أسطولك.',
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
    business: "اسم شركة القوارب أو الرحلات",
    businessPlaceholder: "اسم نشاطك",
  },
  finalHeadline: "هل أنت جاهز لاستقبال حجوزات رحلاتك من موقعك؟",
  whatsappMessage: "مرحبًا، أنا مهتم بنظام AI Booking من Foxes لنشاط القوارب والرحلات البحرية.",
  emailPlaceholder: "you@yourcharter.com",
});
