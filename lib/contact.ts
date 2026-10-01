import type { Locale, OperatorCategory } from '@/lib/i18n/operators';

export type FoxesSolution = 'booking' | 'voice' | 'search';

/** The Foxes product each landing page sells — the key /request-access pre-selects. */
export const SOLUTION_FOR_CATEGORY: Record<OperatorCategory, FoxesSolution> = {
  'diving-centres': 'booking',
  'dinner-cruises': 'booking',
  'tour-agencies': 'booking',
  'water-sports': 'booking',
  'boat-operators': 'booking',
  'ai-voice': 'voice',
  'ai-search': 'search',
};

/**
 * Link to /request-access, the sign-up front for every Foxes product. It stays public while
 * the rest of the site shows the coming-soon screen. `source` records that the visitor came
 * from this site rather than from the product's own domain.
 */
export function requestAccessHref(solution?: FoxesSolution): string {
  const params = new URLSearchParams();
  if (solution) params.set('solution', solution);
  params.set('source', 'foxestechnology');
  return `/request-access?${params.toString()}`;
}

export function requestAccessHrefFor(category: OperatorCategory): string {
  return requestAccessHref(SOLUTION_FOR_CATEGORY[category]);
}

/** Label for the request-access call to action shown where a WhatsApp button would otherwise be. */
export const REQUEST_ACCESS_LABEL: Record<Locale, string> = {
  en: 'Request access',
  ar: 'اطلب الانضمام',
};
