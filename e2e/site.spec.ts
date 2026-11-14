/**
 * Everything a visitor can do on foxestechnology.com, walked in a real browser.
 *
 * Safety: no test lets a form reach a real endpoint. A catch-all answers every POST to /api/*
 * with a refusal; each form test then registers its own faked answer. When the suite is pointed
 * at an address that is not this machine, the form tests do not run at all.
 */
import { expect, test, type Page, type Route } from '@playwright/test';

const OPERATOR_PAGES = ['boat-operators', 'dinner-cruises', 'diving-centres', 'tour-agencies', 'water-sports'];
const LANDING_PAGES = [
  ...OPERATOR_PAGES.map((slug) => ({ en: `/operators/${slug}`, ar: `/ar/operators/${slug}`, product: 'booking' })),
  { en: '/solutions/ai-voice', ar: '/ar/solutions/ai-voice', product: 'voice' },
  { en: '/solutions/ai-search', ar: '/ar/solutions/ai-search', product: 'search' },
];
const PLAIN_PAGES = ['/solutions/online-booking', '/solutions/pos-hardware', '/solutions/kiosk', '/solutions/ai', '/solutions/analytics'];
const HOLDING_HEADLINE = /Booking tools\s*for tours\s*and activities\./;

const isLocal = (baseURL: string | undefined) => /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/.test(baseURL ?? '');

/** Requests the page made to the site's own form endpoints. */
function recordPosts(page: Page) {
  const posts: { url: string; body: unknown }[] = [];
  page.on('request', (request) => {
    if (request.method() === 'POST' && request.url().includes('/api/')) {
      posts.push({ url: new URL(request.url()).pathname, body: request.postDataJSON() });
    }
  });
  return posts;
}

/** The page's own error line (Next adds an empty live region with the same role). */
const alertIn = (scope: Page | ReturnType<Page['locator']>) => scope.locator('[role="alert"]:not(#__next-route-announcer__)');

const answer = (status: number, body: unknown) => (route: Route) =>
  route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });

test.beforeEach(async ({ page }) => {
  // Nothing leaves the browser for a form endpoint unless a test fakes the answer.
  await page.route('**/api/**', (route) =>
    route.request().method() === 'POST' ? answer(503, { ok: false, error: 'blocked_in_browser_tests' })(route) : route.continue(),
  );
});

async function open(page: Page, path: string) {
  const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('h1').first()).toBeVisible();
  return response;
}

/** The page's script has run: React has attached to the form. Typing before this is a separate case, tested in Vitest. */
async function waitForScript(page: Page, formSelector = 'form') {
  await page.waitForFunction(
    (selector) => {
      const form = document.querySelector(selector);
      return !!form && Object.keys(form).some((key) => key.startsWith('__reactProps'));
    },
    formSelector,
  );
}

async function expectNoSidewaysScroll(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow, 'page is wider than the screen').toBeLessThanOrEqual(1);
}

/** The first visible element with this name sits fully inside the first screen. */
async function expectInFirstScreen(page: Page, locator: ReturnType<Page['locator']>, what: string) {
  const box = await locator.first().boundingBox();
  const height = page.viewportSize()!.height;
  expect(box, `${what} is not on the page`).not.toBeNull();
  expect(box!.y + box!.height, `${what} is below the first screen`).toBeLessThanOrEqual(height);
}

