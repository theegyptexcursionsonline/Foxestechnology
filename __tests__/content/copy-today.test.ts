/**
 * What the public pages may say on 12 November 2026, checked against the products themselves.
 *
 * Each pattern below was on the live site and was not true: AI Voice does not answer a phone
 * line, take deposits or work across ten channels; AI Search answers in three languages, has no
 * measured speed or conversion figure and no booking-system connection; AI Booking takes no card
 * payment at checkout, sends no SMS or WhatsApp, has no weather, waiver, certificate or
 * equipment tools and no travel-agency channel sync; and Foxes sells no POS devices or kiosks.
 * No page may name a person on the team, promise a reply time, offer a guide nobody has written,
 * name the technology behind a feature, or invite open sign-up.
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { getOperatorCopy, type Locale, type OperatorCategory, type OperatorCopy } from '@/lib/i18n/operators';

const ROOT = path.resolve(__dirname, '../..');
const BOOKING: OperatorCategory[] = ['diving-centres', 'dinner-cruises', 'tour-agencies', 'water-sports', 'boat-operators'];
const CATEGORIES: OperatorCategory[] = [...BOOKING, 'ai-voice', 'ai-search'];
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

const EVERY_PAGE: Banned[] = [
  { claim: 'local payment methods the product does not have', pattern: /paymob|fawry|vodafone cash|instapay|فودافون كاش|فوري|انستاباي/i },
  { claim: 'deposit taken online', pattern: /\bdeposits?\b|عربون|دفعة مقدمة/i },
  { claim: 'SMS', pattern: /\bSMS\b|رسالة نصية|رسائل نصية/i },
  { claim: 'named team member', pattern: /\bsaif\b|سيف من فريقنا/i },
  { claim: 'reply-time promise', pattern: /within (?:the|1|an) hour|خلال ساعة/i },
  { claim: 'go-live time promise', pattern: /\b(?:24|48) hours\b|in 15 minutes|within 15 minutes|خلال 24 ساعة|خلال 48 ساعة|15 دقيقة/i },
  { claim: 'travel-agency channel sync', pattern: /viator|getyourguide|\bGYG\b|klook|tripadvisor|booking\.com|channel manager|مدير القنوات/i },
  { claim: 'open sign-up', pattern: /sign up in|create your (?:account|widget)|get started|سجّل في|ابدأ الآن/i },
  { claim: 'the technology behind a feature', pattern: /embeddings?|under the hood|powered by|vector search|language model/i },
  { claim: 'customers we cannot name', pattern: /operators[^.]{0,40}already use|join the (?:boat|dive|tour|operators)|يستخدمون بالفعل|انضم إلى/i },
  { claim: 'invented outcome figure', pattern: /\d+\s?%|٪/ },
  { claim: 'guide that does not exist', pattern: /cheat sheet|template|benchmark|audit|journey map|playbook|قالب|تدقيق|خريطة رحلة/i },
  { claim: 'certification or compliance claim', pattern: /\bPCI\b|GDPR|compliant|data residency|متوافق مع/i },
];

const BOOKING_ONLY: Banned[] = [
  { claim: 'weather cancellation tool', pattern: /weather|الطقس/i },
  { claim: 'digital waivers', pattern: /waiver|تنازل|تعهد/i },
  { claim: 'dive certificates, courses or equipment tracking', pattern: /\bPADI\b|\bSSI\b|certif|equipment|شهادات|معدات/i },
  { claim: 'seating, menus or dietary handling', pattern: /seating|dietary|menu|vegetarian|قائمة الطعام/i },
  { claim: 'WhatsApp or other message channels sent by the product', pattern: /whatsapp (?:scripts?|confirmation|reminder)|تأكيد عبر واتساب/i },
  // Staff cannot issue gift cards and guests cannot buy one while card payment is off (15 Nov 2026).
  { claim: 'gift cards', pattern: /gift.?cards?|بطاقات? (?:ال)?هدايا|بطاقة هدية/i },
];

const VOICE_ONLY: Banned[] = [
  { claim: 'answers a phone line', pattern: /answers? your phone|your (?:existing )?(?:number|line) to|forward your|local number|inbound call|missed[- ]call|first ring|خطك|مكالماتك الواردة/i },
  { claim: 'ten channels', pattern: /10 channels|telegram|instagram|messenger|slack|teams\b|10 قنوات/i },
  { claim: 'outbound calls, coaching or co-pilot', pattern: /outbound|coach|co-?pilot|roleplay|QA scoring|NPS|sentiment|workflow builder/i },
  { claim: 'live translation', pattern: /real-time translation|captioned|mid-call/i },
  { claim: 'dialect claim', pattern: /egyptian arabic|gulf arabic|المصرية والخليجية/i },
];

const SEARCH_ONLY: Banned[] = [
  { claim: 'language count', pattern: /50\+|\b50 languages|any language|بأي لغة|50 لغة/i },
  { claim: 'speed figure', pattern: /\bms\b|milliseconds|مللي ثانية/i },
  { claim: 'conversion tracking', pattern: /search-to-booking|conversion|heatmap|التحويل/i },
  { claim: 'ranking tuned on bookings', pattern: /fine-tune|historical bookings|conversion data/i },
  { claim: 'WhatsApp hand-off', pattern: /whatsapp if|hands off to whatsapp/i },
  { claim: 'site builders never tested', pattern: /wordpress|shopify|webflow/i },
];

/** WhatsApp button labels are shown only when a real number is configured, so they may stay. */
function withoutContactLabels(copy: OperatorCopy): unknown {
  const { whatsapp: _w, mobileStickyCta: _m, ...rest } = copy;
  return {
    ...rest,
    hero: { ...copy.hero, secondaryCta: '' },
    finalCta: { ...copy.finalCta, secondary: '' },
    leadForm: { ...copy.leadForm, successWhatsapp: '', fields: { ...copy.leadForm.fields, whatsapp: '' } },
  };
}

