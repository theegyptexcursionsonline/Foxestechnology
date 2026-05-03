# Foxes Voice AI — Manual Testing Checklist

> Hand this to QA / Codex / yourself for a full pre-release sweep.
> Mark each `[ ]` as `[x]` when verified. Capture screenshots where 📸 appears.

---

## How to use this checklist

- **Sections are ordered by user journey** (signup → use → admin tasks).
- **Priority** tags: **P0** = blocks ship · **P1** = customer-visible bug · **P2** = polish.
- For each test: **Action** → **Expected** → 📸 if visual proof needed.
- Run failing tests twice before reporting (occasional cold-start delays).
- Use **incognito window** for unauthenticated tests so cookies don't leak.

---

## 0. Pre-test setup

- [ ] **Backend health** — `curl https://web-production-265e3.up.railway.app/api/health` returns `status: "ok"` and all 4 services (`mongodb`, `mailgun`, `stripe`, `elevenlabs`) are `"configured"` / `"connected"`. **P0**
- [ ] **Frontend reachable** — open `https://foxesvoice.com` (or staging URL) and the homepage renders without console errors. 📸 **P0**
- [ ] **Test inbox available** — have access to a real inbox you can check (not a temp address — mail from new domains gets quarantined more often). **P0**
- [ ] **Browser DevTools open** — Network tab on, Console tab on, mobile emulation toggle ready (iPhone 14 / Pixel 7).

---

## 1. Marketing site (public)

- [ ] **Homepage** — `/` loads, hero animates, no broken images. 📸 **P1**
- [ ] **Navbar** — every link works (`Voice Agent`, `Search Agent`, `Hotel Booking`, `Booking Engine`, `Pricing`, `Login`, `Get started`). **P1**
- [ ] **Mobile menu** — at <768px, hamburger opens, links navigate, closes after click. 📸 **P1**
- [ ] **Voice CTA hero widget** — click the mic button on the homepage; it should either start a live conversation OR show a clean "Demo unavailable" fallback if backend is down. **No localhost errors in console.** 📸 **P0**
- [ ] **Pricing page** — `/pricing`: all 4 plans render, "Get started" buttons work, monthly/yearly toggle (if present) persists. 📸 **P1**
- [ ] **Footer** — every legal link (`Privacy`, `Terms`, `GDPR`, `Security`) loads its page. **P1**
- [ ] **Robots/sitemap** — `/robots.txt` and `/sitemap.xml` return 200 with valid content. **P2**
- [ ] **404 page** — visit a junk URL like `/this-does-not-exist`; the not-found page renders, doesn't crash, has nav. 📸 **P1**
- [ ] **500 page** — append `?throw=1` or trigger an error if dev tooling allows; `app/error.tsx` renders with "Try again" + "Go home". 📸 **P2**

---

## 2. Sign-up & onboarding (auth flow)

- [ ] **Register page loads** — `/register` opens, form is responsive. 📸 **P0**
- [ ] **Empty submit** — click "Create account" with empty fields; toast appears (e.g. "Please enter your full name") and form does NOT submit. 📸 **P0**
- [ ] **Invalid email** — enter `bad-email` (no `@`); toast says "Please enter a valid email address". **P0**
- [ ] **Short password** — try `1234567` (7 chars); toast says "Password must be at least 8 characters". **P0**
- [ ] **Successful registration** — fill valid info, submit; you land on `/dashboard` and toast says success. 📸 **P0**
- [ ] **Welcome email arrives** — within 30s a "Welcome to Foxes Voice AI" email lands in your inbox; logo + buttons render. 📸 **P0**
- [ ] **Verification email arrives** — separate "Verify your email — Foxes Voice AI" email lands; click the button. **P0**
- [ ] **Verification link works** — clicking it should mark email as verified (visit `/api/auth/verify-email?token=...` directly returns `{success: true}`). 📸 **P1**
- [ ] **Cannot register same email twice** — try the same email again; get 409 "Email already registered". **P1**
- [ ] **Rate-limit signup** — try 6 registrations from same IP in <1 hour; 6th returns 429. **P1**
- [ ] **Logout** — click profile menu → Logout; redirected to landing page; cookies cleared (DevTools > Application > Cookies). 📸 **P0**
- [ ] **Login page** — `/login` opens, form responsive. 📸 **P0**
- [ ] **Wrong password** — submit; toast says invalid credentials. **P0**
- [ ] **Successful login** — get back into `/dashboard`. **P0**
- [ ] **Forgot password** — `/forgot-password`, enter email, submit; toast confirms; email arrives within 30s with reset button. 📸 **P0**
- [ ] **Reset password link** — click button in email, set new password, sign in with it. **P0**
- [ ] **"Password changed" notification email** — arrives within 30s of successful reset; shows IP address. 📸 **P0**
- [ ] **Old password rejected after reset** — try old password; rejected. **P0**

