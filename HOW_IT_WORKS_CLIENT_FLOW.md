# How It Will Work — End-to-End Process

*For client review · 2026-05-02*

This document explains how the operator landing pages and the Learning Hub will work in practice — what happens when a real operator visits, submits, or reads. Each step is something you can give us specific feedback on (timing, wording, who does what, what gets sent).

Confirmed:
- Lead pages live at `foxestechnology.com/operators/[category]`
- Learning Hub lives at `learn.foxestechnology.com`

---

## Part 1 — How a lead comes in (Operator Landing Pages)

### Step 1: Operator discovers the page
A diving centre owner in Hurghada sees a Facebook ad, Google search, or WhatsApp share. They click and land on:

`foxestechnology.com/operators/diving-centres`

If their device is set to Arabic, they're auto-redirected to:

`foxestechnology.com/ar/operators/diving-centres`

The page loads in under 2 seconds even on slow mobile data.

### Step 2: They read the page
The page is built to be skimmed, not read. Within 8 seconds they should know:
- This was built for dive operators specifically
- It will fix 3 specific pains they have today
- It's free to try
- They can either fill a short form or click WhatsApp

### Step 3: They take action
Three possible actions:
- **Fill the form** (4 fields: name, business name, WhatsApp number, monthly bookings)
- **Click WhatsApp** floating button → opens chat with your business number, pre-filled message: *"Hi, I'm interested in Foxes for my diving centre"*
- **Bounce** — we capture them via Meta Pixel for retargeting ads later

### Step 4: Form submission flow (behind the scenes)
When they hit "Get Started":

1. Form posts to `foxestechnology.com/api/leads`
2. We check it's not a bot (rate limit + honeypot field)
3. We forward the lead to your central API at `api.foxestechnology.com/api/leads`
4. Three things happen at once:
   - Lead saved to MongoDB database (you can see all leads in one place later)
   - Email sent via Mailgun to your sales inbox (`sales@foxestechnology.com` — please confirm)
   - Optionally created as a contact in Foxes CRM (so your team can track follow-ups)
5. Operator sees a success message: *"Got it. Saif from our team will WhatsApp you within 1 hour. Or click here to chat now: [WhatsApp link]"*

### Step 5: Sales team follow-up
Your sales team gets the lead notification email within ~30 seconds of submission. The email contains:
- Operator's name + business name
- WhatsApp number (clickable, opens WhatsApp Web/desktop)
- Monthly bookings volume (so high-value leads jump the queue)
- Which category page they came from (diving / dinner cruise / etc.)
- What ad/source brought them (UTM tracking)

**Decision points for you, Fouad:**
- Where should lead notifications go? `sales@foxestechnology.com`, your personal inbox, multiple recipients?
- What's the SLA we promise on the page? "1 hour"? "24 hours"? "Same day"?
- Who follows up — one person or rotating team?
- Should we also push to Foxes CRM, or just email is enough for v1?

---

## Part 2 — What lives on each landing page

We're building 5 pages, one per operator category:

1. **Dinner cruise operators** — Fill every seat, cut OTA fees by half
2. **Boat operators** — Stop double-bookings, get paid before they board
3. **Tour agencies** — All your products, one dashboard
4. **Water sports providers** — Sell sessions while you sleep
5. **Diving centres** — Built for dive operators, certs/rentals/bookings in one place

Each page has the same 11-section structure but **the copy, imagery, features, and FAQs are unique to that operator type**. A diving centre owner reading the page should feel like Foxes was built specifically for diving — not a generic tool.

Each page is **bilingual**: full English + full Arabic (right-to-left layout, Arabic font).

**Decision points for you, Fouad:**
- Do you have 1-2 real operator testimonials we can use? (Real names + photos convert 3-4x better than placeholders.)
- Any operator logos approved for the "Trusted by 300+ operators" bar?
- What's the actual offer? Free 30-day trial? Free setup, 1.5% per transaction? We need real numbers, not guesses.
- Who writes the Arabic copy — your team, a translator, or AI-drafted with your team reviewing?

---

## Part 3 — How the Learning Hub will work

This is the bigger of the two builds. It's a content platform at `learn.foxestechnology.com` that publishes insights, tutorials, market research, and case studies for tour guides, attractions, and activity operators across Egypt.

### Step 1: Content gets created (the Content Engine)
This is where the Content Engine fits in. Three sources of content:

**Source A — Foxes team writes it**
You or your team writes an article (e.g., "How Hurghada operators can prepare for the 2026 high season") in a simple editor. Publish.

**Source B — AI drafts it, human reviews**
The Content Engine generates article drafts from prompts like:
- *"Write a 1500-word guide on PADI certification rules for Egyptian dive operators"*
- *"Summarize Q1 2026 Red Sea tourism trends with sources"*

The AI produces a draft. It goes into a review queue. You or an editor reviews, edits, and approves. Then it publishes. **Nothing auto-publishes** — every article gets human eyes before it goes live. That's a non-negotiable for credibility.

