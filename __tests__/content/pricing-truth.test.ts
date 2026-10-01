/**
 * Pricing truthfulness guard for the public marketing pages.
 *
 * While the rest of the site shows the coming-soon screen, the solution and operator
 * pages stay public (components/ConditionalLayout.tsx). Every commercial statement on
 * them has to match what the products actually sell. Until final commercial terms are
 * published, these pages carry no prices, free allowances, trial lengths or per-unit
 * rates: they point to the product's own pricing page when it is public, and to
 * /request-access ("Ask us for pricing") when it is not.
 *
 * A failure here means a page is about to promise something a customer cannot buy.
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { getOperatorCopy, type Locale, type OperatorCategory } from '@/lib/i18n/operators';

const ROOT = path.resolve(__dirname, '../..');

const CATEGORIES: OperatorCategory[] = [
  'diving-centres',
  'dinner-cruises',
  'tour-agencies',
  'water-sports',
  'boat-operators',
  'ai-voice',
  'ai-search',
];
const LOCALES: Locale[] = ['en', 'ar'];

type BannedClaim = { claim: string; pattern: RegExp };

/** Claims the products do not sell (English and Arabic wording). */
const BANNED_COPY_CLAIMS: BannedClaim[] = [
  {
    claim: 'AI Search free allowance of 5,000 searches',
    pattern: /5[,.]?000\s+(?:free\s+)?searches|\b5k\s+searches|free searches|5000\s+(?:عملية\s+)?بحث|بحث مجاني/i,
  },
  { claim: 'per-search pricing', pattern: /pennies|\bper[- ]search\b|قروش|لكل بحث/i },
  {
    claim: 'no monthly minimum / no commitment',
    pattern: /monthly minimums?|minimum commitment|حد أدنى شهري|التزام شهري/i,
  },
  { claim: 'free voice minutes', pattern: /free\s+minutes|minutes\s+free|دقيقة\s+مجان/i },
  {
    claim: 'per-minute pricing',
    pattern: /\bper[- ]minute\b|\bcents?\b|بالدقيقة|للدقيقة|سنت أمريكي/i,
  },
  {
    claim: 'free trial / trial length',
    pattern: /free trial|free for \d+ days|\d+[- ]days?\s+(?:free\s+)?trial|مجاني لمدة|(?:ال)?تجربة (?:ال)?مجانية/i,
  },
  {
    claim: 'terms that depend on a trial',
    pattern: /\b(?:during|after)\s+(?:your\s+|the\s+)?trial\b|(?:خلال|بعد) التجربة/i,
  },
  { claim: '"get started free"', pattern: /get started free|ابدأ مجان/i },
  { claim: 'free tier', pattern: /free tier|الباقة المجانية|المجانية تشمل/i },
  { claim: 'no card required', pattern: /\bno (?:credit )?card\b|بدون بطاقة/i },
  {
    claim: 'unlimited products or bookings',
    pattern: /unlimited (?:products|bookings)|غير محدودة|بلا حد/i,
  },
  { claim: 'cancel anytime', pattern: /cancel anytime|إلغاء في أي وقت/i },
  {
    claim: 'transaction-fee pricing with no monthly fee',
    pattern: /percentage per (?:online )?transaction|no monthly fees?|نسبة صغيرة لكل عملية|بدون رسوم شهرية/i,
  },
  { claim: 'placeholder WhatsApp number', pattern: /201000000000/ },
];

/** Pricing destinations verified live on 2026-10-01 (status 200, real plans, not a coming-soon screen). */
const VERIFIED_PRICING_CTA: Record<'voice' | 'search' | 'booking', Record<Locale, { href: string; label: string }>> = {
  voice: {
    en: { href: 'https://voice.foxestechnology.com/pricing?lang=en', label: 'See plans and pricing' },
    ar: { href: 'https://voice.foxestechnology.com/pricing?lang=ar', label: 'اطّلع على الباقات والأسعار' },
  },
  // search.foxestechnology.com/pricing is behind an access code, so pricing is requested instead.
  search: {
    en: { href: '/request-access?solution=search&source=foxestechnology', label: 'Ask us for pricing' },
    ar: { href: '/request-access?solution=search&source=foxestechnology', label: 'اسألنا عن الأسعار' },
  },
  // The booking dashboard's pricing page is behind the launch gate, so pricing is requested instead.
  booking: {
    en: { href: '/request-access?solution=booking&source=foxestechnology', label: 'Ask us for pricing' },
    ar: { href: '/request-access?solution=booking&source=foxestechnology', label: 'اسألنا عن الأسعار' },
  },
};

const productFor = (category: OperatorCategory): 'voice' | 'search' | 'booking' =>
  category === 'ai-voice' ? 'voice' : category === 'ai-search' ? 'search' : 'booking';

