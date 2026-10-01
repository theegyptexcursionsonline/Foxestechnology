/**
 * Truthfulness guard for public claims beyond pricing.
 *
 * Every number or promise below was on the public site without anything in the business or
 * the product to back it: sign-up and customer counts, money "processed", conversion uplifts,
 * a launch date that has passed, launch discounts, a language count the product does not
 * support, and a pop-up promising a PDF "in 60 seconds" when only our team is notified.
 * A failure here means one of them is back.
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

type Banned = { claim: string; pattern: RegExp };
type Entry = { at: string; text: string };

function collect(value: unknown, at: string, out: Entry[] = []): Entry[] {
  if (typeof value === 'string') out.push({ at, text: value });
  else if (Array.isArray(value)) value.forEach((v, i) => collect(v, `${at}[${i}]`, out));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) collect(v, `${at}.${k}`, out);
  }
  return out;
}

function violations(entries: Entry[], banned: Banned[]): string[] {
  const found: string[] = [];
  for (const { at, text } of entries) {
    for (const { claim, pattern } of banned) {
      if (pattern.test(text)) found.push(`${at} — ${claim}: "${text.trim().slice(0, 140)}"`);
    }
  }
  return found;
}

function sourceLines(rel: string): Entry[] {
  return fs
    .readFileSync(path.join(ROOT, rel), 'utf8')
    .split('\n')
    .map((text, i) => ({ at: `${rel}:${i + 1}`, text }));
}

function walk(dir: string): string[] {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs, { withFileTypes: true }).flatMap((e) => {
    const rel = `${dir}/${e.name}`;
    if (e.isDirectory()) return walk(rel);
    return /\.(tsx?|jsx?)$/.test(e.name) ? [rel] : [];
  });
}

describe('landing-page pop-up says what actually happens', () => {
  // The pop-up only notifies our team, who then send the guide — nothing is sent automatically.
  const banned: Banned[] = [
    { claim: 'automatic delivery time', pattern: /\b\d+\s*seconds?\b|ثانية/i },
    { claim: 'claims the guide was already sent', pattern: /check your inbox|^sent\b|تحقق من بريدك|تم الإرسال/i },
    // Guides may contain WhatsApp templates for the operator's own customers; what must go is
    // telling the visitor to contact us on WhatsApp, where there is no number yet.
    { claim: 'sends the visitor to WhatsApp', pattern: /message us on whatsapp|whatsapp us|راسلنا على واتساب/i },
    { claim: 'one-click unsubscribe that does not exist', pattern: /unsubscribe|إلغاء الاشتراك/i },
  ];
  for (const category of CATEGORIES) {
    for (const locale of LOCALES) {
      it(`${category} (${locale})`, () => {
        const { exitIntent } = getOperatorCopy(category, locale);
        expect(violations(collect(exitIntent, `${category}.${locale}.exitIntent`), banned)).toEqual([]);
      });
    }
  }
});

describe('AI Voice states the languages the product supports (24)', () => {
  for (const locale of LOCALES) {
    it(locale, () => {
      const copy = getOperatorCopy('ai-voice', locale);
      expect(violations(collect(copy, `ai-voice.${locale}`), [{ claim: '120 languages', pattern: /\b120\b/ }])).toEqual([]);
      const languages = copy.socialProof.stats.find((s) => /language|لغة/i.test(s.label));
      expect(languages?.value).toBe('24');
    });
  }
});

describe('landing pages make no traction claims we cannot back', () => {
  const labelBanned = /powering|trusted by|already running|answering calls|يشغّل|موثوق|يعمل بالفعل|يردّ على مكالمات/i;
  const banned: Banned[] = [
    { claim: 'operator count', pattern: /\b\d{2,}\+\s*(?:egyptian )?operators|\b300\+|\+300\b|مشغّل مصري/i },
    { claim: 'money or bookings processed', pattern: /EGP\s*\d+M|\d+\s*مليون|bookings processed|تمت معالجتها/i },
    { claim: 'search uplift', pattern: /\+47%|47%\+/ },
    { claim: 'weekly call count', pattern: /\+218\b|calls captured|مكالمة محفوظة/i },
    { claim: 'booking uplift', pattern: /\b71%|more online bookings|زيادة في الحجوزات/i },
    { claim: 'average fee saved', pattern: /average ota fee saved|متوسط العمولة الموفرة/i },
    { claim: 'track record since launch', pattern: /since launch|منذ الإطلاق/i },
    { claim: 'products per customer', pattern: /products per agency|منتج لكل وكالة/i },
    { claim: 'uptime promise', pattern: /99\.9%|uptime|وقت تشغيل/i },
    { claim: 'escalation rate', pattern: /escalated to human|تُحوَّل لإنسان/i },
    { claim: 'support response time', pattern: /average response time|متوسط وقت الاستجابة/i },
  ];
  for (const category of CATEGORIES) {
    for (const locale of LOCALES) {
      it(`${category} (${locale})`, () => {
        const copy = getOperatorCopy(category, locale);
        expect(copy.socialProof.label).not.toMatch(labelBanned);
        expect(violations(collect(copy, `${category}.${locale}`), banned)).toEqual([]);
      });
    }
  }
});

/** Pages that are public while the rest of the site shows the coming-soon screen, plus the header and footer they render. */
const PUBLIC_SOURCES = [
  'components/solutions/AISearchPage.tsx',
  'components/solutions/AIVoicePage.tsx',
  'components/operators/BoatOperatorsPage.tsx',
  'components/operators/DinnerCruisesPage.tsx',
  'components/operators/DivingCentresPage.tsx',
  'components/operators/TourAgenciesPage.tsx',
  'components/operators/WaterSportsPage.tsx',
  'app/solutions/kiosk/page.tsx',
  'app/solutions/pos-hardware/page.tsx',
  'app/solutions/online-booking/page.tsx',
  'app/solutions/analytics/page.tsx',
  'app/solutions/ai/page.tsx',
  'components/Header.tsx',
  'components/Footer.tsx',
  'app/coming-soon/page.tsx',
  'components/ExitIntentModal.tsx',
];

