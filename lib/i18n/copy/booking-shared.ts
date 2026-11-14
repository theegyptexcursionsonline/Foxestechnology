import type { Locale, OperatorCopy } from '../operators';

/**
 * Copy shared by the five operator landing pages. They all sell the same product (AI Booking),
 * so what it does is written once here and each page adds only its own trade: who it is for,
 * the headline and the everyday problem.
 *
 * Every line states something the booking product does today. It reserves and confirms; it does
 * not take card payment at checkout, send SMS or WhatsApp, or connect to travel-agency channels,
 * and access is by reviewed request. Do not add a claim here without checking it in the product.
 */
export interface BookingVertical {
  meta: OperatorCopy['meta'];
  hero: Pick<OperatorCopy['hero'], 'badge' | 'headlineLine1' | 'headlineLine2' | 'sub'>;
  socialProof: Pick<OperatorCopy['socialProof'], 'label' | 'cities'>;
  pains: Pick<OperatorCopy['pains'], 'sectionEyebrow' | 'sectionHeadline' | 'sectionSub'>;
  /** Carried per page and left as approved: pricing wording is not this file's to change. */
  pricing: OperatorCopy['pricing'];
  leadForm: {
    sectionHeadline: string;
    business: string;
    businessPlaceholder: string;
  };
  finalHeadline: string;
  whatsappMessage: string;
  emailPlaceholder: string;
}

