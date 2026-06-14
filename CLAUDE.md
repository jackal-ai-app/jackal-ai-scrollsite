# Jackal AI — jackal-scroll-site

Static HTML/CSS/JS marketing site for jackalai.app. No build tooling. No frameworks. Deployed on Vercel.

---

## Stack

- Plain HTML/CSS/JS (one `<style>` block + one `<script>` block per file — inline, no external files)
- GSAP (loaded from CDN) for scroll animations on ai-calls.html and index.html
- Google Fonts: Archivo Black + Outfit (two fonts only — non-negotiable)
- Formspree for contact form submissions
- reCAPTCHA v3 on contact form
- Google Tag Manager (GTM-5JQ32785) on all pages
- Meta Pixel on contact.html
- Cal.com element-click embed on all pages (Sprint 1)
- Vercel deployment

## Pages

| File | Purpose |
|---|---|
| index.html | Homepage |
| ai-calls.html | AI Voice Receptionist product page |
| websites.html | Web Design services page |
| about.html | About / founder |
| contact.html | Contact form (secondary path — Cal.com embed added in Sprint 1) |
| book.html | Primary booking page — Cal.com inline embed (created Sprint 1) |
| calculator/index.html | ROI calculator (Sprint 3) |
| sample-call/index.html | Sample call player |
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

## CTA System (Sprint 1 decisions)

- **Primary CTA label:** "Book a free call" (all pages except websites.html)
- **Websites page primary:** "Book a discovery call"
- **Secondary CTA:** "Hear a demo call" (opens `#demoModal` — only on index.html and ai-calls.html)
- **Cal.com slug:** `jackal-ai/15min`
- **Element-click data attributes:** `data-cal-namespace="15min"` + `data-cal-link="jackal-ai/15min?utm_source=site&utm_content={page}"`
- **Stripe links:** kept as secondary "Ready to skip the call? Start checkout →" on pricing cards only

## Social links (Sprint 1)

- Instagram: https://www.instagram.com/jackal.ai/
- Facebook: https://www.facebook.com/people/Jackal-AI/61587872414237/
- LinkedIn: https://www.linkedin.com/in/jack-alexander-0b898a192

## Phone number

**PENDING** — search for `TODO_PHONE` to find all locations. Replace with real number when confirmed.

---

## Sprint Progress

- Sprint 1 — Conversion plumbing: **COMPLETE** ✅
- Sprint 2 — SEO/GEO foundation: **COMPLETE** ✅
- Sprint 3 — Content & trust: **COMPLETE** ✅
- Sprint 4 — Signature animation & scale: **IN PROGRESS** (Items 15, 16 done — Item 17 pending)

Full review + sprint plan: `docs/website-review.md`

---

## Programmatic Trade Pages

7 static landing pages targeting trade-specific and location keywords. Generated from `trades.json` via a Node script.

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
3. The new page is generated and sitemap.xml is updated automatically

**How to add a new location page:**
1. Add a new entry to `trades.locationPages[]` in `trades.json`
2. Set `slug`, `label`, `city`, `state`, and all content fields
3. Run `node scripts/generate-pages.js`

**Important:**
- Never edit generated `index.html` files directly — changes are overwritten on next run
- All copy lives in `trades.json`
- `cleanUrls: true` in `vercel.json` resolves `/ai-receptionist-for-plumbers/index.html` → `/ai-receptionist-for-plumbers`
- Asset paths in generated pages use `../` prefix (pages live in subdirectories)
