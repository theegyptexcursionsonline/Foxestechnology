import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ContactButton from '@/components/operators/ContactButton';
import LeadForm from '@/components/operators/LeadForm';
import MobileStickyCTA from '@/components/operators/MobileStickyCTA';
import OperatorFooter from '@/components/operators/OperatorFooter';
import OperatorHeader from '@/components/operators/OperatorHeader';
import WhatsAppFloat from '@/components/operators/WhatsAppFloat';
import { CurrencyProvider } from '@/components/operators/CurrencyContext';
import { getOperatorCopy } from '@/lib/i18n/operators';

const REAL = '+20 122 345 6789';
const PLACEHOLDER = '+201000000000';
const REQUEST_ACCESS = '/request-access?solution=search&source=foxestechnology';

function scrollWindowTo(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, writable: true, configurable: true });
  fireEvent.scroll(window);
}

afterEach(() => {
  scrollWindowTo(0);
  vi.unstubAllGlobals();
});

describe('ContactButton', () => {
  it('opens WhatsApp in a new tab when there is a real link', () => {
    render(
      <ContactButton
        whatsappHref="https://wa.me/201223456789?text=Hi"
        whatsappLabel="Chat on WhatsApp"
        fallbackHref={REQUEST_ACCESS}
        fallbackLabel="Request access"
        className="btn"
      />,
    );
    const link = screen.getByRole('link', { name: 'Chat on WhatsApp' });
    expect(link).toHaveAttribute('href', 'https://wa.me/201223456789?text=Hi');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.queryByText('Request access')).not.toBeInTheDocument();
  });

  it('falls back to request access when there is no WhatsApp link', () => {
    render(
      <ContactButton
        whatsappHref={null}
        whatsappLabel="Chat on WhatsApp"
        fallbackHref={REQUEST_ACCESS}
        fallbackLabel="Request access"
        className="btn"
      />,
    );
    const link = screen.getByRole('link', { name: 'Request access' });
    expect(link).toHaveAttribute('href', REQUEST_ACCESS);
    expect(link).not.toHaveAttribute('target');
    expect(screen.queryByText('Chat on WhatsApp')).not.toBeInTheDocument();
  });

  it('keeps an accessible name when the label is visually hidden', () => {
    render(
      <ContactButton
        whatsappHref={null}
        whatsappLabel="Chat on WhatsApp"
        fallbackHref={REQUEST_ACCESS}
        fallbackLabel="Request access"
        className="btn"
        labelClassName="hidden md:inline"
        withAriaLabel
      />,
    );
    expect(screen.getByRole('link', { name: 'Request access' })).toHaveAttribute('aria-label', 'Request access');
  });
});

