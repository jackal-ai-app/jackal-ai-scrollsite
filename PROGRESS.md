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
