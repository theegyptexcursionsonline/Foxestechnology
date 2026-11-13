import type { OperatorCopy } from '../operators';

/**
 * AI Search, as it works today: a search and chat widget for a tour website. It answers from the
 * business's own tours in Arabic, English and German and sends the visitor to the tour page; it
 * does not take the booking. Tours come in by reading the website or by spreadsheet upload.
 *
 * No speed figure, no language count beyond the three proven, no result or conversion figure and
 * no customer reference belongs here, and the technology behind it is never named. Access is by
 * reviewed request and prices are shared on request.
 */
export const en: OperatorCopy = {
  meta: {
    title: 'AI Search for Tour Websites · Search and Chat from Your Own Tours',
    description:
      'A search and chat widget for tour, cruise and activity websites. Visitors ask in plain Arabic, English or German and get your own tours back as cards with photo and price, each opening the right tour page. Access by invitation.',
    ogTitle: 'Travellers ask in their own words. Your tours answer. · Foxes Technology',
  },
  hero: {
    badge: 'AI Search · For your website',
    headlineLine1: 'Travellers ask in their own words.',
    headlineLine2: 'Your tours answer.',
    sub: 'AI Search is a search and chat widget for tour websites. A visitor types what they want in plain Arabic, English or German and gets your own tours back as cards with photo and price, each one opening the right tour page on your site.',
    primaryCta: 'Ask for a demo',
    secondaryCta: 'Chat on WhatsApp',
    pills: ['One script tag', 'Arabic, English and German', 'Access by invitation'],
  },
  socialProof: {
    label: 'Built for tour websites in',
    cities: 'Cairo · Hurghada · Sharm El Sheikh · Luxor',
    stats: [
      { value: 'AR · EN · DE', label: 'Answers in the language of the page' },
      { value: '1', label: 'Script tag to add it' },
      { value: '24/7', label: 'On your website' },
      { value: 'Yours', label: 'Tours, prices and policies only' },
    ],
  },
  pains: {
    sectionEyebrow: 'Why visitors leave without booking',
    sectionHeadline: 'Your site search does not find your own tours.',
    sectionSub: 'A visitor who cannot find the trip in a few seconds looks for it somewhere else.',
    items: [
      {
        title: 'Keyword search misses real questions',
        description:
          'A guest types "boat trip for sunset" and gets nothing, although you sell three sunset cruises. The tours are there. The search box does not understand the question.',
      },
      {
        title: 'Visitors search in their own language',
        description:
          'Arabic and German guests type in their own language and the site answers in another, or not at all.',
      },
      {
        title: 'A blank results page',
        description:
          'When nothing comes back, the visitor opens a new tab and looks for the same trip on a marketplace.',
      },
    ],
  },
  solutions: {
    sectionEyebrow: 'What it does today',
    sectionHeadline: 'It finds the trip, suggests the closest one, and shows you what people ask.',
    sectionSub: 'One widget on your website, answering only from your own tours.',
    items: [
      {
        title: 'Finds tours by meaning, not just keywords',
        description:
          'A visitor asks for "a quiet boat trip at sunset for two" and gets the tours that fit, even when those words are not in the title. Each result is a card with a photo, the price and the key details, and opens the tour page on your own site, where the booking happens.',
        bullets: [
          'Answers in Arabic, English and German',
          'Cards with photo, price and details from your own list',
          'Opens your tour page; it does not take the booking itself',
        ],
      },
      {
        title: 'A chat that suggests the closest trips',
        description:
          'Visitors can also ask in a conversation. The assistant answers from your tours, prices and policies, suggests alternatives when there is no exact match, and can draft a day-by-day plan from your own trips. If your tour list cannot be read, it says so instead of inventing a trip.',
        bullets: [
          'Suggestions with pictures and prices',
          'Day-by-day plans built from your tours',
          'A visitor can leave their details for your team',
        ],
      },
      {
        title: 'See what visitors look for',
        description:
          'Your dashboard lists the questions people ask most and the ones that found nothing, so you know which trips or answers are missing.',
        bullets: [
          'The questions asked most',
          'Searches that found nothing',
          'Each business sees only its own tours and settings',
        ],
      },
    ],
  },
  howItWorks: {
    sectionEyebrow: 'How you start',
    sectionHeadline: 'Access is by invitation.',
    sectionSub: 'AI Search is opening to new customers in stages. You send a request and our team reads it and replies.',
    steps: [
      {
        title: 'Send a request',
        description:
          'Tell us about your website in the form below or on the request access page. Every request is read by our team.',
      },
      {
        title: 'Your tours go in',
        description:
          'Your tour list is read from your website or uploaded as a spreadsheet. You choose the colours, the logo, the headline and the assistant’s tone.',
      },
      {
        title: 'Add one script tag',
        description: 'Paste it on your site. The widget runs only on the web addresses you allow.',
      },
    ],
  },
  features: {
    sectionEyebrow: 'In the product today',
    sectionHeadline: 'What you get.',
    sectionSub: 'A search box and an assistant that know your tours and nothing else.',
    items: [
      {
        title: 'One script tag',
        description: 'One tag adds the widget to your website.',
      },
      {
        title: 'Arabic, English and German',
        description: 'It answers in the language of the page, right to left in Arabic.',
      },
      {
        title: 'Search by meaning',
        description: 'It matches what the visitor means, with a keyword match as a fallback.',
      },
      {
        title: 'Chat assistant',
        description: 'Answers questions from your own tours, prices and policies.',
      },
      {
        title: 'What visitors ask',
        description: 'The questions asked most and the searches that found nothing.',
      },
      {
        title: 'Your colours and tone',
        description: 'Colours, logo, headline and the assistant’s tone, within ready-made themes.',
      },
      {
        title: 'Locked to your website',
        description: 'The widget runs only on the web addresses you allow.',
      },
      {
        title: 'Search bar, chat bubble or full page',
        description: 'Choose how it appears on your site.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Pricing',
    headline: 'Plans sized to your search traffic.',
    sub: 'Every plan includes a set number of searches each month. Tell us about your site and we will recommend the right one.',
    bullets: [
      'A monthly search allowance on every plan',
      'Move up a plan as your traffic grows',
      'Prices confirmed before you sign up',
    ],
    cta: 'Ask us for pricing',
    ctaHref: '/request-access?solution=search&source=foxestechnology',
    fineprint: 'We share current plans and prices when you request access.',
  },
  faq: {
    sectionEyebrow: 'Questions you should ask',
    sectionHeadline: 'Straight answers.',
    items: [
      {
        question: 'Can anyone sign up?',
        answer:
          'Not yet. AI Search is opening to new customers in stages. Send a request, our team reads it and replies. There is no open sign-up.',
      },
      {
        question: 'Which languages does it answer in?',
        answer:
          'Arabic, English and German. It answers in the language of the page the visitor is on, right to left in Arabic.',
      },
      {
        question: 'Do I have to translate my tours?',
        answer:
          'No. A visitor can ask in Arabic or German about tours you have written in English and still get the right ones. The tour page they open is your own page, in the languages your site already has.',
      },
      {
        question: 'What happens when nothing matches?',
        answer:
          'The assistant says there is no exact match and suggests the closest trips from your list. It does not invent a tour, a price or a policy.',
      },
      {
        question: 'Does it take the booking?',
        answer:
          'No. Each result opens the tour page on your own website, and the booking happens there with the booking system you already use.',
      },
      {
        question: 'How do my tours get in?',
        answer:
          'Your tour list is read from your website, or you upload it as a spreadsheet. There is no direct connection to a booking system today.',
      },
      {
        question: 'What about visitor privacy?',
        answer:
          'The widget sets no cookies on your site and does not store visitors’ IP addresses. The questions visitors type are kept in your own account so you can see what people look for.',
      },
      {
        question: 'How is AI Search priced?',
        answer: 'We share current plans and prices when you request access, before you commit to anything.',
      },
    ],
  },
  leadForm: {
    sectionEyebrow: 'Ready when you are',
    sectionHeadline: 'See AI Search on your own tours.',
    sectionSub: 'Tell us your website and our team will contact you to arrange a demo.',
    fields: {
      name: 'Your name',
      namePlaceholder: 'Your full name',
      business: 'Website or business name',
      businessPlaceholder: 'yourwebsite.com',
      whatsapp: 'WhatsApp number',
      whatsappPlaceholder: '+20 1XX XXX XXXX',
      monthlyBookings: 'Monthly site visitors (roughly)',
      monthlyBookingsOptions: [
        { value: 'lt-5k', label: 'Less than 5,000' },
        { value: '5k-20k', label: '5,000 to 20,000' },
        { value: '20k-100k', label: '20,000 to 100,000' },
        { value: '100k-plus', label: 'More than 100,000' },
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
    headline: 'Let visitors find the right trip on your own site.',
    sub: 'Access is by invitation. Send a request and our team will reply.',
    primary: 'Ask for a demo',
    secondary: 'Talk to us on WhatsApp',
  },
  whatsapp: {
    floatLabel: 'Ask about AI Search',
    prefilledMessage: "Hi, I'd like a demo of Foxes AI Search on my website.",
  },
  mobileStickyCta: {
    primary: 'Ask for a demo',
    secondary: 'WhatsApp',
  },
  exitIntent: {
    eyebrow: 'Before you go',
    headline: 'Prefer that we write to you?',
    sub: 'Leave your email and a person from our team will write to you about AI Search. It is not a newsletter.',
    bullets: ['Read by our team', 'A reply in Arabic or English', 'Access is by invitation'],
    emailPlaceholder: 'you@yourbusiness.com',
    submitLabel: 'Email me',
    submittingLabel: 'Sending...',
    successTitle: 'Thanks — request received.',
    successBody: 'Our team will write to you.',
    privacy: 'We only use your email to reply and to follow up about Foxes.',
    dismissLabel: 'No thanks',
  },
};

export const ar: OperatorCopy = {
  meta: {
    title: 'AI Search لمواقع السياحة · بحث ومحادثة من رحلاتك أنت',
    description:
      'أداة بحث ومحادثة لمواقع الجولات والرحلات والأنشطة. يسأل الزائر بالعربية أو الإنجليزية أو الألمانية فتظهر له رحلاتك أنت في بطاقات بالصورة والسعر، وكل بطاقة تفتح صفحة الرحلة الصحيحة. الانضمام بدعوة.',
    ogTitle: 'يسأل المسافر بكلماته. ورحلاتك تجيب. · Foxes Technology',
  },
  hero: {
    badge: 'AI Search · لموقعك',
    headlineLine1: 'يسأل المسافر بكلماته.',
    headlineLine2: 'ورحلاتك تجيب.',
    sub: 'AI Search أداة بحث ومحادثة لمواقع السياحة. يكتب الزائر ما يريده بالعربية أو الإنجليزية أو الألمانية، فتظهر له رحلاتك أنت في بطاقات بالصورة والسعر، وكل بطاقة تفتح صفحة الرحلة الصحيحة على موقعك.',
    primaryCta: 'اطلب عرضًا',
    secondaryCta: 'تحدث عبر واتساب',
    pills: ['سطر كود واحد', 'العربية والإنجليزية والألمانية', 'الانضمام بدعوة'],
  },
  socialProof: {
    label: 'مصمم لمواقع السياحة في',
    cities: 'القاهرة · الغردقة · شرم الشيخ · الأقصر',
    stats: [
      { value: 'AR · EN · DE', label: 'يجيب بلغة الصفحة' },
      { value: '1', label: 'سطر كود لإضافته' },
      { value: '24/7', label: 'على موقعك' },
      { value: 'لك', label: 'رحلاتك وأسعارك وسياساتك فقط' },
    ],
  },
  pains: {
    sectionEyebrow: 'لماذا يغادر الزوار دون حجز',
    sectionHeadline: 'بحث موقعك لا يجد رحلاتك أنت.',
    sectionSub: 'الزائر الذي لا يجد الرحلة خلال ثوانٍ يبحث عنها في مكان آخر.',
    items: [
      {
        title: 'البحث بالكلمات يفوّت الأسئلة الحقيقية',
        description:
          'يكتب الضيف «رحلة قارب وقت الغروب» فلا يجد شيئًا، مع أنك تبيع ثلاث رحلات غروب. الرحلات موجودة. لكن مربع البحث لا يفهم السؤال.',
      },
      {
        title: 'الزوار يبحثون بلغتهم',
        description: 'يكتب الضيوف العرب والألمان بلغتهم فيجيبهم الموقع بلغة أخرى، أو لا يجيب أصلًا.',
      },
      {
        title: 'صفحة نتائج فارغة',
        description: 'حين لا يظهر شيء، يفتح الزائر تبويبًا جديدًا ويبحث عن الرحلة نفسها في أحد مواقع الحجز الكبرى.',
      },
    ],
  },
  solutions: {
    sectionEyebrow: 'ما يقدّمه اليوم',
    sectionHeadline: 'يجد الرحلة، ويقترح الأقرب، ويريك ما يسأل عنه الناس.',
    sectionSub: 'أداة واحدة على موقعك تجيب من رحلاتك أنت فقط.',
    items: [
      {
        title: 'يجد الرحلات بالمعنى لا بالكلمات فقط',
        description:
          'يسأل الزائر عن «رحلة قارب هادئة وقت الغروب لشخصين» فتظهر له الرحلات المناسبة حتى لو لم ترد تلك الكلمات في العنوان. كل نتيجة بطاقة فيها الصورة والسعر وأهم التفاصيل، وتفتح صفحة الرحلة على موقعك حيث يتم الحجز.',
        bullets: [
          'يجيب بالعربية والإنجليزية والألمانية',
          'بطاقات بالصورة والسعر والتفاصيل من قائمتك أنت',
          'يفتح صفحة رحلتك، ولا يُجري الحجز بنفسه',
        ],
      },
      {
        title: 'محادثة تقترح أقرب الرحلات',
        description:
          'يستطيع الزائر أن يسأل في محادثة أيضًا. يجيب المساعد من رحلاتك وأسعارك وسياساتك، ويقترح بدائل حين لا يوجد تطابق تام، ويمكنه إعداد برنامج يومي من رحلاتك. وإذا تعذّرت قراءة قائمة رحلاتك يقول ذلك ولا يختلق رحلة.',
        bullets: [
          'اقتراحات بالصور والأسعار',
          'برامج يومية مبنية من رحلاتك',
          'يستطيع الزائر ترك بياناته لفريقك',
        ],
      },
      {
        title: 'اعرف ما يبحث عنه الزوار',
        description:
          'تعرض لوحة التحكم أكثر الأسئلة تكرارًا والأسئلة التي لم تجد نتيجة، فتعرف ما الذي ينقص من رحلات أو إجابات.',
        bullets: [
          'الأسئلة الأكثر تكرارًا',
          'عمليات البحث التي لم تجد شيئًا',
          'كل نشاط يرى رحلاته وإعداداته فقط',
        ],
      },
    ],
  },
  howItWorks: {
    sectionEyebrow: 'كيف تبدأ',
    sectionHeadline: 'الانضمام بدعوة.',
    sectionSub: 'يُفتح AI Search للعملاء الجدد على مراحل. ترسل طلبًا فيقرؤه فريقنا ويرد عليك.',
    steps: [
      {
        title: 'أرسل طلبًا',
        description: 'أخبرنا عن موقعك في النموذج أدناه أو في صفحة طلب الانضمام. يقرأ فريقنا كل طلب.',
      },
      {
        title: 'تُضاف رحلاتك',
        description:
          'تُقرأ قائمة رحلاتك من موقعك أو تُرفع في جدول بيانات. وتختار أنت الألوان والشعار والعنوان ونبرة المساعد.',
      },
      {
        title: 'أضف سطر كود واحدًا',
        description: 'الصقه في موقعك. تعمل الأداة فقط على عناوين المواقع التي تسمح بها.',
      },
    ],
  },
  features: {
    sectionEyebrow: 'في المنتج اليوم',
    sectionHeadline: 'ما تحصل عليه.',
    sectionSub: 'مربع بحث ومساعد يعرفان رحلاتك ولا شيء غيرها.',
    items: [
      {
        title: 'سطر كود واحد',
        description: 'سطر واحد يضيف الأداة إلى موقعك.',
      },
      {
        title: 'العربية والإنجليزية والألمانية',
        description: 'يجيب بلغة الصفحة، ومن اليمين إلى اليسار في العربية.',
      },
      {
        title: 'بحث بالمعنى',
        description: 'يطابق ما يقصده الزائر، مع مطابقة بالكلمات كخيار احتياطي.',
      },
      {
        title: 'مساعد محادثة',
        description: 'يجيب عن الأسئلة من رحلاتك وأسعارك وسياساتك أنت.',
      },
      {
        title: 'ما يسأل عنه الزوار',
        description: 'الأسئلة الأكثر تكرارًا وعمليات البحث التي لم تجد شيئًا.',
      },
      {
        title: 'ألوانك ونبرتك',
        description: 'الألوان والشعار والعنوان ونبرة المساعد، ضمن قوالب جاهزة.',
      },
      {
        title: 'مقفلة على موقعك',
        description: 'تعمل الأداة فقط على عناوين المواقع التي تسمح بها.',
      },
      {
        title: 'شريط بحث أو فقاعة محادثة أو صفحة كاملة',
        description: 'اختر كيف تظهر على موقعك.',
      },
    ],
  },
  pricing: {
    eyebrow: 'الأسعار',
    headline: 'باقات تناسب حجم البحث على موقعك.',
    sub: 'تتضمن كل باقة عددًا محددًا من عمليات البحث شهريًا. أخبرنا عن موقعك وسنرشّح لك الباقة المناسبة.',
    bullets: [
      'حصة بحث شهرية في كل باقة',
      'انتقل إلى باقة أكبر مع نمو زياراتك',
      'تأكيد الأسعار قبل التسجيل',
    ],
    cta: 'اسألنا عن الأسعار',
    ctaHref: '/request-access?solution=search&source=foxestechnology',
    fineprint: 'نشاركك الباقات والأسعار الحالية عند تقديم طلب الانضمام.',
  },
  faq: {
    sectionEyebrow: 'أسئلة ينبغي أن تسألها',
    sectionHeadline: 'إجابات مباشرة.',
    items: [
      {
        question: 'هل التسجيل متاح للجميع؟',
        answer:
          'ليس بعد. يُفتح AI Search للعملاء الجدد على مراحل. ترسل طلبًا فيقرؤه فريقنا ويرد عليك. لا يوجد تسجيل مفتوح.',
      },
      {
        question: 'بأي لغات يجيب؟',
        answer:
          'بالعربية والإنجليزية والألمانية. يجيب بلغة الصفحة التي يتصفحها الزائر، ومن اليمين إلى اليسار في العربية.',
      },
      {
        question: 'هل يجب أن أترجم رحلاتي؟',
        answer:
          'لا. يستطيع الزائر أن يسأل بالعربية أو الألمانية عن رحلات كتبتها بالإنجليزية ويحصل على الرحلات الصحيحة. وصفحة الرحلة التي يفتحها هي صفحتك أنت، باللغات المتوفرة في موقعك.',
      },
      {
        question: 'ماذا يحدث إذا لم يوجد تطابق؟',
        answer:
          'يقول المساعد إنه لا يوجد تطابق تام ويقترح أقرب الرحلات من قائمتك. ولا يختلق رحلة ولا سعرًا ولا سياسة.',
      },
      {
        question: 'هل يُجري الحجز؟',
        answer:
          'لا. تفتح كل نتيجة صفحة الرحلة على موقعك أنت، ويتم الحجز هناك بنظام الحجز الذي تستخدمه الآن.',
      },
      {
        question: 'كيف تُضاف رحلاتي؟',
        answer:
          'تُقرأ قائمة رحلاتك من موقعك، أو ترفعها في جدول بيانات. لا يوجد اليوم ربط مباشر بنظام حجز.',
      },
      {
        question: 'ماذا عن خصوصية الزوار؟',
        answer:
          'لا تضع الأداة ملفات تعريف ارتباط على موقعك ولا تحفظ عناوين IP للزوار. تُحفظ الأسئلة التي يكتبها الزوار في حسابك أنت لترى ما يبحث عنه الناس.',
      },
      {
        question: 'كيف يُسعَّر AI Search؟',
        answer: 'نشاركك الخطط والأسعار الحالية عند طلب الانضمام، وقبل أن تلتزم بأي شيء.',
      },
    ],
  },
  leadForm: {
    sectionEyebrow: 'متى ما كنت جاهزًا',
    sectionHeadline: 'شاهد AI Search على رحلاتك أنت.',
    sectionSub: 'أخبرنا بعنوان موقعك وسيتواصل معك فريقنا لترتيب عرض.',
    fields: {
      name: 'اسمك',
      namePlaceholder: 'الاسم الكامل',
      business: 'الموقع أو اسم النشاط',
      businessPlaceholder: 'yourwebsite.com',
      whatsapp: 'رقم واتساب',
      whatsappPlaceholder: '+20 1XX XXX XXXX',
      monthlyBookings: 'عدد زوار الموقع شهريًا (تقريبًا)',
      monthlyBookingsOptions: [
        { value: 'lt-5k', label: 'أقل من 5,000' },
        { value: '5k-20k', label: 'من 5,000 إلى 20,000' },
        { value: '20k-100k', label: 'من 20,000 إلى 100,000' },
        { value: '100k-plus', label: 'أكثر من 100,000' },
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
    headline: 'دع الزوار يجدون الرحلة المناسبة على موقعك أنت.',
    sub: 'الانضمام بدعوة. أرسل طلبًا وسيرد عليك فريقنا.',
    primary: 'اطلب عرضًا',
    secondary: 'تحدث معنا عبر واتساب',
  },
  whatsapp: {
    floatLabel: 'اسأل عن AI Search',
    prefilledMessage: 'مرحبًا، أودّ عرضًا لـ AI Search من Foxes على موقعي.',
  },
  mobileStickyCta: {
    primary: 'اطلب عرضًا',
    secondary: 'واتساب',
  },
  exitIntent: {
    eyebrow: 'قبل أن تغادر',
    headline: 'هل تفضّل أن نراسلك نحن؟',
    sub: 'اترك بريدك الإلكتروني وسيكتب لك أحد أفراد فريقنا عن AI Search. ليست نشرة بريدية.',
    bullets: ['يقرؤه فريقنا', 'رد بالعربية أو الإنجليزية', 'الانضمام بدعوة'],
    emailPlaceholder: 'you@yourbusiness.com',
    submitLabel: 'راسلوني',
    submittingLabel: 'جارٍ الإرسال...',
    successTitle: 'شكرًا — وصلنا طلبك.',
    successBody: 'سيكتب لك فريقنا.',
    privacy: 'نستخدم بريدك فقط للرد عليك وللمتابعة معك بشأن Foxes.',
    dismissLabel: 'لا شكرًا',
  },
};
