/**
 * The request-access heading and first step arrive with the page (30 Oct 2026). The page read
 * ?solution= in the browser, so its HTML carried nothing; then the heading and form faded in from
 * opacity 0, painting 2.9–4.8 s after the click. This renders the page the way the server does,
 * with the real animation library (the shared test setup replaces it with plain elements).
 */
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import RequestAccessPage from '@/app/request-access/page';

vi.unmock('framer-motion');
vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

describe('request access, as the server sends it', () => {
  it('carries the heading, the first step and its button, none of them starting invisible', async () => {
    const page = await RequestAccessPage({ searchParams: Promise.resolve({ solution: 'booking', source: 'ai-booking' }) });
    const html = renderToString(page);

    expect(html).toMatch(/<h1[^>]*>Request access to/);
    expect(html).toContain('AI Booking Engine');
    expect(html).toContain('Full name');
    expect(html).toContain('Continue');
    // The step container is drawn as it will stay (the old wrappers started at opacity 0).
    expect(html).toMatch(/style="opacity:1"/);
    expect(html).not.toMatch(/opacity:\s*0(?![.\d])/);
  });
});
