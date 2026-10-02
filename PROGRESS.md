# Pivot rework — 25 Sep 2026

Business model changed to AI integration partner (source: `docs/business-model-pivot/01-business-model-change.md` and `03-website-brief.md` in the parent workspace). Everything below this section is pre-pivot history.

| Item | Status |
|---|---|
| Homepage rebuilt: results hero, job-cycle map, how it works, proof, promise, fit, FAQ, founder, final CTA; unsourced stat strip, missed-call ROI block, flagship receptionist block, toolbox and consulting blocks removed | ✅ |
| `audit.html` created (primary conversion page, Cal.com inline, Pixel `Schedule` on booking) | ✅ (Cal event swap pending) |
| Site-wide CTA system → "Book your free consult"; nav FAQ→Fixes, AI Calls→AI Receptionist; footer "Free audit" link | ✅ |
| `ai-calls.html` reframed as the Enquiries fix; $5K / 80% / 12+ stats removed | ✅ |
| `websites.html` reframed as the Growth fix; AI-visibility line; audit primary, discovery call secondary | ✅ |
| `about.html`, `book.html`, `contact.html`, `sample-call` reframed | ✅ |
| Calculator rebuilt on-brand: admin + missed-work cost from the user's own numbers; unsourced "$30K–$80K" and scarcity claims removed | ✅ |
| `integrations.json` + `scripts/generate-integration-pages.js` → 7 `/ai-for-*` pages | ✅ |
| `/ai-receptionist-*` generator: audit CTAs, cross-links, org schema | ✅ |
| Shared generator shell `scripts/lib/shared.js`; sitemap updates made idempotent (7 duplicate URLs removed) | ✅ |
| `llms.txt`, schema, OG images (`scripts/generate-og.js`) updated | ✅ |
| Broken Cal.com loader replaced site-wide (inline embeds on /book and /contact were throwing) | ✅ |
| `/receptionist` → `/ai-calls` redirect; `/audit.html` → `/audit` | ✅ |
| `results.html` | Not built — waits for 2 real, permissioned results |
| Follow-ups (same day): entry offer renamed Business Streamlining Consult (`audit.html` → `consultation.html`, `/audit` redirects); positioning line "We make your business easier to run. Helping you do more, without doing more." in the homepage hero; Fergus + simPRO added to tool lists; portfolio relabelled as demo builds; missed-call calculator moved to `ai-calls.html` (with a booking-rate slider); consent tick box on the calculator email form | ✅ |

---

# Sprint 1 Progress

## Status: COMPLETE ✓

| Item | Status |
|---|---|
| 1. Cal.com booking funnel | ✅ Done |
| 2. Unified CTA labels | ✅ Done |
| 3. Placeholder fixes | ✅ Done |
| 4. Mobile sticky bar | ✅ Done |
| 5. Pricing card hierarchy | ✅ Done |

---

## Log

### 2026-06-12 — Sprint 1 complete

**Item 1 — Cal.com funnel:**
- Created `book.html` with Cal.com inline embed (`jackal-ai/15min`, month_view, dark theme, amber brand)
- Added Cal.com element-click embed script to all 5 pages + book.html
- All primary CTAs now carry `data-cal-namespace="15min"` + `data-cal-link` with per-page UTM content params
- `contact.html` restructured: Cal.com inline embed at top ("Fastest way"), form below ("Or send the details")

**Item 2 — CTA label unification:**
- All nav CTAs: "Book a free call" (was "Hear a demo call" / "Get a Quote")
- index.html hero: primary "Book a free call", secondary "Hear a demo call" (swapped)
- ai-calls.html hero: primary "Book a free call", secondary "Hear a demo call"
- websites.html: all CTAs → "Book a discovery call"
- about.html end CTA: "Book a free call"
- All 7 ai-calls carousel "Book a Demo" → "Book a free call"
- websites.html nav: added missing FAQ link

**Item 3 — Placeholder fixes:**
- `99` glyph → `&ldquo;` on index.html
- Phone `—` on ai-calls.html → visible `TODO_PHONE` comment (search: `TODO_PHONE` to replace when number confirmed)
- Instagram + Facebook footers: all 4 pages now have real URLs
- `~$499`, `~$2,750`, `~$999`, `~$4,500` → stripped tildes (ai-calls.html)
- Censoring unified: "bulls#!t" → "bullsh*t" (index.html hero)
- Timeline: contact.html "4–5 weeks" → "AI receptionists go live in under a week. Website builds take around 30 days."

