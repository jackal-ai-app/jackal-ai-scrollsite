# Jackal AI — jackal-scroll-site

Static HTML/CSS/JS marketing site for jackalai.app. No build tooling. No frameworks. Deployed on Vercel.

**Business direction (25 Sep 2026):** Jackal AI is an AI integration partner for trades and local service businesses. The site sells a result (more money, more time back) and every page's primary CTA is the free Business Streamlining Consult. The AI receptionist is one of the fixes. Source of truth: `docs/business-model-pivot/01-business-model-change.md` and `03-website-brief.md` in the parent jackal-ai-website workspace.

---

## Stack

- Plain HTML/CSS/JS (one `<style>` block + one `<script>` block per file — inline, no external files)
- GSAP (loaded from CDN) for scroll animations on ai-calls.html and index.html
- Google Fonts: Archivo Black + Outfit (two fonts only — non-negotiable)
- Formspree for contact form submissions
- reCAPTCHA v3 on contact form
- Google Tag Manager (GTM-5JQ32785) on all pages
- Meta Pixel on contact.html, consultation.html, book.html, calculator/index.html (`Schedule` on consult booking, `Lead` on calculator email)
- Cal.com embeds use the official namespace-aware loader (the Sprint 1 snippet never registered namespaces, so inline embeds threw `Cal.ns.x is not a function`; replaced 25 Sep 2026)
- Vercel deployment

## Pages

