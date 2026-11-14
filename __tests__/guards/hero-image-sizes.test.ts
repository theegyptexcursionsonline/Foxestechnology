/**
 * Every image that loads with the first screen (`priority`) on the product pages says how wide it
 * is shown. Without `sizes`, Next.js offers it at 1x/2x of its layout width, and a phone fetched a
 * 3840 px photo for a 390 px screen (15 Nov 2026).
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { HERO_IMAGE_SIZES } from '@/lib/hero-image';

const ROOT = path.resolve(__dirname, '../..');
const PAGES = [
  'components/operators/BoatOperatorsPage.tsx',
  'components/operators/DinnerCruisesPage.tsx',
  'components/operators/DivingCentresPage.tsx',
  'components/operators/TourAgenciesPage.tsx',
  'components/operators/WaterSportsPage.tsx',
  'components/solutions/AIVoicePage.tsx',
  'components/solutions/AISearchPage.tsx',
];

/** Each <Image …/> element's props as written in the source. */
function imageElements(source: string): string[] {
  return [...source.matchAll(/<Image\b([\s\S]*?)\/>/g)].map((m) => m[1]);
}

describe('first-screen photos on the product pages', () => {
  it('the declared width fits the hero column on a desktop and the screen on a phone', () => {
    expect(HERO_IMAGE_SIZES).toBe('(min-width: 1024px) 600px, 100vw');
  });

  for (const file of PAGES) {
    it(`${file}: every priority image says how wide it is shown`, () => {
      const priority = imageElements(fs.readFileSync(path.join(ROOT, file), 'utf8')).filter((props) => /\bpriority\b/.test(props));
      expect(priority.length, 'no first-screen image found').toBeGreaterThan(0);
      for (const props of priority) expect(props).toMatch(/\bsizes=/);
    });
  }
});
