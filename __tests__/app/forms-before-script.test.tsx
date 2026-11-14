/**
 * Every form on the site, as the server sends it and once the page's script has run.
 *
 * Before the script attaches, pressing Enter or the button lets the browser submit the form
 * itself: a GET to the same page that put the request form's name, email and phone in the
 * address bar and reloaded the others empty (found 14 Nov 2026). So the submit button is
 * disabled in the server's HTML and enabled once the script runs; the fields can be typed in
 * throughout, and what they show is read at submit (tested in the form suites).
 */
import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, onTestFinished, vi } from 'vitest';
import type { ReactElement } from 'react';
import ComingSoonPage from '@/app/coming-soon/page';
import { RequestAccessForm } from '@/app/request-access/RequestAccessForm';
import Footer from '@/components/Footer';
import LeadForm from '@/components/operators/LeadForm';
import { getOperatorCopy } from '@/lib/i18n/operators';

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

const copy = getOperatorCopy('boat-operators', 'en');

const FORMS: { name: string; element: () => ReactElement; button: RegExp }[] = [
  { name: 'request access', element: () => <RequestAccessForm solution="booking" source="foxestechnology" />, button: /^Continue/ },
  {
    name: 'enquiry form',
    element: () => (
      <LeadForm copy={copy.leadForm} category="boat-operators" locale="en" whatsappNumber={null} whatsappPrefilledMessage={copy.whatsapp.prefilledMessage} />
    ),
    button: new RegExp(`^${copy.leadForm.submit}`),
  },
  { name: 'footer sign-up', element: () => <Footer />, button: /^Keep me posted/ },
  { name: 'holding screen sign-up', element: () => <ComingSoonPage />, button: /^Notify me/ },
];

/** The submit buttons in server HTML, with their disabled flag. */
function submitButtons(html: string) {
  const host = document.createElement('div');
  host.innerHTML = html;
  return [...host.querySelectorAll<HTMLButtonElement>('button[type="submit"]')].map((b) => ({
    label: (b.textContent ?? '').trim(),
    disabled: b.disabled,
  }));
}

describe('forms before and after the page script', () => {
  for (const { name, element, button } of FORMS) {
    it(`${name}: the server sends the button disabled, so the browser cannot submit the form itself`, () => {
      const buttons = submitButtons(renderToString(element())).filter((b) => button.test(b.label));
      expect(buttons.length, `no "${button}" submit button in the server HTML`).toBeGreaterThan(0);
      for (const b of buttons) expect(b.disabled, b.label).toBe(true);
    });

    it(`${name}: the button works once the script has run`, () => {
      render(element());
      const buttons = screen.getAllByRole('button').filter((b) => b.getAttribute('type') === 'submit' && button.test((b.textContent ?? '').trim()));
      expect(buttons.length).toBeGreaterThan(0);
      for (const b of buttons) expect(b).toBeEnabled();
    });
  }
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('footer sign-up: an address typed before the page finished loading', () => {
  it('stays in the field through the redraws that follow and is the one sent', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ ok: true }) });
    vi.stubGlobal('fetch', fetchMock);
    const host = document.createElement('div');
    document.body.appendChild(host);
    let root: ReturnType<typeof hydrateRoot> | null = null;
    onTestFinished(() => {
      act(() => root?.unmount());
      host.remove();
    });
    host.innerHTML = renderToString(<Footer />);
    const field = () => host.querySelector('input[type="email"]') as HTMLInputElement;
    field().value = 'early@example.test';

    await act(async () => {
      root = hydrateRoot(host, <Footer />);
    });
    expect(field()).toHaveValue('early@example.test');
    await act(async () => {
      fireEvent.submit(field().form!);
    });
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({ email: 'early@example.test' });
  });
});
