export type Locale = 'en' | 'ar';

export type OperatorCategory =
  | 'diving-centres'
  | 'dinner-cruises'
  | 'tour-agencies'
  | 'water-sports'
  | 'boat-operators'
  | 'ai-voice'
  | 'ai-search';

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
    /**
     * Where the pricing button goes: the product's own public pricing page, or
     * /request-access when that page is not public yet. Keep `cta` describing it
     * truthfully ("See plans and pricing" vs "Ask us for pricing"); the pairs are
     * pinned in __tests__/content/pricing-truth.test.ts.
     */
    ctaHref: string;
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
    /** Shown when the form is sent with a field empty or a number that cannot be a phone number. */
    errorMissing: string;
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
  exitIntent: {
    eyebrow: string;
    headline: string;
    sub: string;
    bullets: string[];
    emailPlaceholder: string;
    submitLabel: string;
    submittingLabel: string;
    successTitle: string;
    successBody: string;
    privacy: string;
    dismissLabel: string;
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
import { en as aiVoiceEn, ar as aiVoiceAr } from './copy/ai-voice';
import { en as aiSearchEn, ar as aiSearchAr } from './copy/ai-search';

import { en as dinnerCruisesEn, ar as dinnerCruisesAr } from './copy/dinner-cruises';
import { en as divingCentresEn, ar as divingCentresAr } from './copy/diving-centres';

const en: Record<OperatorCategory, OperatorCopy> = {
  'tour-agencies': tourAgenciesEn,
  'water-sports': waterSportsEn,
  'boat-operators': boatOperatorsEn,
  'dinner-cruises': dinnerCruisesEn,
  'diving-centres': divingCentresEn,
  'ai-voice': aiVoiceEn,
  'ai-search': aiSearchEn,
};

const ar: Record<OperatorCategory, OperatorCopy> = {
  'tour-agencies': tourAgenciesAr,
  'water-sports': waterSportsAr,
  'boat-operators': boatOperatorsAr,
  'dinner-cruises': dinnerCruisesAr,
  'diving-centres': divingCentresAr,
  'ai-voice': aiVoiceAr,
  'ai-search': aiSearchAr,
};

export function getOperatorCopy(category: OperatorCategory, locale: Locale): OperatorCopy {
  const dict = locale === 'ar' ? ar : en;
  const copy = dict[category];
  if (!copy) {
    throw new Error(`No operator copy for ${category} in ${locale}`);
  }
  return copy;
}