---

## 3. Dashboard — first impression

- [ ] **Dashboard loads** — `/dashboard` renders without console errors, all KPI cards show data (or skeleton loaders, NOT spinners). 📸 **P0**
- [ ] **No layout shift** — KPI cards render at correct size on first paint; nothing jumps in (CLS = 0). **P1**
- [ ] **Greeting matches local time** — "Good morning/afternoon/evening" matches your local hour. **P2**
- [ ] **Sidebar nav** — every menu item navigates to the right page; current page is highlighted. 📸 **P0**
- [ ] **Mobile sidebar** — at <768px, sidebar collapses; hamburger opens it; clicking a link closes it. 📸 **P1**
- [ ] **Notification bell** — clicking opens dropdown (even if empty). **P2**
- [ ] **User profile menu** — top-right avatar opens menu with logout. **P1**

---

## 4. Voice Agent — create & configure

- [ ] **Agents list** — `/dashboard/agents` shows the default agent created at signup. 📸 **P0**
- [ ] **Create agent** — click "Create agent", fill name + voice, save; appears in list. 📸 **P0**
- [ ] **Edit agent** — click → `/dashboard/agents/[id]/edit` opens with all current values pre-filled. 📸 **P0**
- [ ] **Personality fields** — name / greeting / tone / farewell / transfer message all editable. **P1**
- [ ] **Voice picker** — preview button on each voice plays a sample. 📸 **P0**
- [ ] **System prompt** — large textarea, monospace, accepts multi-paragraph text. **P1**
- [ ] **All 14 capability toggles** — each toggle saves and persists after page reload (booking, cancel, transfer, leads, complaints, tickets, pricing, promo, directions, etc.). 📸 **P0**
- [ ] **Custom Actions section** — visible at the bottom of the edit page. 📸 **P0**
- [ ] **Add custom action** — click "Add Action", fill name + description + parameters, save; persists after reload. 📸 **P0**
- [ ] **Custom action types** — Webhook / Save Data / Auto-respond all selectable; UI changes appropriately. **P1**
- [ ] **Save changes** — click Save; toast confirms; refresh page; values still there. **P0**
- [ ] **Embed code** — click "Copy embed code"; clipboard contains `<script>` snippet pointing at production widget URL (NOT localhost). 📸 **P0**

---

## 5. Voice Agent — talk to it (the main feature)

> Use the embedded widget OR `/dashboard/test-voice` for these tests.

- [ ] **Widget loads on test page** — `/dashboard/test-voice` shows the floating bar with mic + chat button. 📸 **P0**
- [ ] **Click "Voice Chat"** — browser prompts for mic permission. **P0**
- [ ] **Allow mic** — bar expands into a call panel with the orb and END CALL button. 📸 **P0**
- [ ] **Greeting plays** — within 3s the agent speaks the configured greeting (audio plays out loud). **P0**
- [ ] **Voice quality** — voice sounds warm and human (Lily by default), NOT robotic; clear high-end at 128kbps. **P0**
- [ ] **Speak a question** — say "What tours do you offer?"; transcript appears, agent responds with audio. 📸 **P0**
- [ ] **Audio waveform** — wave bars animate while agent speaks (or while you speak — UI feedback). 📸 **P1**
- [ ] **Timer ticks** — call duration counter increments every second. **P1**
- [ ] **Expand/collapse button** — top-right of call panel; clicking shrinks to compact bar with `[orb][00:16][end][🇬🇧][↗]`. 📸 **P0**
- [ ] **Re-expand** — click `↗` on compact bar; full panel returns. **P1**
- [ ] **Language switch mid-call** — click flag dropdown, pick Spanish/Arabic; agent's next response is in that language. 📸 **P0**
- [ ] **End call** — click END CALL; orb collapses; you see the idle bar again. **P0**
- [ ] **Mobile (<640px)** — open same widget on mobile viewport; call panel goes near-full-width, orb sized down to ~88px, end button readable. 📸 **P0**
- [ ] **Mute/Speaker toggles** — if exposed, both work without crashing the session. **P2**
- [ ] **Privacy modal** — first-time users see a privacy/policy modal before mic prompt; accept/decline both work. **P1**