**Item 4 — Mobile sticky bar:**
- Added to all 5 pages + book.html
- Left: amber "Book a free call" → Cal.com modal
- Right: ghost "Hear the AI" → demo modal on index/ai-calls; links to ai-calls.html on others
- Hidden until 300px scroll; respects prefers-reduced-motion

**Item 5 — Pricing card hierarchy:**
- All 3 pricing cards now: amber "Book a setup call" (Cal.com) primary + "Ready to skip the call? Start checkout →" (Stripe) secondary text link
- `.price-stripe-link` style added

---

# Sprint 2 Progress

## Status: COMPLETE ✓

| Item | Status |
|---|---|
| 6. Counter fix | ✅ Done |
| 7. JSON-LD structured data | ✅ Done |
| 8. Crawl infrastructure | ✅ Done |
| 9. OG images + alt text | ✅ Done |
| 10. llms.txt | ✅ Done |
| 11. H1/title rewrites | ✅ Done |

---

## Log

### 2026-06-12 — Sprint 2 complete

**Item 6 — Counter fix (index.html + ai-calls.html):**
- All stat spans now have real values as default text content in the HTML (visible to crawlers and reduced-motion users)
  - index.html: `18.5 hrs`, `3+ calls`, `$10K+`, `51 hrs`
  - ai-calls.html: `$5K`, `80%`, `12+`, `24/7`
- JS resets to zero and animates up only after IntersectionObserver fires
- `prefers-reduced-motion` bypass: animation skipped, real value stays displayed
- Stats are industry figures gathered from online sources

**Item 7 — JSON-LD structured data (all 6 pages):**
- index.html: Organization+LocalBusiness, Service (AI receptionist + 3 Offer plans), FAQPage (6 Qs), BreadcrumbList
- ai-calls.html: Organization+LocalBusiness, Service + Offers, FAQPage, BreadcrumbList
- websites.html: Added Organization+LocalBusiness, Service (web design), BreadcrumbList — existing FAQPage preserved
- about.html: Organization+LocalBusiness, Person (Jack Alexander), BreadcrumbList
- contact.html: Organization+LocalBusiness, BreadcrumbList
- book.html: Organization+LocalBusiness, BreadcrumbList
- All schema: ABN 92 509 551 334 as taxID, foundingDate 2024, Perth WA address, Australia areaServed
- No AggregateRating (no verified reviews yet)
- TODO: add `"telephone"` to Organization schema when phone number confirmed

**Item 8 — Crawl infrastructure:**
- Created `vercel.json` — cleanUrls: true + 301 redirects from .html paths for 6 main pages
- Created `robots.txt` — allow all + explicit allow for GPTBot, ClaudeBot, PerplexityBot, Google-Extended + Sitemap line
- Created `sitemap.xml` — 10 public pages, clean URLs, lastmod 2026-06-12
- Added `<link rel="canonical">` and `<meta property="og:url">` to all 6 pages with absolute clean-path URLs

**Item 9 — OG images + alt text:**
- Created `/og-templates/base.html` — branded 1200×630 card template (Graphite, Archivo Black, amber accents, JACKAL watermark)
- Created `/scripts/generate-og.js` — Puppeteer script rendering 7 PNG files to `/assets/og/`
- Generated: home.png, ai-calls.png, websites.png, about.png, contact.png, book.png, calculator.png
- All `og:image` updated to absolute URLs pointing to per-page PNGs
- All `brandmark.png alt="Jackal"` → `alt="Jackal AI"` across all pages
- websites.html client photo alt text updated to meaningful descriptions

**Item 10 — llms.txt:**
- Created `/llms.txt` — full plain-text business summary: who, products, pricing (all 3 plans with setup fees), integrations, location, contact, founder, key pages, social profiles

**Item 11 — H1/title rewrites:**
- index.html: "More time. Less bullsh*t." → styled `.hero-kicker` above the H1; H1 now: "Your AI receptionist answers every call. You stay on the tools." Sub copy updated with concrete details and from-price
- about.html: H1 "of real ones" → "of real receptionists" (removes ambiguity); OG title updated to match
- contact.html: `<title>` → "Book a Call — Jackal AI | AI Receptionist for Aussie Tradies"; OG title/description added

---

## Pending (carry to next session)

- `TODO_PHONE`: grep for `TODO_PHONE` in ai-calls.html + add `"telephone"` to JSON-LD Organization schema on all pages when confirmed
- Google Search Console: not yet set up — submit sitemap.xml once live

