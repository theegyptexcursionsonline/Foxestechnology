/**
 * The request form arrives as HTML, so a visitor on a slow phone can type before the page's
 * script has loaded. What they typed must count: "Continue" may not answer "Tell us your full
 * name" under a field that shows their name.
 */
import { act } from 'react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { fireEvent, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { RequestAccessForm } from '@/app/request-access/RequestAccessForm';

let root: Root | null = null;
let host: HTMLElement | null = null;

afterEach(() => {
  act(() => root?.unmount());
  host?.remove();
  root = null;
  host = null;
});

function field(name: string) {
  return host!.querySelector(`[name="${name}"]`) as HTMLInputElement;
}

describe('request access: typing before the page finishes loading', () => {
  it('keeps what was typed and moves to the next step', async () => {
    host = document.createElement('div');
    document.body.appendChild(host);
    host.innerHTML = renderToString(<RequestAccessForm solution="booking" source="foxestechnology" />);

    // The visitor types into the server-sent fields; no script has run yet.
    field('name').value = 'Test Operator';
    field('email').value = 'qa@example.test';
    field('phone').value = '+20 100 555 0100';

    await act(async () => {
      root = hydrateRoot(host!, <RequestAccessForm solution="booking" source="foxestechnology" />);
    });

    expect(field('name').value).toBe('Test Operator');
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    });

    expect(screen.queryByText('Tell us your full name.')).not.toBeInTheDocument();
    expect(await screen.findByLabelText('Company / brand')).toBeInTheDocument();
  });

  it('still asks for what is missing when nothing was typed', async () => {
    host = document.createElement('div');
    document.body.appendChild(host);
    host.innerHTML = renderToString(<RequestAccessForm solution={null} source="" />);
    await act(async () => {
      root = hydrateRoot(host!, <RequestAccessForm solution={null} source="" />);
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    });
    expect(screen.getByText('Tell us your full name.')).toBeInTheDocument();
  });
});