test.describe('holding screen and the gate', () => {
  test('home has one headline, the sign-up and the way to request access in the first screen', async ({ page }) => {
    await open(page, '/');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText(HOLDING_HEADLINE);
    await expect(page.getByText('Opening soon')).toBeVisible();
    await expectInFirstScreen(page, page.getByRole('button', { name: /notify me/i }), '"Notify me"');
    await expectInFirstScreen(page, page.getByRole('link', { name: /request access/i }), '"Request access"');
    await expectNoSidewaysScroll(page);
    await expect(page).toHaveTitle('Foxes Technology | Booking tools for tour and activity operators');
    const text = await page.locator('body').innerText();
    expect(text).not.toMatch(/almost here|launching|countries|ways to grow|instagram/i);
  });

  test('pages that are not open yet show the holding screen, and a wrong address answers 404', async ({ page }) => {
    for (const path of ['/about', '/pricing', '/features', '/contact', '/solutions', '/privacy-policy']) {
      const response = await open(page, path);
      expect(response!.status(), path).toBe(200);
      await expect(page.locator('h1'), path).toHaveText(HOLDING_HEADLINE);
    }
    const missing = await open(page, '/no-such-page');
    expect(missing!.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText(HOLDING_HEADLINE);
  });

  test('"Request access" on the holding screen opens the request form', async ({ page }) => {
    await open(page, '/');
    await page.getByRole('link', { name: /request access/i }).first().click();
    await expect(page).toHaveURL(/\/request-access\?source=foxestechnology$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Request access to the');
  });

  test('"Notify me" confirms only when the address was recorded', async ({ page, baseURL }) => {
    test.skip(!isLocal(baseURL), 'forms are exercised on a local build only');
    const posts = recordPosts(page);

    await page.route('**/api/leads/magnet', answer(200, { ok: true }));
    await open(page, '/');
    await page.getByPlaceholder('you@company.com').first().fill('qa@example.test');
    await page.getByRole('button', { name: /notify me/i }).first().click();
    await expect(page.getByText(/You.re on the list\. We.ll email you when access opens\./).first()).toBeVisible();
    expect(posts).toHaveLength(1);
    expect(posts[0]).toMatchObject({ url: '/api/leads/magnet', body: { email: 'qa@example.test', category: 'coming-soon' } });

    for (const [status, message] of [
      [502, /Something went wrong\. Please try again in a moment\./],
      [429, /Too many attempts\. Please wait a moment and try again\./],
    ] as const) {
      await page.unroute('**/api/leads/magnet');
      await page.route('**/api/leads/magnet', answer(status, { ok: false }));
      await open(page, '/');
      await page.getByPlaceholder('you@company.com').first().fill('qa@example.test');
      await page.getByRole('button', { name: /notify me/i }).first().click();
      await expect(alertIn(page).first()).toHaveText(message);
      await expect(page.getByText(/You.re on the list/)).toHaveCount(0);
    }
  });

  test('"Notify me" refuses something that is not an address without sending', async ({ page, baseURL }) => {
    test.skip(!isLocal(baseURL), 'forms are exercised on a local build only');
    const posts = recordPosts(page);
    await open(page, '/');
    await page.getByPlaceholder('you@company.com').first().fill('not-an-address');
    await page.getByRole('button', { name: /notify me/i }).first().click();
    await page.waitForTimeout(400);
    expect(posts).toHaveLength(0);
    await expect(page.getByText(/You.re on the list/)).toHaveCount(0);
  });
});

test.describe('landing pages', () => {
  for (const landing of LANDING_PAGES) {
    test(`${landing.en}: one headline, the action in the first screen, nothing wider than the screen`, async ({ page }) => {
      await open(page, landing.en);
      await expect(page.locator('h1')).toHaveCount(1);
      await expectInFirstScreen(page, page.locator('main, body').getByRole('link', { name: 'Ask for a demo' }), '"Ask for a demo"');
      await expectNoSidewaysScroll(page);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      const text = await page.locator('body').innerText();
      expect(text).toMatch(/by invitation/i);
      expect(text).not.toMatch(/Saif|within 1 hour|Paymob|Fawry|Vodafone Cash|Get started|Made in Egypt/);
    });

    test(`${landing.ar}: Arabic, right to left, with the action in the first screen`, async ({ page }) => {
      await open(page, landing.ar);
      await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveText(/[؀-ۿ]/);
      await expectInFirstScreen(page, page.getByRole('link', { name: 'اطلب عرضًا' }), '"اطلب عرضًا"');
      await expectNoSidewaysScroll(page);
      const text = await page.locator('main').first().innerText().catch(() => page.locator('body').innerText());
      expect(text).not.toMatch(/WhatsApp reply|Saif|EXAMPLE|STEP 0|FEATURE|CAPABILITY/);
    });

    test(`${landing.en}: the language switch goes to Arabic and back`, async ({ page }) => {
      await open(page, landing.en);
      const menu = page.getByRole('button', { name: 'Open menu' });
      if (await menu.isVisible()) await menu.click();
      await page.getByRole('link', { name: 'العربية' }).first().click();
      await expect(page).toHaveURL(new RegExp(`${landing.ar}$`));
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
      if (await menu.isVisible()) await menu.click();
      await page.getByRole('link', { name: 'English' }).first().click();
      await expect(page).toHaveURL(new RegExp(`${landing.en}$`));
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });
  }

  test('the three example panels are labelled as examples, in the page’s language', async ({ page }) => {
    await open(page, '/operators/tour-agencies');
    await expect(page.getByText('EXAMPLE', { exact: true })).toHaveCount(3);
    await expect(page.getByText('Booking lobby', { exact: true })).toBeVisible();
    await open(page, '/ar/operators/tour-agencies');
    await expect(page.getByText('مثال', { exact: true })).toHaveCount(3);
    await expect(page.getByText('استقبال الحجوزات', { exact: true })).toBeVisible();
  });

  test('a question opens its answer', async ({ page }) => {
    await open(page, '/solutions/ai-voice');
    const question = page.getByRole('button', { name: 'Does it answer my phone number?' });
    await question.scrollIntoViewIfNeeded();
    const answerText = page.getByText('Answering a phone line is not available yet.');
    if (!(await answerText.isVisible())) await question.click();
    await expect(answerText).toBeVisible();
    await page.getByRole('button', { name: 'Can it take a booking?' }).click();
    await expect(page.getByText('It does not take payment.')).toBeVisible();
  });

  test('pricing buttons lead where their labels say', async ({ page }) => {
    await open(page, '/solutions/ai-voice');
    await expect(page.getByRole('link', { name: 'See plans and pricing' })).toHaveAttribute('href', 'https://voice.foxestechnology.com/pricing?lang=en');

    await open(page, '/solutions/ai-search');
    const ask = page.getByRole('link', { name: 'Ask us for pricing' });
    await expect(ask).toHaveAttribute('href', '/request-access?solution=search&source=foxestechnology');
    await ask.click();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('AI Search Agent');

    await open(page, '/operators/boat-operators');
    await expect(page.getByRole('link', { name: 'Ask us for pricing' })).toHaveAttribute('href', '/request-access?solution=booking&source=foxestechnology');
  });

  test('the currency menu changes the example price', async ({ page }) => {
    test.skip(page.viewportSize()!.width < 768, 'the example card and the currency menu are a desktop feature');
    await open(page, '/operators/boat-operators');
    await expect(page.getByText(/\$\d+ · 8 guests/)).toBeVisible();
    // The menu opens when the pointer is over it; a visitor then picks from the list.
    await page.getByRole('button', { name: /USD/ }).first().hover();
    await page.getByRole('option', { name: /EGP/ }).click();
    await expect(page.getByText(/\$\d+ · 8 guests/)).toHaveCount(0);
    await expect(page.getByText(/· 8 guests/)).toBeVisible();
  });

  test('"more from Foxes" leads to the other products', async ({ page }) => {
    await open(page, '/operators/dinner-cruises');
    const voice = page.locator('a[href="/solutions/ai-voice"]').last();
    await voice.scrollIntoViewIfNeeded();
    await voice.click();
    await expect(page).toHaveURL(/\/solutions\/ai-voice$/);
    await expect(page.locator('h1')).toContainText('Guests ask out loud.');
  });

  for (const path of ['/operators/boat-operators', '/solutions/ai-voice', '/solutions/ai-search']) {
    test(`${path}: the enquiry form confirms only when the request was taken`, async ({ page, baseURL }) => {
      test.skip(!isLocal(baseURL), 'forms are exercised on a local build only');
      const posts = recordPosts(page);
      const form = page.locator('#lead-form form').first();

      const fill = async () => {
        await open(page, path);
        await waitForScript(page, '#lead-form form');
        await form.scrollIntoViewIfNeeded();
        await form.locator('input[type="text"]:visible').nth(0).fill('Test Operator');
        await form.locator('input[type="text"]:visible').nth(1).fill('Example Tours');
        await form.locator('input[type="tel"]').fill('+20 100 555 0100');
        await form.locator('select').selectOption({ index: 1 });
      };

      // Empty: the form says what is missing and nothing is sent.
      await open(page, path);
      await waitForScript(page, '#lead-form form');
      await form.scrollIntoViewIfNeeded();
      await form.getByRole('button', { name: 'Ask for a demo' }).click();
      await expect(alertIn(page.locator('#lead-form'))).toHaveText(/Please fill in every field/);
      expect(posts).toHaveLength(0);

      await page.route('**/api/leads', answer(200, { ok: true }));
      await fill();
      await form.getByRole('button', { name: 'Ask for a demo' }).click();
      await expect(page.getByText('Thank you. We have your request and our team will contact you.')).toBeVisible();
      expect(posts).toHaveLength(1);
      expect(posts[0]).toMatchObject({ url: '/api/leads', body: { name: 'Test Operator', business: 'Example Tours', locale: 'en', honeypot: '' } });

      for (const [status, message] of [
        [502, 'Something went wrong. Please try again in a moment.'],
        [429, 'Too many submissions. Please wait a moment and try again.'],
      ] as const) {
        await page.unroute('**/api/leads');
        await page.route('**/api/leads', answer(status, { ok: false }));
        await fill();
        await form.getByRole('button', { name: 'Ask for a demo' }).click();
        await expect(alertIn(page.locator('#lead-form'))).toHaveText(message);
        await expect(page.getByText('Thank you. We have your request')).toHaveCount(0);
      }
    });
  }
});

test.describe('short solution pages', () => {
  for (const path of PLAIN_PAGES) {
    test(`${path}: one headline, one action, an honest "good to know"`, async ({ page }) => {
      await open(page, path);
      await expect(page.locator('h1')).toHaveCount(1);
      const request = page.getByRole('main').getByRole('link', { name: 'Request access' });
      await expect(request).toHaveCount(2);
      await expect(request.first()).toHaveAttribute('href', '/request-access?solution=booking&source=foxestechnology');
      await expectInFirstScreen(page, request, '"Request access"');
      await expect(page.getByRole('heading', { name: 'Good to know' })).toBeVisible();
      await expectNoSidewaysScroll(page);
      const text = await page.locator('body').innerText();
      expect(text).not.toMatch(/Log in|App Store|Google Play|Ministry of Tourism|Technology LLC|Request a quote|Watch Demo|\+150%/);
      await expect(page).toHaveTitle(/ \| Foxes Technology$/);
      expect((await page.title()).match(/Foxes Technology/g)).toHaveLength(1);
    });
  }

  test('the action opens the request form with the booking product chosen', async ({ page }) => {
    await open(page, '/solutions/online-booking');
    await page.getByRole('main').getByRole('link', { name: 'Request access' }).first().click();
    await expect(page).toHaveURL(/\/request-access\?solution=booking&source=foxestechnology$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('AI Booking Engine');
  });

  test('the footer sign-up confirms only when the address was recorded', async ({ page, baseURL }) => {
    test.skip(!isLocal(baseURL), 'forms are exercised on a local build only');
    const posts = recordPosts(page);
    await page.route('**/api/leads/magnet', answer(200, { ok: true }));
    await open(page, '/solutions/analytics');
    const footer = page.locator('footer');
    await footer.getByPlaceholder('Enter your email address').fill('qa@example.test');
    await footer.getByRole('button', { name: 'Keep me posted' }).click();
    await expect(footer.getByRole('button', { name: /You.re on the list/ })).toBeVisible();
    expect(posts[0]).toMatchObject({ url: '/api/leads/magnet', body: { email: 'qa@example.test', category: 'newsletter' } });

    await page.unroute('**/api/leads/magnet');
    await page.route('**/api/leads/magnet', answer(502, { ok: false }));
    await open(page, '/solutions/analytics');
    await footer.getByPlaceholder('Enter your email address').fill('qa@example.test');
    await footer.getByRole('button', { name: 'Keep me posted' }).click();
    await expect(alertIn(footer)).toBeVisible();
    await expect(footer.getByRole('button', { name: /You.re on the list/ })).toHaveCount(0);
  });

  test('the search window opens from the header and closes with Escape', async ({ page }) => {
    await open(page, '/solutions/online-booking');
    const menu = page.getByRole('button', { name: 'Toggle menu' });
    const search = page.getByRole('button', { name: 'Search' }).first();
    if (!(await search.isVisible()) && (await menu.isVisible())) await menu.click();
    test.skip(!(await search.isVisible()), 'the search button is in the desktop header');
    await search.click();
    await expect(page.getByText('Quick Search')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByText('Quick Search')).toHaveCount(0);
  });
});

test.describe('request access', () => {
  test('names the product it was opened for and sends approved customers to their own sign-in', async ({ page }) => {
    await open(page, '/request-access?solution=voice&source=voice');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('AI Voice Agent');
    await expect(page).toHaveTitle('Request access to AI Voice Agent | Foxes Technology');
    await expect(page.getByRole('link', { name: /sign in/i })).toHaveAttribute('href', 'https://voice.foxestechnology.com/login');
    await expectInFirstScreen(page, page.getByRole('button', { name: 'Continue' }), '"Continue"');
    await expectNoSidewaysScroll(page);

    await open(page, '/request-access');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Foxes platform');
    await expect(page.getByText('Every request is read by our team. There is no open sign-up.')).toBeVisible();
  });

  const fillStepOne = async (page: Page) => {
    await page.getByLabel('Full name').fill('Test Operator');
    await page.getByLabel('Work email').fill('qa@example.test');
    await page.getByLabel('Phone / WhatsApp').fill('+20 100 555 0100');
    await page.getByRole('button', { name: 'Continue' }).click();
  };
  const fillStepTwo = async (page: Page) => {
    await page.getByLabel('Company / brand').fill('Example Tours');
    await page.getByLabel('Business type').selectOption('Tour operator');
    await page.getByLabel('Country / region').selectOption('Egypt');
    await page.getByRole('button', { name: 'Continue' }).click();
  };

  test('each step says what is missing before it moves on', async ({ page, baseURL }) => {
    test.skip(!isLocal(baseURL), 'forms are exercised on a local build only');
    const posts = recordPosts(page);
    await open(page, '/request-access');
    await waitForScript(page);
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(alertIn(page)).toHaveText('Tell us your full name.');
    await page.getByLabel('Full name').fill('Test Operator');
    await page.getByLabel('Work email').fill('not-an-address');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(alertIn(page)).toHaveText('Add a valid work email.');
    await fillStepOne(page);
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(alertIn(page)).toHaveText('Tell us your company or brand name.');
    await fillStepTwo(page);
    await page.getByRole('button', { name: 'Request access' }).click();
    await expect(alertIn(page)).toHaveText("Pick at least one solution you're interested in.");
    await page.getByRole('button', { name: 'AI Search Agent' }).click();
    await page.getByRole('button', { name: 'Request access' }).click();
    await expect(alertIn(page)).toHaveText('Please confirm you agree to be contacted about your request.');
    expect(posts).toHaveLength(0);
  });

  test('a request is confirmed once, with the product and where it came from', async ({ page, baseURL }) => {
    test.skip(!isLocal(baseURL), 'forms are exercised on a local build only');
    const posts = recordPosts(page);
    await page.route('**/api/request-access', answer(200, { ok: true }));
    await open(page, '/request-access?solution=booking&source=foxestechnology');
    await waitForScript(page);
    await fillStepOne(page);
    await fillStepTwo(page);
    await expect(page.getByRole('button', { name: 'AI Booking Engine' })).toHaveAttribute('aria-pressed', 'true');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Request access' }).dblclick();
    await expect(page.getByRole('heading', { name: 'Request received' })).toBeVisible();
    await expect(page.getByText('qa@example.test')).toBeVisible();
    expect(posts).toHaveLength(1);
    expect(posts[0]).toMatchObject({
      url: '/api/request-access',
      body: { name: 'Test Operator', email: 'qa@example.test', company: 'Example Tours', country: 'Egypt', solutions: ['booking'], source: 'foxestechnology' },
    });
  });

  test('a refusal or an outage stays on the form and is said plainly', async ({ page, baseURL }) => {
    test.skip(!isLocal(baseURL), 'forms are exercised on a local build only');
    for (const [status, body, message] of [
      [422, { error: 'Please use a work email.' }, 'Please use a work email.'],
      [502, { error: 'Could not submit your request. Please try again.' }, 'Could not submit your request. Please try again.'],
      [500, {}, 'Something went wrong. Please try again.'],
    ] as const) {
      await page.unroute('**/api/request-access').catch(() => {});
      await page.route('**/api/request-access', answer(status, body));
      await open(page, '/request-access?solution=search');
      await waitForScript(page);
      await fillStepOne(page);
      await fillStepTwo(page);
      await page.getByRole('checkbox').check();
      await page.getByRole('button', { name: 'Request access' }).click();
      await expect(alertIn(page)).toHaveText(message);
      await expect(page.getByRole('heading', { name: 'Request received' })).toHaveCount(0);
      await expect(page.getByRole('button', { name: 'Request access' })).toBeEnabled();
    }
  });
});

test.describe('links', () => {
  test('every internal link on every public page leads to a page', async ({ page, request }) => {
    test.setTimeout(240_000);
    const pages = ['/', '/request-access', ...PLAIN_PAGES, ...LANDING_PAGES.flatMap((l) => [l.en, l.ar])];
    const seen = new Map<string, string>();
    for (const path of pages) {
      await open(page, path);
      const hrefs = await page.locator('a[href]').evaluateAll((anchors) =>
        anchors.map((a) => (a as HTMLAnchorElement).getAttribute('href') ?? ''),
      );
      for (const href of hrefs) {
        if (!href.startsWith('/') || href.startsWith('//')) continue;
        const target = href.split('#')[0] || '/';
        if (!seen.has(target)) seen.set(target, path);
      }
    }
    expect(seen.size).toBeGreaterThan(20);
    const broken: string[] = [];
    for (const [target, from] of seen) {
      const response = await request.get(target, { maxRedirects: 5 });
      if (response.status() >= 400) broken.push(`${target} (${response.status()}) linked from ${from}`);
    }
    expect(broken).toEqual([]);
  });

  test('no page links to a preview address or leaves a placeholder link', async ({ page }) => {
    for (const path of ['/', '/solutions/ai-voice', '/operators/boat-operators', '/solutions/online-booking', '/request-access']) {
      await open(page, path);
      const hrefs = await page.locator('a[href]').evaluateAll((anchors) => anchors.map((a) => a.getAttribute('href') ?? ''));
      expect(hrefs.filter((h) => h === '#' || /netlify\.app|localhost|vercel\.app|instagram\.com\/?$/.test(h)), path).toEqual([]);
    }
  });
});

/**
 * A visitor on a slow connection types, and presses Enter, before the page's script has loaded.
 * The script is held back here until the test lets it through, so the page is the bare HTML a
 * slow phone shows first. Before 14 Nov 2026 the browser then submitted the request form itself,
 * putting the name, email and phone in the address bar, and the other forms reloaded empty.
 */
test.describe('typing before the page script has loaded', () => {
  async function holdScript(page: Page) {
    let release!: () => void;
    const gate = new Promise<void>((resolve) => (release = resolve));
    await page.route('**/_next/static/chunks/**', async (route) => {
      await gate;
      await route.continue();
    });
    return release;
  }

  /** Enter in a field of the bare HTML changes nothing: same address, the text still there. */
  async function enterChangesNothing(page: Page, field: ReturnType<Page['locator']>, typed: string) {
    const before = page.url();
    await field.press('Enter');
    await page.waitForTimeout(800);
    expect(page.url(), 'the browser submitted the form itself').toBe(before);
    await expect(field).toHaveValue(typed);
  }

  test('request access keeps what was typed and puts nothing in the address', async ({ page, baseURL }) => {
    test.skip(!isLocal(baseURL), 'forms are exercised on a local build only');
    const posts = recordPosts(page);
    await page.route('**/api/request-access', answer(200, { ok: true }));
    const release = await holdScript(page);
    await open(page, '/request-access?solution=booking&source=foxestechnology');

    await page.getByLabel('Full name').fill('Test Operator');
    await page.getByLabel('Work email').fill('qa@example.test');
    await page.getByLabel('Phone / WhatsApp').fill('+20 100 555 0100');
    await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled();
    await enterChangesNothing(page, page.getByLabel('Phone / WhatsApp'), '+20 100 555 0100');

    release();
    await waitForScript(page);
    await expect(page.getByRole('button', { name: 'Continue' })).toBeEnabled();
    await expect(page.getByLabel('Full name')).toHaveValue('Test Operator');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('Company / brand').fill('Example Tours');
    await page.getByLabel('Business type').selectOption('Tour operator');
    await page.getByLabel('Country / region').selectOption('Egypt');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Request access' }).click();
    await expect(page.getByRole('heading', { name: 'Request received' })).toBeVisible();
    expect(posts).toHaveLength(1);
    expect(posts[0]).toMatchObject({ body: { name: 'Test Operator', email: 'qa@example.test', phone: '+20 100 555 0100', company: 'Example Tours' } });
  });

  test('the enquiry form keeps what was typed and sends it', async ({ page, baseURL }) => {
    test.skip(!isLocal(baseURL), 'forms are exercised on a local build only');
    const posts = recordPosts(page);
    await page.route('**/api/leads', answer(200, { ok: true }));
    const release = await holdScript(page);
    await open(page, '/operators/boat-operators');
    const form = page.locator('#lead-form form').first();
    await form.scrollIntoViewIfNeeded();
    const name = form.locator('input[type="text"]:visible').nth(0);
    await name.fill('Test Operator');
    await form.locator('input[type="text"]:visible').nth(1).fill('Example Tours');
    await form.locator('input[type="tel"]').fill('+20 100 555 0100');
    await form.locator('select').selectOption({ index: 1 });
    await expect(form.getByRole('button', { name: 'Ask for a demo' })).toBeDisabled();
    await enterChangesNothing(page, name, 'Test Operator');

    release();
    await waitForScript(page, '#lead-form form');
    await form.getByRole('button', { name: 'Ask for a demo' }).click();
    await expect(page.getByText('Thank you. We have your request and our team will contact you.')).toBeVisible();
    expect(posts).toHaveLength(1);
    expect(posts[0]).toMatchObject({ url: '/api/leads', body: { name: 'Test Operator', business: 'Example Tours', whatsapp: '+20 100 555 0100' } });
  });

  for (const { path, scope, placeholder, button, category } of [
    { path: '/', scope: 'body', placeholder: 'you@company.com', button: /notify me/i, category: 'coming-soon' },
    { path: '/solutions/analytics', scope: 'footer', placeholder: 'Enter your email address', button: /keep me posted/i, category: 'newsletter' },
  ]) {
    test(`${path}: the e-mail sign-up keeps the address typed early and sends it`, async ({ page, baseURL }) => {
      test.skip(!isLocal(baseURL), 'forms are exercised on a local build only');
      const posts = recordPosts(page);
      await page.route('**/api/leads/magnet', answer(200, { ok: true }));
      const release = await holdScript(page);
      await open(page, path);
      const area = page.locator(scope).first();
      const field = area.getByPlaceholder(placeholder).first();
      await field.fill('qa@example.test');
      await expect(area.getByRole('button', { name: button }).first()).toBeDisabled();
      await enterChangesNothing(page, field, 'qa@example.test');

      release();
      await waitForScript(page, `${scope} form`);
      await area.getByRole('button', { name: button }).first().click();
      await expect.poll(() => posts.length).toBe(1);
      expect(posts[0]).toMatchObject({ url: '/api/leads/magnet', body: { email: 'qa@example.test', category } });
    });
  }
});
