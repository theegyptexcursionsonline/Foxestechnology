/**
 * POST /api/request-access — the request form's only job is to hand the request to the
 * customer-relationship system and tell the visitor honestly what it answered. The system is
 * faked here and pointed at an address that does not exist, so nothing can reach the real one.
 */
import { NextRequest } from 'next/server';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

const CRM = 'http://crm.invalid/api/access-request';
let POST: (request: NextRequest) => Promise<Response>;

beforeAll(async () => {
  // The address is read once, when the route loads.
  vi.stubEnv('CRM_ACCESS_REQUEST_URL', CRM);
  ({ POST } = await import('@/app/api/request-access/route'));
});

let ipCounter = 0;
const freshIp = () => `192.0.2.${(ipCounter += 1)}`;

const REQUEST = { name: 'Test Operator', email: 'qa@example.test', company: 'Example Tours', solutions: ['booking'], source: 'foxestechnology' };

function post(body: unknown, ip = freshIp()) {
  return POST(
    new NextRequest('http://localhost/api/request-access', {
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
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('POST /api/request-access', () => {
  it('hands the request over unchanged and passes the answer back', async () => {
    fetchMock.mockResolvedValue({ status: 201, json: async () => ({ ok: true, id: 'lead-1' }) });

    const res = await post(REQUEST);

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ ok: true, id: 'lead-1' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(CRM);
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual(REQUEST);
  });

  it('passes a refusal back with its reason, so the form can show it', async () => {
    fetchMock.mockResolvedValue({ status: 422, json: async () => ({ error: 'Please use a work email.' }) });
    const res = await post(REQUEST);
    expect(res.status).toBe(422);
    expect(await res.json()).toEqual({ error: 'Please use a work email.' });
  });

  it('keeps the failure status when the answer is not JSON', async () => {
    fetchMock.mockResolvedValue({ status: 500, json: async () => { throw new Error('not json'); } });
    const res = await post(REQUEST);
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({});
  });

  it('says the request could not be submitted when the system cannot be reached', async () => {
    fetchMock.mockRejectedValue(new Error('connect ECONNREFUSED'));
    const res = await post(REQUEST);
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: 'Could not submit your request. Please try again.' });
  });

  it('refuses a body that is not JSON without calling the system', async () => {
    const res = await post('{oops');
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('stops the ninth request from one address within fifteen minutes, and only that address', async () => {
    fetchMock.mockResolvedValue({ status: 200, json: async () => ({ ok: true }) });
    const ip = freshIp();
    for (let i = 0; i < 8; i += 1) expect((await post(REQUEST, ip)).status).toBe(200);
    const ninth = await post(REQUEST, ip);
    expect(ninth.status).toBe(429);
    expect((await ninth.json()).error).toMatch(/too many requests/i);
    expect(fetchMock).toHaveBeenCalledTimes(8);
    expect((await post(REQUEST)).status).toBe(200);
  });
});
