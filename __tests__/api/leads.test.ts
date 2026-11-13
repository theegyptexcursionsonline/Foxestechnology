/**
 * POST /api/leads — the enquiry form on the operator, AI Voice and AI Search pages.
 *
 * It e-mails our team and forwards to the lead backend when one is configured. The visitor is
 * told "request received" only when at least one of the two took the lead; when both fail the
 * answer is an error, never a false success. Both providers are faked here: nothing is sent.
 */
import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/leads/route';

let ipCounter = 0;
const freshIp = () => `203.0.113.${(ipCounter += 1)}`;

const VALID = {
  name: 'Test Operator',
  business: 'Example Charters',
  whatsapp: '+20 100 555 0100',
  monthlyBookings: 'lt-50',
  category: 'boat-operators',
  locale: 'en',
  source: '/operators/boat-operators',
  honeypot: '',
};

function post(body: unknown, ip = freshIp()) {
  return POST(
    new NextRequest('http://localhost/api/leads', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
  );
}

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('POST /api/leads', () => {
  it('e-mails our team and confirms, with the visitor’s details and no reply-time promise', async () => {
    vi.stubEnv('MAILGUN_API_KEY', 'test-key');
    vi.stubEnv('MAILGUN_DOMAIN', 'mail.example.test');
    fetchMock.mockResolvedValue({ ok: true, status: 200, text: async () => 'queued' });

    const res = await post(VALID);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.mailgun.net/v3/mail.example.test/messages');
    const sent = new URLSearchParams(init.body as string);
    expect(sent.get('to')).toBe('sales@foxestechnology.com');
    expect(sent.get('text')).toContain('Example Charters');
    expect(sent.get('text')).toContain('+20 100 555 0100');
    expect(sent.get('html')).not.toMatch(/within 1 hour|SLA/i);
  });

  it('forwards to the lead backend with its token when one is configured', async () => {
    vi.stubEnv('LEADS_BACKEND_URL', 'https://leads.example.test/in');
    vi.stubEnv('LEADS_BACKEND_TOKEN', 'backend-token');
    fetchMock.mockResolvedValue({ ok: true, status: 200, text: async () => '' });

    const res = await post({ ...VALID, locale: 'ar' });

    expect(res.status).toBe(200);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://leads.example.test/in');
    expect(init.headers.Authorization).toBe('Bearer backend-token');
    expect(JSON.parse(init.body)).toMatchObject({ business: 'Example Charters', locale: 'ar' });
  });

  it('still confirms when the e-mail fails but the backend took the lead', async () => {
    vi.stubEnv('MAILGUN_API_KEY', 'test-key');
    vi.stubEnv('MAILGUN_DOMAIN', 'mail.example.test');
    vi.stubEnv('LEADS_BACKEND_URL', 'https://leads.example.test/in');
    fetchMock.mockImplementation(async (url: string) =>
      url.includes('mailgun')
        ? { ok: false, status: 500, text: async () => 'down' }
        : { ok: true, status: 200, text: async () => '' },
    );

    const res = await post(VALID);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it('answers with an error, not a success, when nothing took the lead', async () => {
    vi.stubEnv('MAILGUN_API_KEY', 'test-key');
    vi.stubEnv('MAILGUN_DOMAIN', 'mail.example.test');
    vi.stubEnv('LEADS_BACKEND_URL', 'https://leads.example.test/in');
    fetchMock.mockImplementation(async (url: string) => {
      if (url.includes('mailgun')) return { ok: false, status: 401, text: async () => 'forbidden' };
      throw new Error('connection refused');
    });

    const res = await post(VALID);
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ ok: false, error: 'delivery_failed' });
  });

  it('answers with an error when no delivery is configured at all', async () => {
    const res = await post(VALID);
    expect(res.status).toBe(502);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    ['a missing field', { ...VALID, business: '' }, 'Missing field: business'],
    ['a one-letter name', { ...VALID, name: 'A' }, 'Invalid name'],
    ['a number that is not a phone number', { ...VALID, whatsapp: 'call me' }, 'Invalid WhatsApp number'],
    ['a filled-in trap field', { ...VALID, honeypot: 'https://spam.example' }, 'Bot detected'],
    ['a body that is not an object', 'null', 'Invalid payload'],
  ])('refuses %s and sends nothing', async (_label, body, error) => {
    const res = await post(body);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('refuses a body that is not JSON', async () => {
    const res = await post('{not json');
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: 'invalid_json' });
  });

  it('stops the sixth request from one address within a minute, and only that address', async () => {
    const ip = freshIp();
    for (let i = 0; i < 5; i += 1) expect((await post({ ...VALID, name: '' }, ip)).status).toBe(400);
    const sixth = await post(VALID, ip);
    expect(sixth.status).toBe(429);
    expect(await sixth.json()).toEqual({ ok: false, error: 'rate_limited' });
    expect((await post({ ...VALID, name: '' })).status).toBe(400);
  });
});