describe('landing-page copy states only what the products do today', () => {
  for (const category of CATEGORIES) {
    for (const locale of LOCALES) {
      it(`${category} (${locale})`, () => {
        const copy = getOperatorCopy(category, locale);
        const entries = collect(withoutContactLabels(copy), `${category}.${locale}`).filter(
          // Pricing wording is the owner's and is pinned in pricing-truth.test.ts.
          (e) => !e.at.includes('.pricing.'),
        );
        const banned = [
          ...EVERY_PAGE,
          ...(BOOKING.includes(category) ? BOOKING_ONLY : []),
          ...(category === 'ai-voice' ? VOICE_ONLY : []),
          ...(category === 'ai-search' ? SEARCH_ONLY : []),
        ];
        expect(violations(entries, banned)).toEqual([]);
      });
    }
  }
});

describe('each landing page has one headline, one action and says access is by invitation', () => {
  for (const category of CATEGORIES) {
    for (const locale of LOCALES) {
      it(`${category} (${locale})`, () => {
        const copy = getOperatorCopy(category, locale);
        expect(copy.hero.headlineLine1.trim()).not.toBe('');
        expect(copy.hero.headlineLine2.trim()).not.toBe('');
        // The same words on every button that leads to the enquiry form.
        expect(copy.finalCta.primary).toBe(copy.hero.primaryCta);
        expect(copy.mobileStickyCta.primary).toBe(copy.hero.primaryCta);
        expect(copy.leadForm.submit).toBe(copy.hero.primaryCta);
        expect(copy.howItWorks.sectionHeadline).toMatch(/by invitation|بدعوة/);
        expect(copy.faq.items.length).toBeGreaterThanOrEqual(6);
      });
    }
  }
});

describe('Arabic pages are complete: no sentence is left in English', () => {
  // Brand and product names, figures, addresses and language codes stay in Latin script.
  const LATIN_ALLOWED =
    /Foxes Technology|Foxes|AI Booking|AI Voice|AI Search|OCTO|QR|IP|AR \+ EN|AR · EN · DE|voice\.foxestechnology\.com|yourwebsite\.com|you@[a-z.]+|\+20 1XX XXX XXXX|https?:\/\/\S+|\/request-access\S*/g;
  for (const category of CATEGORIES) {
    it(category, () => {
      const copy = getOperatorCopy(category, 'ar');
      const leftovers = collect(copy, `${category}.ar`)
        .filter((e) => !/\.value$|ctaHref$/.test(e.at))
        .filter((e) => /[A-Za-z]{2,}/.test(e.text.replace(LATIN_ALLOWED, '')))
        .map((e) => `${e.at}: "${e.text.slice(0, 100)}"`);
      expect(leftovers).toEqual([]);
    });
    it(`${category}: every Arabic string is written`, () => {
      const en = collect(getOperatorCopy(category, 'en'), category);
      const ar = collect(getOperatorCopy(category, 'ar'), category);
      expect(ar.map((e) => e.at)).toEqual(en.map((e) => e.at));
      expect(ar.filter((e) => e.text.trim() === '').map((e) => e.at)).toEqual([]);
    });
  }
});

