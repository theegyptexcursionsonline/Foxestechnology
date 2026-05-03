# Foxes Operator Landing Pages + Learning Hub Plan

*Last updated: 2026-05-02*
*Owner: Rdmi Tech Ventures*
*Client: Egypt Excursions Online (Fouad)*

## Confirmed decisions (as of 2026-05-02)

- **Lead pages domain**: `foxestechnology.com/operators/[category]` — *confirmed by client*
- **Learning Hub domain**: `learn.foxestechnology.com` (subdomain) — *confirmed by client*
- DNS pointing required before going live on either
- Client wants to understand the end-to-end process before giving detailed feedback on copy, offers, and the Content Engine — see `HOW_IT_WORKS_CLIENT_FLOW.md` (companion doc for client review)

## Goal

Build 5 high-converting bilingual (English + Arabic) lead-gen landing pages on `foxestechnology.com` targeting Egyptian tour operator categories, plus a separate Learning Hub at `learn.foxestechnology.com`.

The landing pages are operator acquisition funnels — they recruit dinner cruise operators, boat operators, tour agencies, water sports providers, and diving centres onto the Foxes platform. The Learning Hub is an open knowledge platform for guides and operators across Egypt.

## Where everything lives

| Asset | Project | Domain |
|---|---|---|
| 5 operator landing pages | `Foxestechnology/` | `foxestechnology.com/operators/[category]` (EN), `foxestechnology.com/ar/operators/[category]` (AR) |
| Learning Hub | New project: `foxes-learning-hub/` | `learn.foxestechnology.com` |
| Lead capture API | `ai-booking-engine/foxes-api/` | `api.foxestechnology.com/api/leads` |
| Email delivery | Existing Mailgun | `hello.foxestechnology.com` (already configured) |
| Lead notifications | Existing Mailgun | `sales@foxestechnology.com` (TBD) |
| CRM sync (optional) | `foxes-crm/` | Internal |

---

## The 5 operator categories

### 1. Dinner Cruise Operators
**Audience**: Nile dinner cruise operators, Hurghada/Sharm dinner boats, Felucca operators
**Pains**: Empty seats on weeknights · OTAs taking 25-30% commission · No way to take group bookings online · Manual seating charts on paper
**Hook (EN)**: *"Fill Every Seat. Cut OTA Fees by Half."*
**Hook (AR)**: *"املأ كل مقعد. خفّض عمولات OTA إلى النصف."*
**Vertical features**: Timeslot management with capacity caps · F&B add-ons (vegetarian/halal selection) · Group rates · Dock pickup logistics · Auto-reminder SMS

### 2. Boat Operators
**Audience**: Private charter, speedboat tours, fishing trips, sunset cruises
**Pains**: Phone-only bookings · Double-bookings · Deposits scattered across cash/Vodafone Cash/bank transfers · Weather cancellations are chaos
**Hook (EN)**: *"Stop Double-Bookings. Get Paid Before They Board."*
**Hook (AR)**: *"أوقف الحجز المزدوج. احصل على دفعتك قبل الإقلاع."*
**Vertical features**: Vessel calendar · Deposit + balance collection · Weather cancellation policy automation · Captain assignment

### 3. Tour Agencies
**Audience**: Multi-product travel agencies in Cairo, Hurghada, Luxor, Aswan
**Pains**: 50+ products to keep synced across OTAs · OTA dependence eating margin · Slow voucher generation · Multiple Excel sheets
**Hook (EN)**: *"All Your Products, One Dashboard. Cut OTA Commissions in Half."*
**Hook (AR)**: *"كل منتجاتك في لوحة واحدة. خفّض عمولات OTA إلى النصف."*
**Vertical features**: Multi-product manager · White-label vouchers · Reseller portal · Channel manager (Viator, GetYourGuide, TripAdvisor sync)

### 4. Water Sports Activity Providers
**Audience**: Jet ski, parasailing, kitesurfing, paddleboard, banana boat operators
**Pains**: Walk-ins only · No online presence · Paper waivers · Equipment tracking is manual
**Hook (EN)**: *"Sell Sessions While You Sleep. Digital Waivers, Instant Bookings."*
**Hook (AR)**: *"بِع جلسات أثناء نومك. تنازلات رقمية وحجوزات فورية."*
**Vertical features**: Hourly slot booking · Digital waiver capture · Equipment availability tracking · Group/bachelor party packages