---

## 6. Function calling — verify each tool fires

> For each, observe the agent's response and check the dashboard for the resulting record.

### 6.1 Booking flow (P0)
- [ ] **Create booking** — say *"Book me a hotel for 2 guests on May 15th 2026. Name John Smith, email john@test.com."*
  - [ ] Agent confirms with a code like `FX-XXXXXX`. **P0**
  - [ ] Booking shows up in `/dashboard/bookings` within 5s. 📸 **P0**
  - [ ] Email "Booking confirmed — FX-XXXXXX" arrives at john@test.com (use a real inbox). 📸 **P0**
- [ ] **Cancel booking** — *"Cancel booking FX-XXXXXX"* → status becomes `cancelled`. 📸 **P0**
- [ ] **Modify booking** — *"Change my booking FX-YYYYYY to April 20th"* → date updates in DB. **P0**
- [ ] **Check status** — *"What's the status of FX-XXXXXX?"* → agent reads back type/date/status. **P0**

### 6.2 Customer service (P0)
- [ ] **File complaint (low urgency)** — *"I'm unhappy about service quality"* → creates Complaint, no email to admin. **P1**
- [ ] **File complaint (critical)** — *"This is unacceptable, I need a manager NOW. My order arrived broken."* → urgency `critical`, **email lands in admin inbox** with red urgent banner. 📸 **P0**
- [ ] **Create support ticket** — *"My account is locked, contact me at me@test.com"* → ticket `TK-XXXXXX` in `/dashboard/tickets`, email arrives at me@test.com. 📸 **P0**
- [ ] **Capture lead** — *"I'm interested in your premium plan, my name is Jane, jane@biz.com, 555-1234"* → lead in `/dashboard/leads`, **email lands in admin inbox** (NEW LEAD alert). 📸 **P0**
- [ ] **Schedule callback** — *"Call me back tomorrow at 2pm at +1-555-9999, my email is x@y.com"* → callback in `/dashboard/callbacks`, email arrives at x@y.com. 📸 **P0**
- [ ] **Collect feedback** — *"5 stars, the service was amazing"* → feedback in `/dashboard/feedback` with rating=5. 📸 **P1**

### 6.3 Information lookup (P1)
- [ ] **Knowledge base search** — *"What's your cancellation policy?"* → agent answers from KB, no hallucination if KB has no answer (it should say so). **P0**
- [ ] **Pricing** — *"How much is the deluxe room?"* → returns price from KB. **P1**
- [ ] **Business hours** — *"Are you open now?"* → returns hours respecting tenant timezone (test by setting timezone in agent settings). **P1**
- [ ] **Get directions** — *"Where are you located?"* → returns address + Google Maps link. **P1**
- [ ] **Recommend products** — *"What do you recommend?"* → returns up to 5 product cards. 📸 **P1**
- [ ] **Apply promo code** — *"I have code WELCOME10"* → validates against `/dashboard/promo-codes` (create one first). **P1**

### 6.4 Escalation (P1)
- [ ] **Transfer to human** — *"Get me a real person, this is urgent"* → agent says transferring; CallLog shows `resolution: transferred`. 📸 **P1**

### 6.5 Custom actions (P0)
- [ ] **Webhook custom action** — Create a custom action that POSTs to https://webhook.site (or similar), trigger via voice; webhook.site receives the payload with the right parameters. 📸 **P0**
- [ ] **Save Data custom action** — Create a "save_data" action; trigger; check CallLog metadata in DB. **P1**
- [ ] **Auto-respond custom action** — Create one with a fixed success message; trigger; agent says exactly that message. **P1**

---

## 7. Multi-language

- [ ] **Spanish** — open widget, set language to Spanish, ask *"¿Qué tours tienen?"*; agent replies in Spanish with native voice. 📸 **P0**
- [ ] **Arabic** — set Arabic; agent replies in Arabic; widget UI flips to RTL direction. 📸 **P0**
- [ ] **Mid-call switch** — start in English, switch to French via the flag dropdown during the call; next reply is in French. **P0**
- [ ] **Languages dropdown shows all 29+** — flag picker shows the full list, scrollable. 📸 **P1**

---

## 8. Dashboard pages — CRUD & display

> For each page: empty state visible when no data, table renders when data exists, search works, modal closes on Esc.

