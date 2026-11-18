/**
 * POST /api/leads/magnet — every e-mail-only sign-up: "Notify me" on the holding page, its
 * leaving pop-up, the "write to me" pop-up on the landing pages and the footer sign-up.
 * A sign-up counts only when it was recorded; providers are faked and nothing is sent.
 */
import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/leads/magnet/route';

let ipCounter = 0;
const freshIp = () => `198.51.100.${(ipCounter += 1)}`;

const VALID = { email: 'qa@example.test', category: 'coming-soon', magnet: 'Priority list', locale: 'en', honeypot: '' };

function post(body: unknown, ip = freshIp()) {
  return POST(
    new NextRequest('http://localhost/api/leads/magnet', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
  );
}

const HOSTILE = { ...VALID, magnet: 'Priority\r\nBcc: x@evil.example <script>x</script>', source: '/a\n<script>' + 'x'.repeat(5000) };

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

describe('POST /api/leads/magnet', () => {
  it('tells our team the address and confirms', async () => {
    vi.stubEnv('MAILGUN_API_KEY', 'test-key');
    vi.stubEnv('MAILGUN_DOMAIN', 'mail.example.test');
    vi.stubEnv('LEADS_NOTIFY_TO', 'team@foxes.example.test');
    fetchMock.mockResolvedValue({ ok: true, status: 200, text: async () => 'queued' });

    const res = await post(VALID);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.mailgun.net/v3/mail.example.test/messages');
    const sent = new URLSearchParams(init.body as string);
    expect(sent.getAll('to')).toEqual(['team@foxes.example.test']);
    expect(`${sent.get('text')} ${sent.get('html')}`).toContain('qa@example.test');
  });

  it('confirms when only the lead backend took it', async () => {
    vi.stubEnv('LEADS_BACKEND_URL', 'https://leads.example.test/in');
    fetchMock.mockResolvedValue({ ok: true, status: 200, text: async () => '' });
    const res = await post(VALID);
    expect(res.status).toBe(200);
    expect(fetchMock.mock.calls[0][0]).toBe('https://leads.example.test/in');
  });

  it('answers with an error, not a success, when the address was not recorded', async () => {
    vi.stubEnv('MAILGUN_API_KEY', 'test-key');
    vi.stubEnv('MAILGUN_DOMAIN', 'mail.example.test');
    fetchMock.mockResolvedValue({ ok: false, status: 500, text: async () => 'down' });
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
    ['no address', { ...VALID, email: undefined }, 'missing_email'],
    ['something that is not an address', { ...VALID, email: 'not-an-email' }, 'invalid_email'],
    ['an address longer than an address can be', { ...VALID, email: `${'a'.repeat(250)}@example.test` }, 'email_too_long'],
    ['no page named', { ...VALID, category: ' ' }, 'missing_category'],
    ['a page name that is not one of ours', { ...VALID, category: 'Coming Soon <b>' }, 'invalid_category'],
    ['a filled-in trap field', { ...VALID, honeypot: 'x' }, 'bot_detected'],
    ['a body that is not an object', '42', 'invalid_payload'],
  ])('refuses %s and sends nothing', async (_label, body, error) => {
    const res = await post(body);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('refuses a body that is not JSON', async () => {
    const res = await post('nope');
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: 'invalid_json' });
  });

  it('stops the seventh request from one address within a minute, and only that address', async () => {
    const ip = freshIp();
    for (let i = 0; i < 6; i += 1) expect((await post({ ...VALID, email: 'x' }, ip)).status).toBe(400);
    expect((await post(VALID, ip)).status).toBe(429);
    expect((await post({ ...VALID, email: 'x' })).status).toBe(400);
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