### 5. Diving Centres
**Audience**: PADI/SSI dive centres in Hurghada, Sharm El Sheikh, Marsa Alam, Dahab
**Pains**: PADI cert tracking on paper · Equipment rental is manual · Multi-day courses overlap and conflict · Divemaster scheduling chaos
**Hook (EN)**: *"Built for Dive Operators. Certs, Rentals, Bookings — One Place."*
**Hook (AR)**: *"مصمم لمراكز الغوص. الشهادات والمعدات والحجوزات في مكان واحد."*
**Vertical features**: Certification verification · Equipment rental tracker · Multi-day course scheduler · Divemaster shift planning · Insurance + medical clearance forms

---

## High-converting page structure

Every operator page follows this exact section order. Tested B2B SaaS landing-page pattern, tuned for the Egyptian/MENA market.

### Section 1: Hero (above the fold)
- Vertical-specific badge ("For Diving Centres")
- Hard-hitting headline (5-9 words, names the outcome)
- Sub-headline (1 line, names the mechanism)
- Primary CTA (opens lead form) + Secondary CTA (WhatsApp click-to-chat)
- 3 trust pills below CTAs ("No setup fee · Free for 30 days · Arabic support")
- Right side: hero image (real Egyptian operator using product, generated via gpt-image-1.5)

### Section 2: Social proof bar
- "Trusted by 300+ Egyptian operators" + 5-7 client logos
- 1 banner stat ("EGP 20M+ in bookings processed")

### Section 3: Pain agitation (3 problems)
- 3 cards naming the operator's daily pain in their own language
- Each card: pain icon, headline, 1-line description
- Designed for skim — not paragraphs

### Section 4: Solution showcase (3-4 features)
- Each feature: name, 2-line description, screenshot/mockup
- Tied directly to a pain from previous section
- Real product visuals, not stock illustrations

### Section 5: How it works (3 steps)
- "Sign up → Connect your products → Start selling"
- Each step has a number, icon, headline, 1-line description
- Conveys speed: time-to-value matters

### Section 6: Vertical-specific features
- 6-8 feature cards listing what's specific to THIS operator type
- E.g. "Digital PADI certification tracking" only on diving page
- Builds the "this was built for me" feeling

### Section 7: Testimonial(s)
- 1-2 real operator quotes with photo, name, business name
- Specific outcomes ("Increased direct bookings 40% in 3 months")
- If no real testimonials yet at launch: hold this section back rather than fake it

### Section 8: Pricing teaser
- "Free for 30 days. No card required."
- Or "Setup is free. Pay 1.5% per transaction." (use whatever is real)
- Single CTA to apply

### Section 9: FAQ
- 6-8 vertical-specific objections handled
- Common: cost, setup time, migration, payment methods, Arabic support, integration with existing systems

### Section 10: Lead form (sticky on scroll for mobile)
- 4 fields: Name · Business name · WhatsApp · Monthly bookings (dropdown)
- Single "Get Started" button
- POST to lead API → success state with WhatsApp link

### Section 11: Final CTA banner
- Strong call to action
- WhatsApp link as fallback for users who prefer chat

### Floating elements (always visible)
- Bottom-right WhatsApp bubble (huge MENA conversion driver)
- Sticky mobile CTA bar at bottom

---

## Conversion-critical details

### MENA-specific tactics
- **WhatsApp click-to-chat** as primary alternative to forms — typical MENA conversion rate is 3-5x higher than email forms
- **Egyptian payment logos** in trust section: Fawry, Vodafone Cash, Instapay, Visa, Mastercard
- **Native Arabic content** — never Google Translate. Bad AR copy kills credibility instantly
- **Real Egyptian operator photos** where possible (stock photos read as foreign)
- **Arabic font**: Tajawal or IBM Plex Sans Arabic (Cairo is overused on Egyptian sites)
- **Correct RTL layout** — mirrored icons, flipped chevrons, right-aligned text, RTL-aware spacing

### Form psychology
- Only 4 fields. Every extra field drops conversion by ~7%.
- WhatsApp number > email (operators check WhatsApp 100x more)
- Monthly bookings dropdown qualifies leads cheaply (sales prioritizes 100+/mo)
- Show success state with what happens next ("We'll WhatsApp you within 1 hour") — never leave the user wondering

