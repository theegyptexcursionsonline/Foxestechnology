/**
 * The forms and switches every landing page shares: the enquiry form's failure paths, the
 * "write to me" pop-up, and the language switch. The endpoints are faked; nothing is sent.
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import LeadForm from '@/components/operators/LeadForm';
import OperatorExitIntent from '@/components/operators/OperatorExitIntent';
import OperatorHeader from '@/components/operators/OperatorHeader';
import { CurrencyProvider } from '@/components/operators/CurrencyContext';
import { getOperatorCopy, type Locale, type OperatorCategory } from '@/lib/i18n/operators';

afterEach(() => {
  vi.unstubAllGlobals();
});

function fakeFetch(response: { ok: boolean; status: number; body?: unknown } | Error) {
  const mock =
    response instanceof Error
      ? vi.fn().mockRejectedValue(response)
      : vi.fn().mockResolvedValue({ ok: response.ok, status: response.status, json: async () => response.body ?? {} });
  vi.stubGlobal('fetch', mock);
  return mock;
}

function renderLeadForm(locale: Locale) {
  const copy = getOperatorCopy('boat-operators', locale);
  const view = render(
    <LeadForm
      copy={copy.leadForm}
      category="boat-operators"
      locale={locale}
      whatsappNumber={null}
      whatsappPrefilledMessage={copy.whatsapp.prefilledMessage}
    />,
  );
  return { copy, ...view };
}

function fillLeadForm(copy: ReturnType<typeof getOperatorCopy>) {
  fireEvent.change(screen.getByLabelText(copy.leadForm.fields.name), { target: { value: 'Test Operator' } });
  fireEvent.change(screen.getByLabelText(copy.leadForm.fields.business), { target: { value: 'Example Charters' } });
  fireEvent.change(screen.getByLabelText(copy.leadForm.fields.whatsapp), { target: { value: '+20 100 555 0100' } });
  fireEvent.change(screen.getByLabelText(copy.leadForm.fields.monthlyBookings), {
    target: { value: copy.leadForm.fields.monthlyBookingsOptions[0].value },
  });
}

describe('enquiry form', () => {
  it.each<[string, (copy: ReturnType<typeof getOperatorCopy>) => void]>([
    ['nothing is filled in', () => {}],
    ['the number cannot be a phone number', (copy) => {
      fillLeadForm(copy);
      fireEvent.change(screen.getByLabelText(copy.leadForm.fields.whatsapp), { target: { value: 'call me' } });
    }],
    ['the monthly figure is not chosen', (copy) => {
      fillLeadForm(copy);
      fireEvent.change(screen.getByLabelText(copy.leadForm.fields.monthlyBookings), { target: { value: '' } });
    }],
  ])('says what is missing and sends nothing when %s', async (_label, prepare) => {
    const fetchMock = fakeFetch({ ok: true, status: 200, body: { ok: true } });
    const { container, copy } = renderLeadForm('en');
    prepare(copy);
    fireEvent.submit(container.querySelector('form')!);
    expect(await screen.findByRole('alert')).toHaveTextContent(copy.leadForm.errorMissing);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByText(copy.leadForm.successTitle)).not.toBeInTheDocument();
  });

  it('sends the page, the language and the answers to the lead endpoint', async () => {
    const fetchMock = fakeFetch({ ok: true, status: 200, body: { ok: true } });
    const { container, copy } = renderLeadForm('en');
    fillLeadForm(copy);
    fireEvent.submit(container.querySelector('form')!);

    expect(await screen.findByText(copy.leadForm.successTitle)).toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/leads');
    expect(JSON.parse(init.body)).toMatchObject({
      name: 'Test Operator',
      business: 'Example Charters',
      whatsapp: '+20 100 555 0100',
      monthlyBookings: 'lt-50',
      category: 'boat-operators',
      locale: 'en',
      honeypot: '',
    });
  });

  it.each<[string, Parameters<typeof fakeFetch>[0], 'errorGeneric' | 'errorRateLimit']>([
    ['the endpoint refuses the lead', { ok: false, status: 502, body: { ok: false, error: 'delivery_failed' } }, 'errorGeneric'],
    ['the endpoint answers 200 without confirming', { ok: true, status: 200, body: { ok: false } }, 'errorGeneric'],
    ['the visitor has sent too many', { ok: false, status: 429, body: { ok: false } }, 'errorRateLimit'],
    ['the network fails', new Error('offline'), 'errorGeneric'],
  ])('shows an error and no confirmation when %s', async (_label, response, key) => {
    fakeFetch(response);
    const { container, copy } = renderLeadForm('en');
    fillLeadForm(copy);
    fireEvent.submit(container.querySelector('form')!);
    expect(await screen.findByRole('alert')).toHaveTextContent(copy.leadForm[key]);
    expect(screen.queryByText(copy.leadForm.successTitle)).not.toBeInTheDocument();
  });

  it('says the same in Arabic on the Arabic pages', async () => {
    const fetchMock = fakeFetch({ ok: false, status: 429 });
    const { container, copy } = renderLeadForm('ar');
    fireEvent.submit(container.querySelector('form')!);
    const missing = await screen.findByRole('alert');
    expect(missing).toHaveTextContent(copy.leadForm.errorMissing);
    expect(missing.textContent).not.toMatch(/[A-Za-z]{3,}/);
    expect(fetchMock).not.toHaveBeenCalled();

    fillLeadForm(copy);
    fireEvent.submit(container.querySelector('form')!);
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(copy.leadForm.errorRateLimit));
    expect(screen.getByRole('alert').textContent).not.toMatch(/[A-Za-z]{3,}/);
  });

  it('uses what the fields show when they were filled before the page finished loading', async () => {
    const fetchMock = fakeFetch({ ok: true, status: 200, body: { ok: true } });
    const { container, copy } = renderLeadForm('en');
    // Typed before the script ran: the fields have the values, the form's state does not.
    const set = (label: string, value: string) => {
      (screen.getByLabelText(label) as HTMLInputElement).value = value;
    };
    set(copy.leadForm.fields.name, 'Early Typist');
    set(copy.leadForm.fields.business, 'Example Charters');
    set(copy.leadForm.fields.whatsapp, '+20 100 555 0100');
    set(copy.leadForm.fields.monthlyBookings, copy.leadForm.fields.monthlyBookingsOptions[1].value);
    fireEvent.submit(container.querySelector('form')!);
    expect(await screen.findByText(copy.leadForm.successTitle)).toBeInTheDocument();
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({ name: 'Early Typist', business: 'Example Charters', monthlyBookings: '50-200' });
  });

  it('sends once however often the button is pressed while it is sending', async () => {
    let release: (value: unknown) => void = () => {};
    const fetchMock = vi.fn().mockReturnValue(new Promise((resolve) => { release = resolve; }));
    vi.stubGlobal('fetch', fetchMock);
    const { container, copy } = renderLeadForm('en');
    fillLeadForm(copy);
    const form = container.querySelector('form')!;
    fireEvent.submit(form);
    fireEvent.submit(form);
    fireEvent.submit(form);
    release({ ok: true, status: 200, json: async () => ({ ok: true }) });
    expect(await screen.findByText(copy.leadForm.successTitle)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

/** The pop-up opens when the pointer leaves through the top of the page, once the visitor has been there a few seconds. */
function renderPopUp(locale: Locale) {
  const copy = getOperatorCopy('ai-voice', locale);
  window.sessionStorage.clear();
  const now = vi.spyOn(Date, 'now');
  now.mockReturnValue(1_000_000);
  const view = render(<OperatorExitIntent copy={copy.exitIntent} category="ai-voice" locale={locale} />);
  now.mockReturnValue(1_000_000 + 5_000);
  fireEvent(document, new MouseEvent('mouseleave', { clientY: 0 }));
  now.mockRestore();
  return { copy, ...view };
}

