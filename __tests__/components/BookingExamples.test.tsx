/**
 * The example panels on the operator pages and the list beside the enquiry form. They must be
 * labelled as examples, picture only what the booking product does, and be fully Arabic on the
 * Arabic pages.
 */
import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const pathname = vi.hoisted(() => ({ current: '/operators/boat-operators' }));
vi.mock('next/navigation', () => ({ usePathname: () => pathname.current }));

import { BookingExample, LeadReassurance, type Trade } from '@/components/operators/BookingExamples';

const TRADES: Trade[] = ['boat', 'dinner', 'diving', 'agency', 'water'];

afterEach(() => {
  pathname.current = '/operators/boat-operators';
});

describe('booking examples', () => {
  it.each([0, 1, 2])('panel %i is labelled as an example for every trade', (variant) => {
    for (const trade of TRADES) {
      const { container, unmount } = render(<BookingExample variant={variant} trade={trade} />);
      expect(container.textContent).toContain('EXAMPLE');
      unmount();
    }
  });

  it('pictures reserving, the voucher and the four stages, and nothing the product lacks', () => {
    const text = [0, 1, 2]
      .map((variant) => render(<BookingExample variant={variant} trade="boat" />).container.textContent ?? '')
      .join(' ');
    expect(text).toMatch(/Reserve/);
    expect(text).toMatch(/Voucher with QR code/);
    for (const stage of ['Booking lobby', 'Operation ready', 'Operating now', 'Delivered']) expect(text).toContain(stage);
    expect(text).toMatch(/Paid to you directly/);
    expect(text).not.toMatch(/deposit|weather|waiver|vodafone|fawry|paymob|SMS|\$\s?\d/i);
  });

  it('is fully Arabic, right to left, on the Arabic pages', () => {
    pathname.current = '/ar/operators/boat-operators';
    for (const variant of [0, 1, 2]) {
      const { container, unmount } = render(<BookingExample variant={variant} trade="dinner" />);
      expect(container.querySelector('[dir="rtl"][lang="ar"]')).not.toBeNull();
      expect(container.textContent).toContain('مثال');
      expect((container.textContent ?? '').replace(/QR/g, '')).not.toMatch(/[A-Za-z]{2,}/);
      unmount();
    }
  });
});

describe('enquiry form reassurance', () => {
  it('names no person and promises no reply time', () => {
    const { container } = render(<LeadReassurance locale="en" />);
    const text = container.textContent ?? '';
    expect(text).toMatch(/Every request is read by our team/);
    expect(text).toMatch(/Foxes Technology team/);
    expect(text).not.toMatch(/saif|within|hour|whatsapp reply|no spam/i);
  });

  it('is written in Arabic for the Arabic pages', () => {
    const { container } = render(<LeadReassurance locale="ar" />);
    expect((container.textContent ?? '').replace(/Foxes Technology/g, '')).not.toMatch(/[A-Za-z]{2,}/);
  });
});