function collectStrings(value: unknown, at: string, out: { at: string; text: string }[]) {
  if (typeof value === 'string') {
    out.push({ at, text: value });
  } else if (Array.isArray(value)) {
    value.forEach((item, i) => collectStrings(item, `${at}[${i}]`, out));
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) collectStrings(child, `${at}.${key}`, out);
  }
  return out;
}

function findViolations(entries: { at: string; text: string }[], banned: BannedClaim[]) {
  const violations: string[] = [];
  for (const { at, text } of entries) {
    for (const { claim, pattern } of banned) {
      if (pattern.test(text)) violations.push(`${at} — ${claim}: "${text}"`);
    }
  }
  return violations;
}

describe('operator and solution copy makes no pricing promise the products do not sell', () => {
  for (const category of CATEGORIES) {
    for (const locale of LOCALES) {
      it(`${category} (${locale})`, () => {
        const copy = getOperatorCopy(category, locale);
        const strings = collectStrings(copy, `${category}.${locale}`, []);
        expect(findViolations(strings, BANNED_COPY_CLAIMS)).toEqual([]);
      });
    }
  }
});

describe('pricing section sends visitors to a verified, working pricing destination', () => {
  for (const category of CATEGORIES) {
    for (const locale of LOCALES) {
      it(`${category} (${locale})`, () => {
        const { pricing } = getOperatorCopy(category, locale) as ReturnType<typeof getOperatorCopy> & {
          pricing: { ctaHref?: string };
        };
        const expected = VERIFIED_PRICING_CTA[productFor(category)][locale];

        expect(pricing.ctaHref).toBe(expected.href);
        expect(pricing.cta).toBe(expected.label);

        // No empty section or dangling heading left behind.
        expect(pricing.headline.trim().length).toBeGreaterThan(0);
        expect(pricing.sub.trim().length).toBeGreaterThan(0);
        expect(pricing.fineprint.trim().length).toBeGreaterThan(0);
        expect(pricing.bullets.length).toBeGreaterThanOrEqual(2);
        for (const bullet of pricing.bullets) expect(bullet.trim().length).toBeGreaterThan(0);
      });
    }
  }
});

const DOLLAR_PRICE: BannedClaim = { claim: 'hardware price', pattern: /\$\s?\d/ };
const ORDER_CTA: BannedClaim = { claim: 'order call to action', pattern: /\border\s+(?:now|hardware)\b/i };
const FREE_START: BannedClaim = { claim: '"get started free"', pattern: /get started free/i };
const FREE_TRIAL: BannedClaim = { claim: 'free trial', pattern: /free trial/i };

/** Public /solutions/* pages whose copy lives in the page source. */
const PAGE_RULES: { file: string; banned: BannedClaim[] }[] = [
  {
    file: 'app/solutions/kiosk/page.tsx',
    banned: [
      DOLLAR_PRICE,
      ORDER_CTA,
      FREE_START,
      { claim: 'free installation', pattern: /free installation/i },
      { claim: 'lifetime updates', pattern: /lifetime software updates/i },
    ],
  },
  {
    file: 'app/solutions/pos-hardware/page.tsx',
    banned: [DOLLAR_PRICE, ORDER_CTA, FREE_START, { claim: 'free shipping', pattern: /free shipping/i }],
  },
  {
    file: 'app/solutions/online-booking/page.tsx',
    banned: [
      FREE_TRIAL,
      { claim: 'trial length', pattern: /\d+[- ]day/i },
      { claim: 'no card required', pattern: /no credit card/i },
      { claim: 'cancel anytime', pattern: /cancel anytime/i },
    ],
  },
  { file: 'app/solutions/analytics/page.tsx', banned: [FREE_TRIAL] },
  { file: 'app/solutions/ai/page.tsx', banned: [{ claim: 'free activation', pattern: /activate ai free/i }] },
];

describe('public solution pages make no price, trial or ordering promise', () => {
  for (const { file, banned } of PAGE_RULES) {
    it(file, () => {
      const lines = fs.readFileSync(path.join(ROOT, file), 'utf8').split('\n');
      const entries = lines.map((text, i) => ({ at: `${file}:${i + 1}`, text: text.trim() }));
      expect(findViolations(entries, banned)).toEqual([]);
    });
  }

  it('hardware pages offer "Request a quote" through /request-access', () => {
    for (const file of ['app/solutions/kiosk/page.tsx', 'app/solutions/pos-hardware/page.tsx']) {
      const source = fs.readFileSync(path.join(ROOT, file), 'utf8');
      expect(source, file).toMatch(/Request a quote/);
      expect(source, file).toMatch(/href=["{]['"`]?\/request-access/);
    }
  });
});