### Performance targets
- LCP < 2s on 3G (most MENA mobile traffic is on slow connections)
- Hero image lazy-loaded WebP
- Single primary font + Arabic font subset only

### Tracking (must be in place day 1)
- Page view, form submit (success/error), WhatsApp click, scroll depth (25/50/75/100%)
- UTM parameter capture into lead record (ad source attribution matters)
- Meta Pixel for retargeting (client almost certainly runs Meta ads)
- GA4 events for funnel analysis

---

## Tech implementation

### i18n approach: lightweight dual route trees

No full-site `[locale]` rewrite. Two parallel route trees keep risk low:

```
Foxestechnology/app/
  operators/
    dinner-cruises/page.tsx       # EN
    boat-operators/page.tsx
    tour-agencies/page.tsx
    water-sports/page.tsx
    diving-centres/page.tsx
  ar/
    operators/
      dinner-cruises/page.tsx     # AR (RTL)
      boat-operators/page.tsx
      tour-agencies/page.tsx
      water-sports/page.tsx
      diving-centres/page.tsx
```

Translations live in `lib/i18n/operators.ts` as a typed dictionary keyed by category and locale. Both route trees consume the same section components, e.g. `<OperatorHero locale="ar" category="dinner-cruises" />`.

RTL is applied via a `<RTLProvider>` wrapper that sets `dir="rtl"` and swaps the body font to Tajawal — only on AR pages, not site-wide.

Why skip a full next-intl migration:
- Only 5 pages need bilingual today. Migrating the whole site to `[locale]` segments is risky and out of scope.
- Existing English pages keep working with zero changes.
- Easier to revert if Arabic adoption is low.

### Component breakdown

New folder: `Foxestechnology/components/operators/`
- `OperatorHero.tsx`
- `SocialProofBar.tsx`
- `PainPoints.tsx`
- `SolutionShowcase.tsx`
- `HowItWorks.tsx`
- `VerticalFeatures.tsx`
- `OperatorTestimonials.tsx`
- `PricingTeaser.tsx`
- `OperatorFAQ.tsx`
- `LeadForm.tsx`
- `FinalCTA.tsx`
- `WhatsAppFloat.tsx`
- `MobileStickyCTA.tsx`
- `RTLProvider.tsx`

All accept `category` + `locale` props. Copy comes from the i18n dictionary, never inlined.

### Lead capture flow

```
[foxestechnology.com/operators/diving-centres]
            │
            ▼ POST /api/leads
[Foxestechnology/app/api/leads/route.ts]   (rate-limit, validate, forward)
            │
            ▼ POST
[api.foxestechnology.com/api/leads]   (ai-booking-engine/foxes-api)
            │
            ├─► MongoDB: leads collection
            ├─► Mailgun → sales@foxestechnology.com
            └─► foxes-crm contact create (optional)
```

Why route through the marketing site's `/api/leads` instead of direct browser → backend:
- Avoids CORS configuration on the public API
- Hides the backend URL from the client bundle
- Single place to add bot protection (rate limiting, hCaptcha) before forwarding

### Hero imagery
Per project memory: use `gpt-image-1.5` for all generated imagery.
5 hero images, one per vertical, generated and committed to `public/images/operators/[category]-hero.webp`.

### SEO
Per page:
- Unique `<title>` and `<meta description>` (EN + AR)
- Open Graph image (vertical-specific, 1200x630)
- JSON-LD `WebPage` + `Service` schema
- Canonical URL with hreflang link to AR/EN counterpart
- Sitemap entries
- Algolia search index entries (10 records: 5 EN + 5 AR)

### Forms behavior (no placeholder buttons, per memory)
- Loading state with spinner during submit
- Inline error messages (network errors, validation errors)
- Success state with concrete next step ("Saif from our team will WhatsApp you within 1 hour")
- All CTAs wired to real handlers — no `href="#"` placeholders anywhere
- WhatsApp floating button uses real number `+20-XXX-XXX-XXXX` (TBD, need from client)

---

## Phasing

### Phase 1: Foundation (1 day)
- i18n dictionary structure in `lib/i18n/operators.ts`
- RTL provider component + Arabic font (Tajawal)
- Lead API route on marketing site (forwards to backend)
- Backend `/api/leads` endpoint in `ai-booking-engine/foxes-api/`
- Mailgun lead-notification template
- Shared section component skeletons

