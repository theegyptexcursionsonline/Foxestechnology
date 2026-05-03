import type { OperatorCopy } from '../operators';

export const en: OperatorCopy = {
  meta: {
    title: 'AI Search Widget for Tour Operators · Foxes Technology',
    description:
      'Embed an AI-powered search bar on your tour, cruise, attraction or hotel website. Visitors search in any language, find the right product instantly, and convert. One line of code. Free up to 5,000 searches per month.',
    ogTitle: 'Search That Actually Finds The Tour · Foxes Technology',
  },
  hero: {
    badge: 'AI Search Agent · For your website',
    headlineLine1: 'Search That Actually',
    headlineLine2: 'Finds The Tour.',
    sub: 'A drop-in AI search widget for tour, cruise, attraction and hotel websites. Visitors type in plain language — even half-spelt, in any language — and the right product comes up first. One line of code. Free up to 5,000 searches a month.',
    primaryCta: 'Get Started Free',
    secondaryCta: 'Chat on WhatsApp',
    pills: ['One-line embed', 'Free 5K searches / mo', '50+ languages'],
  },
  socialProof: {
    label: 'Already running on operator sites in',
    cities: 'Cairo · Hurghada · Sharm · Luxor · Dubai',
    stats: [
      { value: '+47%', label: 'Search to booking' },
      { value: '50+', label: 'Languages' },
      { value: '< 200ms', label: 'Search latency' },
      { value: '5,000', label: 'Free searches / mo' },
    ],
  },
  pains: {
    sectionEyebrow: 'Why visitors leave without booking',
    sectionHeadline: 'Your site search does not find your own tours.',
    sectionSub:
      'Modern travelers do not browse — they search. If your search box returns nothing for "romantic Nile cruise for two", they go to Viator. Your margin goes with them.',
    items: [
      {
        title: 'Keyword search misses every real query',
        description:
          'A guest types "boat trip for sunset" and your search returns nothing — even though you sell three sunset cruises. Your catalog is fine. The search box is the problem.',
      },
      {
        title: 'Foreign visitors cannot find anything',
        description:
          'Russians, Germans, French and Arab guests search in their own language. Most site search tools only index your English titles. The right tour is there. They never see it.',
      },
      {
        title: 'Zero-result pages send guests to OTAs',
        description:
          'When the search returns nothing, the visitor opens a new tab, types your tour into Google, and Viator ranks first. You sold the booking — and gave 25% of it away.',
      },
    ],
  },
  solutions: {
    sectionEyebrow: 'How Foxes AI Search fixes it',
    sectionHeadline: 'Semantic search, conversational fallback, real numbers.',
    sectionSub:
      'A search widget built for the way travelers actually shop — not for an SQL LIKE clause from 2008.',
    items: [
      {
        title: 'Semantic search across your full catalog',
        description:
          'The widget understands meaning, not keywords. "Romantic boat trip under an hour" finds a 50-minute Nile felucca even when the title says nothing about romance. Type in any language — results come back in the visitor language.',
        bullets: [
          'Anthropic + OpenAI embeddings under the hood',
          'Indexes 10 to 10,000 products in minutes',
          'Result ranking tuned to your conversion data',
        ],
      },
      {
        title: 'Conversational fallback when no exact match',
        description:
          'When the catalog has no perfect answer, the widget switches to chat: "We do not have that exact tour — here are three close ones." Guests stay on your site, click a suggestion, book.',
        bullets: [
          'Suggests 3 closest matches with thumbnails',
          'Politely surfaces alternatives in the visitor tone',
          'Hands off to WhatsApp if the guest needs a human',
        ],
      },
      {
        title: 'Real-time analytics dashboard',
        description:
          'See every query your visitors actually type. Track top queries, zero-result queries, search-to-booking conversion, and which products win after a search. Fix gaps in your catalog by the end of the week.',
        bullets: [
          'Top queries and zero-result queries',
          'Search-to-booking conversion per query',
          'Heatmap of search-engaged user journeys',
        ],
      },
    ],
  },
  howItWorks: {
    sectionEyebrow: 'Setup is fast',
    sectionHeadline: 'From zero to live search in 15 minutes.',
    sectionSub:
      'Add one script tag, point it at your product catalog, and the widget indexes everything in the background while you finish your tea.',
    steps: [
      {
        title: 'Sign up and pick a tenant',
        description:
          'Create your widget in the Foxes dashboard. Choose colors, font, accent and the exact product set the widget can return.',
      },
      {
        title: 'Drop one script tag',
        description:
          'Paste the embed snippet on your website. The widget appears as a search bar, a floating chat bubble, or both — your choice.',
      },
      {
        title: 'Catalog auto-indexes',
        description:
          'Foxes pulls your tours from the booking engine, your CMS, or a CSV. The widget is searchable in any language within minutes.',
      },
    ],
  },
  features: {
    sectionEyebrow: 'Designed for tour and travel sites',
    sectionHeadline: 'Every feature, built for visitors who type before they browse.',
    sectionSub:
      'Generic site search treats every query like a string match. Foxes treats it like a guest about to book.',
    items: [
      {
        title: 'One-line script-tag embed',
        description: 'Single tag drop-in. Works on Next.js, WordPress, Shopify, Webflow or hand-rolled HTML.',
      },
      {
        title: '50+ languages out of the box',
        description: 'Auto-detects visitor language. Returns localized results without separate indexes.',
      },
      {
        title: 'Semantic vector search',
        description: 'Anthropic + OpenAI embeddings rank by intent, not exact keyword.',
      },
      {
        title: 'Conversational chat fallback',
        description: 'When the search is ambiguous, the widget asks a clarifying question and offers options.',
      },
      {
        title: 'Real-time analytics',
        description: 'Top queries, zero-result queries, query-to-booking conversion, dashboards per tenant.',
      },
      {
        title: 'White-label widget',
        description: 'Per-tenant branding, fonts, accent color, dark or light mode, and tone of voice.',
      },
      {
        title: 'Domain-locked install',
        description: 'Each widget is restricted to the domains you allow. Stops other sites from using your key.',
      },
      {
        title: 'Custom embeddings per catalog',
        description: 'Fine-tune ranking on your historical bookings so winners come up first.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Pricing',
    headline: 'Free up to 5,000 searches a month.',
    sub: 'After that, pennies per search — usage-based, no monthly minimum, no setup fee.',
    bullets: [
      'Free tier covers most operator sites',
      'Unlimited products and tenants',
      'Real-time analytics included',
      'Cancel anytime',
    ],
    cta: 'Start free trial',
    fineprint:
      'No credit card needed to start. Pricing for paid tiers shared on a 15-minute call so we can match your traffic.',
  },
  faq: {
    sectionEyebrow: 'Questions you should ask',
    sectionHeadline: 'Honest answers.',
    items: [
      {
        question: 'How long does install actually take?',
        answer:
          'Most operators are live within 15 minutes. Paste one script tag, set your domain in the dashboard, point the widget at your product feed, and you are searchable. Catalog indexing runs in the background and usually finishes in under five minutes for sites with 100 to 500 products.',
      },
      {
        question: 'How does the language detection work?',
        answer:
          'The widget reads the browser locale, the page lang attribute, and the actual query text. If a Russian visitor types in Cyrillic, results come back in Russian even if your titles are stored in English. You can override the detected language anytime — fine for multi-language sites with manual selectors.',
      },
      {
        question: 'Do I have to translate my product catalog?',
        answer:
          'No. Foxes indexes your existing English (or Arabic) titles and uses multilingual embeddings to match them against queries in 50+ languages. If you do already maintain translations, the widget will use them and rank them higher for native-language queries.',
      },
      {
        question: 'What happens when the search has no good answer?',
        answer:
          'The widget switches into conversational mode: it explains there is no exact match, offers the three closest alternatives with thumbnails and prices, and asks a clarifying question. Visitors stay on your site instead of bouncing to a search engine and ending up on an OTA.',
      },
      {
        question: 'How fast is it? Will it slow my site?',
        answer:
          'Search latency is under 200ms at the 95th percentile. The widget loads asynchronously, so it never blocks your page render. The search popup itself opens instantly because the embedding index lives on our edge — not on your origin.',
      },
      {
        question: 'What about visitor privacy and data?',
        answer:
          'Queries are processed anonymously. We do not store IPs, do not set tracking cookies on your domain, and the analytics dashboard only shows aggregate query patterns — never personal identifiers. Full PII-free design and GDPR-compliant out of the box.',
      },
      {
        question: 'Does it work with my existing booking platform?',
        answer:
          'Yes. We support direct integrations with Foxes booking engine, Bokun, Rezdy, FareHarbor, custom REST and CSV feeds. The widget reads your products at index time and links search results straight into your existing booking flow — no rewrites required.',
      },
      {
        question: 'What is the limit on the free tier?',
        answer:
          'Free covers up to 5,000 searches per month per widget — enough for most operator sites. Paid plans kick in only when you exceed that, and pricing is per-search, not per-product, so you never pay for catalog size. We share exact rates after a 15-minute call.',
      },
    ],
  },
  leadForm: {
    sectionEyebrow: 'Ready when you are',
    sectionHeadline: 'See AI Search live — on your own catalog.',
    sectionSub:
      'Tell us your site URL. We will index a sample of your products and send you a working widget preview within the hour.',
    fields: {
      name: 'Your name',
      namePlaceholder: 'Ahmed Hassan',
      business: 'Website / business name',
      businessPlaceholder: 'Pyramid Travel Egypt',
      whatsapp: 'WhatsApp number',
      whatsappPlaceholder: '+20 100 000 0000',
      monthlyBookings: 'Monthly site visitors (roughly)',
      monthlyBookingsOptions: [
        { value: 'lt-5k', label: 'Less than 5,000' },
        { value: '5k-20k', label: '5,000 to 20,000' },
        { value: '20k-100k', label: '20,000 to 100,000' },
        { value: '100k-plus', label: 'More than 100,000' },
      ],
    },
    submit: 'Get my preview',
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
    headline: 'Ready to turn your search box into a booking machine?',
    sub: 'Operators in Cairo, Hurghada, Sharm and Luxor already use Foxes AI Search to convert visitors before they bounce.',
    primary: 'Start free trial',
    secondary: 'Talk to us on WhatsApp',
  },
  whatsapp: {
    floatLabel: 'Chat with us',
    prefilledMessage: "Hi, I'm interested in the Foxes AI Search widget for my website.",
  },
  mobileStickyCta: {
    primary: 'Get started free',
    secondary: 'WhatsApp',
  },
  exitIntent: {
    eyebrow: 'One thing before you go',
    headline: 'The site-search benchmark for tour operators',
    sub: 'Real conversion data from 40 operator sites in Egypt and the GCC. What "good" looks like and what to fix first. Free PDF, sent in 60 seconds.',
    bullets: [
      'Search-to-booking benchmarks by vertical',
      'Top 20 zero-result queries (and what to do)',
      'A/B test playbook for site search',
    ],
    emailPlaceholder: 'you@yoursite.com',
    submitLabel: 'Send me the benchmark',
    submittingLabel: 'Sending...',
    successTitle: 'Sent. Check your inbox.',
    successBody:
      "If it's not there in 5 minutes, check spam — and message us on WhatsApp.",
    privacy: 'One email. Unsubscribe with one click.',
    dismissLabel: 'No thanks',
  },
};

export const ar: OperatorCopy = {
  meta: {
    title: 'أداة البحث الذكية لمشغّلي السياحة · Foxes Technology',
    description:
      'ضع شريط بحث مدعوم بالذكاء الاصطناعي على موقع جولاتك أو رحلاتك أو فندقك. يبحث الزائرون بأي لغة، يجدون المنتج المناسب فورًا، ويحجزون. سطر واحد من الكود. مجاني حتى 5000 عملية بحث شهريًا.',
    ogTitle: 'بحث يجد الجولة فعلًا · Foxes Technology',
  },
  hero: {
    badge: 'وكيل البحث الذكي · لموقعك',
    headlineLine1: 'بحث يجد الجولة',
    headlineLine2: 'فعلًا.',
    sub: 'أداة بحث ذكية تُضاف بسطر واحد إلى مواقع الجولات والرحلات والمعالم والفنادق. الزائر يكتب بلغته الطبيعية — حتى لو بأخطاء، بأي لغة — والمنتج المناسب يظهر أولًا. سطر واحد من الكود. مجاني حتى 5000 عملية بحث شهريًا.',
    primaryCta: 'ابدأ مجانًا',
    secondaryCta: 'تحدث معنا عبر واتساب',
    pills: ['تركيب بسطر واحد', 'مجاني حتى 5000 بحث شهريًا', '+50 لغة'],
  },
  socialProof: {
    label: 'يعمل بالفعل على مواقع مشغلين في',
    cities: 'القاهرة · الغردقة · شرم · الأقصر · دبي',
    stats: [
      { value: '+47%', label: 'بحث يتحول إلى حجز' },
      { value: '+50', label: 'لغة' },
      { value: 'أقل من 200ms', label: 'سرعة البحث' },
      { value: '5000', label: 'بحث مجاني شهريًا' },
    ],
  },
  pains: {
    sectionEyebrow: 'لماذا يغادر الزوار دون حجز',
    sectionHeadline: 'بحث موقعك لا يجد جولاتك أنت.',
    sectionSub:
      'المسافر اليوم لا يتصفح — يبحث. إن كان شريط البحث لا يرجع شيئًا لـ "رحلة نيلية رومانسية لشخصين"، يذهب إلى Viator. ويذهب هامشك معه.',
    items: [
      {
        title: 'البحث بالكلمات يفوّت كل استعلام حقيقي',
        description:
          'يكتب الضيف "رحلة قارب وقت الغروب" فلا يرجع البحث شيئًا — رغم أنك تبيع ثلاث رحلات غروب. الكتالوج سليم. شريط البحث هو المشكلة.',
      },
      {
        title: 'الزوار الأجانب لا يجدون شيئًا',
        description:
          'الروس والألمان والفرنسيون والعرب يبحثون بلغاتهم. معظم أدوات البحث تفهرس فقط عناوينك الإنجليزية. الجولة موجودة. لكنهم لا يرونها.',
      },
      {
        title: 'صفحات النتائج الفارغة تسلّم الزائر للوسطاء',
        description:
          'حين لا يرجع البحث شيئًا، يفتح الزائر تبويبًا جديدًا، يكتب جولتك في Google، فيتصدر Viator. بِعت الحجز — وسلّمت 25% منه.',
      },
    ],
  },
  solutions: {
    sectionEyebrow: 'كيف يحل Foxes AI Search ذلك',
    sectionHeadline: 'بحث دلالي، ردّ محادثة، أرقام حقيقية.',
    sectionSub:
      'أداة بحث مصممة لطريقة تسوّق المسافر فعلًا — لا لاستعلام SQL LIKE من عام 2008.',
    items: [
      {
        title: 'بحث دلالي عبر كتالوجك الكامل',
        description:
          'الأداة تفهم المعنى لا الكلمات. "رحلة قارب رومانسية أقل من ساعة" تجد فلوكا نيلية مدتها 50 دقيقة حتى لو لم يذكر العنوان كلمة "رومانسي". اكتب بأي لغة — تأتي النتائج بلغة الزائر.',
        bullets: [
          'تضمينات Anthropic و OpenAI تحت الغطاء',
          'تفهرس من 10 إلى 10000 منتج خلال دقائق',
          'ترتيب نتائج مضبوط على بيانات تحويلك',
        ],
      },
      {
        title: 'ردّ محادثة حين لا توجد نتيجة دقيقة',
        description:
          'حين لا يجد الكتالوج إجابة دقيقة، تتحوّل الأداة إلى محادثة: "ليست لدينا هذه الجولة بالضبط — إليك ثلاث جولات قريبة." يبقى الضيف على موقعك، يضغط اقتراحًا، يحجز.',
        bullets: [
          'تقترح 3 جولات قريبة بصور وأسعار',
          'تطرح بدائل بلطف وبنبرة الزائر',
          'تحوّل المحادثة إلى واتساب إن طلب الضيف إنسانًا',
        ],
      },
      {
        title: 'لوحة تحليلات لحظية',
        description:
          'شاهد كل ما يكتبه زوارك فعلًا. تتبّع أكثر الاستعلامات، الاستعلامات بدون نتائج، نسبة التحويل من بحث إلى حجز، وأي منتج يربح بعد البحث. أصلح فجوات كتالوجك قبل نهاية الأسبوع.',
        bullets: [
          'أكثر الاستعلامات والاستعلامات بدون نتائج',
          'تحويل البحث إلى حجز لكل استعلام',
          'خريطة حرارية لرحلة الزائر بعد البحث',
        ],
      },
    ],
  },
  howItWorks: {
    sectionEyebrow: 'الإعداد سريع',
    sectionHeadline: 'من الصفر إلى بحث حي خلال 15 دقيقة.',
    sectionSub:
      'أضف وسم سكربت واحد، وجّهه إلى كتالوج منتجاتك، فتُفهرس الأداة كل شيء في الخلفية بينما تُنهي شايك.',
    steps: [
      {
        title: 'سجّل واختر بيانات مشغّلك',
        description: 'أنشئ أداتك في لوحة Foxes. اختر الألوان والخط واللون المميز ومجموعة المنتجات التي ترجعها الأداة بالضبط.',
      },
      {
        title: 'ضع وسم سكربت واحد',
        description:
          'الصق مقتطف التضمين على موقعك. تظهر الأداة كشريط بحث أو فقاعة محادثة عائمة أو الاثنين معًا — الاختيار لك.',
      },
      {
        title: 'الكتالوج يُفهرس تلقائيًا',
        description:
          'يسحب Foxes جولاتك من محرك الحجز أو نظام المحتوى أو ملف CSV. تصبح الأداة قابلة للبحث بأي لغة خلال دقائق.',
      },
    ],
  },
  features: {
    sectionEyebrow: 'مصمم لمواقع السياحة',
    sectionHeadline: 'كل ميزة، مصممة للزائر الذي يكتب قبل أن يتصفّح.',
    sectionSub:
      'البحث العام يعامل كل استعلام كمطابقة نصّية. Foxes يعامله كضيف على وشك الحجز.',
    items: [
      {
        title: 'تركيب بسطر سكربت واحد',
        description: 'وسم واحد. يعمل على Next.js و WordPress و Shopify و Webflow أو HTML يدوي.',
      },
      {
        title: '+50 لغة جاهزة',
        description: 'يكتشف لغة الزائر تلقائيًا. يرجع نتائج محلية بلا فهارس منفصلة.',
      },
      {
        title: 'بحث دلالي بالمتجهات',
        description: 'تضمينات Anthropic و OpenAI ترتّب النتائج بالنية لا بالكلمة الحرفية.',
      },
      {
        title: 'محادثة احتياطية',
        description: 'حين يكون البحث ملتبسًا، تطرح الأداة سؤالًا توضيحيًا وتعرض خيارات.',
      },
      {
        title: 'تحليلات لحظية',
        description: 'أكثر الاستعلامات، الاستعلامات بدون نتائج، تحويل من بحث إلى حجز، لوحات لكل مشغّل.',
      },
      {
        title: 'علامة بيضاء للأداة',
        description: 'علامة لكل مشغّل وخطوط ولون مميز ووضع ليلي أو نهاري ونبرة كلام.',
      },
      {
        title: 'تركيب مقفل بالنطاق',
        description: 'كل أداة مقيّدة بالنطاقات التي تسمح بها. تمنع المواقع الأخرى من استخدام مفتاحك.',
      },
      {
        title: 'تضمينات مخصّصة لكتالوجك',
        description: 'اضبط الترتيب على بيانات حجوزاتك السابقة ليتصدّر الفائزون.',
      },
    ],
  },
  pricing: {
    eyebrow: 'الأسعار',
    headline: 'مجاني حتى 5000 بحث شهريًا.',
    sub: 'بعدها، قروش لكل بحث — على أساس الاستخدام، بلا حد أدنى شهري، بلا رسوم تركيب.',
    bullets: [
      'الباقة المجانية تكفي معظم مواقع المشغلين',
      'منتجات ومستأجرون بلا حد',
      'تحليلات لحظية مشمولة',
      'إلغاء في أي وقت',
    ],
    cta: 'ابدأ التجربة المجانية',
    fineprint:
      'بدون بطاقة ائتمان للبدء. أسعار الباقات المدفوعة تُشارَك في مكالمة 15 دقيقة لنطابق حجم زوارك.',
  },
  faq: {
    sectionEyebrow: 'أسئلة يجب أن تسألها',
    sectionHeadline: 'إجابات صريحة.',
    items: [
      {
        question: 'كم يستغرق التركيب فعلًا؟',
        answer:
          'معظم المشغلين يعملون خلال 15 دقيقة. الصق وسم سكربت واحدًا، حدّد نطاقك في اللوحة، وجّه الأداة إلى موجز المنتجات، فيصبح موقعك قابلًا للبحث. الفهرسة تعمل في الخلفية وتنتهي عادةً في أقل من خمس دقائق لمواقع تحتوي 100 إلى 500 منتج.',
      },
      {
        question: 'كيف يعمل اكتشاف اللغة؟',
        answer:
          'تقرأ الأداة لغة المتصفح وسمة lang في الصفحة ونصّ الاستعلام نفسه. إن كتب زائر روسي بالكيريلية، ترجع النتائج بالروسية حتى لو كانت عناوينك بالإنجليزية. ويمكنك تجاوز اللغة المكتشفة في أي وقت — مناسب للمواقع متعددة اللغات بمحدّد يدوي.',
      },
      {
        question: 'هل عليّ ترجمة كتالوجي؟',
        answer:
          'لا. يفهرس Foxes عناوينك الإنجليزية أو العربية الحالية ويستخدم تضمينات متعددة اللغات لمطابقتها مع استعلامات بأكثر من 50 لغة. وإن كانت لديك ترجمات، تستخدمها الأداة وترفعها في الترتيب للاستعلامات بلغتها الأصلية.',
      },
      {
        question: 'ماذا يحدث حين لا يكون للبحث إجابة جيدة؟',
        answer:
          'تتحوّل الأداة إلى وضع المحادثة: تشرح أنه لا توجد مطابقة دقيقة، تعرض أقرب ثلاث بدائل بصور وأسعار، وتطرح سؤالًا توضيحيًا. يبقى الزائر على موقعك بدلًا من القفز إلى محرك بحث ينتهي به في OTA.',
      },
      {
        question: 'ما سرعة الأداة؟ هل تُبطئ موقعي؟',
        answer:
          'سرعة البحث أقل من 200 مللي ثانية في الشريحة الـ95. تُحمَّل الأداة لا تزامنيًا فلا تعرقل عرض صفحتك. والنافذة تفتح فورًا لأن فهرس التضمينات يعيش على الحافة لدينا — لا على خادمك.',
      },
      {
        question: 'ماذا عن خصوصية الزائر وبياناته؟',
        answer:
          'تُعالج الاستعلامات بشكل مجهول. لا نخزّن عناوين IP، ولا نضع كوكيز تتبّع على نطاقك، ولوحة التحليلات تعرض أنماطًا تجميعية فقط — لا معرّفات شخصية. تصميم خالٍ من البيانات الشخصية ومتوافق مع GDPR من البداية.',
      },
      {
        question: 'هل يعمل مع منصة الحجز الحالية؟',
        answer:
          'نعم. ندعم تكاملات مباشرة مع محرك Foxes للحجز و Bokun و Rezdy و FareHarbor و REST مخصّص وملفات CSV. تقرأ الأداة منتجاتك وقت الفهرسة وتربط نتائج البحث بمسار الحجز الحالي مباشرة — بدون إعادة كتابة شيء.',
      },
      {
        question: 'ما حدود الباقة المجانية؟',
        answer:
          'المجانية تشمل حتى 5000 عملية بحث شهريًا لكل أداة — ما يكفي معظم مواقع المشغلين. الباقات المدفوعة تبدأ فقط حين تتجاوز ذلك، والتسعير لكل بحث لا لكل منتج، فلا تدفع أبدًا مقابل حجم الكتالوج. نشارك الأرقام بعد مكالمة 15 دقيقة.',
      },
    ],
  },
  leadForm: {
    sectionEyebrow: 'جاهزون متى تكون',
    sectionHeadline: 'شاهد البحث الذكي حيًّا — على كتالوجك أنت.',
    sectionSub:
      'أخبرنا برابط موقعك. سنفهرس عيّنة من منتجاتك ونرسل لك معاينة عاملة للأداة خلال ساعة.',
    fields: {
      name: 'اسمك',
      namePlaceholder: 'أحمد حسن',
      business: 'اسم الموقع / النشاط',
      businessPlaceholder: 'Pyramid Travel Egypt',
      whatsapp: 'رقم واتساب',
      whatsappPlaceholder: '+20 100 000 0000',
      monthlyBookings: 'زوار الموقع شهريًا (تقريبًا)',
      monthlyBookingsOptions: [
        { value: 'lt-5k', label: 'أقل من 5000' },
        { value: '5k-20k', label: 'من 5000 إلى 20000' },
        { value: '20k-100k', label: 'من 20000 إلى 100000' },
        { value: '100k-plus', label: 'أكثر من 100000' },
      ],
    },
    submit: 'احصل على معاينتي',
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
    headline: 'مستعد لتحوّل شريط بحثك إلى آلة حجز؟',
    sub: 'مشغّلون في القاهرة والغردقة وشرم والأقصر يستخدمون بحث Foxes الذكي بالفعل لتحويل الزوار قبل أن يغادروا.',
    primary: 'ابدأ التجربة المجانية',
    secondary: 'تحدث معنا على واتساب',
  },
  whatsapp: {
    floatLabel: 'تحدث معنا',
    prefilledMessage: 'مرحبًا، أنا مهتم بأداة البحث الذكية من Foxes لموقعي.',
  },
  mobileStickyCta: {
    primary: 'ابدأ مجانًا',
    secondary: 'واتساب',
  },
  exitIntent: {
    eyebrow: 'شيء واحد قبل أن تغادر',
    headline: 'مرجع أداء بحث المواقع لمشغّلي السياحة',
    sub: 'بيانات تحويل حقيقية من 40 موقع مشغّل في مصر والخليج. كيف يبدو الأداء الجيد وما الذي يجب إصلاحه أولًا. PDF مجاني، يصلك خلال 60 ثانية.',
    bullets: [
      'مرجع تحويل البحث إلى حجز لكل قطاع',
      'أكثر 20 استعلام بدون نتائج (وكيف تعالجها)',
      'دليل اختبارات A/B لبحث الموقع',
    ],
    emailPlaceholder: 'you@yoursite.com',
    submitLabel: 'أرسل لي المرجع',
    submittingLabel: 'جاري الإرسال...',
    successTitle: 'تم الإرسال. تحقق من بريدك.',
    successBody:
      'إن لم يصل خلال 5 دقائق، تحقق من البريد المزعج — وراسلنا على واتساب.',
    privacy: 'بريد واحد. إلغاء الاشتراك بنقرة.',
    dismissLabel: 'لا شكرًا',
  },
};
