export type Locale = 'en' | 'ar';

export type OperatorCategory =
  | 'diving-centres'
  | 'dinner-cruises'
  | 'tour-agencies'
  | 'water-sports'
  | 'boat-operators';

export interface OperatorCopy {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
  };
  hero: {
    badge: string;
    headlineLine1: string;
    headlineLine2: string;
    sub: string;
    primaryCta: string;
    secondaryCta: string;
    pills: string[];
  };
  socialProof: {
    label: string;
    cities: string;
    stats: { value: string; label: string }[];
  };
  pains: {
    sectionEyebrow: string;
    sectionHeadline: string;
    sectionSub: string;
    items: { title: string; description: string }[];
  };
  solutions: {
    sectionEyebrow: string;
    sectionHeadline: string;
    sectionSub: string;
    items: { title: string; description: string; bullets: string[] }[];
  };
  howItWorks: {
    sectionEyebrow: string;
    sectionHeadline: string;
    sectionSub: string;
    steps: { title: string; description: string }[];
  };
  features: {
    sectionEyebrow: string;
    sectionHeadline: string;
    sectionSub: string;
    items: { title: string; description: string }[];
  };
  pricing: {
    eyebrow: string;
    headline: string;
    sub: string;
    bullets: string[];
    cta: string;
    fineprint: string;
  };
  faq: {
    sectionEyebrow: string;
    sectionHeadline: string;
    items: { question: string; answer: string }[];
  };
  leadForm: {
    sectionEyebrow: string;
    sectionHeadline: string;
    sectionSub: string;
    fields: {
      name: string;
      namePlaceholder: string;
      business: string;
      businessPlaceholder: string;
      whatsapp: string;
      whatsappPlaceholder: string;
      monthlyBookings: string;
      monthlyBookingsOptions: { value: string; label: string }[];
    };
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    successWhatsapp: string;
    errorGeneric: string;
    errorRateLimit: string;
    privacy: string;
  };
  finalCta: {
    headline: string;
    sub: string;
    primary: string;
    secondary: string;
  };
  whatsapp: {
    floatLabel: string;
    prefilledMessage: string;
  };
  mobileStickyCta: {
    primary: string;
    secondary: string;
  };
}

import {
  en as tourAgenciesEn,
  ar as tourAgenciesAr,
} from './copy/tour-agencies';
import {
  en as waterSportsEn,
  ar as waterSportsAr,
} from './copy/water-sports';
import {
  en as boatOperatorsEn,
  ar as boatOperatorsAr,
} from './copy/boat-operators';

