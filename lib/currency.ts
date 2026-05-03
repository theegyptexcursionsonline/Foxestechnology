export type Currency = 'USD' | 'EGP' | 'EUR';

export const DEFAULT_CURRENCY: Currency = 'USD';

// Approximate FX rates as of 2026-Q2. Used only for illustrative pricing
// in mockups — not for real transactions. Update periodically.
const RATES_PER_EGP: Record<Currency, number> = {
  EGP: 1,
  USD: 1 / 49,
  EUR: 1 / 53,
};

const SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EGP: 'EGP',
  EUR: '€',
};

const LOCALES: Record<Currency, string> = {
  USD: 'en-US',
  EGP: 'en-EG',
  EUR: 'en-IE',
};

export interface FormatOptions {
  /** When true, suppress decimals even if currency normally shows them. */
  whole?: boolean;
  /** When true, render compact form like 1.2K / 5M. */
  compact?: boolean;
  /** Render the symbol *before* (default) or *after* the number. */
  symbolPosition?: 'prefix' | 'suffix';
}

/**
 * Format a numeric EGP base value as the chosen currency.
 *
 * Mockup data is stored as EGP integers; this function converts and formats
 * for display. EGP is rendered as "EGP 1,200"; USD as "$25"; EUR as "€23".
 */
export function formatPrice(egpValue: number, currency: Currency, opts: FormatOptions = {}): string {
  const converted = egpValue * RATES_PER_EGP[currency];
  const isWhole = opts.whole ?? currency !== 'EGP';

  let formatted: string;
  if (opts.compact) {
    formatted = new Intl.NumberFormat(LOCALES[currency], {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(converted);
  } else {
    formatted = new Intl.NumberFormat(LOCALES[currency], {
      maximumFractionDigits: isWhole ? 0 : 2,
      minimumFractionDigits: isWhole ? 0 : 0,
    }).format(Math.round(converted));
  }

  if (currency === 'EGP') return `EGP ${formatted}`;
  return `${SYMBOLS[currency]}${formatted}`;
}

/**
 * Format a price *range* given two EGP base values.
 */
export function formatPriceRange(minEgp: number, maxEgp: number, currency: Currency): string {
  return `${formatPrice(minEgp, currency)}–${formatPrice(maxEgp, currency)}`.replace(/^[A-Z$€]+/, (m) => m);
}

/**
 * Convenience: when a *display string* needs the local symbol but the value is
 * already a converted figure for show only (e.g. "20M+" for social proof).
 */
export function suffixForCurrency(currency: Currency): string {
  return currency === 'EGP' ? ' EGP' : '';
}

export const CURRENCY_OPTIONS: { code: Currency; label: string }[] = [
  { code: 'USD', label: 'USD · US Dollar' },
  { code: 'EGP', label: 'EGP · Egyptian Pound' },
  { code: 'EUR', label: 'EUR · Euro' },
];
