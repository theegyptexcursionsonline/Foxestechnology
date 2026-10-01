/**
 * The coming-soon page is what every visitor to foxestechnology.com sees. It must not show a
 * launch date that has passed, a countdown, an unbacked sign-up count or launch pricing, and
 * its email forms must only confirm a sign-up after it has actually been recorded.
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ComingSoonPage from '@/app/coming-soon/page';
import ExitIntentModal from '@/components/ExitIntentModal';

function mockFetch(response: { ok: boolean; status: number; body?: unknown }) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: response.ok,
    status: response.status,
    json: async () => response.body ?? {},
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

function fillAndSubmit(form: HTMLFormElement, email = 'qa@example.com') {
  const input = form.querySelector('input[type="email"]') as HTMLInputElement;
  fireEvent.change(input, { target: { value: email } });
  fireEvent.submit(form);
}

describe('coming-soon page', () => {
  it('says it is opening soon, with no launch date and no countdown', () => {
    const { container } = render(<ComingSoonPage />);
    const text = container.textContent ?? '';

    expect(screen.getByText(/opening soon/i)).toBeInTheDocument();
    expect(text).not.toMatch(/july|launching|2026-07/i);
    for (const unit of ['Days', 'Hours', 'Minutes', 'Seconds']) {
      expect(screen.queryByText(unit)).not.toBeInTheDocument();
    }
  });

  it('says it in Arabic too, and offers a real way to talk now', () => {
    render(<ComingSoonPage />);
    expect(screen.getByText('قريبًا')).toHaveAttribute('lang', 'ar');
    const links = screen.getAllByRole('link', { name: /request access/i });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) expect(link).toHaveAttribute('href', '/request-access?source=foxestechnology');
  });

  it('shows no sign-up count and no launch pricing', () => {
    const { container } = render(<ComingSoonPage />);
    const text = container.textContent ?? '';
    expect(text).not.toMatch(/1,200|operators waiting/i);
    expect(text).not.toMatch(/introductory pricing|launch pricing|% off/i);
  });

  it('records the email before confirming the sign-up', async () => {
    const fetchMock = mockFetch({ ok: true, status: 200, body: { ok: true } });
    const { container } = render(<ComingSoonPage />);
    fillAndSubmit(container.querySelector('form') as HTMLFormElement);

    await waitFor(() => expect(screen.getAllByText(/you.re on the list/i).length).toBeGreaterThan(0));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/leads/magnet');
    expect(JSON.parse(init.body)).toMatchObject({ email: 'qa@example.com', category: 'coming-soon' });
  });

  it('shows an error, not a confirmation, when the sign-up is not recorded', async () => {
    mockFetch({ ok: false, status: 502, body: { ok: false, error: 'delivery_failed' } });
    const { container } = render(<ComingSoonPage />);
    fillAndSubmit(container.querySelector('form') as HTMLFormElement);

    expect((await screen.findAllByRole('alert'))[0]).toHaveTextContent(/something went wrong/i);
    expect(screen.queryByText(/you.re on the list/i)).not.toBeInTheDocument();
  });
});

describe('coming-soon exit pop-up', () => {
  it('promises no launch pricing, discount or date', () => {
    render(<ExitIntentModal isOpen onClose={() => {}} />);
    const text = document.body.textContent ?? '';
    expect(text).not.toMatch(/% off|launch pricing|special pricing|july|2026/i);
    expect(text).not.toMatch(/reserved|check your email/i);
  });

  it('confirms only after the email is recorded', async () => {
    const fetchMock = mockFetch({ ok: true, status: 200, body: { ok: true } });
    render(<ExitIntentModal isOpen onClose={() => {}} />);
    fillAndSubmit(document.querySelector('form') as HTMLFormElement);

    await waitFor(() => expect(screen.getByText(/you.re on the list/i)).toBeInTheDocument());
    expect(fetchMock.mock.calls[0][0]).toBe('/api/leads/magnet');
  });

  it('shows an error when the email cannot be recorded', async () => {
    mockFetch({ ok: false, status: 429, body: { ok: false, error: 'rate_limited' } });
    render(<ExitIntentModal isOpen onClose={() => {}} />);
    fillAndSubmit(document.querySelector('form') as HTMLFormElement);

    expect(await screen.findByRole('alert')).toHaveTextContent(/too many attempts/i);
    expect(screen.queryByText(/you.re on the list/i)).not.toBeInTheDocument();
  });
});