const en: Partial<Record<OperatorCategory, OperatorCopy>> = {
  'tour-agencies': tourAgenciesEn,
  'water-sports': waterSportsEn,
  'boat-operators': boatOperatorsEn,
  'dinner-cruises': {
    meta: {
      title: 'Booking Software for Dinner Cruise Operators in Egypt',
      description:
        'Built for Nile dinner cruise and Hurghada dinner boat operators. Fill every seat with direct online bookings, manage timeslots and capacity, handle F&B add-ons, and stop giving 30% to OTAs.',
      ogTitle: 'Fill Every Seat · Foxes Technology',
    },
    hero: {
      badge: 'For Dinner Cruise Operators in Egypt',
      headlineLine1: 'Fill Every Seat.',
      headlineLine2: 'Cut OTA Fees in Half.',
      sub: 'The all-in-one platform Egyptian dinner cruise and Felucca operators use to take direct bookings 24/7, manage seatings and capacity, handle F&B preferences, and keep groups happy — without giving up 30% to OTAs.',
      primaryCta: 'Get Started Free',
      secondaryCta: 'Chat on WhatsApp',
      pills: ['No setup fee', 'Free for 30 days', 'Arabic support'],
    },
    socialProof: {
      label: 'Powering dinner cruises across',
      cities: 'Cairo · Luxor · Aswan · Hurghada',
      stats: [
        { value: '300+', label: 'Egyptian operators' },
        { value: 'EGP 20M+', label: 'Bookings processed' },
        { value: '30%', label: 'Average OTA fee saved' },
        { value: '< 2 min', label: 'Booking confirmation' },
      ],
    },
    pains: {
      sectionEyebrow: 'The reality of running a dinner cruise',
      sectionHeadline: 'Empty seats and OTA fees are eating your margin.',
      sectionSub:
        'You did not buy a boat to give 30% of every dinner to a website you cannot control.',
      items: [
        {
          title: 'Empty seats on weeknights',
          description:
            'Off-peak nights have empty tables. Walk-ins do not know about you. OTAs only push you when they want to. You cook for a full house and serve half.',
        },
        {
          title: 'OTA fees eating margin',
          description:
            '25-30% of every Viator and GetYourGuide booking gone before you have sailed. The dinner cost is the same whether they came direct or through an OTA.',
        },
        {
          title: 'Group bookings lost in WhatsApp',
          description:
            'Corporate dinners, bachelor parties, and birthdays disappear in chat threads. No deposit. No menu choice. Last-minute chaos for your kitchen.',
        },
      ],
    },
    solutions: {
      sectionEyebrow: 'How Foxes fixes it',
      sectionHeadline: 'A booking engine that works while you serve dinner.',
      sectionSub:
        'Everything dinner cruise operators need, designed by people who actually run boats.',
      items: [
        {
          title: 'Direct booking engine',
          description:
            'Embed on your site, share a single link, run Meta ads to it. Bookings come straight to you with zero OTA commission.',
          bullets: [
            'Embed widget for any website',
            'Direct payment to your account',
            'Built-in booking page (no website needed)',
          ],
        },
        {
          title: 'Smart seating & capacity',
          description:
            'Per-seating capacity caps. Auto-block when the boat fills up. Per-cruise pricing for high vs low season, weekdays vs weekends.',
          bullets: [
            '7pm · 8pm · 9pm seatings',
            'Dynamic pricing rules',
            'Real-time availability',
          ],
        },
        {
          title: 'Group bookings done right',
          description:
            'Corporate clients pick the menu, pay deposit online, see the seating chart. Your kitchen gets a clean manifest 24 hours ahead.',
          bullets: [
            'Deposit + balance schedule',
            'Per-guest menu choice',
            'Auto-export to chef',
          ],
        },
      ],
    },
    howItWorks: {
      sectionEyebrow: 'Setup is fast',
      sectionHeadline: 'From paper bookings to online seatings in 24 hours.',
      sectionSub:
        'No tech team needed. Most cruises take their first online booking the same day.',
      steps: [
        {
          title: 'Sign up in 5 minutes',
          description:
            'Create your operator profile. Add your boats, capacity, and seating times.',
        },
        {
          title: 'Set menus & pricing',
          description:
            'Upload your menus, F&B add-ons, and per-night pricing. Or start simple — both work.',
        },
        {
          title: 'Take direct bookings',
          description:
            'Embed the widget on your site, share your direct link, or run ads straight to your booking page.',
        },
      ],
    },
    features: {
      sectionEyebrow: 'Designed for dinner cruises',
      sectionHeadline: 'Every feature, built for the way you actually serve.',
      sectionSub:
        'Generic booking tools treat a Nile cruise like a museum ticket. Foxes does not.',
      items: [
        {
          title: 'Per-seating capacity caps',
          description: 'Cap each seating independently. Auto-close when full.',
        },
        {
          title: 'F&B add-ons selector',
          description: 'Vegetarian, halal, allergies, birthday cakes, drinks packages.',
        },
        {
          title: 'Group rates & deposits',
          description: 'Tiered group pricing with deposit + balance schedules.',
        },
        {
          title: 'Dock pickup logistics',
          description: 'Auto-reminder SMS with dock location and arrival time.',
        },
        {
          title: 'Dynamic seasonal pricing',
          description: 'High season weekends, holidays, Ramadan iftar cruises — all priced separately.',
        },
        {
          title: 'Manifest export for chef',
          description: 'Daily PDF manifest with menu choices, allergies, group sizes.',
        },
        {
          title: 'OTA channel manager',
          description: 'Sync inventory across Viator, GetYourGuide, and TripAdvisor in one place.',
        },
        {
          title: 'Multi-boat fleet support',
          description: 'Run 1 boat or 12 boats from a single dashboard.',
        },
      ],
    },
    pricing: {
      eyebrow: 'Pricing',
      headline: 'Free for 30 days. No card required.',
      sub: 'After your trial, simple transparent pricing — no per-seat traps, no setup fees.',
      bullets: [
        'Unlimited bookings during trial',
        'Full feature access',
        'Arabic + English support',
        'Cancel anytime',
      ],
      cta: 'Start free trial',
      fineprint:
        'No credit card needed to start. Pricing shared after a 15-minute call so we can match your volume.',
    },
    faq: {
      sectionEyebrow: 'Questions you should ask',
      sectionHeadline: 'Honest answers.',
      items: [
        {
          question: 'How long does setup actually take?',
          answer:
            'Most dinner cruise operators are live within 24 hours. The longest part is uploading your menu and pricing rules — and we help you do it. If you have an existing system, we will migrate your data for free.',
        },
        {
          question: 'Can I keep the OTAs and add direct bookings on top?',
          answer:
            'Yes — and that is exactly what most operators do. Foxes plugs into Viator, GetYourGuide, and TripAdvisor through our channel manager, so you keep the OTA traffic AND start taking direct bookings that bypass the 30% commission.',
        },
        {
          question: 'Can I manage multiple boats and fleets?',
          answer:
            'Yes. Run one boat or twelve from a single dashboard. Each boat has its own capacity, seatings, and pricing. Customers see availability across the whole fleet on a single booking page.',
        },
        {
          question: 'What about Arabic-speaking customers and group WhatsApp bookings?',
          answer:
            'Your customer-facing booking page runs natively in Arabic with right-to-left layout. For groups that prefer WhatsApp, we provide a quick-quote link your team can paste into chat — the customer pays online and the booking appears in your dashboard.',
        },
        {
          question: 'How are no-shows and cancellations handled?',
          answer:
            'You set the policy: full refund, partial, no refund, with windows you control. Foxes captures payment up front and applies your policy automatically. Manifest updates in real time when someone cancels.',
        },
        {
          question: 'How are F&B special requests handled?',
          answer:
            'Customers select from your menu and flag allergies, vegetarian, halal, or birthday cakes during booking. Your kitchen gets a daily manifest PDF with every special request grouped by seating.',
        },
        {
          question: 'Does it work with Fawry, Vodafone Cash, or Instapay?',
          answer:
            'Yes. Foxes supports Stripe, Paymob, Fawry, Vodafone Cash, Instapay, and direct bank transfer. Use what your customers actually use.',
        },
        {
          question: 'What happens when weather forces a cancellation?',
          answer:
            'One click cancels a seating across all channels. Customers are auto-notified, refunds or rebookings happen by your policy, and the OTAs are updated through the channel manager.',
        },
      ],
    },
    leadForm: {
      sectionEyebrow: 'Ready when you are',
      sectionHeadline: 'See Foxes in action — with your cruise data.',
      sectionSub:
        'Tell us where you operate. We will WhatsApp you a 15-minute walkthrough within the hour.',
      fields: {
        name: 'Your name',
        namePlaceholder: 'Ahmed Hassan',
        business: 'Cruise / boat operator name',
        businessPlaceholder: 'Nile Pearl Dinner Cruises',
        whatsapp: 'WhatsApp number',
        whatsappPlaceholder: '+20 100 000 0000',
        monthlyBookings: 'Monthly bookings (roughly)',
        monthlyBookingsOptions: [
          { value: 'lt-50', label: 'Less than 50' },
          { value: '50-200', label: '50 to 200' },
          { value: '200-500', label: '200 to 500' },
          { value: '500-plus', label: '500 or more' },
        ],
      },
      submit: 'Get my walkthrough',
      submitting: 'Sending...',
      successTitle: 'Got it. Saif from our team will WhatsApp you within the hour.',
      successBody: 'You can also start the conversation now if you prefer:',
      successWhatsapp: 'Open WhatsApp',
      errorGeneric: 'Something went wrong. Please try again or message us on WhatsApp directly.',
      errorRateLimit: 'Too many submissions. Please wait a moment and try again.',
      privacy:
        'By submitting you agree to be contacted by the Foxes team. We never share your data. One message, then no spam.',
    },
    finalCta: {
      headline: 'Ready to fill every seat — and keep the margin?',
      sub: 'Join the dinner cruise operators in Cairo, Luxor, Aswan and Hurghada who took control of their bookings.',
      primary: 'Start free trial',
      secondary: 'Talk to us on WhatsApp',
    },
    whatsapp: {
      floatLabel: 'Chat with us',
      prefilledMessage: "Hi, I'm interested in Foxes for my dinner cruise.",
    },
    mobileStickyCta: {
      primary: 'Get started free',
      secondary: 'WhatsApp',
    },
  },
  'diving-centres': {
    meta: {
      title: 'Booking Software for Diving Centres in Egypt',
      description:
        'Built for dive operators in Hurghada, Sharm El Sheikh, Marsa Alam and Dahab. Manage PADI/SSI certifications, equipment rentals, multi-day courses and divemaster shifts in one place.',
      ogTitle: 'Built for Dive Operators · Foxes Technology',
    },
    hero: {
      badge: 'For Diving Centres in Egypt',
      headlineLine1: 'Built for Dive Operators.',
      headlineLine2: 'Certs, Rentals, Bookings — One Place.',
      sub: 'The all-in-one platform Egyptian dive centres use to manage PADI & SSI certifications, equipment rentals, multi-day courses, and divemaster scheduling — without the paper chaos.',
      primaryCta: 'Get Started Free',
      secondaryCta: 'Chat on WhatsApp',
      pills: ['No setup fee', 'Free for 30 days', 'Arabic support'],
    },
    socialProof: {
      label: 'Trusted by dive centres across',
      cities: 'Hurghada · Sharm El Sheikh · Marsa Alam · Dahab',
      stats: [
        { value: '300+', label: 'Egyptian operators' },
        { value: 'EGP 20M+', label: 'Bookings processed' },
        { value: '99.9%', label: 'Uptime SLA' },
        { value: '< 2 min', label: 'Average response time' },
      ],
    },
    pains: {
      sectionEyebrow: 'The reality of running a dive centre',
      sectionHeadline: 'You did not get into diving for the paperwork.',
      sectionSub: 'Yet most of your day is lost to certs, rental tracking, and scheduling chaos.',
      items: [
        {
          title: 'Paper certification chaos',
          description:
            'PADI and SSI cards stuffed in folders. Lost certs at check-in. Divers waiting at the dock while you flip through binders.',
        },
        {
          title: 'Equipment goes missing',
          description:
            'Tanks, BCDs, regulators rented on paper. By Friday nobody knows what came back, what is broken, and what is on the boat.',
        },
        {
          title: 'Schedules collide',
          description:
            'Open Water and Advanced courses overlap. Divemasters double-booked. One sick day and the whole week unravels.',
        },
      ],
    },
    solutions: {
      sectionEyebrow: 'How Foxes fixes it',
      sectionHeadline: 'A clean dashboard. A calm dive centre.',
      sectionSub: 'Everything dive operators need, designed by people who actually run dive shops.',
      items: [
        {
          title: 'Digital certification vault',
          description:
            'Scan or upload PADI / SSI cards once. Auto-verify, auto-flag expired certs, instant pull-up at check-in.',
          bullets: [
            'PADI & SSI lookup',
            'Expiry alerts',
            'Insurance & medical clearance attached',
          ],
        },
        {
          title: 'Equipment availability dashboard',
          description:
            'Live view of every tank, BCD, reg and wetsuit. Know what is rented, what is in service, what is on the boat right now.',
          bullets: [
            'Per-item rental history',
            'Service-due alerts',
            'Damage & loss tracking',
          ],
        },
        {
          title: 'Multi-day course scheduler',
          description:
            'Drag-and-drop courses across days. Foxes blocks divemaster collisions automatically and emails students confirmations.',
          bullets: [
            'Open Water · Advanced · Rescue · Divemaster',
            'Auto conflict detection',
            'Student progress tracking',
          ],
        },
      ],
    },
    howItWorks: {
      sectionEyebrow: 'Setup is fast',
      sectionHeadline: 'From paper chaos to live bookings in 24 hours.',
      sectionSub: 'No tech team needed. Most centres are taking online bookings the same day.',
      steps: [
        {
          title: 'Sign up in 5 minutes',
          description:
            'Create your dive centre profile. Add your team, your boats, your dive sites.',
        },
        {
          title: 'Import your inventory',
          description:
            'Upload equipment list, course catalog, and existing customers. Or start fresh — both work.',
        },
        {
          title: 'Take bookings online',
          description:
            'Embed the booking widget on your site, share your direct link, or manage walk-ins from the dashboard.',
        },
      ],
    },
    features: {
      sectionEyebrow: 'Designed for diving',
      sectionHeadline: 'Every feature, built for the way you actually work.',
      sectionSub: 'Generic booking tools treat a dive trip like a city tour. Foxes does not.',
      items: [
        {
          title: 'PADI & SSI certification verification',
          description: 'Scan once, verify forever. Auto-pull from the global database where supported.',
        },
        {
          title: 'Equipment rental tracker',
          description: 'Per-item availability with service intervals, damage notes, and rental history.',
        },
        {
          title: 'Multi-day course scheduler',
          description: 'Open Water, Advanced, Rescue, Divemaster, IDC — all the way to instructor.',
        },
        {
          title: 'Divemaster shift planning',
          description: 'Drag-and-drop weekly schedules. Auto-fill from preferences. Coverage alerts.',
        },
        {
          title: 'Insurance & medical clearance',
          description: 'Digital forms attached to every diver. Customs and harbour-side audits ready.',
        },
        {
          title: 'Dive site catalog',
          description: 'Depths, currents, marine life, conditions today. Customers see what they are signing up for.',
        },
        {
          title: 'Group bookings & liveaboards',
          description: 'Multi-cabin, multi-day group bookings with deposits, balance reminders, and rooming lists.',
        },
        {
          title: 'Customer dive log integration',
          description: 'Auto-stamp every dive into your customer’s digital logbook. They come back. They tell friends.',
        },
      ],
    },
    pricing: {
      eyebrow: 'Pricing',
      headline: 'Free for 30 days. No card required.',
      sub: 'After your trial, simple transparent pricing — no per-seat traps, no setup fees.',
      bullets: [
        'Unlimited bookings during trial',
        'Full feature access',
        'Arabic + English support',
        'Cancel anytime',
      ],
      cta: 'Start free trial',
      fineprint: 'No credit card needed to start. Pricing shared after a 15-minute call so we can match your volume.',
    },
    faq: {
      sectionEyebrow: 'Questions you should ask',
      sectionHeadline: 'Honest answers.',
      items: [
        {
          question: 'How long does setup actually take?',
          answer:
            'Most dive centres are live in 24 hours. The longest part is uploading your equipment list — and we help you do it. If you have an existing system, we will migrate your data for free.',
        },
        {
          question: 'Do you support PADI eLearning integration?',
          answer:
            'Yes. We hook into the PADI Pro Portal so eLearning progress, certification cards, and student records flow into Foxes automatically. SSI integration is on the roadmap for Q3.',
        },
        {
          question: 'Can I keep my existing payment processor?',
          answer:
            'Yes. Foxes supports Stripe, Paymob, Fawry, Vodafone Cash, Instapay, and direct bank transfer. Use what you already use, or let us recommend the cheapest option for Egyptian operators.',
        },
        {
          question: 'Does it really work in Arabic?',
          answer:
            'Yes — the full operator dashboard, customer-facing booking pages, emails, and SMS all run natively in Arabic with right-to-left layout. Your team picks their language. Each customer picks theirs.',
        },
        {
          question: 'What happens to my historical bookings and customer data?',
          answer:
            'We migrate it. CSV from any system, Excel, even paper records — our team imports it for you for free during onboarding. Nothing gets left behind.',
        },
        {
          question: 'How is this different from generic booking software?',
          answer:
            'Generic tools treat a dive trip like a city tour. Foxes was built with dive operators in Hurghada and Sharm. Equipment tracking, certification handling, divemaster scheduling, dive site catalogs — none of that is in Bookeo or Rezdy.',
        },
        {
          question: 'What is the fee after the trial?',
          answer:
            'A small percentage per online transaction — no monthly fees, no setup, no per-seat charges. We share the exact number on a 15-minute call so we can match your volume.',
        },
        {
          question: 'Do you support liveaboards and dive safari boats?',
          answer:
            'Yes. Multi-day, multi-cabin bookings with deposits, balance schedules, rooming lists, dietary requirements, and per-trip equipment manifests are all built in.',
        },
      ],
    },
    leadForm: {
      sectionEyebrow: 'Ready when you are',
      sectionHeadline: 'See Foxes in action — with your dive centre data.',
      sectionSub: 'Tell us where you operate. We will WhatsApp you a 15-minute walkthrough within the hour.',
      fields: {
        name: 'Your name',
        namePlaceholder: 'Ahmed Hassan',
        business: 'Dive centre name',
        businessPlaceholder: 'Red Sea Divers Hurghada',
        whatsapp: 'WhatsApp number',
        whatsappPlaceholder: '+20 100 000 0000',
        monthlyBookings: 'Monthly bookings (roughly)',
        monthlyBookingsOptions: [
          { value: 'lt-50', label: 'Less than 50' },
          { value: '50-200', label: '50 to 200' },
          { value: '200-500', label: '200 to 500' },
          { value: '500-plus', label: '500 or more' },
        ],
      },
      submit: 'Get my walkthrough',
      submitting: 'Sending...',
      successTitle: 'Got it. Saif from our team will WhatsApp you within the hour.',
      successBody: 'You can also start the conversation now if you prefer:',
      successWhatsapp: 'Open WhatsApp',
      errorGeneric: 'Something went wrong. Please try again or message us on WhatsApp directly.',
      errorRateLimit: 'Too many submissions. Please wait a moment and try again.',
      privacy:
        'By submitting you agree to be contacted by the Foxes team. We never share your data. One message, then no spam.',
    },
    finalCta: {
      headline: 'Ready to run your dive centre like the best in the Red Sea?',
      sub: 'Join the operators in Hurghada, Sharm, Marsa Alam and Dahab who left the paper chaos behind.',
      primary: 'Start free trial',
      secondary: 'Talk to us on WhatsApp',
    },
    whatsapp: {
      floatLabel: 'Chat with us',
      prefilledMessage: "Hi, I'm interested in Foxes for my diving centre.",
    },
    mobileStickyCta: {
      primary: 'Get started free',
      secondary: 'WhatsApp',
    },
  },
};