- [ ] **Calls** — `/dashboard/calls` lists calls; click a call → modal with transcript + audio playback. 📸 **P0**
- [ ] **Bookings** — `/dashboard/bookings` lists bookings; click → detail modal; status update saves; **Esc closes modal**. 📸 **P0**
- [ ] **Leads** — `/dashboard/leads` shows captured leads; search filters by name/email/interest. 📸 **P0**
- [ ] **Callbacks** — `/dashboard/callbacks`; "Mark as completed" button works. 📸 **P1**
- [ ] **Complaints** — `/dashboard/complaints`; status update saves; **Esc closes modal**. 📸 **P1**
- [ ] **Tickets** — `/dashboard/tickets`; can update status & resolution. 📸 **P1**
- [ ] **Feedback** — `/dashboard/feedback`; star ratings render correctly; sentiment badges color-coded. 📸 **P1**
- [ ] **Knowledge base** — `/dashboard/knowledge`; can upload a PDF/DOCX, see it in the document list. 📸 **P0**
- [ ] **Document search** — type a query in KB search; results return; relevance scored. **P1**
- [ ] **Phone numbers** — `/dashboard/phone-numbers`; can search Twilio for available numbers (if Twilio configured). **P1**
- [ ] **Channels** — `/dashboard/channels`; toggle Email / SMS / WhatsApp / Telegram / Messenger; each saves. **P1**
- [ ] **Conversations** — `/dashboard/conversations`; unified inbox shows messages from configured channels. **P1**
- [ ] **Integrations** — `/dashboard/integrations`; Salesforce/HubSpot/Zoho cards visible; "Connect" opens OAuth flow. 📸 **P1**
- [ ] **Workflows list** — `/dashboard/workflows`; can create new workflow. **P1**
- [ ] **Workflow editor** — `/dashboard/workflows/[id]/edit`; React Flow canvas loads; drag node from palette to canvas; connect with edges; save. 📸 **P1**
- [ ] **Team** — `/dashboard/team`; invite a member by email; **invite email arrives**; new user row appears. 📸 **P0**
- [ ] **Settings** — `/dashboard/settings`; company info, voice defaults, billing tab, API key all editable. 📸 **P0**
- [ ] **API key reveal** — click "Show" → key revealed; "Copy" button works; "Rotate" generates a new one. 📸 **P0**
- [ ] **Analytics** — `/dashboard/analytics`; charts render (bar/line/pie); period selector (7d/30d/custom) works. 📸 **P1**
- [ ] **Export CSV** — Click Export → Calls (CSV); file downloads with correct rows. **P1**
- [ ] **Export retry** — kill backend mid-export; toast appears with **Retry** button; click; succeeds when backend is back. **P2**

---

## 9. Email templates — visual review

> All emails should render with the gradient header, branded footer, and proper spacing. Test in **Gmail web** + **Outlook web** + **iOS Mail** if possible.

- [ ] **Welcome email** — gradient header, getting-started list, "Go to Dashboard" CTA works. 📸 **P0**
- [ ] **Verify email** — single CTA button; copy-paste URL also works at the bottom. 📸 **P0**
- [ ] **Password reset** — CTA goes to `/auth/reset-password?token=...`. 📸 **P0**
- [ ] **Password changed** — shows IP and date; "Secure my account" red button. 📸 **P0**
- [ ] **Booking confirmation** — info table with code/date/guests; safe HTML escaping (try a guest name with `<script>` — should be displayed as text). 📸 **P0**
- [ ] **Booking cancelled / modified** — distinct subject/title for each. 📸 **P1**
- [ ] **Callback scheduled** — confirms phone + preferred time. 📸 **P1**
- [ ] **Support ticket created** — ticket # in subject, description quoted with left border. 📸 **P1**
- [ ] **New lead alert** (admin) — "🎯 New lead captured" subject, "Open in Dashboard" CTA. 📸 **P0**
- [ ] **Critical complaint alert** (admin) — "🚨 [URGENT] Complaint:" subject, red banner. 📸 **P0**
- [ ] **Team invite** — accept-invite or login URL works. 📸 **P0**
- [ ] **Payment failed** — only triggers via Stripe test webhook (use Stripe CLI: `stripe trigger invoice.payment_failed`). 📸 **P1**
- [ ] **No XSS** — for any email triggered with user input, search the rendered HTML for `<script` — should be zero matches. **P0**

---

## 10. Embeddable widget

