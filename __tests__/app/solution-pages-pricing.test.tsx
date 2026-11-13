/**
 * The public /solutions/* pages that carry their own copy: what a visitor can read and click.
 * Foxes sells no POS devices or kiosks, so those two pages say so and describe what the booking
 * product does at the desk and for self-service instead. No page shows a price or promises a
 * trial, and every page has one action: request access to the booking product.
 */
import type { ComponentType } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import KioskPage from '@/app/solutions/kiosk/page';
import POSHardwarePage from '@/app/solutions/pos-hardware/page';
import OnlineBookingPage from '@/app/solutions/online-booking/page';
import AnalyticsPage from '@/app/solutions/analytics/page';
import AIPage from '@/app/solutions/ai/page';

const BOOKING_ACCESS_HREF = '/request-access?solution=booking&source=foxestechnology';

const PAGES = [
  { name: 'online booking', Page: OnlineBookingPage as ComponentType },
  { name: 'desk bookings (was POS hardware)', Page: POSHardwarePage as ComponentType },
  { name: 'self-service (was kiosk)', Page: KioskPage as ComponentType },
  { name: 'booking assistant', Page: AIPage as ComponentType },
  { name: 'reports', Page: AnalyticsPage as ComponentType },
];

describe.each(PAGES)('$name page', ({ Page }) => {
  it('has one headline and one action, repeated at the foot of the page', () => {
    render(<Page />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    const links = screen.getAllByRole('link', { name: /request access/i });
    expect(links).toHaveLength(2);
    for (const link of links) expect(link).toHaveAttribute('href', BOOKING_ACCESS_HREF);
  });

  it('shows no price, trial, quote or ordering', () => {
    const { container } = render(<Page />);
    const text = container.textContent ?? '';
    expect(text).not.toMatch(/\$\s?\d/);
    expect(text).not.toMatch(/free trial|\d+-day|no credit card|cancel anytime|activate ai free/i);
    expect(text).not.toMatch(/request a quote|order now|order hardware|get started free|free shipping|free installation/i);
  });

  it('makes no result, customer or certification claim', () => {
    const { container } = render(<Page />);
    const text = container.textContent ?? '';
    expect(text).not.toMatch(/\d+\s?%|\+\d{2,}|10,000|loved by|testimonial|pci|ada compliant|viator|getyourguide|klook|paypal|quickbooks/i);
    expect(text).not.toMatch(/watch demo|try demo|see demo|live demo|schedule demo/i);
  });

  it('says what the product does not do', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { name: /good to know/i })).toBeInTheDocument();
  });
});

describe('pages that used to sell hardware', () => {
  it('desk bookings: no devices are sold, bookings are taken in the browser', () => {
    const { container } = render(<POSHardwarePage />);
    const text = container.textContent ?? '';
    expect(text).toMatch(/does not sell card readers, tablets or terminals/i);
    expect(text).toMatch(/no offline mode/i);
    expect(text).not.toMatch(/handheld pos|tablet pos|terminal pos|battery|quad-core|receipt printer/i);
  });

  it('self-service: no kiosks are supplied, guests use the booking widget', () => {
    const { container } = render(<KioskPage />);
    const text = container.textContent ?? '';
    expect(text).toMatch(/does not supply kiosk hardware/i);
    expect(text).not.toMatch(/touchscreen|thermal|outdoor kiosk|premium kiosk|standard kiosk/i);
  });

  it('booking assistant: it never prices or books, and works in the widget only', () => {
    const { container } = render(<AIPage />);
    const text = container.textContent ?? '';
    expect(text).toMatch(/never sets a price, promises a place or makes a booking/i);
    expect(text).toMatch(/does not answer on whatsapp, social media, sms or email/i);
    expect(text).not.toMatch(/50\+|self-learning|sentiment/i);
  });

  it('reports: no forecasts or accounting connections are claimed', () => {
    const { container } = render(<AnalyticsPage />);
    const text = container.textContent ?? '';
    expect(text).toMatch(/no forecasts, scheduled email reports or connections to accounting tools/i);
    expect(text).not.toMatch(/predict|confidence|power bi|tableau|xero/i);
  });
});
