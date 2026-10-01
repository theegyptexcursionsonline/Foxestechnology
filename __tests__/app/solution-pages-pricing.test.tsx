/**
 * The public /solutions/* pages that carry their own copy: what a visitor can read and
 * click. Hardware cannot be ordered yet, so it shows no prices and offers a quote request;
 * the booking pages promise no trial and send visitors to request access.
 */
import type { ComponentType } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import KioskPage from '@/app/solutions/kiosk/page';
import POSHardwarePage from '@/app/solutions/pos-hardware/page';
import OnlineBookingPage from '@/app/solutions/online-booking/page';
import AnalyticsPage from '@/app/solutions/analytics/page';
import AIPage from '@/app/solutions/ai/page';

const QUOTE_HREF = '/request-access?source=foxestechnology';
const BOOKING_ACCESS_HREF = '/request-access?solution=booking&source=foxestechnology';

describe.each([
  { name: 'kiosk', Page: KioskPage as ComponentType, quoteButtons: 2 },
  { name: 'POS hardware', Page: POSHardwarePage as ComponentType, quoteButtons: 5 },
])('$name page', ({ Page, quoteButtons }) => {
  it('shows no hardware prices and no ordering', () => {
    const { container } = render(<Page />);
    const text = container.textContent ?? '';
    expect(text).not.toMatch(/\$\s?\d/);
    expect(text).not.toMatch(/order now|order hardware|get started free|free shipping|free installation/i);
  });

  it('offers a quote request through the public request form', () => {
    render(<Page />);
    const links = screen.getAllByRole('link', { name: /request a quote/i });
    expect(links).toHaveLength(quoteButtons);
    for (const link of links) expect(link).toHaveAttribute('href', QUOTE_HREF);
  });
});

describe.each([
  { name: 'online booking', Page: OnlineBookingPage as ComponentType, accessButtons: 2 },
  { name: 'analytics', Page: AnalyticsPage as ComponentType, accessButtons: 2 },
  { name: 'AI assistant', Page: AIPage as ComponentType, accessButtons: 1 },
])('$name page', ({ Page, accessButtons }) => {
  it('promises no free trial or free activation', () => {
    const { container } = render(<Page />);
    expect(container.textContent ?? '').not.toMatch(
      /free trial|\d+-day|no credit card|cancel anytime|activate ai free/i,
    );
  });

  it('sends visitors to request access for the booking platform', () => {
    render(<Page />);
    const links = screen.getAllByRole('link', { name: /request access/i });
    expect(links).toHaveLength(accessButtons);
    for (const link of links) expect(link).toHaveAttribute('href', BOOKING_ACCESS_HREF);
  });
});