### Phase 2: First 3 landing pages (3-4 days)
Build in this order based on MENA market priority:
1. **Diving centres** — highest revenue per operator, most differentiated features
2. **Dinner cruise operators** — highest volume in Hurghada/Cairo
3. **Tour agencies** — broadest fit, biggest TAM

Each page: vertical hero image generated, copy in EN+AR, all sections built, form wired, tested in Chrome desktop + mobile + RTL.

### Phase 3: Remaining 2 pages (1-2 days)
4. Water sports activity providers
5. Boat operators

Same template, vertical-specific copy and imagery.

### Phase 4: Discoverability (half day)
- Header dropdown "For Operators" → category list (EN + AR)
- Footer column with all 5 verticals (EN + AR)
- Algolia indexing (re-run upload script)
- Sitemap + robots.txt updates

### Phase 5: Tracking + polish (half day)
- Meta Pixel install
- GA4 events
- Hotjar or Microsoft Clarity for session recording (optional)
- Cross-browser test (Safari iOS, Chrome Android)
- Lighthouse pass — target 95+ on all 4 pillars

**Total estimate: 6-7 working days for all 5 pages, EN+AR, fully wired.**

---

## Learning Hub Plan

Separate project. Will scope in detail after operator pages ship — but high-level decisions captured here.

### Stack
- New project: `foxes-learning-hub/`
- Next.js 15 + Tailwind + MDX initially, room to migrate to Sanity or Payload CMS once content volume justifies it
- Subdomain: `learn.foxestechnology.com`
- Deploy: Netlify
- Bilingual EN + AR from day one

### Three audience tracks
1. **Tour Guides** — getting online, certifications, customer service, pricing strategy
2. **Attractions Operators** — POS, online booking, capacity management, OTA strategy
3. **Activity Operators** — water sports/diving compliance, seasonal pricing, marketing for activity businesses

### Cross-cutting content
- Foxes product tutorials (how-to videos and walkthroughs)
- Egyptian tourism market research and reports
- Case studies of successful operators
- Webinars and recorded events

### Content engine integration
TBD — depends on what "Content Engine" is concretely. Two paths:
- If `ai-search-agent/` has article generation: pipe drafts into `content/articles/` as MDX, human review queue before publish
- If separate: build adapter
- Editorial workflow: never auto-publish (per memory: real, human-quality content)

### Newsletter
Same `/api/leads` infrastructure, with `category=newsletter:learning-hub` distinguishing source.

### SEO
Per article: JSON-LD `Article` schema, hreflang EN↔AR, sitemap, RSS, OpenGraph, canonical URL.

---

## Open questions (must answer before kickoff)

1. **Lead destination email**: confirm `sales@foxestechnology.com`, or different inbox?
2. **WhatsApp number** for click-to-chat — must be a business WhatsApp, ideally with quick-reply auto-message configured
3. **AR copy ownership**: client provides? Professional translator? AI-drafted with native client review?
4. **Real testimonials**: any 2-3 operators willing to give a quote + photo? If not, page launches without testimonials section rather than fake placeholders
5. **Pricing offer**: what's the actual offer to put on the page? "Free 30-day trial"? "Free setup"? "1.5% per transaction"? Need real numbers, not placeholders
6. **Testimonial logos**: any existing operator logos approved for use in the social proof bar?
7. **Meta Pixel ID** + **GA4 measurement ID** for tracking?
8. **Learning Hub launch date**: alongside operator pages or after?
9. **Bundle websites** (mentioned in WhatsApp chat, detailed email pending) — out of scope for this plan until email arrives

---

## Risks

- **AR translation quality**: Bad AR copy is worse than no AR. If client doesn't have a native AR resource, AI-draft + flag for native review before AR pages go live.
- **No real testimonials at launch**: Reduces conversion meaningfully. Worth pushing client for 2-3 real operator quotes before launch.
- **WhatsApp number not yet configured**: If they don't have a business WhatsApp with a quick-reply auto-message, click-to-chat falls flat. Must be set up before launch.
- **Lead routing untested**: First time `ai-booking-engine/foxes-api/` accepts external public POSTs — needs rate limiting, basic spam protection (hCaptcha or honeypot), and monitoring on day 1.
- **Mailgun key exposed**: The Mailgun production key from `getegyptguide/backend/.env` was visible in IDE selection. Rotate before any new deploys reference it.
