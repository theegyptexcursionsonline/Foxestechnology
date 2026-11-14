/**
 * The guard in test-support/no-outside-network.ts is in force for every test file: no provider
 * setting is visible, an unfaked fetch throws, and a socket to another host throws. If the guard
 * is removed from vitest.setup.ts, or any of its three parts is taken out, this file fails.
 */
import net from 'node:net';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CLOSED_LOCAL_ADDRESS, OutsideNetworkBlocked, PROVIDER_SETTINGS } from '@/test-support/no-outside-network-config';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('no test can reach a real provider', () => {
  it('sees no provider setting, and the request list points at a closed local port', () => {
    for (const key of PROVIDER_SETTINGS) expect(process.env[key], key).toBeUndefined();
    expect(process.env.CRM_ACCESS_REQUEST_URL).toBe(CLOSED_LOCAL_ADDRESS);
  });

  it('an unfaked fetch to the mail provider or the request list throws instead of sending', async () => {
    await expect(fetch('https://api.mailgun.net/v3/mail.example.test/messages', { method: 'POST' })).rejects.toBeInstanceOf(OutsideNetworkBlocked);
    await expect(fetch('https://foxes-support-portal-production.up.railway.app/api/access-request', { method: 'POST' })).rejects.toBeInstanceOf(OutsideNetworkBlocked);
  });

  it('a test that fakes fetch gets its fake, and the block returns after it', async () => {
    const fake = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fake);
    await fetch('https://api.mailgun.net/v3/x/messages');
    expect(fake).toHaveBeenCalledTimes(1);
    vi.unstubAllGlobals();
    await expect(fetch('https://api.mailgun.net/v3/x/messages')).rejects.toBeInstanceOf(OutsideNetworkBlocked);
  });

  it('a socket to another host throws; this machine is still allowed', () => {
    expect(() => net.connect({ host: 'api.mailgun.net', port: 443 })).toThrow(OutsideNetworkBlocked);
    expect(() => net.connect(443, 'example.com')).toThrow(OutsideNetworkBlocked);
    const local = net.connect({ host: '127.0.0.1', port: 9 });
    local.on('error', () => {});
    local.destroy();
  });

  it('the request-access endpoint, called with no fake, fails closed and sends nothing', async () => {
    const { POST } = await import('@/app/api/request-access/route');
    const { NextRequest } = await import('next/server');
    const res = await POST(
      new NextRequest('http://localhost/api/request-access', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.9' },
        body: JSON.stringify({ name: 'QA Operator', email: 'qa@example.test', company: 'QA Sahara Tours', solutions: ['booking'] }),
      }),
    );
    expect(res.status).toBe(502);
  });
});