---

# Sprint 4 Progress

## Status: IN PROGRESS

| Item | Status |
|---|---|
| 15. GSAP call sequence | ✅ Done |
| 16. Programmatic trade pages | ✅ Done |
| 17. Performance pass | ⏳ Pending |

---

## Log

### 2026-06-14 — Items 15 and 16 complete

**Item 15 — GSAP call sequence (ai-calls.html):**
- Removed 122-frame canvas preload (loader + frame sequence + annotation card JS/HTML/CSS)
- Removed old `#how-it-works` 3-card grid section
- Added `#call-sequence` — left panel (phone status monitor + cs-beat booking/SMS cards) + right panel (10-line transcript)
- Real HTML transcript text (crawlable). `data-speaker` attribute drives `::before` speaker labels via CSS
- Transcript: verbatim demo call — Matt in Morley, dead power points, books Friday 8am, phone number double-check moment included
- GSAP ScrollTrigger pinned scrub on desktop (≥768px) via `gsap.matchMedia()`. `scrub: 1.5`, `end: '+=250%'`
- Mobile (<768px): CSS static reveal — all `.cs-*` elements visible at opacity:1
- `prefers-reduced-motion`: all elements visible, rings hidden
- GSAP 3.12.5 + ScrollTrigger CDN scripts added synchronously before inline `<script>`
- Zero orphaned references to removed canvas/loader/how-it-works elements (grep verified)

**Item 16 — Programmatic trade pages:**
- Created `trades.json` with 6 trade entries (plumbers, electricians, builders, landscapers, air-conditioning, roofers) + 1 Perth location entry
- Each entry has unique pain points, how-it-works steps, FAQ variants, H1/title/meta/OG — genuinely differentiated copy
- Created `scripts/generate-pages.js` — reads trades.json, generates static HTML, updates sitemap.xml
- Generated 7 pages:
  - `/ai-receptionist-for-plumbers/`
  - `/ai-receptionist-for-electricians/`
  - `/ai-receptionist-for-builders/`
  - `/ai-receptionist-for-landscapers/`
  - `/ai-receptionist-for-air-conditioning/`
  - `/ai-receptionist-for-roofers/`
  - `/ai-receptionist-perth/`
- Each page: FAQPage + Service + BreadcrumbList JSON-LD, 3 trade-specific FAQs + 3 universal FAQs, Cal.com embed, mobile sticky bar, internal link to /ai-calls
- sitemap.xml updated: 10 original pages + 7 new trade pages (17 total)
- To add a new trade: edit `trades.json`, run `node scripts/generate-pages.js`

**Item 17 — Performance pass:**
- Added `loading="lazy"` to `assets/about-me-profile-pic.jpg` on about.html (container has `aspect-ratio: 4/5` so no CLS)
- Generated trade pages have explicit `width`/`height` on all brandmark images ✅
- Demo-Call.MP3 is already `preload="none"` — does not affect initial page load or LCP
- `display=swap` is in the Google Fonts URL — no invisible text during font load ✅
- Preconnect hints to `fonts.googleapis.com` + `fonts.gstatic.com` already in `<head>` ✅

**🚨 Critical findings requiring manual action (biggest LCP wins):**
1. `brandmark.png` — 975KB at 8486×11820px. Displayed at 28px height. Target: ~56×78px at ~5KB. Fix: export from design tool at 2× retina size. Eliminates ~970KB from every pageload.
2. `logo.png` — 2.8MB at 41354×11820px. Used only in index.html loader at ~150px wide. Target: ~200×60px at ~20KB. Eliminates ~2.8MB from index.html initial load.
3. `assets/about-me-profile-pic.jpg` — 935KB at 2716×3622px. Used in about.html at ~400px wide. Target: ~800×1066px at ~120KB. Saves 815KB on about.html.
- Lighthouse mobile report: pending deploy (run after next Vercel deploy on `/` and `/ai-calls`)

---

# QA Pass — 2026-06-14

## Status: COMPLETE ✓

Full cross-sprint QA pass covering all 7 categories: placeholder sweep, link/CTA integrity, structured data, SEO/GEO, content/voice, accessibility, and performance.

### Fixes applied (22 issues resolved)

