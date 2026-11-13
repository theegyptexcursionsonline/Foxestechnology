import type { OperatorCopy } from '../operators';

/**
 * AI Voice, as it works today: a voice concierge on the operator's own website. Guests tap to
 * talk in the browser, or type. It answers from the business's own information, takes booking
 * requests and callbacks, and hands over to the team.
 *
 * It does not answer a telephone number, take payment, or send SMS or WhatsApp, and access is by
 * reviewed request. Check the product before adding any of those back.
 */
export const en: OperatorCopy = {
  meta: {
    title: 'AI Voice for Tour Operators · A Voice Concierge on Your Website',
    description:
      'Guests tap to talk on your website and AI Voice answers in Arabic or English from your own tours, prices and policies. It takes booking requests and callbacks and hands the conversation to your team. 24 languages. Access by invitation.',
    ogTitle: 'Guests ask out loud. Your website answers.',
  },
  hero: {
    badge: 'AI Voice · For tour operators',
    headlineLine1: 'Guests ask out loud.',
    headlineLine2: 'Your website answers.',
    sub: 'AI Voice puts a tap-to-talk concierge on your website. Guests speak or type in Arabic or English, it answers only from your own tours, prices and policies, takes booking requests and callbacks, and hands the conversation to your team with everything written down.',
    primaryCta: 'Ask for a demo',
    secondaryCta: 'Hear it on WhatsApp',
    pills: ['Arabic and English', 'Monthly plans', 'Access by invitation'],
  },
  socialProof: {
    label: 'Built for operators in',
    cities: 'Hurghada · Sharm El Sheikh · Cairo · Luxor · Aswan',
    stats: [
      { value: '24', label: 'Languages supported' },
      { value: '24/7', label: 'On your website, day and night' },
      { value: 'AR + EN', label: 'Arabic and English voices' },
      { value: '1', label: 'Agent for talking and typing' },
    ],
  },
  pains: {
    sectionEyebrow: 'The reality of guest questions',
    sectionHeadline: 'The question comes at 11 pm. The answer comes at 9 am.',
    sectionSub: 'By then the guest has asked someone else.',
    items: [
      {
        title: 'Questions after hours',
        description:
          'A guest lands on your site in the evening and wants to know if Friday is free. Nobody is at the desk until morning.',
      },
      {
        title: 'The same answers, all day',
        description:
          'What time is pickup, is lunch included, can children come. Your team types the same replies again and again.',
      },
      {
        title: 'Requests that never reach the desk',
        description:
          'A guest was ready to book but did not want to fill in a form. They left, and nobody on your team knows they were there.',
      },
    ],
  },
  solutions: {
    sectionEyebrow: 'What it does today',
    sectionHeadline: 'It talks, it takes the request, it hands over.',
    sectionSub: 'One agent on your website, set up with your own tours, prices and policies.',
    items: [
      {
        title: 'Answers out loud, in Arabic or English',
        description:
          'Guests tap a button and talk in their browser, or type if they prefer. The agent answers from your own information and shows every word on screen as it speaks. When it does not know, it says so.',
        bullets: [
          'Arabic and English voices, 24 languages in all',
          'Speak or type in the same conversation',
          'Answers only from your tours, prices and policies',
        ],
      },
      {
        title: 'Takes booking requests and callbacks',
        description:
          'When a guest wants to book, the agent collects the trip, the date and the number of people, reads them back, and sends the request to your team to confirm. It can also take a callback request.',
        bullets: [
          'Details read back before anything is sent',
          'Your team confirms every booking',
          'Hands over to a person with the conversation written down',
        ],
      },
      {
        title: 'Every call in your dashboard',
        description:
          'Each conversation is kept with its recording, its transcript and its length, so you can see what guests ask and what was requested.',
        bullets: [
          'Recording and transcript for each call',
          'Guests are told the call is recorded before it starts',
          'Booking requests and hand-overs listed for your team',
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
        title: 'Your agent learns your business',
        description:
          'It is set up with your tours, prices and policies. You choose its name, its voice and its greeting in each language.',
      },
      {
        title: 'Add it to your website',
        description:
          'Guests tap to talk. You read the conversations and booking requests in your dashboard.',
      },
    ],
  },
  features: {
    sectionEyebrow: 'In the product today',
    sectionHeadline: 'What you get.',
    sectionSub: 'AI Voice works on your website. It does not answer a phone number.',
    items: [
      {
        title: 'Arabic and English first',
        description: 'Arabic and English each have their own voice. 22 more languages are available.',
      },
      {
        title: 'Your information only',
        description: 'It answers from the tours, prices and policies you give it, and says when it does not know.',
      },
      {
        title: 'Speak or type',
        description: 'A guest who cannot talk out loud can type in the same conversation.',
      },
      {
        title: 'Words on screen',
        description: 'Every word appears as text while the agent speaks.',
      },
      {
        title: 'Booking requests and callbacks',
        description: 'The details are read back to the guest, then sent to your team to confirm.',
      },
      {
        title: 'Hand-over to a person',
        description: 'When a guest asks for a person, your team gets the conversation written down.',
      },
      {
        title: 'Your name, voice and hours',
        description: 'Choose the agent’s name, voice and greeting for each language, and set your business hours.',
      },
      {
        title: 'Call records',
        description: 'Recording, transcript and call length for every conversation, in your dashboard.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Pricing',
    headline: 'Monthly plans with minutes included.',
    sub: 'Every plan includes a set number of voice minutes each month, from a single property up to multi-property groups.',
    bullets: [
      'Voice minutes included in every plan',
      'Change plans as your call volume grows',
      'Enterprise plans for larger groups',
      'Prices in US dollars',
    ],
    cta: 'See plans and pricing',
    ctaHref: 'https://voice.foxestechnology.com/pricing?lang=en',
    fineprint: 'Plans, prices and what each one includes are listed on the AI Voice pricing page.',
  },
  faq: {
    sectionEyebrow: 'Questions you should ask',
    sectionHeadline: 'Straight answers.',
    items: [
      {
        question: 'Does it answer my phone number?',
        answer:
          'Not today. AI Voice answers on your website: guests tap a button and talk in their browser, or type. Answering a phone line is not available yet.',
      },
      {
        question: 'Which languages does it speak?',
        answer:
          'Arabic and English have their own voices and are the two we set up and test with you first. 22 more languages are available, 24 in all.',
      },
      {
        question: 'What does it know about my tours?',
        answer:
          'It answers from the tours, prices and policies you give it. When it does not have an answer it says so and offers to pass the question to your team.',
      },
      {
        question: 'Can it take a booking?',
        answer:
          'It takes a booking request. It collects the trip, the date and the number of people, reads them back to the guest and sends the request to your team to confirm. It does not take payment.',
      },
      {
        question: 'What happens when a guest wants a person?',
        answer:
          'The agent hands the conversation to your team with everything written down, or takes a callback request, so the guest does not have to explain again.',
      },
      {
        question: 'Are calls recorded?',
        answer:
          'Yes. Before a call starts the guest is told they are talking to an AI assistant and that the call is recorded. You see the recording, the transcript and the call length in your dashboard.',
      },
      {
        question: 'How much does it cost?',
        answer:
          'AI Voice is sold as monthly plans, each with a set number of voice minutes, plus an Enterprise plan for larger groups. Current prices are on the AI Voice pricing page.',
      },
      {
        question: 'Can I hear it before I decide?',
        answer:
          'Yes. You can talk to a demo agent at voice.foxestechnology.com, and we can show you one set up with your own tours.',
      },
    ],
  },
  leadForm: {
    sectionEyebrow: 'Hear it before you decide',
    sectionHeadline: 'A demo with your own tours.',
    sectionSub: 'Tell us about your business and our team will contact you to arrange a demo.',
    fields: {
      name: 'Your name',
      namePlaceholder: 'Your full name',
      business: 'Business name',
      businessPlaceholder: 'Your business name',
      whatsapp: 'WhatsApp number',
      whatsappPlaceholder: '+20 1XX XXX XXXX',
      monthlyBookings: 'Guest enquiries per month (roughly)',
      monthlyBookingsOptions: [
        { value: 'lt-200', label: 'Less than 200' },
        { value: '200-1000', label: '200 to 1,000' },
        { value: '1000-5000', label: '1,000 to 5,000' },
        { value: '5000-plus', label: '5,000 or more' },
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
    headline: 'Let your website answer the next guest.',
    sub: 'Access is by invitation. Send a request and our team will reply.',
    primary: 'Ask for a demo',
    secondary: 'Talk to us on WhatsApp',
  },
  whatsapp: {
    floatLabel: 'Ask about AI Voice',
    prefilledMessage: "Hi, I'd like a demo of Foxes AI Voice.",
  },
  mobileStickyCta: {
    primary: 'Ask for a demo',
    secondary: 'WhatsApp',
  },
  exitIntent: {
    eyebrow: 'Before you go',
    headline: 'Prefer that we write to you?',
    sub: 'Leave your email and a person from our team will write to you about AI Voice. It is not a newsletter.',
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
    title: 'AI Voice لمشغّلي السياحة · مساعد صوتي على موقعك',
    description:
      'يضغط الضيف زر التحدث على موقعك فيجيبه AI Voice بالعربية أو الإنجليزية من رحلاتك وأسعارك وسياساتك أنت. يستقبل طلبات الحجز وطلبات معاودة الاتصال ويحوّل المحادثة إلى فريقك. 24 لغة. الانضمام بدعوة.',
    ogTitle: 'يسأل الضيف بصوته. وموقعك يجيب.',
  },
  hero: {
    badge: 'AI Voice · لمشغّلي السياحة',
    headlineLine1: 'يسأل الضيف بصوته.',
    headlineLine2: 'وموقعك يجيب.',
    sub: 'يضع AI Voice مساعدًا صوتيًا على موقعك. يتحدث الضيف أو يكتب بالعربية أو الإنجليزية، فيجيبه من رحلاتك وأسعارك وسياساتك فقط، ويستقبل طلبات الحجز وطلبات معاودة الاتصال، ثم يحوّل المحادثة إلى فريقك مكتوبة بالكامل.',
    primaryCta: 'اطلب عرضًا',
    secondaryCta: 'استمع عبر واتساب',
    pills: ['العربية والإنجليزية', 'خطط شهرية', 'الانضمام بدعوة'],
  },
  socialProof: {
    label: 'مصمم للمشغّلين في',
    cities: 'الغردقة · شرم الشيخ · القاهرة · الأقصر · أسوان',
    stats: [
      { value: '24', label: 'لغة مدعومة' },
      { value: '24/7', label: 'على موقعك ليلًا ونهارًا' },
      { value: 'AR + EN', label: 'صوتان بالعربية والإنجليزية' },
      { value: '1', label: 'مساعد واحد للتحدث والكتابة' },
    ],
  },
  pains: {
    sectionEyebrow: 'واقع أسئلة الضيوف',
    sectionHeadline: 'السؤال يأتي في الحادية عشرة ليلًا. والجواب في التاسعة صباحًا.',
    sectionSub: 'وحينها يكون الضيف قد سأل غيرك.',
    items: [
      {
        title: 'أسئلة بعد ساعات العمل',
        description: 'يزور ضيف موقعك مساءً ويريد أن يعرف هل يوم الجمعة متاح. ولا أحد في المكتب حتى الصباح.',
      },
      {
        title: 'الإجابات نفسها طوال اليوم',
        description: 'متى موعد الاستقبال، وهل الغداء مشمول، وهل يُسمح بالأطفال. يكتب فريقك الردود نفسها مرارًا.',
      },
      {
        title: 'طلبات لا تصل إلى المكتب',
        description: 'كان الضيف مستعدًا للحجز لكنه لم يرغب في تعبئة نموذج. فغادر، ولا أحد في فريقك يعلم أنه كان هنا.',
      },
    ],
  },
  solutions: {
    sectionEyebrow: 'ما يقدّمه اليوم',
    sectionHeadline: 'يتحدث، ويستقبل الطلب، ويحوّله إلى فريقك.',
    sectionSub: 'مساعد واحد على موقعك، مجهّز برحلاتك وأسعارك وسياساتك أنت.',
    items: [
      {
        title: 'يجيب بصوته، بالعربية أو الإنجليزية',
        description:
          'يضغط الضيف زرًا ويتحدث من متصفحه، أو يكتب إن فضّل ذلك. يجيب المساعد من معلوماتك أنت ويعرض كل كلمة على الشاشة وهو يتحدث. وإن لم يعرف الجواب يقول ذلك.',
        bullets: [
          'صوتان بالعربية والإنجليزية، و24 لغة إجمالًا',
          'تحدّث أو اكتب في المحادثة نفسها',
          'يجيب من رحلاتك وأسعارك وسياساتك فقط',
        ],
      },
      {
        title: 'يستقبل طلبات الحجز وطلبات معاودة الاتصال',
        description:
          'عندما يريد الضيف الحجز، يأخذ المساعد الرحلة والتاريخ وعدد الأشخاص، ويعيد قراءتها على الضيف، ثم يرسل الطلب إلى فريقك ليؤكده. ويمكنه أيضًا تسجيل طلب معاودة اتصال.',
        bullets: [
          'تُقرأ التفاصيل على الضيف قبل إرسال أي شيء',
          'فريقك هو من يؤكد كل حجز',
          'يحوّل المحادثة إلى موظف وهي مكتوبة بالكامل',
        ],
      },
      {
        title: 'كل مكالمة في لوحة التحكم',
        description:
          'تُحفظ كل محادثة مع تسجيلها ونصها ومدتها، فترى ما يسأل عنه الضيوف وما طلبوه.',
        bullets: [
          'تسجيل ونص لكل مكالمة',
          'يُبلَّغ الضيف قبل بدء المكالمة بأنها مسجّلة',
          'طلبات الحجز والتحويلات معروضة لفريقك',
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
        title: 'يتعرّف المساعد على نشاطك',
        description: 'يُجهَّز برحلاتك وأسعارك وسياساتك. وتختار أنت اسمه وصوته وتحيته بكل لغة.',
      },
      {
        title: 'أضفه إلى موقعك',
        description: 'يضغط الضيوف للتحدث. وتقرأ أنت المحادثات وطلبات الحجز في لوحة التحكم.',
      },
    ],
  },
  features: {
    sectionEyebrow: 'في المنتج اليوم',
    sectionHeadline: 'ما تحصل عليه.',
    sectionSub: 'يعمل AI Voice على موقعك. ولا يرد على رقم هاتف.',
    items: [
      {
        title: 'العربية والإنجليزية أولًا',
        description: 'للعربية صوتها وللإنجليزية صوتها. وتتوفر 22 لغة أخرى.',
      },
      {
        title: 'معلوماتك أنت فقط',
        description: 'يجيب من الرحلات والأسعار والسياسات التي تزوّده بها، ويقول حين لا يعرف.',
      },
      {
        title: 'تحدّث أو اكتب',
        description: 'الضيف الذي لا يستطيع التحدث بصوت مسموع يكتب في المحادثة نفسها.',
      },
      {
        title: 'الكلمات على الشاشة',
        description: 'تظهر كل كلمة نصًا أثناء حديث المساعد.',
      },
      {
        title: 'طلبات الحجز ومعاودة الاتصال',
        description: 'تُقرأ التفاصيل على الضيف ثم تُرسل إلى فريقك ليؤكدها.',
      },
      {
        title: 'التحويل إلى موظف',
        description: 'عندما يطلب الضيف التحدث إلى موظف، تصل المحادثة إلى فريقك مكتوبة.',
      },
      {
        title: 'الاسم والصوت وساعات العمل',
        description: 'اختر اسم المساعد وصوته وتحيته بكل لغة، وحدّد ساعات عملك.',
      },
      {
        title: 'سجل المكالمات',
        description: 'التسجيل والنص ومدة كل محادثة في لوحة التحكم.',
      },
    ],
  },
  pricing: {
    eyebrow: 'الأسعار',
    headline: 'باقات شهرية تشمل الدقائق.',
    sub: 'تتضمن كل باقة عددًا محددًا من دقائق المكالمات شهريًا، من منشأة واحدة إلى مجموعات متعددة المنشآت.',
    bullets: [
      'دقائق المكالمات مشمولة في كل باقة',
      'غيّر باقتك مع نمو حجم مكالماتك',
      'باقات مؤسسية للمجموعات الكبيرة',
      'الأسعار بالدولار الأمريكي',
    ],
    cta: 'اطّلع على الباقات والأسعار',
    ctaHref: 'https://voice.foxestechnology.com/pricing?lang=ar',
    fineprint: 'الباقات والأسعار وما تتضمنه كل باقة متاحة في صفحة أسعار وكيل الصوت الذكي.',
  },
  faq: {
    sectionEyebrow: 'أسئلة ينبغي أن تسألها',
    sectionHeadline: 'إجابات مباشرة.',
    items: [
      {
        question: 'هل يرد على رقم هاتفي؟',
        answer:
          'ليس اليوم. يجيب AI Voice على موقعك: يضغط الضيف زرًا ويتحدث من متصفحه، أو يكتب. الرد على خط هاتفي غير متاح بعد.',
      },
      {
        question: 'ما اللغات التي يتحدثها؟',
        answer:
          'للعربية والإنجليزية صوتان خاصان، وهما اللغتان اللتان نجهّزهما ونختبرهما معك أولًا. وتتوفر 22 لغة أخرى، أي 24 لغة إجمالًا.',
      },
      {
        question: 'ماذا يعرف عن رحلاتي؟',
        answer:
          'يجيب من الرحلات والأسعار والسياسات التي تزوّده بها. وإن لم يجد جوابًا يقول ذلك ويعرض تحويل السؤال إلى فريقك.',
      },
      {
        question: 'هل يستطيع إتمام حجز؟',
        answer:
          'يستقبل طلب حجز. يأخذ الرحلة والتاريخ وعدد الأشخاص، ويعيد قراءتها على الضيف، ويرسل الطلب إلى فريقك ليؤكده. ولا يستلم أي مدفوعات.',
      },
      {
        question: 'ماذا يحدث عندما يريد الضيف التحدث إلى موظف؟',
        answer:
          'يحوّل المساعد المحادثة إلى فريقك مكتوبة بالكامل، أو يسجّل طلب معاودة اتصال، فلا يضطر الضيف إلى الشرح من جديد.',
      },
      {
        question: 'هل تُسجَّل المكالمات؟',
        answer:
          'نعم. قبل بدء المكالمة يُبلَّغ الضيف بأنه يتحدث إلى مساعد ذكي وبأن المكالمة مسجّلة. وترى أنت التسجيل والنص ومدة المكالمة في لوحة التحكم.',
      },
      {
        question: 'كم يكلّف؟',
        answer:
          'يُباع AI Voice بخطط شهرية، لكل منها عدد محدد من دقائق الصوت، إضافة إلى خطة للمؤسسات والمجموعات الأكبر. الأسعار الحالية في صفحة أسعار AI Voice.',
      },
      {
        question: 'هل أستطيع سماعه قبل أن أقرر؟',
        answer:
          'نعم. يمكنك التحدث إلى مساعد تجريبي على voice.foxestechnology.com، ويمكننا أن نريك مساعدًا مجهّزًا برحلاتك أنت.',
      },
    ],
  },
  leadForm: {
    sectionEyebrow: 'استمع قبل أن تقرر',
    sectionHeadline: 'عرض برحلاتك أنت.',
    sectionSub: 'أخبرنا عن نشاطك وسيتواصل معك فريقنا لترتيب عرض.',
    fields: {
      name: 'اسمك',
      namePlaceholder: 'الاسم الكامل',
      business: 'اسم النشاط',
      businessPlaceholder: 'اسم نشاطك',
      whatsapp: 'رقم واتساب',
      whatsappPlaceholder: '+20 1XX XXX XXXX',
      monthlyBookings: 'عدد استفسارات الضيوف شهريًا (تقريبًا)',
      monthlyBookingsOptions: [
        { value: 'lt-200', label: 'أقل من 200' },
        { value: '200-1000', label: 'من 200 إلى 1,000' },
        { value: '1000-5000', label: 'من 1,000 إلى 5,000' },
        { value: '5000-plus', label: '5,000 أو أكثر' },
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
    headline: 'دع موقعك يجيب الضيف القادم.',
    sub: 'الانضمام بدعوة. أرسل طلبًا وسيرد عليك فريقنا.',
    primary: 'اطلب عرضًا',
    secondary: 'تحدث معنا عبر واتساب',
  },
  whatsapp: {
    floatLabel: 'اسأل عن AI Voice',
    prefilledMessage: 'مرحبًا، أودّ عرضًا لـ AI Voice من Foxes.',
  },
  mobileStickyCta: {
    primary: 'اطلب عرضًا',
    secondary: 'واتساب',
  },
  exitIntent: {
    eyebrow: 'قبل أن تغادر',
    headline: 'هل تفضّل أن نراسلك نحن؟',
    sub: 'اترك بريدك الإلكتروني وسيكتب لك أحد أفراد فريقنا عن AI Voice. ليست نشرة بريدية.',
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