const base: Record<Locale, Omit<OperatorCopy, 'meta' | 'pricing'>> = {
  en: {
    hero: {
      badge: '',
      headlineLine1: '',
      headlineLine2: '',
      sub: '',
      primaryCta: 'Ask for a demo',
      secondaryCta: 'Chat on WhatsApp',
      pills: ['Access by invitation', 'Arabic and English for guests', 'Works in your browser'],
    },
    socialProof: {
      label: '',
      cities: '',
      stats: [
        { value: '24/7', label: 'Reservations on your own website' },
        { value: 'AR + EN', label: 'Guest emails and vouchers' },
        { value: 'One', label: 'List for website, desk and partner bookings' },
        { value: '4', label: 'Stages to run the day' },
      ],
    },
    pains: {
      sectionEyebrow: '',
      sectionHeadline: '',
      sectionSub: '',
      items: [
        {
          title: 'Bookings in a diary and a phone',
          description:
            'Calls, WhatsApp messages, walk-ins and hotel desks all end up in one notebook. Then two groups arrive for the same departure.',
        },
        {
          title: 'Guests with nothing in writing',
          description:
            'No confirmation, no voucher, no pickup time. The guest calls again the night before and your team answers the same questions twice.',
        },
        {
          title: 'No single view of the day',
          description:
            'Who is booked, who has arrived and who is looking after them lives in three phones and a spreadsheet.',
        },
      ],
    },
    solutions: {
      sectionEyebrow: 'What it does today',
      sectionHeadline: 'Take the booking. Confirm the guest. Run the day.',
      sectionSub:
        'AI Booking is the Foxes booking system for tour and activity operators. This is what it does now.',
      items: [
        {
          title: 'A booking widget on your own website',
          description:
            'Guests choose a trip, a date, a departure time and the number of people, and reserve it themselves. The price they see is the price they are booked at, and the last place cannot be sold twice.',
          bullets: [
            'Departure times and capacity you set',
            'Add-ons priced by the system',
            'Guests reserve now and pay you directly',
          ],
        },
        {
          title: 'Confirmation, reminder and voucher',
          description:
            'Each guest gets a confirmation email and a voucher they can print or keep on their phone, in Arabic or English, under your business name. A reminder goes out before the trip at the time you choose.',
          bullets: [
            'Voucher with a QR code your team can check',
            'Trip, people, hotel pickup and add-ons on every email',
            'Reminder from 1 hour to 7 days before',
          ],
        },
        {
          title: 'Run the day in four stages',
          description:
            'Every booking moves through Booking lobby, Operation ready, Operating now and Delivered. Tick several bookings and move them together, and give each one a guide, a driver and a vehicle or boat.',
          bullets: [
            'Website, desk and partner bookings in one list',
            'Guides, drivers, vehicles and boats assigned per booking',
            'Suppliers, drivers and guides sign in and see only their own jobs',
          ],
        },
      ],
    },
    howItWorks: {
      sectionEyebrow: 'How you start',
      sectionHeadline: 'Access is by invitation.',
      sectionSub: 'There is no open sign-up. You send a request, our team reads it and sets you up.',
      steps: [
        {
          title: 'Send a request',
          description:
            'Tell us about your business in the form below or on the request access page. Every request is read by our team.',
        },
        {
          title: 'Set up your trips',
          description:
            'Add your trips, options, prices, departure times and capacity. If your bookings live in a spreadsheet, upload it.',
        },
        {
          title: 'Start taking bookings',
          description:
            'Put the booking widget on your website and add desk and phone bookings in the same dashboard.',
        },
      ],
    },
    features: {
      sectionEyebrow: 'In the product today',
      sectionHeadline: 'What your team gets.',
      sectionSub: 'No hardware to buy. It runs in the browser on the computer, tablet or phone you already use.',
      items: [
        {
          title: 'Trips, options and prices',
          description: 'Set each trip up once: options, prices by guest type, departure times and capacity.',
        },
        {
          title: 'Desk and phone bookings',
          description: 'Your team adds a booking in the dashboard, with add-ons, against the same availability as the website.',
        },
        {
          title: 'Spreadsheet upload',
          description: 'Upload a sheet of bookings. Uploading the same file twice adds nothing.',
        },
        {
          title: 'Guides, drivers, vehicles and boats',
          description: 'Keep them in one place with photos and assign them to bookings.',
        },
        {
          title: 'Resellers and agents',
          description: 'Invite an agent to book at a commission percentage. Each booking shows the commission and what you receive.',
        },
        {
          title: 'Discount codes',
          description: 'Create discount codes that guests enter when they book.',
        },
        {
          title: 'Connect another system',
          description: 'Other systems can read your trips and book through a standard interface (OCTO), with access keys and webhooks.',
        },
        {
          title: 'Arabic and English for guests',
          description: 'The booking widget, emails and vouchers are in both languages. The dashboard for your team is in English.',
        },
      ],
    },
    faq: {
      sectionEyebrow: 'Questions you should ask',
      sectionHeadline: 'Straight answers.',
      items: [
        {
          question: 'Can anyone sign up?',
          answer:
            'Not yet. Access is by invitation: send a request, our team reads it and replies. There is no open sign-up.',
        },
        {
          question: 'Can guests pay online?',
          answer:
            'Today guests reserve online and pay you directly, the way you already take payment. Your team records the payment on the booking and the guest gets a receipt. Card payment at checkout is not switched on yet.',
        },
        {
          question: 'How does it stop double bookings?',
          answer:
            'Every departure has a capacity. Website, desk and partner bookings all draw on the same places, and when two guests ask for the last place at the same moment only one of them gets it.',
        },
        {
          question: 'Does it work in Arabic?',
          answer:
            'For guests, yes: the booking widget, the emails and the voucher are in Arabic and English, right to left in Arabic. The dashboard your team uses is in English.',
        },
        {
          question: 'Can I bring my existing bookings?',
          answer:
            'Yes. Upload them as a spreadsheet. Add-ons named in the sheet are booked at your prices, and uploading the same file again does not create duplicates.',
        },
        {
          question: 'Can agents and hotel desks book for their guests?',
          answer:
            'Yes. Invite a reseller or agent with a commission percentage. They sign in and see only their own bookings, and each booking shows the commission and what you receive.',
        },
        {
          question: 'Does it connect to online travel agencies?',
          answer:
            'Not directly today. Another system can connect through a standard interface (OCTO) with an access key, and webhooks tell your own systems when a booking changes.',
        },
        {
          question: 'What does it cost?',
          answer: 'We share current plans and prices when you request access, before you commit to anything.',
        },
      ],
    },
    leadForm: {
      sectionEyebrow: 'Ready when you are',
      sectionHeadline: '',
      sectionSub: 'Tell us where you operate and our team will contact you to arrange a demo.',
      fields: {
        name: 'Your name',
        namePlaceholder: 'Your full name',
        business: '',
        businessPlaceholder: '',
        whatsapp: 'WhatsApp number',
        whatsappPlaceholder: '+20 1XX XXX XXXX',
        monthlyBookings: 'Bookings per month (roughly)',
        monthlyBookingsOptions: [
          { value: 'lt-50', label: 'Less than 50' },
          { value: '50-200', label: '50 to 200' },
          { value: '200-500', label: '200 to 500' },
          { value: '500-plus', label: '500 or more' },
        ],
      },
      submit: 'Ask for a demo',
      submitting: 'Sending...',
      successTitle: 'Thank you. We have your request and our team will contact you.',
      successBody: 'You can also start the conversation now if you prefer:',
      successWhatsapp: 'Open WhatsApp',
      errorMissing:
        'Please fill in every field: your name, your business, a WhatsApp number with its country code, and the monthly figure.',
      errorGeneric: 'Something went wrong. Please try again in a moment.',
      errorRateLimit: 'Too many submissions. Please wait a moment and try again.',
      privacy: 'By sending this you agree to be contacted by the Foxes team about your request.',
    },
    finalCta: {
      headline: '',
      sub: 'Access is by invitation. Send a request and our team will reply.',
      primary: 'Ask for a demo',
      secondary: 'Talk to us on WhatsApp',
    },
    whatsapp: {
      floatLabel: 'Chat with us',
      prefilledMessage: '',
    },
    mobileStickyCta: {
      primary: 'Ask for a demo',
      secondary: 'WhatsApp',
    },
    exitIntent: {
      eyebrow: 'Before you go',
      headline: 'Prefer that we write to you?',
      sub: 'Leave your email and a person from our team will write to you about AI Booking. It is not a newsletter.',
      bullets: ['Read by our team', 'A reply in Arabic or English', 'Access is by invitation'],
      emailPlaceholder: '',
      submitLabel: 'Email me',
      submittingLabel: 'Sending...',
      successTitle: 'Thanks — request received.',
      successBody: 'Our team will write to you.',
      privacy: 'We only use your email to reply and to follow up about Foxes.',
      dismissLabel: 'No thanks',
    },
  },
  ar: {
    hero: {
      badge: '',
      headlineLine1: '',
      headlineLine2: '',
      sub: '',
      primaryCta: 'اطلب عرضًا',
      secondaryCta: 'تحدث عبر واتساب',
      pills: ['الانضمام بدعوة', 'العربية والإنجليزية لضيوفك', 'يعمل من المتصفح'],
    },
    socialProof: {
      label: '',
      cities: '',
      stats: [
        { value: '24/7', label: 'حجوزات على موقعك أنت' },
        { value: 'AR + EN', label: 'رسائل وقسائم الضيوف' },
        { value: 'واحدة', label: 'قائمة لحجوزات الموقع والمكتب والشركاء' },
        { value: '4', label: 'مراحل لإدارة اليوم' },
      ],
    },
    pains: {
      sectionEyebrow: '',
      sectionHeadline: '',
      sectionSub: '',
      items: [
        {
          title: 'الحجوزات في دفتر وهاتف',
          description:
            'المكالمات ورسائل واتساب والزبائن المباشرون ومكاتب الفنادق تنتهي كلها في دفتر واحد. ثم تصل مجموعتان للرحلة نفسها.',
        },
        {
          title: 'ضيوف بلا أي تأكيد مكتوب',
          description:
            'لا تأكيد ولا قسيمة ولا موعد استقبال. يتصل الضيف مرة أخرى في الليلة السابقة ويجيب فريقك عن الأسئلة نفسها مرتين.',
        },
        {
          title: 'لا توجد صورة واحدة لليوم',
          description: 'من حجز، ومن وصل، ومن يتولى أمره: كل ذلك موزّع على ثلاثة هواتف وجدول بيانات.',
        },
      ],
    },
    solutions: {
      sectionEyebrow: 'ما يقدّمه اليوم',
      sectionHeadline: 'استقبل الحجز. أكّد للضيف. أدر يومك.',
      sectionSub: 'AI Booking هو نظام الحجز من Foxes لمشغّلي الرحلات والأنشطة. هذا ما يفعله الآن.',
      items: [
        {
          title: 'أداة حجز على موقعك أنت',
          description:
            'يختار الضيف الرحلة والتاريخ وموعد الانطلاق وعدد الأشخاص ويحجز بنفسه. السعر الذي يراه هو السعر الذي يُحجز به، وآخر مكان لا يُباع مرتين.',
          bullets: [
            'مواعيد انطلاق وسعة تحددها أنت',
            'إضافات يسعّرها النظام',
            'يحجز الضيف الآن ويدفع لك مباشرة',
          ],
        },
        {
          title: 'تأكيد وتذكير وقسيمة',
          description:
            'يصل كل ضيف بريد تأكيد وقسيمة يمكنه طباعتها أو حفظها على هاتفه، بالعربية أو الإنجليزية وباسم نشاطك. ويُرسل تذكير قبل الرحلة في الوقت الذي تختاره.',
          bullets: [
            'قسيمة برمز QR يتحقق منه فريقك',
            'الرحلة والأشخاص والاستقبال من الفندق والإضافات في كل رسالة',
            'تذكير من ساعة واحدة إلى 7 أيام قبل الرحلة',
          ],
        },
        {
          title: 'أدر اليوم في أربع مراحل',
          description:
            'يمر كل حجز بأربع مراحل: استقبال الحجوزات، ثم جاهز للتشغيل، ثم قيد التشغيل، ثم تم التسليم. حدّد عدة حجوزات وانقلها معًا، وعيّن لكل حجز مرشدًا وسائقًا ومركبة أو قاربًا.',
          bullets: [
            'حجوزات الموقع والمكتب والشركاء في قائمة واحدة',
            'مرشدون وسائقون ومركبات وقوارب تُعيَّن لكل حجز',
            'المورّدون والسائقون والمرشدون يدخلون ويرون أعمالهم فقط',
          ],
        },
      ],
    },
    howItWorks: {
      sectionEyebrow: 'كيف تبدأ',
      sectionHeadline: 'الانضمام بدعوة.',
      sectionSub: 'لا يوجد تسجيل مفتوح. ترسل طلبًا فيقرؤه فريقنا ويجهّز حسابك.',
      steps: [
        {
          title: 'أرسل طلبًا',
          description: 'أخبرنا عن نشاطك في النموذج أدناه أو في صفحة طلب الانضمام. يقرأ فريقنا كل طلب.',
        },
        {
          title: 'جهّز رحلاتك',
          description:
            'أضف رحلاتك وخياراتها وأسعارها ومواعيد الانطلاق والسعة. وإن كانت حجوزاتك في جدول بيانات فارفعه.',
        },
        {
          title: 'ابدأ استقبال الحجوزات',
          description: 'ضع أداة الحجز على موقعك وأضف حجوزات المكتب والهاتف في لوحة التحكم نفسها.',
        },
      ],
    },
    features: {
      sectionEyebrow: 'في المنتج اليوم',
      sectionHeadline: 'ما يحصل عليه فريقك.',
      sectionSub: 'لا أجهزة تشتريها. يعمل من المتصفح على الحاسوب أو الجهاز اللوحي أو الهاتف الذي تستخدمه الآن.',
      items: [
        {
          title: 'الرحلات والخيارات والأسعار',
          description: 'جهّز كل رحلة مرة واحدة: الخيارات، والأسعار حسب فئة الضيف، ومواعيد الانطلاق، والسعة.',
        },
        {
          title: 'حجوزات المكتب والهاتف',
          description: 'يضيف فريقك الحجز من لوحة التحكم مع الإضافات، ومن الأماكن المتاحة نفسها التي يعرضها الموقع.',
        },
        {
          title: 'رفع جدول بيانات',
          description: 'ارفع جدولًا بالحجوزات. رفع الملف نفسه مرتين لا يضيف شيئًا.',
        },
        {
          title: 'المرشدون والسائقون والمركبات والقوارب',
          description: 'احتفظ بهم في مكان واحد مع الصور وعيّنهم للحجوزات.',
        },
        {
          title: 'الوكلاء وإعادة البيع',
          description: 'ادعُ وكيلًا ليحجز بنسبة عمولة. يعرض كل حجز العمولة وما تستلمه أنت.',
        },
        {
          title: 'أكواد الخصم',
          description: 'أنشئ أكواد خصم يُدخلها الضيوف عند الحجز.',
        },
        {
          title: 'اربط نظامًا آخر',
          description: 'يمكن لأنظمة أخرى قراءة رحلاتك والحجز عبر واجهة قياسية (OCTO) بمفاتيح وصول وإشعارات آلية.',
        },
        {
          title: 'العربية والإنجليزية للضيوف',
          description: 'أداة الحجز والرسائل والقسائم باللغتين. لوحة التحكم الخاصة بفريقك بالإنجليزية.',
        },
      ],
    },
    faq: {
      sectionEyebrow: 'أسئلة ينبغي أن تسألها',
      sectionHeadline: 'إجابات مباشرة.',
      items: [
        {
          question: 'هل التسجيل متاح للجميع؟',
          answer: 'ليس بعد. الانضمام بدعوة: ترسل طلبًا فيقرؤه فريقنا ويرد عليك. لا يوجد تسجيل مفتوح.',
        },
        {
          question: 'هل يستطيع الضيوف الدفع عبر الإنترنت؟',
          answer:
            'اليوم يحجز الضيف عبر الإنترنت ويدفع لك مباشرة بالطريقة التي تستخدمها الآن. يسجّل فريقك الدفعة على الحجز ويصل الضيف إيصال. الدفع بالبطاقة عند الحجز غير مفعّل بعد.',
        },
        {
          question: 'كيف يمنع الحجز المزدوج؟',
          answer:
            'لكل موعد انطلاق سعة محددة. حجوزات الموقع والمكتب والشركاء تُخصم كلها من الأماكن نفسها، وإذا طلب ضيفان آخر مكان في اللحظة نفسها يحصل عليه واحد منهما فقط.',
        },
        {
          question: 'هل يعمل بالعربية؟',
          answer:
            'للضيوف نعم: أداة الحجز والرسائل والقسيمة بالعربية والإنجليزية، ومن اليمين إلى اليسار في العربية. لوحة التحكم التي يستخدمها فريقك بالإنجليزية.',
        },
        {
          question: 'هل أستطيع نقل حجوزاتي الحالية؟',
          answer:
            'نعم. ارفعها في جدول بيانات. تُحجز الإضافات المذكورة في الجدول بأسعارك، ورفع الملف نفسه مرة أخرى لا ينشئ حجوزات مكررة.',
        },
        {
          question: 'هل يستطيع الوكلاء ومكاتب الفنادق الحجز لضيوفهم؟',
          answer:
            'نعم. ادعُ وكيلًا أو معيد بيع بنسبة عمولة. يدخل بحسابه ويرى حجوزاته فقط، ويعرض كل حجز العمولة وما تستلمه أنت.',
        },
        {
          question: 'هل يتصل بوكالات السفر الإلكترونية؟',
          answer:
            'ليس مباشرة اليوم. يمكن لنظام آخر الاتصال عبر واجهة قياسية (OCTO) بمفتاح وصول، وتُبلَّغ أنظمتك آليًا عند تغيّر أي حجز.',
        },
        {
          question: 'كم يكلّف؟',
          answer: 'نشاركك الخطط والأسعار الحالية عند طلب الانضمام، وقبل أن تلتزم بأي شيء.',
        },
      ],
    },
    leadForm: {
      sectionEyebrow: 'متى ما كنت جاهزًا',
      sectionHeadline: '',
      sectionSub: 'أخبرنا أين تعمل وسيتواصل معك فريقنا لترتيب عرض.',
      fields: {
        name: 'اسمك',
        namePlaceholder: 'الاسم الكامل',
        business: '',
        businessPlaceholder: '',
        whatsapp: 'رقم واتساب',
        whatsappPlaceholder: '+20 1XX XXX XXXX',
        monthlyBookings: 'عدد الحجوزات شهريًا (تقريبًا)',
        monthlyBookingsOptions: [
          { value: 'lt-50', label: 'أقل من 50' },
          { value: '50-200', label: 'من 50 إلى 200' },
          { value: '200-500', label: 'من 200 إلى 500' },
          { value: '500-plus', label: '500 أو أكثر' },
        ],
      },
      submit: 'اطلب عرضًا',
      submitting: 'جارٍ الإرسال...',
      successTitle: 'شكرًا لك. وصلنا طلبك وسيتواصل معك فريقنا.',
      successBody: 'يمكنك أيضًا بدء المحادثة الآن إن أحببت:',
      successWhatsapp: 'افتح واتساب',
      errorMissing: 'يرجى تعبئة جميع الحقول: اسمك، واسم نشاطك، ورقم واتساب مع رمز الدولة، والعدد الشهري.',
      errorGeneric: 'حدث خطأ. حاول مرة أخرى بعد قليل.',
      errorRateLimit: 'محاولات كثيرة. انتظر قليلًا ثم حاول مرة أخرى.',
      privacy: 'بإرسال هذا النموذج توافق على أن يتواصل معك فريق Foxes بشأن طلبك.',
    },
    finalCta: {
      headline: '',
      sub: 'الانضمام بدعوة. أرسل طلبًا وسيرد عليك فريقنا.',
      primary: 'اطلب عرضًا',
      secondary: 'تحدث معنا عبر واتساب',
    },
    whatsapp: {
      floatLabel: 'تحدث معنا',
      prefilledMessage: '',
    },
    mobileStickyCta: {
      primary: 'اطلب عرضًا',
      secondary: 'واتساب',
    },
    exitIntent: {
      eyebrow: 'قبل أن تغادر',
      headline: 'هل تفضّل أن نراسلك نحن؟',
      sub: 'اترك بريدك الإلكتروني وسيكتب لك أحد أفراد فريقنا عن AI Booking. ليست نشرة بريدية.',
      bullets: ['يقرؤه فريقنا', 'رد بالعربية أو الإنجليزية', 'الانضمام بدعوة'],
      emailPlaceholder: '',
      submitLabel: 'راسلوني',
      submittingLabel: 'جارٍ الإرسال...',
      successTitle: 'شكرًا — وصلنا طلبك.',
      successBody: 'سيكتب لك فريقنا.',
      privacy: 'نستخدم بريدك فقط للرد عليك وللمتابعة معك بشأن Foxes.',
      dismissLabel: 'لا شكرًا',
    },
  },
};

/** The full page copy for one kind of operator: the shared product story plus that trade's own words. */
export function buildBookingCopy(locale: Locale, v: BookingVertical): OperatorCopy {
  const b = base[locale];
  return {
    meta: v.meta,
    hero: { ...b.hero, ...v.hero },
    socialProof: { ...b.socialProof, ...v.socialProof },
    pains: { ...b.pains, ...v.pains },
    solutions: b.solutions,
    howItWorks: b.howItWorks,
    features: b.features,
    pricing: v.pricing,
    faq: b.faq,
    leadForm: {
      ...b.leadForm,
      sectionHeadline: v.leadForm.sectionHeadline,
      fields: {
        ...b.leadForm.fields,
        business: v.leadForm.business,
        businessPlaceholder: v.leadForm.businessPlaceholder,
      },
    },
    finalCta: { ...b.finalCta, headline: v.finalHeadline },
    whatsapp: { ...b.whatsapp, prefilledMessage: v.whatsappMessage },
    mobileStickyCta: b.mobileStickyCta,
    exitIntent: { ...b.exitIntent, emailPlaceholder: v.emailPlaceholder },
  };
}