**Critical:**
- `sample-call/index.html` — Fixed `REPLACE_WITH_AUDIO_FILE_URL` → `../assets/Demo-Call.MP3`; fixed `REPLACE_WITH_CALCOM_URL` → `https://jackalai.app/book`; full page rebuilt with Jackal brand tokens, Archivo Black + Outfit fonts, GTM, canonical, meta description, and `preload="none"` on audio

**Major:**
- `websites.html` — Nav CTA (desktop + mobile) changed "Book a free call" → "Book a discovery call" (spec compliance)
- `websites.html` — Hero CTA hierarchy corrected: amber primary = "Book a discovery call", ghost secondary = "See the work ↓"
- `websites.html` — `yourbiz.com.au` placeholder URL replaced with `yoursite.com.au`
- `ai-calls.html` + `index.html` — FAQPage JSON-LD `name` fields aligned to visible FAQ text (6 mismatches per page fixed; answer text also aligned)
- `calculator/index.html` — Added `<link rel="canonical">` and GTM (head + noscript body)
- `sample-call/index.html` — Added `<link rel="canonical">` (canonical, GTM done as part of full rebuild)
- `privacy-policy.html` — Added `<link rel="canonical">`
- `terms-of-service.html` — Added `<link rel="canonical">`
- `index.html`, `ai-calls.html`, `websites.html`, `about.html`, `contact.html`, `book.html` — Added global `:focus-visible` CSS rule (amber outline) for keyboard accessibility

**Minor:**
- `about.html` — "No hype, no bullshit" → "No hype, no bullsh*t" (censoring consistency)
- `ai-calls.html` — ALL-CAPS section headings converted to sentence case: "Every missed call is money out the door", "This is what you're missing", "Your calls answered. Your jobs booked."
- `index.html` — ALL-CAPS heading converted: "Works with what you've already got"
- `websites.html` — ALL-CAPS heading converted: "Your site live in 30 days."
- `sitemap.xml` — `lastmod` dates updated to 2026-06-14 for all 10 original pages

### QA category verdicts

| Category | Status | Notes |
|---|---|---|
| 1. Placeholder & artifact sweep | ✅ Green | sample-call placeholders fixed; calculator webhook in backlog (needs real URL) |
| 2. Link & CTA integrity | ✅ Green | websites.html CTA labels corrected; Cal.com slugs all correct |
| 3. Structured data | ✅ Green | FAQPage JSON-LD names aligned; no fake ratings; entity consistency confirmed |
| 4. SEO / GEO | ✅ Green | Canonicals now on all 17 pages; sitemap 17 URLs; robots.txt correct; llms.txt current |
| 5. Content & voice | ✅ Green | No banned words; censoring unified; ALL-CAPS headings fixed |
| 6. Accessibility | ✅ Green | :focus-visible added to all main pages; prefers-reduced-motion confirmed throughout |
| 7. Performance | 🟡 Partial | Render-blocking/lazy-load/preconnect all correct; Lighthouse scores pending deployment |

---

## Post-launch backlog

| # | Item | Page | Notes |
|---|---|---|---|
| PL-1 | ~~Calculator webhook~~ | calculator/index.html | ✅ Done — `/api/calculator-lead.js` → Airtable "Calculator Leads" table (base: appkjvDwVT0nxIXzQ). Needs `AIRTABLE_TOKEN` env var in Vercel. |
| PL-2 | ~~Oversized images: brandmark.png, logo.png, about-me-profile-pic.jpg~~ | All pages | ✅ Done — brandmark 5KB, logo 10KB, profile 72KB |
| PL-3 | ~~TODO_PHONE~~ | All pages | ✅ Done — +61851226302 / (08) 5122 6302 on ai-calls.html CTA + telephone field in all JSON-LD Organization schemas (main pages + trade pages via generate-pages.js) |
| PL-4 | Trade page OG images — all 7 pages use home.png | Trade pages | Generate trade-specific 1200×630 cards |
| PL-5 | "cinematic" appears 4× on websites.html — vary the language | websites.html | Minor copy polish |
| PL-6 | sample-call + calculator pages — brand refresh (currently use purple/cyan design system) | sample-call, calculator | Out of scope for QA pass; visual only |
| PL-7 | Legal pages (privacy/terms) nav CTA is "Hear a demo call" → inconsistent with rest of site | privacy-policy, terms-of-service | Low traffic; low priority |
| PL-8 | Lighthouse mobile scores for all key pages — run after next Vercel deploy | All | Target: LCP <2.5s, CLS <0.1 |
| PL-9 | Google Search Console sitemap submission | — | Submit sitemap.xml once live on production domain |