- [ ] **Static page test** — create a plain HTML file, paste the embed snippet, open in browser; widget loads in bottom-right. 📸 **P0**
- [ ] **Widget independence** — widget styles don't bleed into the host page (check by adding the widget to a Tailwind site and a Bootstrap site). **P1**
- [ ] **Domain allow-list** — add a domain to the widget's allowed list; serving from another domain returns 403. **P1**
- [ ] **Widget config endpoint** — `GET /api/widget/{widgetId}` returns 200 with `agent` + `widget` shape. **P1**
- [ ] **Iframe / cross-origin** — widget works inside an iframe (no `X-Frame-Options` blocks). **P2**
- [ ] **Rate limiting** — hammer the config endpoint 100x in 1 minute → eventually returns 429. **P2**

---

## 11. Showcase site (sales demo)

- [ ] **Homepage** — `/` (showcase): hero animates, all 4 product cards link to demos. 📸 **P1**
- [ ] **Voice Agent showcase** — `/voice-agent`: hero card has Olivia + audio wave + "Talk to agent" mic. Click mic → live conversation. 📸 **P0**
- [ ] **Hotel Booking showcase** — `/hotel-booking`: hero has voice agent card; below has 4 hotel demos (Luxury / Resort / City / Heritage). Each demo opens with its widget mode. 📸 **P0**
- [ ] **Search Agent showcase** — `/search-agent` and its sub-routes: search widget appears, returns mock results. **P1**
- [ ] **Booking Engine showcase** — `/booking-engine` sub-routes: each widget mode renders. **P1**
- [ ] **Schema audit** — `/schema-audit`: paste a URL, scan returns score + detected schemas. **P2**

---

## 12. Mobile responsive (do all of section 4-8 again on these viewports)

- [ ] **iPhone 14 (390×844)** — dashboard sidebar collapses, tables scroll horizontally, modals fit screen. 📸 **P0**
- [ ] **Pixel 7 (412×915)** — same checks. **P0**
- [ ] **iPad (768×1024)** — sidebar visible, layout uses tablet breakpoint. 📸 **P1**
- [ ] **Voice widget on mobile** — tap mic, mic permission prompt works in mobile Safari + Chrome. **P0**
- [ ] **Forms on mobile** — keyboard doesn't cover the active input; "Done" key dismisses keyboard. **P1**
- [ ] **Tables on mobile** — wrap or horizontal scroll, never overflow page width. **P1**

---

## 13. Accessibility

- [ ] **Keyboard navigation** — Tab through all dashboard nav items in order; visible focus ring; Enter activates links. **P1**
- [ ] **Skip-to-content** — first Tab on any page reveals "Skip to main content" link (or equivalent). **P2**
- [ ] **Screen reader (VoiceOver / NVDA)** — login form announces field labels correctly (not just placeholders). **P1**
- [ ] **Esc closes modals** — confirm Esc works on bookings, complaints, callbacks, tickets, ExitIntentModal. **P1**
- [ ] **Color contrast** — run axe DevTools on dashboard; zero contrast errors in primary text. **P1**
- [ ] **Reduced motion** — set OS "Reduce Motion"; pulsing/animated elements (orb, gradient) respect it. **P2**

---

## 14. Performance

- [ ] **Lighthouse — Homepage** — Performance ≥ 80, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90. 📸 **P1**
- [ ] **Lighthouse — Dashboard** — Performance ≥ 70 (interactive app, lower threshold OK), Accessibility ≥ 90. 📸 **P1**
- [ ] **TTFB** — `curl -w "%{time_starttransfer}"` against `/api/health` < 500ms. **P1**
- [ ] **Voice TTS round-trip** — from "send message" to first audio byte < 3s. **P0**
- [ ] **Bundle size** — `app/layout` first-load JS < 250 KB (per Next.js build output). **P2**

---

## 15. Error handling & recovery

- [ ] **Backend down** — kill the API; reload dashboard; toast/error UI appears, no white screen. 📸 **P0**
- [ ] **Backend recovery** — restart API; pages auto-recover (or "Try again" button works). **P0**
- [ ] **Bad API key** — change `apiKey` in localStorage to garbage; reload; lands on login. **P1**
- [ ] **Stale session** — let session sit for 8+ days (or change JWT exp manually); next request 401s and redirects to login. **P1**
- [ ] **Tool failure** — mock OpenAI returning 500 (or rate limit); voice agent says graceful fallback message instead of crashing. **P0**
- [ ] **Email failure** — set bad Mailgun key locally, register a new account; signup still succeeds (email is fire-and-forget); error logged. **P1**
- [ ] **Stripe webhook signature mismatch** — POST a webhook with no signature; backend returns 400, doesn't crash. **P1**

