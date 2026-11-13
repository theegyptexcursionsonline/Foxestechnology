/**
 * Every internal link a visitor can click on the public pages must lead to a page this site
 * has. A link to a page that does not exist ("/login" was one) fails here, before release.
 * The browser suite (e2e/site.spec.ts) follows the same links on a running build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { getOperatorCopy, type Locale, type OperatorCategory } from '@/lib/i18n/operators';
import { requestAccessHref, requestAccessHrefFor } from '@/lib/contact';
import { getEcosystemForCategory } from '@/lib/ecosystem';
import { SOLUTIONS } from '@/app/request-access/solutions';

const ROOT = path.resolve(__dirname, '../..');
const CATEGORIES: OperatorCategory[] = ['diving-centres', 'dinner-cruises', 'tour-agencies', 'water-sports', 'boat-operators', 'ai-voice', 'ai-search'];
const LOCALES: Locale[] = ['en', 'ar'];

/** Files whose markup is on a page a visitor can open today. */
const PUBLIC_FILES = [
  'app/coming-soon/page.tsx',
  'app/request-access/RequestAccessForm.tsx',
  'components/Header.tsx',
  'components/Footer.tsx',
  'components/ExitIntentModal.tsx',
  'components/solutions/PlainSolutionPage.tsx',
  'components/solutions/AIVoicePage.tsx',
  'components/solutions/AISearchPage.tsx',
  'components/operators/BoatOperatorsPage.tsx',
  'components/operators/DinnerCruisesPage.tsx',
  'components/operators/DivingCentresPage.tsx',
  'components/operators/TourAgenciesPage.tsx',
  'components/operators/WaterSportsPage.tsx',
  'components/operators/OperatorHeader.tsx',
  'components/operators/OperatorFooter.tsx',
  'components/operators/OperatorEcosystem.tsx',
  'components/operators/MobileStickyCTA.tsx',
  'app/solutions/online-booking/page.tsx',
  'app/solutions/pos-hardware/page.tsx',
  'app/solutions/kiosk/page.tsx',
  'app/solutions/ai/page.tsx',
  'app/solutions/analytics/page.tsx',
];

function routeExists(href: string): boolean {
  const pathname = href.split(/[?#]/)[0].replace(/\/$/, '');
  if (pathname === '') return fs.existsSync(path.join(ROOT, 'app/page.tsx'));
  return (
    fs.existsSync(path.join(ROOT, 'app', pathname, 'page.tsx')) ||
    fs.existsSync(path.join(ROOT, 'public', pathname))
  );
}

/** Literal internal links in a source file: href="/x", href: '/x', href={'/x'}, requestHref: "/x". */
function literalLinks(source: string): string[] {
  const found = new Set<string>();
  const pattern = /(?:href|Href|ctaHref|requestHref)\s*[:=]\s*\{?\s*["'`](\/[^"'`$\s]*)["'`]/g;
  for (const match of source.matchAll(pattern)) found.add(match[1]);
  return [...found];
}

describe('internal links on the public pages', () => {
  it('reads a real set of files and finds links in them', () => {
    const all = PUBLIC_FILES.flatMap((file) => literalLinks(fs.readFileSync(path.join(ROOT, file), 'utf8')));
    expect(all.length).toBeGreaterThan(25);
  });

  for (const file of PUBLIC_FILES) {
    it(`${file}: every literal link has a page`, () => {
      const source = fs.readFileSync(path.join(ROOT, file), 'utf8');
      const missing = literalLinks(source).filter((href) => !routeExists(href));
      expect(missing).toEqual([]);
    });
  }

  it('every landing page exists in both languages, so the language switch never lands on a 404', () => {
    const missing: string[] = [];
    for (const category of CATEGORIES) {
      const base = category.startsWith('ai-') ? 'solutions' : 'operators';
      for (const href of [`/${base}/${category}`, `/ar/${base}/${category}`]) {
        if (!routeExists(href)) missing.push(href);
      }
    }
    expect(missing).toEqual([]);
  });

  it('the "more from Foxes" cards and the pricing buttons lead to pages that exist', () => {
    const missing: string[] = [];
    for (const category of CATEGORIES) {
      for (const card of getEcosystemForCategory(category).cards) {
        if (!routeExists(card.href)) missing.push(`${category} card → ${card.href}`);
        // The Arabic page links to the Arabic version of a landing page when it has one.
        if (card.href.startsWith('/operators/') && !routeExists(`/ar${card.href}`)) missing.push(`/ar${card.href}`);
      }
      for (const locale of LOCALES) {
        const { ctaHref } = getOperatorCopy(category, locale).pricing;
        if (ctaHref.startsWith('/') && !routeExists(ctaHref)) missing.push(`${category}.${locale} pricing → ${ctaHref}`);
        if (!ctaHref.startsWith('/')) expect(ctaHref).toMatch(/^https:\/\/voice\.foxestechnology\.com\/pricing\?lang=(en|ar)$/);
      }
      expect(routeExists(requestAccessHrefFor(category))).toBe(true);
    }
    expect(routeExists(requestAccessHref())).toBe(true);
    expect(missing).toEqual([]);
  });

  it('sign-in hand-off goes to each product’s own secure address, never to a page here', () => {
    const signIns = Object.values(SOLUTIONS).flatMap((s) => ('signIn' in s && s.signIn ? [s.signIn] : []));
    expect(signIns.length).toBe(3);
    for (const url of signIns) expect(url).toMatch(/^https:\/\/(booking|voice|search)\.foxestechnology\.com\/login$/);
    expect(fs.existsSync(path.join(ROOT, 'app/login'))).toBe(false);
  });

  it('the checker itself refuses a link with no page behind it', () => {
    expect(routeExists('/login')).toBe(false);
    expect(routeExists('/solutions/no-such-product')).toBe(false);
    expect(routeExists('/request-access?solution=voice')).toBe(true);
    expect(routeExists('/')).toBe(true);
  });
});
