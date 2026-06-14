# Sprint 1 — Conversion Plumbing ✅ COMPLETE
_Source: docs/website-review.md §6_

---

## Item 1 — Cal.com booking funnel ✅
## Item 2 — Unified CTA labels ✅
## Item 3 — Placeholder & inconsistency fixes ✅
## Item 4 — Mobile sticky bottom CTA bar ✅
## Item 5 — Pricing card hierarchy ✅

---

# Sprint 2 — SEO/GEO Foundation
_Source: docs/website-review.md §6 items 6–10_

---

## Item 6 — Counter fix

- [ ] index.html: put real values in stat spans (18.5 hrs / 3+ calls / $10K+ / 51 hrs)
- [ ] index.html: JS resets to 0 and animates only after IntersectionObserver fires
- [ ] index.html: prefers-reduced-motion bypass (skip animation, show real value)
- [ ] ai-calls.html: put real values in stat spans ($5K / 80% / 12+ / 24/7)
- [ ] ai-calls.html: JS resets to 0 and animates only after IntersectionObserver fires
- [ ] ai-calls.html: prefers-reduced-motion bypass

## Item 7 — JSON-LD structured data

- [ ] index.html: Organization + LocalBusiness, Service, FAQPage, BreadcrumbList
- [ ] ai-calls.html: Service, Product/Offer ×3 (Capture/Convert/Command), FAQPage, BreadcrumbList
- [ ] websites.html: Service (web design), FAQPage (extend existing), BreadcrumbList
- [ ] about.html: Person (Jack Alexander), Organization ref, BreadcrumbList
- [ ] contact.html: BreadcrumbList
- [ ] book.html: BreadcrumbList
- [ ] Validate all blocks — no syntax errors, no AggregateRating without real reviews

## Item 8 — Crawl infrastructure

- [ ] Create vercel.json — cleanUrls: true + 301 redirects from .html paths
- [ ] Create robots.txt — allow all + explicit allow GPTBot/ClaudeBot/PerplexityBot/Google-Extended + Sitemap line
- [ ] Create sitemap.xml — all 10 public pages, clean URLs, lastmod 2026-06-12
- [ ] Add canonical tag to all pages (absolute URL, clean path)
- [ ] Add og:url to all pages with OG tags

## Item 9 — OG images + alt text

- [ ] Create /og-templates/ — one branded HTML card (1200×630) per page
- [ ] Create /scripts/generate-og.js — Puppeteer script to render HTML → PNG
- [ ] Run script → /assets/og/*.png generated for all pages
- [ ] Update og:image on all pages → absolute URL to per-page PNG
- [ ] Update all brandmark.png alt="Jackal" → "Jackal AI"
- [ ] Update websites.html client photo alt text (3 images)

## Item 10 — llms.txt

- [ ] Create /llms.txt — who, what, pricing, integrations, location, contact, founder

## Item 11 — H1/title rewrites

- [ ] index.html: H1 → keyword-rich text; "More time. Less bullsh*t." → styled kicker above
- [ ] about.html: H1 → "Built by someone who's trained thousands of real receptionists."
- [ ] contact.html: title → "Book a Call — Jackal AI | AI Receptionist for Aussie Tradies"

---

## Definition of Done (Sprint 2)

- [ ] view-source on index.html and ai-calls.html shows real stat values in spans
- [ ] prefers-reduced-motion bypass working on both counter pages
- [ ] All 6 pages have valid JSON-LD (no syntax errors, no fabricated ratings)
- [ ] /robots.txt resolves — AI crawlers explicitly allowed, Sitemap line present
- [ ] /sitemap.xml resolves — 10 pages, clean URLs
- [ ] vercel.json exists — cleanUrls true, 301s from .html paths
- [ ] Canonical tags on all pages — absolute URLs, clean paths
- [ ] /llms.txt resolves
- [ ] Per-page OG images — 1200×630, absolute URLs in og:image
- [ ] All images have meaningful alt text
- [ ] H1/title changes: index, about, contact updated
- [ ] PROGRESS.md updated
- [ ] Nothing from Sprint 3–4 touched

---

# Sprint 4 — Signature Animation & Scale ✅ IN PROGRESS
_Source: docs/website-review.md §5.1, §4.4, §4.2_

---

## Item 15 — GSAP call sequence (ai-calls.html) ✅

- [x] Remove 122-frame canvas preload (loader CSS/HTML/JS deleted)
- [x] Remove old how-it-works 3-card grid
- [x] Remove scroll-animation canvas section
- [x] Add `#call-sequence` section — left monitor panel + right transcript panel
- [x] Real transcript HTML text (crawlable) with `data-speaker` attributes
- [x] 10 cs-line divs with verbatim demo call exchange
- [x] GSAP ScrollTrigger pinned scrub (desktop ≥768px) via `gsap.matchMedia()`
- [x] Mobile <768px: CSS static reveal (all elements opacity:1)
- [x] `prefers-reduced-motion`: all animated elements visible, no rings
- [x] GSAP 3.12.5 + ScrollTrigger CDN added before inline script

## Item 16 — Programmatic trade pages ✅

- [x] `trades.json` — 6 trade entries + 1 Perth location entry, genuinely differentiated copy
- [x] `scripts/generate-pages.js` — Node script reads trades.json, generates HTML, updates sitemap
- [x] 7 pages generated: /ai-receptionist-for-{plumbers,electricians,builders,landscapers,air-conditioning,roofers} + /ai-receptionist-perth
- [x] Each page: unique H1/title/meta/OG, trade-specific pain points + how-it-works + FAQ
- [x] FAQPage + Service + BreadcrumbList JSON-LD on every page
- [x] 3 trade-specific FAQ questions + 3 universal FAQ questions per page
- [x] Internal link to /ai-calls on every page
- [x] Cal.com embed + mobile sticky bar on every page
- [x] sitemap.xml updated with 7 new URLs (priority 0.7)
- [x] No fabricated stats or testimonials

## Item 17 — Performance pass

- [x] Add `loading="lazy"` to below-fold images (about.html profile photo)
- [x] Generated trade pages have explicit `width`/`height` on brandmark images
- [x] `display=swap` in Google Fonts URL — font-display handled ✅
- [x] Demo-Call.MP3 is `preload="none"` — confirmed doesn't affect LCP
- [x] Resize `brandmark.png` — done
- [x] Resize `logo.png` — done
- [x] Compress `assets/about-me-profile-pic.jpg` — done
- [ ] Run Lighthouse mobile on index.html after image resize
- [ ] Run Lighthouse mobile on ai-calls.html after image resize
- [ ] Report LCP and CLS before/after

---

## Definition of Done (Sprint 4)

- [x] ai-calls.html: zero references to removed canvas/loader/how-it-works elements
- [x] Call sequence visible and readable without JS (reduced-motion / mobile)
- [x] 7 trade/location pages live with clean URLs
- [x] Each page has unique H1, title, meta description — no find-and-replace copy
- [x] All 7 pages in sitemap.xml
- [ ] Mobile LCP < 2.5s on index.html and ai-calls.html (Lighthouse)
- [ ] CLS < 0.1 on index.html and ai-calls.html
- [ ] PROGRESS.md updated
- [ ] CLAUDE.md updated with programmatic trade pages how-to