---

## 16. Security checks

- [ ] **HTTPS enforced** — visit `http://web-production-265e3.up.railway.app` → redirects to `https://`. **P0**
- [ ] **Cookies secure + HttpOnly** — DevTools > Application > Cookies > `auth_token`: `Secure`, `HttpOnly`, `SameSite=Lax` all set. 📸 **P0**
- [ ] **API key never echoed** — search Network tab response bodies for the API key string after login; should NOT appear except on the explicit "show API key" endpoint. **P0**
- [ ] **Tenant isolation** — login as Tenant A, copy a record ID, log in as Tenant B, try to GET that ID via API — must return 404, not 200. **P0**
- [ ] **No JWT placeholder warning** — check Railway logs for any "JWT_SECRET is the placeholder" warning — should not exist. **P0**
- [ ] **Password reset token single-use** — click reset link, set new password; click same link again — rejected as "Invalid or expired". **P0**
- [ ] **OAuth state single-use** — for Salesforce/HubSpot OAuth: complete the flow, then replay the callback URL with the same state — rejected as "invalid_state". **P1**
- [ ] **Rate limiting** — hit `/api/auth/login` 11x in 5 min from same IP → 11th returns 429. **P0**
- [ ] **No console.log of secrets** — open production frontend, grep console output for `sk_test`, `sk_live`, `JWT`, etc. — zero matches. **P0**
- [ ] **CORS** — try a `fetch` from a random origin against `/api/widget/{id}` — only allowed origins return CORS headers. **P1**
- [ ] **`.env` not committed** — `git ls-files | grep -E "^\.env$"` returns nothing. **P0**

---

## 17. Billing (Stripe test mode)

- [ ] **Checkout link** — `/dashboard/settings#billing` → "Upgrade" → opens Stripe Checkout in test mode. 📸 **P0**
- [ ] **Successful checkout** — use test card `4242 4242 4242 4242`, any future expiry, any CVC; subscription becomes `active`. 📸 **P0**
- [ ] **Failed payment** — use test card `4000 0000 0000 9995` (insufficient funds); subscription marked `past_due`; **payment failed email** arrives. 📸 **P0**
- [ ] **Subscription cancellation** — click cancel; subscription becomes `canceled`. **P1**
- [ ] **Webhook signature** — Stripe webhook events delivered to `/api/billing/webhook` are processed (check `WebhookEvent` collection). **P0**

---

## 18. Final smoke (do last, after everything else passes)

- [ ] **Sign up** with a brand-new email → land on dashboard. 📸 **P0**
- [ ] **Verify email** → green check appears. 📸 **P0**
- [ ] **Configure agent** with a test custom action that posts to webhook.site. 📸 **P0**
- [ ] **Embed widget** on a static HTML test page. 📸 **P0**
- [ ] **Place a real call** through the widget on that page. 📸 **P0**
- [ ] **Trigger booking + complaint + lead** in one call. 📸 **P0**
- [ ] **Verify** — booking + complaint + lead all visible in dashboard within 10s. 📸 **P0**
- [ ] **Receive 3 emails** in your inbox: booking confirmation (caller), urgent complaint (admin), lead alert (admin). 📸 **P0**
- [ ] **Logout, log back in** — everything still there. **P0**
- [ ] **Close laptop, open 1h later** — session still valid (JWT 7d). **P2**

---

## Reporting findings

For each failed test, capture:

1. **Step** that failed (number from this checklist)
2. **What you saw** vs **What was expected**
3. **Screenshot** of the failure state (with browser DevTools open if it's a network/console issue)
4. **Browser + viewport** (Chrome 142, 1440×900)
5. **Reproducibility** (every time / sometimes / one-off)
6. **Severity** — P0 (blocks ship) / P1 (annoying bug) / P2 (polish)

Save all screenshots to a folder named `qa-screenshots-YYYY-MM-DD/` and zip + share.

---

## Tooling cheats

- Stripe webhook tester: `stripe listen --forward-to https://web-production-265e3.up.railway.app/api/billing/webhook`
- Twilio webhook simulator: use Twilio Console → Phone Numbers → Configure → click "Test Webhook"
- Mailgun delivery logs: https://app.mailgun.com/app/sending/domains/hello.foxestechnology.com/logs
- Railway logs: `railway logs -s web -e production`
- Production URL: `https://web-production-265e3.up.railway.app`
- Frontend (Netlify): `https://foxesvoice.com` (or staging URL)