describe('public pages and shared header/footer make no traction claims we cannot back', () => {
  const banned: Banned[] = [
    { claim: 'result badge (+NN% / +NNN)', pattern: /^\s*\+\d+%?\s*$/ },
    { claim: 'revenue processed', pattern: /\$\s?\d+M\+/ },
    { claim: 'customer or booking count', pattern: /\b500\+|\b1M\+|\b1,200\+?/ },
    { claim: 'uptime promise', pattern: /99\.9%/ },
    { claim: '"hundreds of" customers', pattern: /hundreds of/i },
    { claim: 'ROI promise', pattern: /pay for itself|roi from real customers|by 70%/i },
    { claim: 'outcome percentages', pattern: /number: '(?:40|60|95)%'/ },
    { claim: 'trusted-by count', pattern: /trusted by \d/i },
  ];
  for (const rel of PUBLIC_SOURCES) {
    it(rel, () => {
      expect(violations(sourceLines(rel), banned)).toEqual([]);
    });
  }
});

describe('figures and promises that must never return anywhere on the site', () => {
  const banned: Banned[] = [
    { claim: '$50M+ processed', pattern: /\$50M\+/ },
    { claim: 'EGP 20M+ processed', pattern: /EGP 20M\+|20 مليون ج\.م/ },
    { claim: '+218 calls', pattern: /\+218\b/ },
    { claim: '+47% search to booking', pattern: /\+47%/ },
    { claim: '300+ operators', pattern: /\b300\+|\+300\b/ },
    { claim: '"hundreds of" customers', pattern: /hundreds of (?:tour )?operators|hundreds of installations/i },
    { claim: '"already running" / "answering calls for"', pattern: /already running on|answering calls for operators/i },
    { claim: 'kiosk ROI', pattern: /pay for itself|roi from real customers/i },
    { claim: '1,200+ sign-ups', pattern: /1,200\+/ },
    { claim: 'passed launch date', pattern: /launching july|july 15(?:th)?,? 2026|2026-07-15/i },
    { claim: 'launch discount', pattern: /\b50% off\b|launch pricing|introductory pricing/i },
    { claim: '120 languages', pattern: /\b120 languages\b|120 لغة/i },
  ];
  const files = ['app', 'components', 'lib'].flatMap(walk);

  it('scans the real source tree', () => {
    expect(files.length).toBeGreaterThan(50);
  });

  it('none of them appear in app/, components/ or lib/', () => {
    expect(violations(files.flatMap(sourceLines), banned)).toEqual([]);
  });
});
