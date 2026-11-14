/**
 * Settings shared by the test network guard and its own test. No side effects: importing this
 * file does not switch the guard on, so the guard's test can tell whether vitest.setup.ts did.
 */
export const PROVIDER_SETTINGS = [
  'MAILGUN_API_KEY',
  'MAILGUN_DOMAIN',
  'LEADS_NOTIFY_TO',
  'LEADS_NOTIFY_FROM',
  'LEADS_BACKEND_URL',
  'LEADS_BACKEND_TOKEN',
  'ALGOLIA_ADMIN_API_KEY',
] as const;

/** Where the request form would send under test: a closed port on this machine. */
export const CLOSED_LOCAL_ADDRESS = 'http://127.0.0.1:9/no-outside-network-in-tests';

export class OutsideNetworkBlocked extends Error {
  constructor(target: string) {
    super(`Blocked in tests: a test tried to reach ${target}. Fake the provider instead.`);
    this.name = 'OutsideNetworkBlocked';
  }
}