describe('WhatsAppFloat', () => {
  it.each([
    ['no number', null],
    ['the placeholder', PLACEHOLDER],
    ['an empty number', ''],
  ])('renders nothing for %s, even after scrolling', (_label, number) => {
    const { container } = render(
      <WhatsAppFloat number={number} prefilledMessage="Hi" label="Chat with us" locale="en" />,
    );
    scrollWindowTo(800);
    expect(container.innerHTML).toBe('');
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('shows the floating button for a real number once the visitor scrolls', () => {
    render(<WhatsAppFloat number={REAL} prefilledMessage="Hi there" label="Chat with us" locale="en" />);
    expect(screen.queryByRole('link', { name: 'Chat with us' })).not.toBeInTheDocument();
    scrollWindowTo(800);
    expect(screen.getByRole('link', { name: 'Chat with us' })).toHaveAttribute(
      'href',
      'https://wa.me/201223456789?text=Hi%20there',
    );
  });
});

describe('MobileStickyCTA', () => {
  it('offers request access instead of WhatsApp when there is no number', () => {
    const { container } = render(
      <MobileStickyCTA
        primaryLabel="Get started"
        secondaryLabel="WhatsApp"
        whatsappHref={null}
        fallbackHref={REQUEST_ACCESS}
        fallbackLabel="Request access"
        locale="en"
      />,
    );
    scrollWindowTo(900);
    expect(screen.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '#lead-form');
    expect(screen.getByRole('link', { name: 'Request access' })).toHaveAttribute('href', REQUEST_ACCESS);
    expect(container.innerHTML).not.toMatch(/wa\.me/);
  });

  it('keeps the WhatsApp button when a real link is configured', () => {
    render(
      <MobileStickyCTA
        primaryLabel="Get started"
        secondaryLabel="WhatsApp"
        whatsappHref="https://wa.me/201223456789?text=Hi"
        fallbackHref={REQUEST_ACCESS}
        fallbackLabel="Request access"
        locale="en"
      />,
    );
    scrollWindowTo(900);
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute('href', 'https://wa.me/201223456789?text=Hi');
    expect(screen.queryByRole('link', { name: 'Request access' })).not.toBeInTheDocument();
  });
});

describe('LeadForm', () => {
  const copy = getOperatorCopy('ai-search', 'en');

  function submit(container: HTMLElement) {
    const form = container.querySelector('form');
    expect(form).not.toBeNull();
    fireEvent.submit(form!);
  }

  it('confirms the request without a WhatsApp button when there is no number', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ ok: true }) }));
    const { container } = render(
      <LeadForm
        copy={copy.leadForm}
        category="ai-search"
        locale="en"
        whatsappNumber={null}
        whatsappPrefilledMessage={copy.whatsapp.prefilledMessage}
      />,
    );
    submit(container);
    expect(await screen.findByText(copy.leadForm.successTitle)).toBeInTheDocument();
    expect(screen.queryByText(copy.leadForm.successBody)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: copy.leadForm.successWhatsapp })).not.toBeInTheDocument();
    expect(container.innerHTML).not.toMatch(/wa\.me/);
  });

  it('does not treat the placeholder as a number', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ ok: true }) }));
    const { container } = render(
      <LeadForm
        copy={copy.leadForm}
        category="ai-search"
        locale="en"
        whatsappNumber={PLACEHOLDER}
        whatsappPrefilledMessage={copy.whatsapp.prefilledMessage}
      />,
    );
    submit(container);
    expect(await screen.findByText(copy.leadForm.successTitle)).toBeInTheDocument();
    expect(container.innerHTML).not.toMatch(/wa\.me|201000000000/);
  });

  it('offers WhatsApp on the confirmation when a real number is configured', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ ok: true }) }));
    const { container } = render(
      <LeadForm
        copy={copy.leadForm}
        category="ai-search"
        locale="en"
        whatsappNumber={REAL}
        whatsappPrefilledMessage={copy.whatsapp.prefilledMessage}
      />,
    );
    submit(container);
    const link = await screen.findByRole('link', { name: copy.leadForm.successWhatsapp });
    expect(link.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/201223456789\?text=/);
    expect(screen.getByText(copy.leadForm.successBody)).toBeInTheDocument();
  });

  it.each(['en', 'ar'] as const)('shows a failure message that does not send the visitor to WhatsApp (%s)', async (locale) => {
    const localized = getOperatorCopy('ai-search', locale);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 502, json: async () => ({ ok: false }) }));
    const { container } = render(
      <LeadForm
        copy={localized.leadForm}
        category="ai-search"
        locale={locale}
        whatsappNumber={null}
        whatsappPrefilledMessage={localized.whatsapp.prefilledMessage}
      />,
    );
    submit(container);
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(localized.leadForm.errorGeneric);
    expect(alert.textContent).not.toMatch(/whatsapp|واتساب/i);
  });
});

describe('OperatorHeader and OperatorFooter', () => {
  it('show request access in the header, the mobile menu and the footer when there is no number', async () => {
    const { container } = render(
      <CurrencyProvider>
        <OperatorHeader
          category="ai-search"
          locale="en"
          whatsappHref={null}
          ctaLabel="Get started"
          whatsappLabel="Chat on WhatsApp"
        />
        <OperatorFooter category="ai-search" locale="en" whatsappHref={null} />
      </CurrencyProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    await waitFor(() => expect(screen.getAllByRole('link', { name: 'Request access' })).toHaveLength(3));
    for (const link of screen.getAllByRole('link', { name: 'Request access' })) {
      expect(link).toHaveAttribute('href', REQUEST_ACCESS);
    }
    expect(container.innerHTML).not.toMatch(/wa\.me/);
  });

  it('show WhatsApp in the header, the mobile menu and the footer for a real number', async () => {
    render(
      <CurrencyProvider>
        <OperatorHeader
          category="ai-search"
          locale="ar"
          whatsappHref="https://wa.me/201223456789?text=Hi"
          ctaLabel="ابدأ الآن"
          whatsappLabel="تحدث معنا عبر واتساب"
        />
        <OperatorFooter category="ai-search" locale="ar" whatsappHref="https://wa.me/201223456789?text=Hi" />
      </CurrencyProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    await waitFor(() =>
      expect(document.querySelectorAll('a[href="https://wa.me/201223456789?text=Hi"]')).toHaveLength(3),
    );
    expect(screen.queryByRole('link', { name: 'اطلب الانضمام' })).not.toBeInTheDocument();
  });
});