/** Everything a visitor can read today outside the copy files: page shells, shared parts and the request form. */
const PUBLIC_FILES = [
  'app/coming-soon/page.tsx',
  'app/page.tsx',
  'app/layout.tsx',
  'app/request-access/RequestAccessForm.tsx',
  'app/request-access/solutions.ts',
  'app/solutions/online-booking/page.tsx',
  'app/solutions/pos-hardware/page.tsx',
  'app/solutions/kiosk/page.tsx',
  'app/solutions/ai/page.tsx',
  'app/solutions/analytics/page.tsx',
  'components/Header.tsx',
  'components/Footer.tsx',
  'components/solutions/PlainSolutionPage.tsx',
  'components/solutions/AIVoicePage.tsx',
  'components/solutions/AISearchPage.tsx',
  'components/operators/BoatOperatorsPage.tsx',
  'components/operators/DinnerCruisesPage.tsx',
  'components/operators/DivingCentresPage.tsx',
  'components/operators/TourAgenciesPage.tsx',
  'components/operators/WaterSportsPage.tsx',
  'components/operators/BookingExamples.tsx',
  'components/operators/OperatorHeader.tsx',
  'components/operators/OperatorFooter.tsx',
  'lib/ecosystem.ts',
];

describe('public page shells and shared parts', () => {
  const banned: Banned[] = [
    { claim: 'partner badge nobody can back', pattern: /official partner|ministry of tourism/i },
    { claim: 'app-store buttons with no app behind them', pattern: /app store|google play|get the app/i },
    { claim: 'unverified company form or origin', pattern: /Technology LLC|made (?:with .{1,12} )?in egypt|صُنع في مصر/i },
    { claim: 'named team member', pattern: /\bsaif\b/i },
    { claim: 'reply-time promise', pattern: /within 1 hour|within the hour/i },
    { claim: 'invented reviewers', pattern: /ahmed hassan|sarah ali|cairo desert tours|nile cruise co/i },
    { claim: 'local payment methods', pattern: /paymob|fawry|vodafone cash/i },
    { claim: 'sign-in link to a page this site does not have', pattern: /href="\/login"/ },
    { claim: 'placeholder link', pattern: /href="#"|href: '#'|https:\/\/instagram\.com"/ },
    { claim: 'the technology behind a feature', pattern: /embeddings?|under the hood|vector search|language model/i },
    { claim: 'figures from before the rewrite', pattern: /12,840|17\.4%|142 calls|37% of|\$124,500|\+150%|98%|10,000\+/ },
    { claim: 'passed or vague launch line', pattern: /almost here|launching soon|join our waitlist/i },
  ];
  for (const file of PUBLIC_FILES) {
    it(file, () => {
      const entries = fs
        .readFileSync(path.join(ROOT, file), 'utf8')
        .split('\n')
        .map((text, i) => ({ at: `${file}:${i + 1}`, text }));
      expect(violations(entries, banned)).toEqual([]);
    });
  }

  it('the menus no longer list hardware Foxes does not sell', () => {
    for (const file of ['components/operators/OperatorHeader.tsx', 'components/Footer.tsx', 'lib/ecosystem.ts']) {
      const source = fs.readFileSync(path.join(ROOT, file), 'utf8');
      // lib/ecosystem.ts keeps the card definitions; no page may pick them.
      const picked = file === 'lib/ecosystem.ts' ? source.slice(source.indexOf('const ECOSYSTEM')) : source;
      expect(picked, file).not.toMatch(/pos-hardware|kiosk|key: 'pos'/);
    }
  });
});

describe('titles and descriptions say what the page says, with one brand suffix', () => {
  it('no page title carries the brand twice', () => {
    for (const file of ['app/features/page.tsx', 'app/coming-soon/layout.tsx', 'app/showcase/layout.tsx']) {
      const source = fs.readFileSync(path.join(ROOT, file), 'utf8');
      const first = source.match(/^\s*title: '([^']*)'/m)?.[1] ?? '';
      // The root layout appends " | Foxes Technology" to every title below it.
      expect(first, file).not.toMatch(/Foxes Technology/);
    }
    for (const category of CATEGORIES) {
      for (const locale of LOCALES) {
        expect(getOperatorCopy(category, locale).meta.title).not.toMatch(/Foxes Technology/);
      }
    }
  });

  it('the home and default descriptions no longer sell hardware or a launch', () => {
    for (const file of ['app/layout.tsx', 'app/page.tsx', 'app/coming-soon/layout.tsx', 'app/showcase/layout.tsx', 'app/features/page.tsx']) {
      const source = fs.readFileSync(path.join(ROOT, file), 'utf8');
      const gatedOnly = file === 'app/showcase/layout.tsx' ? source.slice(0, source.indexOf("  : {")) : source;
      expect(gatedOnly, file).not.toMatch(/POS hardware|launching soon|waitlist|40\+|50\+ integrations/i);
    }
  });
});
