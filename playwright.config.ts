import { defineConfig, devices } from '@playwright/test';

/**
 * Browser walk of everything a visitor can do on the site, at a phone and a desktop width.
 *
 *   pnpm build && pnpm test:e2e
 *
 * It starts the built site on a local port with the holding screen on and the request form
 * pointed at an address that does not exist. Every form endpoint is answered by the test
 * itself (see e2e/site.spec.ts), so nothing is ever sent. Set E2E_BASE_URL to walk another
 * address read-only: the form tests are skipped there.
 */
const PORT = Number(process.env.E2E_PORT ?? 3655);
const LOCAL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 2,
  retries: 0,
  repeatEach: Number(process.env.E2E_REPEAT ?? 1),
  reporter: [['list']],
  outputDir: './test-results',
  use: {
    baseURL: process.env.E2E_BASE_URL ?? LOCAL,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop-1440', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'phone-390', use: { ...devices['iPhone 13'], viewport: { width: 390, height: 844 } } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `node node_modules/next/dist/bin/next start -p ${PORT}`,
        url: `${LOCAL}/request-access`,
        reuseExistingServer: false,
        timeout: 60_000,
        env: {
          NEXT_PUBLIC_SHOW_COMING_SOON: 'true',
          CRM_ACCESS_REQUEST_URL: 'http://127.0.0.1:9/disabled-in-browser-tests',
          // No real provider for the local build, even if the shell carries a key.
          MAILGUN_API_KEY: '',
          MAILGUN_DOMAIN: '',
          LEADS_NOTIFY_TO: '',
          MAILGUN_API_BASE: '',
          LEADS_BACKEND_URL: '',
          LEADS_BACKEND_TOKEN: '',
        },
      },
});
