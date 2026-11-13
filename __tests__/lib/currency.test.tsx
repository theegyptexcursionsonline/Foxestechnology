/**
 * The currency menu on the landing pages. It only changes how the example booking's price is
 * shown; nothing is sold or charged on this site. The choice is remembered for the next page.
 */
import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { CurrencyProvider, useCurrency } from '@/components/operators/CurrencyContext';
import { CURRENCY_OPTIONS, DEFAULT_CURRENCY, formatPrice, formatPriceRange } from '@/lib/currency';

afterEach(() => {
  window.localStorage.clear();
});

describe('formatPrice', () => {
  it('shows the same amount in each currency the menu offers', () => {
    expect(formatPrice(6000, 'EGP')).toBe('EGP 6,000');
    expect(formatPrice(6000, 'USD')).toBe('$122');
    expect(formatPrice(6000, 'EUR')).toBe('€113');
    expect(formatPrice(0, 'USD')).toBe('$0');
  });

  it('shortens large figures when asked, and formats a range', () => {
    expect(formatPrice(4_900_000, 'USD', { compact: true })).toBe('$100K');
    expect(formatPriceRange(4900, 9800, 'USD')).toBe('$100–$200');
  });

  it('offers exactly three currencies and starts in US dollars', () => {
    expect(CURRENCY_OPTIONS.map((o) => o.code)).toEqual(['USD', 'EGP', 'EUR']);
    expect(DEFAULT_CURRENCY).toBe('USD');
  });
});

function Probe() {
  const { currency, setCurrency } = useCurrency();
  return (
    <button type="button" onClick={() => setCurrency('EGP')}>
      {formatPrice(6000, currency)}
    </button>
  );
}

describe('currency choice', () => {
  it('changes the shown price and is remembered on the next page', () => {
    const first = render(<CurrencyProvider><Probe /></CurrencyProvider>);
    expect(screen.getByRole('button')).toHaveTextContent('$122');
    act(() => screen.getByRole('button').click());
    expect(screen.getByRole('button')).toHaveTextContent('EGP 6,000');
    first.unmount();

    render(<CurrencyProvider><Probe /></CurrencyProvider>);
    expect(screen.getByRole('button')).toHaveTextContent('EGP 6,000');
  });

  it('ignores a stored value that is not one of the three', () => {
    window.localStorage.setItem('foxes:operator-currency', 'BTC');
    render(<CurrencyProvider><Probe /></CurrencyProvider>);
    expect(screen.getByRole('button')).toHaveTextContent('$122');
  });
});