**Source C — Guest contributors**
A guide or operator submits an article through a form. It enters the same review queue, gets edited, and publishes under their byline. This builds community and gets you free quality content.

### Step 2: Article goes live
Once approved, the article publishes to `learn.foxestechnology.com/articles/[slug]` in both English and Arabic.

The Hub auto-generates:
- SEO metadata (title, description, OpenGraph image)
- JSON-LD article schema for Google
- Sitemap entry
- RSS feed entry
- Hreflang link between EN and AR versions

### Step 3: Distribution
Each new article is pushed to:
- The site (obvious)
- Email newsletter to subscribers (weekly digest)
- Social media (manual or auto-post — your choice)
- Foxes operator dashboard (operators see relevant articles)

### Step 4: Newsletter signup → Lead capture
Anyone who subscribes to the Learning Hub newsletter is captured as a soft lead in the same database (tagged `category=newsletter:learning-hub`). Over time, your sales team can warm them into Foxes platform users.

### Step 5: Audience tracks
The Hub has three top-level sections, each with its own content stream:

1. **For Tour Guides** — Getting online, certifications, customer service, pricing strategy
2. **For Attractions Operators** — POS, online booking, capacity management, OTA strategy
3. **For Activity Operators** — Water sports/diving compliance, seasonal pricing, marketing

Plus cross-cutting content: Foxes product tutorials, Egyptian tourism market research, operator case studies, recorded webinars.

**Decision points for you, Fouad:**
- How often do you want to publish — weekly? 3x per week? Daily?
- Who's the editor-in-chief? You? Someone on your team? Need to know who clicks "approve" on draft articles
- What's your stance on AI-drafted content — comfortable as long as humans review, or only human-written?
- Should the newsletter be weekly digest or article-by-article?
- Do you want a **paid tier** later (premium reports, exclusive case studies)? If yes, we should architect for it from day one
- Three audience tracks — agree, or want different ones?

---

## Part 4 — The Content Engine specifically

This is what you asked about twice. Here's exactly how it works:

### Inputs
You (or anyone authorized) give the Content Engine prompts. Examples:
- *"Write 5 article drafts about dinner cruise operations in Cairo"*
- *"Generate a 2000-word case study on a fictional successful Hurghada dive centre"*
- *"Summarize today's news about Egyptian tourism into 3 bullet-point briefings"*

### Processing
The Content Engine (powered by AI) drafts the article with:
- Original phrasing (not scraped)
- SEO-aware structure (H2s, H3s, meta description)
- Suggested title variants
- Suggested hero image (generated via gpt-image-1.5)
- Suggested social media posts to accompany it

### Review queue
Drafts land in a review dashboard. Your editor sees:
- Title + draft body
- Suggested image
- Word count, reading time
- AI confidence score (low confidence = read carefully)

The editor can:
- Approve as-is
- Edit and approve
- Reject with feedback (the engine learns)
- Schedule for later publish date

### Output
Approved articles publish to the Learning Hub automatically and trigger the distribution flow above.

### What it doesn't do
- It doesn't auto-publish without human review (we won't allow it — AI hallucinations can damage your brand)
- It doesn't replace your tone of voice — your editor adds the human polish
- It doesn't scrape other sites' content (everything is original)

**Decision points for you, Fouad:**
- Who has access to give it prompts? Just you? A team of 3?
- Who reviews the drafts before publish? Same people, different people?
- Languages — generate in English first and translate to Arabic, or generate native in both?
- What's your topic backlog — do you already have 50 article ideas, or do you want the engine to suggest topics too?

---

## Part 5 — Timeline (assuming you confirm by 2026-05-04)

| Phase | Days | What gets done |
|---|---|---|
| Foundation | 1 | i18n setup, Arabic font, lead capture API, Mailgun template |
| First 3 pages (diving, dinner cruise, tour agencies) | 3-4 | Full EN + AR pages with hero imagery, lead form wired |
| Last 2 pages (water sports, boat operators) | 1-2 | Same pattern |
| Discoverability | 0.5 | Header/footer nav, sitemap, search indexing |
| Tracking + polish | 0.5 | Meta Pixel, GA4, cross-browser test |
| **Operator pages live** | **6-7 working days** | |
| Learning Hub scaffold | 2 | New project, branding, MDX setup |
| Content Engine integration | 2 | AI drafting + review queue |
| Launch content | ongoing | 10-15 seed articles per audience track |
| **Learning Hub live** | **+1 week after operator pages** | |

---

## What we need from you to start building

**Blockers** (can't start without):
1. Lead notification email address (default: `sales@foxestechnology.com`)
2. Business WhatsApp number for click-to-chat
3. Real pricing/offer to show on the page

**Strongly preferred** (will reduce rework):
4. Any real testimonials + operator logos
5. Arabic copy ownership decision (your team / translator / AI-drafted with review)
6. Meta Pixel ID + GA4 ID for tracking

**Can wait** (Phase 2):
7. Content Engine prompt seed list
8. Learning Hub editorial workflow + roles

Even partial answers unblock us. Reply on whichever ones you have today and we'll start on those, holding the rest until you're ready.
