/**
 * The shared request-access page after the 30 Oct 2026 rebuild. Every Foxes product sends its
 * sign-ups here with ?solution=<key>&source=<app>. Each test names what a visitor met before.
 */
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RequestAccessPage, { generateMetadata } from '@/app/request-access/page';
import { RequestAccessForm } from '@/app/request-access/RequestAccessForm';
import { solutionFrom, sourceFrom } from '@/app/request-access/solutions';

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

afterEach(() => {
  vi.unstubAllGlobals();
});

async function renderPage(searchParams: Record<string, string | string[] | undefined>) {
  return render(await RequestAccessPage({ searchParams: Promise.resolve(searchParams) }));
}

function fillStepOne() {
  fireEvent.change(screen.getByLabelText('Full name'), { target: { value: 'Sara Hassan' } });
  fireEvent.change(screen.getByLabelText('Work email'), { target: { value: 'qa@example.com' } });
  fireEvent.change(screen.getByLabelText('Phone / WhatsApp'), { target: { value: '+20 100 000 0000' } });
  fireEvent.click(screen.getByRole('button', { name: /continue/i }));
}

function fillStepTwo() {
  fireEvent.change(screen.getByLabelText('Company / brand'), { target: { value: 'Nile Tours' } });
  fireEvent.change(screen.getByLabelText('Business type'), { target: { value: 'Tour operator' } });
  fireEvent.change(screen.getByLabelText('Country / region'), { target: { value: 'Egypt' } });
  fireEvent.click(screen.getByRole('button', { name: /continue/i }));
}

describe('which solution and source a link names', () => {
  it('takes a known solution in any case, and nothing else', () => {
    expect(solutionFrom('Voice')).toBe('voice');
    expect(solutionFrom(' booking ')).toBe('booking');
    expect(solutionFrom(['search', 'voice'])).toBe('search');
    for (const unknown of [undefined, '', 'crm', 'constructor', '__proto__', 'toString']) {
      expect([unknown, solutionFrom(unknown)]).toEqual([unknown, null]);
    }
  });

  it('keeps the source a product names, from ?source= or ?from=, bounded', () => {
    expect(sourceFrom({ source: 'AI-Booking' })).toBe('ai-booking');
    expect(sourceFrom({ from: 'voice' })).toBe('voice');
    expect(sourceFrom({})).toBe('');
    expect(sourceFrom({ source: 'x'.repeat(200) })).toHaveLength(64);
  });
});

describe('request access page', () => {
  it('names the product the visitor came from in the heading and the tab title', async () => {
    await renderPage({ solution: 'voice', source: 'voice' });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Request access to AI Voice Agent');

    const metadata = await generateMetadata({ searchParams: Promise.resolve({ solution: 'search' }) });
    expect(metadata.title).toBe('Request access to AI Search Agent');
    expect(metadata.alternates?.canonical).toBe('https://foxestechnology.com/request-access');
  });

  it('falls back to the whole platform when the link names no known solution', async () => {
    await renderPage({ solution: 'nonsense' });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Request access to the Foxes platform');
    const metadata = await generateMetadata({ searchParams: Promise.resolve({}) });
    expect(metadata.title).toBe('Request access');
    expect(String(metadata.description)).toMatch(/reviewed by our team/);
  });

  it('makes no promise nobody has made: no review deadline, no claimed customers', async () => {
    // It said "Reviewed within one business day" twice and "Trusted by tour operators and
    // resellers across the region"; there is no record of either.
    const { container } = await renderPage({ solution: 'booking' });
    expect(container.textContent).not.toMatch(/business day|trusted by/i);
    const metadata = await generateMetadata({ searchParams: Promise.resolve({ solution: 'booking' }) });
    expect(String(metadata.description)).not.toMatch(/business day/i);
  });

  it('ties every field to its label and tells the browser what each one holds', async () => {
    await renderPage({});
    expect(screen.getByLabelText('Full name')).toHaveAttribute('autocomplete', 'name');
    expect(screen.getByLabelText('Work email')).toHaveAttribute('autocomplete', 'email');
    expect(screen.getByLabelText('Phone / WhatsApp')).toHaveAttribute('type', 'tel');
    expect(screen.getByLabelText('Your role').tagName).toBe('SELECT');
  });

  it('does not move focus to the first field when the page loads', async () => {
    // Phones opened the form scrolled past its own heading, with a red ring that read as an error.
    await renderPage({});
    expect(screen.getByLabelText('Full name')).not.toHaveFocus();
  });

  it("explains what is missing and focuses the next step's first field after Continue", async () => {
    await renderPage({});
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByRole('alert')).toHaveTextContent('Tell us your full name.');

    fillStepOne();
    expect(screen.getByText(/Step 2 of 3/)).toBeInTheDocument();
    expect(screen.getByLabelText('Company / brand')).toHaveFocus();
  });

  it('sends one request however often it is submitted, with the solution and source it was linked with', async () => {
    let finish: (value: unknown) => void = () => undefined;
    const fetchMock = vi.fn().mockReturnValue(new Promise((resolve) => (finish = resolve)));
    vi.stubGlobal('fetch', fetchMock);

    await renderPage({ solution: 'booking', source: 'ai-booking' });
    fillStepOne();
    fillStepTwo();
    expect(screen.getByRole('button', { name: /AI Booking Engine/ })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByLabelText(/I agree to be contacted/));

    const form = screen.getByRole('button', { name: 'Request access' }).closest('form')!;
    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toMatchObject({ solutions: ['booking'], source: 'ai-booking', email: 'qa@example.com', company: 'Nile Tours' });

    await act(async () => finish({ ok: true, json: async () => ({ success: true }) }));
    const heading = await screen.findByRole('heading', { name: 'Request received' });
    expect(heading).toHaveFocus();
    expect(heading.parentElement?.textContent).toMatch(/will follow up at qa@example\.com/);
    expect(heading.parentElement?.textContent).not.toMatch(/business day/i);
  });

  it('records the solution as the source when the link names no source', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal('fetch', fetchMock);
    render(<RequestAccessForm solution="search" source="" />);
    fillStepOne();
    fillStepTwo();
    fireEvent.click(screen.getByLabelText(/I agree to be contacted/));
    fireEvent.click(screen.getByRole('button', { name: 'Request access' }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).source).toBe('search');
  });

  it('keeps a refusal on the form and reads it out', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 429, json: async () => ({ error: 'Too many requests — please try again shortly.' }) }));
    await renderPage({ solution: 'voice' });
    fillStepOne();
    fillStepTwo();
    fireEvent.click(screen.getByLabelText(/I agree to be contacted/));
    fireEvent.click(screen.getByRole('button', { name: 'Request access' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Too many requests — please try again shortly.');
    expect(screen.getByRole('button', { name: 'Request access' })).toBeEnabled();
  });

  it("sends an approved customer to their own product's sign-in", async () => {
    // It pointed every approved customer at this site's home page.
    const { unmount } = await renderPage({ solution: 'booking' });
    expect(screen.getByRole('link', { name: 'Sign in to AI Booking Engine' })).toHaveAttribute('href', 'https://booking.foxestechnology.com/login');
    unmount();

    await renderPage({ solution: 'attractions' });
    expect(screen.queryByRole('link', { name: /^Sign in to/ })).not.toBeInTheDocument();
    expect(screen.getByText(/Sign in on your product's own site/)).toBeInTheDocument();
  });
});