const ar: Partial<Record<OperatorCategory, OperatorCopy>> = {
  'tour-agencies': tourAgenciesAr,
  'water-sports': waterSportsAr,
  'boat-operators': boatOperatorsAr,
  'dinner-cruises': {
    meta: {
      title: 'برنامج حجوزات لمشغلي رحلات العشاء النيلية في مصر',
      description:
        'مصمم لمشغلي رحلات العشاء النيلية وقوارب العشاء في الغردقة. املأ كل مقعد بحجوزات مباشرة، وأدر المواعيد والسعة، وتعامل مع طلبات الطعام، وتوقف عن دفع 30% للوسطاء.',
      ogTitle: 'املأ كل مقعد · Foxes Technology',
    },
    hero: {
      badge: 'لمشغلي رحلات العشاء في مصر',
      headlineLine1: 'املأ كل مقعد.',
      headlineLine2: 'خفّض عمولات OTA إلى النصف.',
      sub: 'المنصة المتكاملة التي يستخدمها مشغلو رحلات العشاء النيلية والفلوكا في مصر لاستقبال الحجوزات المباشرة 24/7، وإدارة المواعيد والسعة، والتعامل مع تفضيلات الطعام، وإسعاد المجموعات — بدون التنازل عن 30% للوسطاء.',
      primaryCta: 'ابدأ مجانًا',
      secondaryCta: 'تحدث معنا عبر واتساب',
      pills: ['بدون رسوم تركيب', 'مجاني لمدة 30 يومًا', 'دعم باللغة العربية'],
    },
    socialProof: {
      label: 'يشغّل رحلات العشاء في',
      cities: 'القاهرة · الأقصر · أسوان · الغردقة',
      stats: [
        { value: '+300', label: 'مشغّل مصري' },
        { value: '+20 مليون ج.م', label: 'حجوزات تمت معالجتها' },
        { value: '30%', label: 'متوسط العمولة الموفرة' },
        { value: 'أقل من دقيقتين', label: 'تأكيد الحجز' },
      ],
    },
    pains: {
      sectionEyebrow: 'واقع تشغيل رحلة عشاء',
      sectionHeadline: 'المقاعد الفارغة وعمولات OTA تأكل أرباحك.',
      sectionSub: 'لم تشترِ قاربًا لتعطي 30% من كل عشاء لموقع لا تتحكم به.',
      items: [
        {
          title: 'مقاعد فارغة في الأيام العادية',
          description:
            'الليالي خارج الذروة فيها طاولات فارغة. الزبائن العابرون لا يعرفونك. الـ OTAs تروّج لك فقط حين تريد. تطبخ لقاعة كاملة وتقدّم لنصفها.',
        },
        {
          title: 'عمولات OTA تأكل الهامش',
          description:
            '25-30% من كل حجز Viator أو GetYourGuide تذهب قبل أن تبحر. تكلفة العشاء واحدة، سواء جاء العميل مباشرة أو عبر OTA.',
        },
        {
          title: 'حجوزات المجموعات تضيع في واتساب',
          description:
            'حجوزات الشركات وحفلات التخرج وأعياد الميلاد تختفي في محادثات. لا دفعة مقدمة. لا اختيار قائمة. فوضى لحظية في المطبخ.',
        },
      ],
    },
    solutions: {
      sectionEyebrow: 'كيف يحل Foxes ذلك',
      sectionHeadline: 'محرك حجوزات يعمل بينما تقدّم العشاء.',
      sectionSub: 'كل ما يحتاجه مشغلو رحلات العشاء، صُمم بأيدي أناس يديرون قوارب فعلًا.',
      items: [
        {
          title: 'محرك حجوزات مباشر',
          description:
            'ضمّنه في موقعك، شارك رابطًا واحدًا، شغّل إعلانات Meta عليه. الحجوزات تأتيك مباشرة بدون أي عمولة OTA.',
          bullets: [
            'أداة تضمين لأي موقع',
            'دفع مباشر إلى حسابك',
            'صفحة حجز مدمجة (بدون موقع)',
          ],
        },
        {
          title: 'إدارة ذكية للمقاعد والسعة',
          description:
            'حدود سعة لكل ميعاد. إغلاق تلقائي حين يمتلئ القارب. تسعير لكل رحلة بحسب الموسم العالي والمنخفض ونهاية الأسبوع.',
          bullets: [
            'مواعيد 7 و 8 و 9 مساءً',
            'قواعد تسعير ديناميكية',
            'توفر فوري',
          ],
        },
        {
          title: 'حجوزات المجموعات بشكل صحيح',
          description:
            'عملاء الشركات يختارون القائمة، ويدفعون الدفعة المقدمة أونلاين، ويرون مخطط الجلوس. مطبخك يحصل على قائمة نظيفة قبل 24 ساعة.',
          bullets: [
            'جدول دفعات مقدمة وأرصدة',
            'اختيار قائمة لكل ضيف',
            'تصدير تلقائي للشيف',
          ],
        },
      ],
    },
    howItWorks: {
      sectionEyebrow: 'الإعداد سريع',
      sectionHeadline: 'من حجوزات ورقية إلى مواعيد أونلاين خلال 24 ساعة.',
      sectionSub: 'بدون فريق تقني. معظم المشغلين يستقبلون أول حجز أونلاين في نفس اليوم.',
      steps: [
        {
          title: 'اشترك خلال 5 دقائق',
          description: 'أنشئ ملف المشغّل. أضف قواربك، السعة، ومواعيد الجلسات.',
        },
        {
          title: 'أضف القوائم والأسعار',
          description:
            'ارفع قوائمك وإضافات الطعام والتسعير لكل ليلة. أو ابدأ ببساطة — كلاهما يعمل.',
        },
        {
          title: 'استقبل حجوزات مباشرة',
          description:
            'ضمّن الأداة في موقعك، شارك رابطك، أو شغّل إعلانات مباشرة على صفحة الحجز.',
        },
      ],
    },
    features: {
      sectionEyebrow: 'مصمم لرحلات العشاء',
      sectionHeadline: 'كل ميزة، مصممة لطريقة عملك الفعلية.',
      sectionSub:
        'الأدوات العامة تتعامل مع رحلة نيلية كأنها تذكرة متحف. Foxes لا يفعل ذلك.',
      items: [
        {
          title: 'حدود سعة لكل ميعاد',
          description: 'حدد سعة كل ميعاد بشكل مستقل. إغلاق تلقائي حين يمتلئ.',
        },
        {
          title: 'محدد إضافات الطعام',
          description: 'نباتي، حلال، حساسية، كعكة عيد ميلاد، باقات مشروبات.',
        },
        {
          title: 'أسعار المجموعات والدفعات',
          description: 'تسعير مجموعات متدرج مع جداول دفعات مقدمة وأرصدة.',
        },
        {
          title: 'لوجستيات الرصيف',
          description: 'تذكير SMS تلقائي بموقع الرصيف ووقت الوصول.',
        },
        {
          title: 'تسعير موسمي ديناميكي',
          description: 'نهاية الأسبوع في الموسم العالي، الأعياد، رحلات إفطار رمضان — كلها مسعّرة بشكل منفصل.',
        },
        {
          title: 'تصدير قائمة المطبخ',
          description: 'PDF يومي بكل اختيارات القائمة والحساسية وأحجام المجموعات.',
        },
        {
          title: 'إدارة قنوات OTA',
          description: 'مزامنة المخزون عبر Viator و GetYourGuide و TripAdvisor في مكان واحد.',
        },
        {
          title: 'دعم الأسطول متعدد القوارب',
          description: 'شغّل قاربًا واحدًا أو 12 قاربًا من لوحة تحكم واحدة.',
        },
      ],
    },
    pricing: {
      eyebrow: 'الأسعار',
      headline: 'مجاني لمدة 30 يومًا. بدون بطاقة.',
      sub: 'بعد التجربة، تسعير شفاف بسيط — بدون مصائد لكل مقعد، بدون رسوم تركيب.',
      bullets: [
        'حجوزات غير محدودة خلال التجربة',
        'وصول كامل لكل المزايا',
        'دعم بالعربية والإنجليزية',
        'إلغاء في أي وقت',
      ],
      cta: 'ابدأ التجربة المجانية',
      fineprint:
        'بدون بطاقة ائتمان للبدء. التسعير يُشارَك بعد مكالمة 15 دقيقة لنطابق حجم عملك.',
    },
    faq: {
      sectionEyebrow: 'أسئلة يجب أن تسألها',
      sectionHeadline: 'إجابات صريحة.',
      items: [
        {
          question: 'كم تستغرق عملية الإعداد فعلًا؟',
          answer:
            'معظم مشغلي رحلات العشاء يعملون خلال 24 ساعة. الجزء الأطول هو رفع قائمتك وقواعد التسعير — ونحن نساعدك. إن كان لديك نظام حالي، ننقل بياناتك مجانًا.',
        },
        {
          question: 'هل أحتفظ بـ OTAs وأضيف الحجوزات المباشرة فوقها؟',
          answer:
            'نعم — وهذا ما يفعله معظم المشغلين. Foxes يتصل بـ Viator و GetYourGuide و TripAdvisor عبر مدير القنوات، فتحتفظ بحركة OTA وتبدأ في استقبال حجوزات مباشرة تتجاوز عمولة الـ30%.',
        },
        {
          question: 'هل أستطيع إدارة عدة قوارب وأساطيل؟',
          answer:
            'نعم. شغّل قاربًا واحدًا أو 12 قاربًا من لوحة تحكم واحدة. كل قارب له سعته ومواعيده وتسعيره. العملاء يرون التوفر عبر الأسطول كله في صفحة حجز واحدة.',
        },
        {
          question: 'ماذا عن العملاء العرب وحجوزات المجموعات في واتساب؟',
          answer:
            'صفحة الحجز للعميل تعمل بالعربية الأصلية مع تخطيط من اليمين إلى اليسار. للمجموعات التي تفضل واتساب، نوفر رابط عرض سعر سريع يلصقه فريقك في المحادثة — العميل يدفع أونلاين والحجز يظهر في لوحتك.',
        },
        {
          question: 'كيف يتم التعامل مع عدم الحضور والإلغاءات؟',
          answer:
            'تحدد السياسة: استرداد كامل، جزئي، بدون استرداد، بنوافذ تتحكم بها. Foxes يأخذ الدفع مقدمًا ويطبق سياستك تلقائيًا. القائمة تتحدث فوريًا حين يلغي شخص.',
        },
        {
          question: 'كيف يتم التعامل مع طلبات الطعام الخاصة؟',
          answer:
            'العملاء يختارون من قائمتك ويذكرون الحساسية أو النباتي أو الحلال أو كعك أعياد الميلاد عند الحجز. مطبخك يحصل على PDF يومي بكل طلب خاص مجمع حسب الميعاد.',
        },
        {
          question: 'هل يعمل مع Fawry و Vodafone Cash و Instapay؟',
          answer:
            'نعم. يدعم Foxes Stripe و Paymob و Fawry و Vodafone Cash و Instapay والتحويل البنكي المباشر. استخدم ما يستخدمه عملاؤك فعلًا.',
        },
        {
          question: 'ماذا يحدث حين يُجبر الطقس على الإلغاء؟',
          answer:
            'نقرة واحدة تلغي ميعادًا عبر كل القنوات. العملاء يُبلَّغون تلقائيًا، الاسترداد أو إعادة الحجز يحدث وفق سياستك، والـ OTAs تتحدث عبر مدير القنوات.',
        },
      ],
    },
    leadForm: {
      sectionEyebrow: 'جاهزون متى تكون',
      sectionHeadline: 'شاهد Foxes في العمل — ببيانات رحلتك.',
      sectionSub: 'أخبرنا أين تعمل. سنرسل لك جولة 15 دقيقة عبر واتساب خلال ساعة.',
      fields: {
        name: 'اسمك',
        namePlaceholder: 'أحمد حسن',
        business: 'اسم المشغّل / القارب',
        businessPlaceholder: 'Nile Pearl Dinner Cruises',
        whatsapp: 'رقم واتساب',
        whatsappPlaceholder: '+20 100 000 0000',
        monthlyBookings: 'الحجوزات الشهرية (تقريبًا)',
        monthlyBookingsOptions: [
          { value: 'lt-50', label: 'أقل من 50' },
          { value: '50-200', label: 'من 50 إلى 200' },
          { value: '200-500', label: 'من 200 إلى 500' },
          { value: '500-plus', label: '500 أو أكثر' },
        ],
      },
      submit: 'احجز جولتي',
      submitting: 'جاري الإرسال...',
      successTitle: 'تم استلام طلبك. سيف من فريقنا سيتواصل معك على واتساب خلال ساعة.',
      successBody: 'يمكنك أيضًا بدء المحادثة الآن إن أردت:',
      successWhatsapp: 'افتح واتساب',
      errorGeneric: 'حدث خطأ. حاول مرة أخرى أو راسلنا على واتساب مباشرة.',
      errorRateLimit: 'محاولات كثيرة. انتظر لحظة ثم حاول مرة أخرى.',
      privacy:
        'بإرسالك توافق على تواصل فريق Foxes معك. لا نشارك بياناتك أبدًا. رسالة واحدة، ثم لا إزعاج.',
    },
    finalCta: {
      headline: 'مستعد لتملأ كل مقعد — وتحتفظ بالهامش؟',
      sub: 'انضم إلى مشغلي رحلات العشاء في القاهرة والأقصر وأسوان والغردقة الذين تحكموا بحجوزاتهم.',
      primary: 'ابدأ التجربة المجانية',
      secondary: 'تحدث معنا على واتساب',
    },
    whatsapp: {
      floatLabel: 'تحدث معنا',
      prefilledMessage: 'مرحبًا، أنا مهتم بـ Foxes لرحلة العشاء الخاصة بي.',
    },
    mobileStickyCta: {
      primary: 'ابدأ مجانًا',
      secondary: 'واتساب',
    },
  },
  'diving-centres': {
    meta: {
      title: 'برنامج حجوزات لمراكز الغوص في مصر',
      description:
        'مصمم لمراكز الغوص في الغردقة وشرم الشيخ ومرسى علم ودهب. أدر شهادات PADI و SSI، وإيجار المعدات، والدورات متعددة الأيام، وجدولة مدربي الغوص في مكان واحد.',
      ogTitle: 'مصمم لمراكز الغوص · Foxes Technology',
    },
    hero: {
      badge: 'لمراكز الغوص في مصر',
      headlineLine1: 'مصمم لمراكز الغوص.',
      headlineLine2: 'الشهادات والمعدات والحجوزات في مكان واحد.',
      sub: 'المنصة المتكاملة التي تستخدمها مراكز الغوص المصرية لإدارة شهادات PADI و SSI، وإيجار المعدات، والدورات متعددة الأيام، وجدولة مدربي الغوص — بدون فوضى الأوراق.',
      primaryCta: 'ابدأ مجانًا',
      secondaryCta: 'تحدث معنا عبر واتساب',
      pills: ['بدون رسوم تركيب', 'مجاني لمدة 30 يومًا', 'دعم باللغة العربية'],
    },
    socialProof: {
      label: 'موثوق به من مراكز الغوص في',
      cities: 'الغردقة · شرم الشيخ · مرسى علم · دهب',
      stats: [
        { value: '+300', label: 'مشغّل مصري' },
        { value: '+20 مليون ج.م', label: 'حجوزات تمت معالجتها' },
        { value: '99.9%', label: 'وقت تشغيل مضمون' },
        { value: 'أقل من دقيقتين', label: 'متوسط وقت الاستجابة' },
      ],
    },
    pains: {
      sectionEyebrow: 'واقع إدارة مركز غوص',
      sectionHeadline: 'لم تدخل عالم الغوص لأجل الأوراق.',
      sectionSub: 'ومع ذلك معظم يومك يضيع في الشهادات وتتبع الإيجارات وفوضى الجدولة.',
      items: [
        {
          title: 'فوضى شهادات ورقية',
          description:
            'بطاقات PADI و SSI محشورة في ملفات. شهادات ضائعة عند تسجيل الوصول. الغواصون ينتظرون عند الرصيف بينما تقلّب أنت في الملفات.',
        },
        {
          title: 'المعدات تختفي',
          description:
            'الأسطوانات وسترات النجاة والمنظمات تُؤجَّر على ورق. بحلول الجمعة لا أحد يعرف ما الذي عاد، وما هو معطوب، وما هو على القارب.',
        },
        {
          title: 'الجداول تتعارض',
          description:
            'دورات Open Water و Advanced تتداخل. مدربو الغوص محجوزون مرتين. يوم مرض واحد ويتفكك الأسبوع كله.',
        },
      ],
    },
    solutions: {
      sectionEyebrow: 'كيف يحل Foxes ذلك',
      sectionHeadline: 'لوحة تحكم نظيفة. مركز غوص هادئ.',
      sectionSub: 'كل ما يحتاجه مشغّلو الغوص، صُمم بأيدي أناس يديرون مراكز غوص فعلًا.',
      items: [
        {
          title: 'خزنة شهادات رقمية',
          description:
            'امسح أو ارفع بطاقات PADI / SSI مرة واحدة. تحقق تلقائي، وتنبيه فوري للشهادات المنتهية، واسترجاع لحظي عند تسجيل الوصول.',
          bullets: [
            'بحث في PADI و SSI',
            'تنبيهات انتهاء الصلاحية',
            'إرفاق التأمين والإذن الطبي',
          ],
        },
        {
          title: 'لوحة توفر المعدات',
          description:
            'عرض حي لكل أسطوانة وسترة ومنظم وبدلة غطس. اعرف ما هو مؤجَّر، وما هو في الصيانة، وما هو على القارب الآن.',
          bullets: [
            'سجل إيجار لكل قطعة',
            'تنبيهات الصيانة',
            'تتبع التلف والفقد',
          ],
        },
        {
          title: 'مجدول الدورات متعددة الأيام',
          description:
            'اسحب وأفلت الدورات عبر الأيام. يمنع Foxes تعارض مدربي الغوص تلقائيًا ويُرسل تأكيدات للطلاب بالبريد.',
          bullets: [
            'Open Water · Advanced · Rescue · Divemaster',
            'كشف تلقائي للتعارضات',
            'تتبع تقدم الطلاب',
          ],
        },
      ],
    },
    howItWorks: {
      sectionEyebrow: 'الإعداد سريع',
      sectionHeadline: 'من فوضى الورق إلى حجوزات مباشرة خلال 24 ساعة.',
      sectionSub: 'بدون فريق تقني. معظم المراكز تتلقى حجوزات أونلاين في نفس اليوم.',
      steps: [
        {
          title: 'اشترك خلال 5 دقائق',
          description:
            'أنشئ ملف مركز الغوص. أضف فريقك، قواربك، ومواقع الغوص الخاصة بك.',
        },
        {
          title: 'استورد مخزونك',
          description:
            'ارفع قائمة المعدات، وكتالوج الدورات، وعملاءك الحاليين. أو ابدأ من الصفر — كلاهما يعمل.',
        },
        {
          title: 'استقبل الحجوزات أونلاين',
          description:
            'ضمّن أداة الحجز في موقعك، أو شارك رابطك المباشر، أو أدر الزوار من لوحة التحكم.',
        },
      ],
    },
    features: {
      sectionEyebrow: 'مصمم للغوص',
      sectionHeadline: 'كل ميزة، مصممة لطريقة عملك الفعلية.',
      sectionSub: 'أدوات الحجز العامة تتعامل مع رحلة غوص كأنها جولة في مدينة. Foxes لا يفعل ذلك.',
      items: [
        {
          title: 'التحقق من شهادات PADI و SSI',
          description: 'امسح مرة، تحقق للأبد. سحب تلقائي من القاعدة العالمية حيث يتوفر ذلك.',
        },
        {
          title: 'متتبع إيجار المعدات',
          description: 'توفر لكل قطعة مع فترات الصيانة، ملاحظات التلف، وسجل الإيجار.',
        },
        {
          title: 'مجدول الدورات متعددة الأيام',
          description: 'Open Water و Advanced و Rescue و Divemaster و IDC — حتى مستوى المدرب.',
        },
        {
          title: 'تخطيط ورديات مدربي الغوص',
          description: 'جداول أسبوعية بالسحب والإفلات. تعبئة تلقائية بناءً على التفضيلات. تنبيهات التغطية.',
        },
        {
          title: 'التأمين والإذن الطبي',
          description: 'نماذج رقمية مرفقة بكل غواص. جاهزة لتدقيق الجمارك والميناء.',
        },
        {
          title: 'كتالوج مواقع الغوص',
          description: 'الأعماق، التيارات، الكائنات البحرية، الظروف اليوم. العملاء يرون لما يسجلون.',
        },
        {
          title: 'الحجوزات الجماعية وقوارب الإقامة',
          description: 'حجوزات جماعية متعددة الكبائن والأيام مع دفعات مقدمة وتذكيرات وقوائم غرف.',
        },
        {
          title: 'تكامل سجل الغوص للعميل',
          description: 'ختم تلقائي لكل غوصة في سجل العميل الرقمي. يعودون. يخبرون أصدقاءهم.',
        },
      ],
    },
    pricing: {
      eyebrow: 'الأسعار',
      headline: 'مجاني لمدة 30 يومًا. بدون بطاقة.',
      sub: 'بعد التجربة، تسعير شفاف بسيط — بدون مصائد لكل مقعد، بدون رسوم تركيب.',
      bullets: [
        'حجوزات غير محدودة خلال التجربة',
        'وصول كامل لكل المزايا',
        'دعم بالعربية والإنجليزية',
        'إلغاء في أي وقت',
      ],
      cta: 'ابدأ التجربة المجانية',
      fineprint: 'بدون بطاقة ائتمان للبدء. التسعير يُشارَك بعد مكالمة 15 دقيقة لنطابق حجم عملك.',
    },
    faq: {
      sectionEyebrow: 'أسئلة يجب أن تسألها',
      sectionHeadline: 'إجابات صريحة.',
      items: [
        {
          question: 'كم تستغرق عملية الإعداد فعلًا؟',
          answer:
            'معظم مراكز الغوص تعمل خلال 24 ساعة. الجزء الأطول هو رفع قائمة معداتك — ونحن نساعدك. إن كان لديك نظام حالي، ننقل بياناتك مجانًا.',
        },
        {
          question: 'هل تدعمون تكامل PADI eLearning؟',
          answer:
            'نعم. نتصل بـ PADI Pro Portal لنقل تقدم التعلم الإلكتروني وبطاقات الشهادات وسجلات الطلاب إلى Foxes تلقائيًا. تكامل SSI ضمن خطة الربع الثالث.',
        },
        {
          question: 'هل أحتفظ بمعالج الدفع الحالي؟',
          answer:
            'نعم. يدعم Foxes Stripe و Paymob و Fawry و Vodafone Cash و Instapay والتحويل البنكي المباشر. استخدم ما تستخدمه، أو دعنا نقترح الأرخص للمشغلين المصريين.',
        },
        {
          question: 'هل يعمل فعلًا بالعربية؟',
          answer:
            'نعم — لوحة المشغّل، صفحات الحجز للعميل، الإيميلات والـ SMS كلها تعمل بالعربية الأصلية مع تخطيط من اليمين إلى اليسار. فريقك يختار لغته. وكل عميل يختار لغته.',
        },
        {
          question: 'ماذا يحدث لحجوزاتي وبيانات عملائي السابقة؟',
          answer:
            'ننقلها. CSV من أي نظام، Excel، حتى السجلات الورقية — فريقنا يستوردها لك مجانًا أثناء التهيئة. لا شيء يضيع.',
        },
        {
          question: 'كيف يختلف هذا عن برامج الحجز العامة؟',
          answer:
            'الأدوات العامة تتعامل مع رحلة غوص كأنها جولة مدينة. Foxes صُمم بمعرفة مشغلي الغوص في الغردقة وشرم. تتبع المعدات، إدارة الشهادات، جدولة المدربين، كتالوج المواقع — لا شيء من هذا في Bookeo أو Rezdy.',
        },
        {
          question: 'ما هي الرسوم بعد التجربة؟',
          answer:
            'نسبة صغيرة لكل عملية أونلاين — بدون رسوم شهرية، بدون تركيب، بدون مقاعد. نشارك الرقم الدقيق في مكالمة 15 دقيقة لنطابق حجم عملك.',
        },
        {
          question: 'هل تدعمون قوارب الإقامة وقوارب السفاري؟',
          answer:
            'نعم. حجوزات متعددة الأيام والكبائن، مع دفعات مقدمة وجداول رصيد وقوائم غرف ومتطلبات غذائية وقوائم معدات لكل رحلة.',
        },
      ],
    },
    leadForm: {
      sectionEyebrow: 'جاهزون متى تكون',
      sectionHeadline: 'شاهد Foxes في العمل — ببيانات مركز غوصك.',
      sectionSub: 'أخبرنا أين تعمل. سنرسل لك جولة 15 دقيقة عبر واتساب خلال ساعة.',
      fields: {
        name: 'اسمك',
        namePlaceholder: 'أحمد حسن',
        business: 'اسم مركز الغوص',
        businessPlaceholder: 'Red Sea Divers Hurghada',
        whatsapp: 'رقم واتساب',
        whatsappPlaceholder: '+20 100 000 0000',
        monthlyBookings: 'الحجوزات الشهرية (تقريبًا)',
        monthlyBookingsOptions: [
          { value: 'lt-50', label: 'أقل من 50' },
          { value: '50-200', label: 'من 50 إلى 200' },
          { value: '200-500', label: 'من 200 إلى 500' },
          { value: '500-plus', label: '500 أو أكثر' },
        ],
      },
      submit: 'احجز جولتي',
      submitting: 'جاري الإرسال...',
      successTitle: 'تم استلام طلبك. سيف من فريقنا سيتواصل معك على واتساب خلال ساعة.',
      successBody: 'يمكنك أيضًا بدء المحادثة الآن إن أردت:',
      successWhatsapp: 'افتح واتساب',
      errorGeneric: 'حدث خطأ. حاول مرة أخرى أو راسلنا على واتساب مباشرة.',
      errorRateLimit: 'محاولات كثيرة. انتظر لحظة ثم حاول مرة أخرى.',
      privacy:
        'بإرسالك توافق على تواصل فريق Foxes معك. لا نشارك بياناتك أبدًا. رسالة واحدة، ثم لا إزعاج.',
    },
    finalCta: {
      headline: 'مستعد لتدير مركز غوصك مثل أفضل المراكز في البحر الأحمر؟',
      sub: 'انضم إلى المشغلين في الغردقة وشرم ومرسى علم ودهب الذين تركوا فوضى الورق وراءهم.',
      primary: 'ابدأ التجربة المجانية',
      secondary: 'تحدث معنا على واتساب',
    },
    whatsapp: {
      floatLabel: 'تحدث معنا',
      prefilledMessage: 'مرحبًا، أنا مهتم بـ Foxes لمركز الغوص الخاص بي.',
    },
    mobileStickyCta: {
      primary: 'ابدأ مجانًا',
      secondary: 'واتساب',
    },
  },
};

export function getOperatorCopy(category: OperatorCategory, locale: Locale): OperatorCopy {
  const dict = locale === 'ar' ? ar : en;
  const copy = dict[category];
  if (!copy) {
    throw new Error(`No operator copy for ${category} in ${locale}`);
  }
  return copy;
}
