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

const HOSTILE = { ...VALID, business: 'Example\r\nBcc: x@evil.example <script>x</script>', utm: { utm_source: 'ad\n<script>', evil: 'x'.repeat(5000) } };

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
    vi.stubEnv('LEADS_NOTIFY_TO', 'team@foxes.example.test');
    fetchMock.mockResolvedValue({ ok: true, status: 200, text: async () => 'queued' });

    const res = await post(VALID);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.mailgun.net/v3/mail.example.test/messages');
    const sent = new URLSearchParams(init.body as string);
    expect(sent.getAll('to')).toEqual(['team@foxes.example.test']);
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
    ['a page name that is not one of ours', { ...VALID, category: 'Boat Operators <b>' }, 'Invalid category'],
    ['an over-long monthly figure', { ...VALID, monthlyBookings: '9'.repeat(50) }, 'Invalid monthly bookings'],
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

  describe('destination', () => {
    beforeEach(() => {
      vi.stubEnv('MAILGUN_API_KEY', 'test-key');
      vi.stubEnv('MAILGUN_DOMAIN', 'mail.example.test');
      fetchMock.mockResolvedValue({ ok: true, status: 200, text: async () => 'queued' });
    });

    it('goes only to the configured team inbox, never to an address in the code', async () => {
      vi.stubEnv('LEADS_NOTIFY_TO', ' Sales@Foxes.Example.test , ops@foxes.example.test ');
      expect((await post(VALID)).status).toBe(200);
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const sent = new URLSearchParams(fetchMock.mock.calls[0][1].body as string);
      expect(sent.getAll('to')).toEqual(['sales@foxes.example.test', 'ops@foxes.example.test']);
      expect(sent.get('cc')).toBeNull();
      expect(sent.get('bcc')).toBeNull();
      expect(sent.get('from')).toMatch(/@mail\.example\.test>$/);
    });

    it.each([
      ['no inbox is set', ''],
      ['the inbox setting is not an address', 'sales-team'],
      ['one of the inboxes is malformed', 'sales@foxes.example.test, nope'],
    ])('sends nothing and answers with an error when %s', async (_label, value) => {
      vi.stubEnv('LEADS_NOTIFY_TO', value);
      const res = await post(VALID);
      expect(res.status).toBe(502);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('refuses an inbox outside the allowed domains', async () => {
      vi.stubEnv('LEADS_NOTIFY_TO', 'someone@outside.example');
      vi.stubEnv('LEADS_NOTIFY_ALLOWED_DOMAINS', 'foxes.example.test');
      expect((await post(VALID)).status).toBe(502);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('uses the configured provider address for a regional provider', async () => {
      vi.stubEnv('LEADS_NOTIFY_TO', 'team@foxes.example.test');
      vi.stubEnv('MAILGUN_API_BASE', 'https://api.eu.mailgun.net/');
      expect((await post(VALID)).status).toBe(200);
      expect(fetchMock.mock.calls[0][0]).toBe('https://api.eu.mailgun.net/v3/mail.example.test/messages');
    });

    it('answers with an error, not a success, when the provider cannot be reached', async () => {
      vi.stubEnv('LEADS_NOTIFY_TO', 'team@foxes.example.test');
      fetchMock.mockRejectedValue(new Error('connect ECONNREFUSED'));
      const res = await post(VALID);
      expect(res.status).toBe(502);
      expect(await res.json()).toEqual({ ok: false, error: 'delivery_failed' });
    });

    it('keeps visitor line breaks and markup out of the subject and the message', async () => {
      vi.stubEnv('LEADS_NOTIFY_TO', 'team@foxes.example.test');
      expect((await post(HOSTILE)).status).toBe(200);
      const sent = new URLSearchParams(fetchMock.mock.calls[0][1].body as string);
      expect(sent.get('subject')).not.toMatch(/[\r\n]/);
      expect(sent.get('html')).not.toContain('<script>');
      expect(sent.get('text')!.length).toBeLessThan(3000);
    });
  });
});