| File | Purpose |
|---|---|
| index.html | Homepage — results promise, job-cycle map (#fixes), how it works (#how), proof, promise, FAQ, founder |
| consultation.html | **Primary conversion page** — free Business Streamlining Consult, Cal.com inline embed (ad destination). `/audit` redirects here |
| ai-calls.html | AI receptionist product page — one of the fixes (Enquiries). Receptionist pricing lives here. `/receptionist` redirects here |
| websites.html | Websites + AI visibility — one of the fixes (Growth). Secondary CTA: discovery call |
| about.html | About / founder (CX-trainer story, reframed around integration) |
| contact.html | Contact form + 15-min quick-call embed (secondary path) |
| book.html | Consult booking — Cal.com inline embed |
| calculator/index.html | "What's admin (and missed work) costing you?" — user's own numbers, CTA to the consult. The missed-call calculator lives on ai-calls.html |
| sample-call/index.html | Sample receptionist call player |
| results.html | Not built. Add (and link in nav) only once at least 2 real, permissioned client results exist |
| privacy-policy.html | Legal |
| terms-of-service.html | Legal |

---

## Brand — Non-Negotiable

| Token | Value |
|---|---|
| Background | `#111111` (Graphite) |
| Surfaces / cards | `#2A2A28` (Iron) |
| Body text | `#E5D5BE` (Sandstone) |
| Muted text | `#B8A88E` (Dust) |
| Primary accent (CTAs only) | `#F59E0B` (Signal Amber) |
| Amber hover | `#D97706` |
| Fonts | Archivo Black (headlines) + Outfit (body/UI) — two only |

**Amber discipline:** one amber element per viewport maximum. CTAs and key stats only — never decorative.
**No stock photos. No purple/blue gradients. No rounded-everything.**
**Banned words:** cutting-edge, leverage, game-changer, revolutionary, supercharge, next-level, unlock growth, best-in-class, end-to-end, AI-powered solution, transform your business.
**Censoring style:** `bullsh*t` (not `bulls#!t`) — unified in Sprint 1.

---

## CTA System (pivot, 25 Sep 2026 — replaces the Sprint 1 decisions)

| Role | Label | Target |
|---|---|---|
| Primary (all pages) | **Book your free Business Streamlining Consult** (short: "Book your free consult") | `consultation.html` (`/consultation`) |
| Secondary (site-wide) | **Work out what admin's costing you** | `calculator/` |
| Proof (receptionist contexts only) | Hear Jess answer a test call | `#demoModal` (index proof section, ai-calls) |
| Receptionist page only | Ready to skip the call? Start checkout → | Existing Stripe links |
| Websites page secondary | Book a discovery call | Cal.com `jackal-ai/15min` |

- **Nav:** How it works · Fixes · (Results — hidden until live) · About · Book your free consult. Inner pages keep Fixes · AI Receptionist · Websites · About · Contact.
- **Cal.com:** the consult event is `jackal-ai/discovery-call` (https://cal.com/jackal-ai/discovery-call). `consultation.html` reads it from `CONSULT_CAL_LINK`; `book.html` embeds the same event.
- `jackal-ai/15min` stays for quick questions (contact page, websites discovery call).
- **Calculator leads** go to Comp AI CRM via `api/calculator-lead.js` (needs `CRM_API_URL` and `CRM_API_KEY` in Vercel). Check: `node scripts/check-calculator-lead.js`.
- **UTM:** `?utm_source=site&utm_content={page}`; ads use `utm_source=meta&utm_campaign=consultation&utm_content={creative}`.
- **Published prices (confirmed 2 Oct 2026):** "Fixes start at $1,500" and AI Partner "from $495 a month" (homepage, consult page, `/ai-for-*` pages); full Keep/Grow detail is in `llms.txt`.
- **"From $249/month"** appears only on the receptionist page and the `/ai-receptionist-*` pages.
- **No unsourced stats** anywhere (18.5 hrs, 51 hrs, 80%, 12+, $10K+, $5K, 3+ calls, $30K–$80K). Label any example "illustrative".

## Social links (Sprint 1)

- Instagram: https://www.instagram.com/jackal.ai/
- Facebook: https://www.facebook.com/people/Jackal-AI/61587872414237/
- LinkedIn: https://www.linkedin.com/in/jack-alexander-0b898a192

## Phone number

+61851226302 — Display: (08) 5122 6302 — tel: link: `tel:+61851226302`

---

## Sprint Progress

- Sprint 1 — Conversion plumbing: **COMPLETE** ✅
- Sprint 2 — SEO/GEO foundation: **COMPLETE** ✅
- Sprint 3 — Content & trust: **COMPLETE** ✅
- Sprint 4 — Signature animation & scale: **IN PROGRESS** (Items 15, 16 done — Item 17 pending)

Full review + sprint plan: `docs/website-review.md`

---

## Programmatic Pages

Two generated page sets share one page shell (`scripts/lib/shared.js`: GTM, org schema, CSS, footer icons, `esc`, idempotent `upsertSitemap`).

### Integration pages — `/ai-for-{slug}` (primary organic set)

7 pages: electricians, plumbers, hvac, builders, landscapers, cleaners, local-service-businesses.

| File | Purpose |
|---|---|
| `integrations.json` | Source of truth for all integration page copy (leaks, fixes, tools, FAQ, related receptionist page) |
| `scripts/generate-integration-pages.js` | Reads integrations.json → generates HTML → upserts sitemap.xml |
| `ai-for-{slug}/index.html` | Generated output (do not edit directly) |

Run `node scripts/generate-integration-pages.js`. Leaks are written as common situations, never statistics.

### Receptionist trade pages — `/ai-receptionist-*` (kept for search equity)

7 static landing pages targeting receptionist keywords. Generated from `trades.json` via a Node script. Primary CTA is the consult; each links to its matching `/ai-for-{trade}` page via `relatedIntegrationPage`.

**Page URLs:**
- `/ai-receptionist-for-plumbers`
- `/ai-receptionist-for-electricians`
- `/ai-receptionist-for-builders`
- `/ai-receptionist-for-landscapers`
- `/ai-receptionist-for-air-conditioning`
- `/ai-receptionist-for-roofers`
- `/ai-receptionist-perth`

**Files:**
| File | Purpose |
|---|---|
| `trades.json` | Source of truth for all trade/location page content |
| `scripts/generate-pages.js` | Reads trades.json → generates HTML → updates sitemap.xml |
| `ai-receptionist-for-{slug}/index.html` | Generated output (do not edit directly) |
| `ai-receptionist-perth/index.html` | Generated location page output |

**How to add a new trade:**
1. Add a new entry to `trades.trades[]` in `trades.json` (follow existing structure)
2. Run `node scripts/generate-pages.js` from the site root
3. The new page is generated and sitemap.xml is updated automatically (idempotent — re-running never duplicates URLs)

**How to add a new location page:**
1. Add a new entry to `trades.locationPages[]` in `trades.json`
2. Set `slug`, `label`, `city`, `state`, and all content fields
3. Run `node scripts/generate-pages.js`

**Important:**
- Never edit generated `index.html` files directly — changes are overwritten on next run
- All copy lives in `trades.json`
- `cleanUrls: true` in `vercel.json` resolves `/ai-receptionist-for-plumbers/index.html` → `/ai-receptionist-for-plumbers`
- Asset paths in generated pages use `../` prefix (pages live in subdirectories)
