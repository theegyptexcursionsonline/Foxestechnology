/**
 * Under test, nothing may leave this machine.
 *
 * The site's form endpoints send real e-mail (the mail provider) and create real leads (the
 * request list in the support system, which then e-mails the team and the person asking). A test
 * that forgot to fake one of them, or a shell that happened to carry a real key, would send for
 * real; in two other Foxes products that happened on every gate run (found 14 Nov 2026).
 *
 * Loaded first by vitest.setup.ts, so before any module reads its settings:
 * 1. provider settings are removed from the environment, and the request-list address points at
 *    a closed local port, so no endpoint can find a real destination;
 * 2. `fetch` throws unless a test replaces it with its own fake;
 * 3. any socket to a host other than this machine throws.
 * __tests__/guards/no-outside-network.test.ts fails if any of the three is removed.
 */
import net from 'node:net';

import { CLOSED_LOCAL_ADDRESS, OutsideNetworkBlocked, PROVIDER_SETTINGS } from './no-outside-network-config';

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '']);

for (const key of PROVIDER_SETTINGS) delete process.env[key];
process.env.CRM_ACCESS_REQUEST_URL = CLOSED_LOCAL_ADDRESS;

/** fetch for tests that did not fake it. Tests replace it with vi.stubGlobal('fetch', …). */
export const blockedFetch = (input: unknown): Promise<never> => {
  const target = typeof input === 'string' ? input : input instanceof URL ? input.href : String((input as { url?: string })?.url ?? input);
  return Promise.reject(new OutsideNetworkBlocked(target));
};
globalThis.fetch = blockedFetch as unknown as typeof fetch;

/** The host a net.Socket#connect call is aimed at. */
function hostOf(args: unknown[]): string | null {
  // net.connect() passes its already-normalised arguments as one array.
  const list = Array.isArray(args[0]) ? (args[0] as unknown[]) : args;
  const [first, second] = list;
  if (first && typeof first === 'object') {
    const options = first as { host?: string; path?: string };
    if (options.path) return null; // a local pipe
    return options.host ?? 'localhost';
  }
  if (typeof first === 'string' && !/^\d+$/.test(first)) return null; // a local pipe path
  return typeof second === 'string' ? second : 'localhost';
}

const originalConnect = net.Socket.prototype.connect;
net.Socket.prototype.connect = function guardedConnect(this: net.Socket, ...args: unknown[]) {
  const host = hostOf(args);
  if (host !== null && !LOCAL_HOSTS.has(host.replace(/^\[|\]$/g, ''))) {
    throw new OutsideNetworkBlocked(host);
  }
  return (originalConnect as (...a: unknown[]) => net.Socket).apply(this, args);
} as typeof net.Socket.prototype.connect;