describe('"write to me" pop-up', () => {
  it('offers a reply from a person, not a guide', () => {
    const { copy } = renderPopUp('en');
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveTextContent(copy.exitIntent.headline);
    expect(dialog.textContent).not.toMatch(/template|audit|cheat sheet|benchmark|PDF|free/i);
  });

  it('records the address before it says thank you', async () => {
    const fetchMock = fakeFetch({ ok: true, status: 200, body: { ok: true } });
    const { copy } = renderPopUp('en');
    fireEvent.change(screen.getByPlaceholderText(copy.exitIntent.emailPlaceholder), { target: { value: 'qa@example.test' } });
    fireEvent.submit(screen.getByRole('dialog').querySelector('form')!);

    expect(await screen.findByText(copy.exitIntent.successTitle)).toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/leads/magnet');
    expect(JSON.parse(init.body)).toMatchObject({ email: 'qa@example.test', category: 'ai-voice', locale: 'en' });
  });

  it.each<[string, Parameters<typeof fakeFetch>[0], RegExp]>([
    ['the address was not recorded', { ok: false, status: 502, body: { ok: false } }, /something went wrong/i],
    ['the visitor has sent too many', { ok: false, status: 429 }, /too many requests/i],
    ['the network fails', new Error('offline'), /network error/i],
  ])('shows an error and no thank-you when %s', async (_label, response, message) => {
    fakeFetch(response);
    const { copy } = renderPopUp('en');
    fireEvent.change(screen.getByPlaceholderText(copy.exitIntent.emailPlaceholder), { target: { value: 'qa@example.test' } });
    fireEvent.submit(screen.getByRole('dialog').querySelector('form')!);
    await waitFor(() => expect(screen.getByRole('dialog')).toHaveTextContent(message));
    expect(screen.queryByText(copy.exitIntent.successTitle)).not.toBeInTheDocument();
  });

  it('gives its errors and its close button in Arabic on the Arabic pages', async () => {
    fakeFetch({ ok: false, status: 502, body: { ok: false } });
    const { copy } = renderPopUp('ar');
    fireEvent.change(screen.getByPlaceholderText(copy.exitIntent.emailPlaceholder), { target: { value: 'qa@example.test' } });
    fireEvent.submit(screen.getByRole('dialog').querySelector('form')!);
    await waitFor(() => expect(screen.getByRole('dialog')).toHaveTextContent('حدث خطأ. حاول مرة أخرى.'));
    expect(screen.getByRole('dialog').textContent).not.toMatch(/Something went wrong|Network error|Too many requests/);
  });

  it('does not open in the first seconds, and opens once per visit', () => {
    const copy = getOperatorCopy('ai-voice', 'en');
    window.sessionStorage.clear();
    const first = render(<OperatorExitIntent copy={copy.exitIntent} category="ai-voice" locale="en" />);
    fireEvent(document, new MouseEvent('mouseleave', { clientY: 0 }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    first.unmount();

    renderPopUp('en').unmount();
    // Same visit, another page: it has already been shown.
    const now = vi.spyOn(Date, 'now');
    now.mockReturnValue(2_000_000);
    render(<OperatorExitIntent copy={copy.exitIntent} category="ai-voice" locale="en" />);
    now.mockReturnValue(2_000_000 + 5_000);
    fireEvent(document, new MouseEvent('mouseleave', { clientY: 0 }));
    now.mockRestore();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes with Escape', async () => {
    renderPopUp('en');
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});

describe('language switch', () => {
  const cases: [OperatorCategory, Locale, string, string][] = [
    ['boat-operators', 'en', 'العربية', '/ar/operators/boat-operators'],
    ['boat-operators', 'ar', 'English', '/operators/boat-operators'],
    ['ai-voice', 'en', 'العربية', '/ar/solutions/ai-voice'],
    ['ai-search', 'ar', 'English', '/solutions/ai-search'],
  ];
  it.each(cases)('%s in %s links "%s" to %s', (category, locale, label, href) => {
    const copy = getOperatorCopy(category, locale);
    render(
      <CurrencyProvider>
        <OperatorHeader category={category} locale={locale} whatsappHref={null} ctaLabel={copy.hero.primaryCta} whatsappLabel={copy.hero.secondaryCta} />
      </CurrencyProvider>,
    );
    const links = screen.getAllByRole('link', { name: label });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) expect(link).toHaveAttribute('href', href);
  });

  it('lists only solutions that exist in the menu', () => {
    const copy = getOperatorCopy('ai-voice', 'en');
    const { container } = render(
      <CurrencyProvider>
        <OperatorHeader category="ai-voice" locale="en" whatsappHref={null} ctaLabel={copy.hero.primaryCta} whatsappLabel={copy.hero.secondaryCta} />
      </CurrencyProvider>,
    );
    expect(container.innerHTML).not.toMatch(/pos-hardware|\/solutions\/kiosk/);
  });
});
