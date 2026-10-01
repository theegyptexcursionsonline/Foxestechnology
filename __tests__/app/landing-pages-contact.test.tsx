/**
 * The public landing pages, rendered through their real route modules, against every
 * shape the NEXT_PUBLIC_FOXES_WHATSAPP setting can take. Production currently holds the
 * placeholder number, so the "placeholder" rows are what visitors get today.
 */
import type { ComponentType } from 'react';
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import BoatOperatorsEn from '@/app/operators/boat-operators/page';
import DinnerCruisesEn from '@/app/operators/dinner-cruises/page';
import DivingCentresEn from '@/app/operators/diving-centres/page';
import TourAgenciesEn from '@/app/operators/tour-agencies/page';
import WaterSportsEn from '@/app/operators/water-sports/page';
import BoatOperatorsAr from '@/app/ar/operators/boat-operators/page';
import DinnerCruisesAr from '@/app/ar/operators/dinner-cruises/page';
import DivingCentresAr from '@/app/ar/operators/diving-centres/page';
import TourAgenciesAr from '@/app/ar/operators/tour-agencies/page';
import WaterSportsAr from '@/app/ar/operators/water-sports/page';
import AiSearchEn from '@/app/solutions/ai-search/page';
import AiVoiceEn from '@/app/solutions/ai-voice/page';
import AiSearchAr from '@/app/ar/solutions/ai-search/page';
import AiVoiceAr from '@/app/ar/solutions/ai-voice/page';
import { getOperatorCopy, type Locale, type OperatorCategory } from '@/lib/i18n/operators';
import { REQUEST_ACCESS_LABEL } from '@/lib/contact';

type Solution = 'booking' | 'voice' | 'search';
interface LandingPage {
  route: string;
  Page: ComponentType;
  category: OperatorCategory;
  locale: Locale;
  solution: Solution;
}

const PAGES: LandingPage[] = [
  { route: '/operators/boat-operators', Page: BoatOperatorsEn, category: 'boat-operators', locale: 'en', solution: 'booking' },
  { route: '/operators/dinner-cruises', Page: DinnerCruisesEn, category: 'dinner-cruises', locale: 'en', solution: 'booking' },
  { route: '/operators/diving-centres', Page: DivingCentresEn, category: 'diving-centres', locale: 'en', solution: 'booking' },
  { route: '/operators/tour-agencies', Page: TourAgenciesEn, category: 'tour-agencies', locale: 'en', solution: 'booking' },
  { route: '/operators/water-sports', Page: WaterSportsEn, category: 'water-sports', locale: 'en', solution: 'booking' },
  { route: '/ar/operators/boat-operators', Page: BoatOperatorsAr, category: 'boat-operators', locale: 'ar', solution: 'booking' },
  { route: '/ar/operators/dinner-cruises', Page: DinnerCruisesAr, category: 'dinner-cruises', locale: 'ar', solution: 'booking' },
  { route: '/ar/operators/diving-centres', Page: DivingCentresAr, category: 'diving-centres', locale: 'ar', solution: 'booking' },
  { route: '/ar/operators/tour-agencies', Page: TourAgenciesAr, category: 'tour-agencies', locale: 'ar', solution: 'booking' },
  { route: '/ar/operators/water-sports', Page: WaterSportsAr, category: 'water-sports', locale: 'ar', solution: 'booking' },
  { route: '/solutions/ai-search', Page: AiSearchEn, category: 'ai-search', locale: 'en', solution: 'search' },
  { route: '/solutions/ai-voice', Page: AiVoiceEn, category: 'ai-voice', locale: 'en', solution: 'voice' },
  { route: '/ar/solutions/ai-search', Page: AiSearchAr, category: 'ai-search', locale: 'ar', solution: 'search' },
  { route: '/ar/solutions/ai-voice', Page: AiVoiceAr, category: 'ai-voice', locale: 'ar', solution: 'voice' },
];

const KEY = 'NEXT_PUBLIC_FOXES_WHATSAPP';
let original: string | undefined;

function setWhatsapp(value: string | undefined) {
  if (value === undefined) delete process.env[KEY];
  else process.env[KEY] = value;
}

beforeEach(() => {
  original = process.env[KEY];
});
afterEach(() => setWhatsapp(original));

const NO_WHATSAPP: [string, string | undefined][] = [
  ['not configured', undefined],
  ['empty', ''],
  ['the placeholder (production value)', '+201000000000'],
  ['the placeholder, formatted', '+20 100 000 0000'],
];

// Header pill, hero, closing call to action and footer. The phone sticky bar, the floating
// button and the mobile menu only mount after scrolling or a tap.
const CONTACT_SLOTS = 4;

describe.each(PAGES)('$route', ({ Page, category, locale, solution }) => {
  it.each(NO_WHATSAPP)('WhatsApp %s: no WhatsApp link anywhere, request access instead', (_label, value) => {
    setWhatsapp(value);
    const { container } = render(<Page />);

    expect(container.innerHTML).not.toMatch(/wa\.me/);
    expect(container.innerHTML).not.toContain('201000000000');
    expect(container.querySelectorAll('[data-contact="whatsapp"]')).toHaveLength(0);

    const fallbacks = [...container.querySelectorAll('[data-contact="request-access"]')];
    expect(fallbacks).toHaveLength(CONTACT_SLOTS);
    for (const link of fallbacks) {
      expect(link.getAttribute('href')).toBe(`/request-access?solution=${solution}&source=foxestechnology`);
      expect(link.textContent).toContain(REQUEST_ACCESS_LABEL[locale]);
    }
  });

  it('WhatsApp configured with a real number: every contact button opens that number', () => {
    setWhatsapp('+20 122 345 6789');
    const { container } = render(<Page />);

    const links = [...container.querySelectorAll('[data-contact="whatsapp"]')];
    expect(links).toHaveLength(CONTACT_SLOTS);
    for (const link of links) {
      expect(link.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/201223456789\?text=/);
    }
    expect(container.querySelectorAll('[data-contact="request-access"]')).toHaveLength(0);
  });

  it('pricing button goes to the verified pricing destination, with the label that describes it', () => {
    setWhatsapp(undefined);
    const copy = getOperatorCopy(category, locale);
    render(<Page />);
    expect(screen.getByRole('link', { name: copy.pricing.cta })).toHaveAttribute('href', copy.pricing.ctaHref);
  });
});
