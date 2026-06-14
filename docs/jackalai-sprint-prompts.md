# Jackal AI Website — Sprint 2–4 Claude Code Kickoff Prompts

Store this in the repo as `docs/sprint-prompts.md`. Run one sprint per session.
Each prompt assumes the previous sprint is merged and PROGRESS.md is current.
Paste the relevant block as your opening message in a fresh Claude Code session.

---

## SPRINT 2 — SEO & GEO FOUNDATION

```
# JACKAL AI WEBSITE — SPRINT 2 KICKOFF

## Context
This repo is the Jackal AI marketing site (jackalai.app) — static HTML/CSS/JS,
GSAP, deployed on Vercel. Sprint 1 (conversion plumbing) is complete.
Before doing anything else, read in this order:
1. CLAUDE.md — project context and decisions made
2. PROGRESS.md — what's been done
3. docs/website-review.md — the master review; this session is SPRINT 2 ONLY
   (build order items 6–10). Do not touch Sprint 3–4 items.

## Step 0 — Skills
Scan available skills (.claude/skills/ and installed packs). Load the ones
relevant to this sprint, specifically anything covering:
- SEO / structured data / metadata
- copywriting / brand voice (H1 and title rewrites)
- QA / review (schema validation, link checking)
List which skills you loaded and why in your plan. If a relevant capability
has no skill pack, say so.

## Step 1 — Plan-first checkpoint (do not write code yet)
Produce an implementation plan covering:
1. COUNTER FIX — every animated stat must have its final real value in the
   served HTML (data-target pattern), animating from 0 only after an
   IntersectionObserver fires, with a prefers-reduced-motion bypass.
   Audit every counter and list the real value you'll use for each. If any
   number is unsourced or unknown, flag it — do not invent values.
2. JSON-LD — Organization + LocalBusiness (site-wide), Service (home,
   ai-calls), Product/Offer for the three plans with real AUD prices,
   FAQPage on both FAQ sections, Person (Jack Alexander) on about,
   BreadcrumbList site-wide. Show me one full example block per type in
   the plan before implementing.
3. CRAWL INFRASTRUCTURE — sitemap.xml, robots.txt (explicitly ALLOW GPTBot,
   ClaudeBot, PerplexityBot, Google-Extended; include Sitemap: line),
   vercel.json cleanUrls + 301 redirects from .html paths, canonical tags,
   www/trailing-slash consistency.
4. OG IMAGES — per-page 1200×630 branded cards (graphite + amber,
   page-specific headline). Propose the generation approach (template HTML
   rendered to PNG, or static designs) before building.
5. ALT TEXT SWEEP — every image gets descriptive alt text. List them in
   the plan.
6. llms.txt — root-level plain-text summary: who, what, pricing, location,
   integrations, contact. Draft it in the plan.
7. H1 / TITLE REWRITES — implement the table in section 4.5 of the review.
   Keep the brand headline visually dominant where specified; the H1 tag
   carries the keywords.
STOP and present the plan. Wait for approval before writing code.

## Step 2 — Continuity
Update TODO.md with Sprint 2 checkboxes before starting. Update PROGRESS.md
after each completed item. Record schema decisions in CLAUDE.md.

## Inputs you need from me (ask in the plan if missing)
- Real values + sources for every stat counter: [LIST OR "flag each"]
- Business details for schema: phone [____], service area [Australia-wide /
  Perth metro?], founded date [____], ABN — include? [Y/N], email [____]
- Confirm prices for Offer schema: $249 / $499 / $999 AUD + setup fees
- Google Search Console access set up? [Y/N — if N, give me setup steps]

## Hard constraints
- Brand: Graphite #111111, Signal Amber #FFB800, Archivo Black + Outfit.
- Banned words (never use): cutting-edge, leverage, game-changer,
  revolutionary, supercharge, next-level, unlock growth, best-in-class,
  end-to-end, AI-powered solution, transform your business.
- Never fabricate stats, reviews, ratings, or aggregate scores in schema —
  no AggregateRating without real reviews. Schema must describe what's
  actually on the page.
- No new frameworks or build tooling.
- Validate all JSON-LD (no syntax errors, required fields present) and all
  redirects before calling done.

## Definition of done (Sprint 2)
- View-source on every page shows real stat values, valid JSON-LD,
  canonical, unique title/meta/OG image
- /sitemap.xml, /robots.txt, /llms.txt all resolve
- Old .html URLs 301 to clean URLs; no broken internal links
- Every image has meaningful alt text
- TODO.md ticked, PROGRESS.md updated, changes summarised
- Nothing from Sprint 3–4 started
```

---

## SPRINT 3 — CONTENT & TRUST

```
# JACKAL AI WEBSITE — SPRINT 3 KICKOFF

## Context
This repo is the Jackal AI marketing site (jackalai.app) — static HTML/CSS/JS,
GSAP, deployed on Vercel. Sprints 1–2 are complete.
Read in order: CLAUDE.md → PROGRESS.md → docs/website-review.md.
This session is SPRINT 3 ONLY (build order items 11–14). Do not start the
scroll-scrubbed call sequence or programmatic pages — those are Sprint 4.

## Step 0 — Skills
Scan available skills and load the ones relevant to this sprint:
- brand voice / copywriting (hero rework, FAQ entries — heaviest copy
  sprint of the four)
- frontend design (calculator UI, founder block, case study card)
- QA / review
List which skills you loaded and why. Flag gaps.

## Step 1 — Plan-first checkpoint (do not write code yet)
Produce an implementation plan covering:
1. HOMEPAGE HERO REWORK — per review section 2.1: keyword-bearing H1
   ("Your AI receptionist answers every call. You stay on the tools."),
   "More time. Less bulls#!t." as the stylised kicker, concrete subcopy
   with price, CTAs = Book a free call + Ring the AI. Draft the full hero
   copy in the plan for sign-off.
2. PROBLEMS SECTION — cut five to three (Missed calls, Admin after dark,
   Paying for a receptionist who sleeps). Remove numbered markers — these
   aren't a sequence. Draft copy in the plan.
3. SERVICE STACK COMPRESSION — seven cards → one horizontal "Also in the
   toolbox" strip with one-liners. Rewrite "Find New Jobs" and "Fresh Web
   & Brand Design" per the review. Draft all seven one-liners in the plan.
4. ROI CALCULATOR — two sliders (avg job value, missed calls/week) →
   monthly loss vs $249 → Book a free call CTA. Vanilla JS, no deps,
   works without JS degraded (static example values visible to crawlers).
   Propose default slider values and the maths in the plan.
5. SOCIAL PROOF REBUILD — fix the broken quote glyph; Kelec case study
   card with REAL numbers only (ask me for them); condensed founder block
   on the homepage (photo, two lines, credentials strip); flip the
   ChatDash analytics mock to positive trends.
6. FAQ EXPANSION — add query-phrased entries ("How much does an AI
   receptionist cost in Australia?", "Can an AI receptionist book jobs
   into ServiceM8?", etc.). Answer in the first sentence with the number/
   name included. Draft all new Q&As in the plan. Update FAQPage schema
   to match.
STOP and present the plan with all draft copy. Wait for approval.

## Step 2 — Continuity
Update TODO.md with Sprint 3 checkboxes. Update PROGRESS.md per item.
Record final approved copy decisions in CLAUDE.md.

## Inputs you need from me (ask in the plan if missing)
- Kelec case study real numbers: build time, performance scores, any
  results [____] — if I can't provide, ship the card without numbers
  rather than inventing them
- Real testimonials with names/businesses, if any exist yet: [____]
- Founder photo path in repo: [____]
- ROI calculator defaults: avg job value $[____], missed calls/week [____]

## Hard constraints
- Brand palette/fonts and banned-words list as per CLAUDE.md.
- Voice: direct, Aussie, specific over clever. ALL-CAPS only for labels
  of 4 words or fewer; sentence case for headlines.
- Never fabricate testimonials, stats, or case study numbers. If a real
  number doesn't exist, redesign the element so it isn't needed.
- One amber element per viewport — the CTA.
- Calculator and all new copy must be crawlable static HTML.
- No new frameworks or build tooling.

## Definition of done (Sprint 3)
- New hero, problems, and toolbox sections live with approved copy
- Calculator works on mobile, degrades without JS, drives to Cal.com
- Zero fabricated proof anywhere on the site; analytics mock trends green
- Founder block on homepage; quote glyph fixed
- FAQ entries live and mirrored in FAQPage schema
- TODO.md ticked, PROGRESS.md updated
- Nothing from Sprint 4 started
```

---

## SPRINT 4 — SIGNATURE ANIMATION & SCALE

```
# JACKAL AI WEBSITE — SPRINT 4 KICKOFF

## Context
This repo is the Jackal AI marketing site (jackalai.app) — static HTML/CSS/JS,
GSAP, deployed on Vercel. Sprints 1–3 are complete.
Read in order: CLAUDE.md → PROGRESS.md → docs/website-review.md.
This session is SPRINT 4 (build order items 15–17) — the final sprint.

## Step 0 — Skills
Scan available skills and load the ones relevant to this sprint:
- frontend design / animation (the scroll sequence is the centrepiece —
  this is the sprint to load every design and motion skill available)
- SEO (programmatic page templates, schema per generated page)
- QA / performance review
List which skills you loaded and why. Flag gaps.

## Step 1 — Plan-first checkpoint (do not write code yet)
Produce an implementation plan covering:
1. SCROLL-SCRUBBED CALL SEQUENCE (ai-calls page) — replace the two
   overlapping how-it-works lists with ONE pinned, scroll-driven GSAP
   ScrollTrigger sequence: phone rings → tradie can't answer → Jackal
   picks up → real call transcript types out line by line as the user
   scrolls → calendar slot fills → SMS summary lands. Requirements:
   - Transcript is real HTML text in the DOM (crawlable), sourced from
     my actual demo call — ask me for the transcript
   - Full prefers-reduced-motion fallback: static sequential layout,
     no pinning
   - Mobile-first: must feel good on a phone, not just desktop
   - Storyboard the sequence (scroll position → what happens) in the
     plan before writing any code
2. PROGRAMMATIC LANDING PAGES — template + data approach:
   - One template page + trades.json (trade name, pain points, copy
     variables, FAQ variants)
   - Generate /ai-receptionist-for-{trade} pages — start with: plumbers,
     electricians, builders, landscapers, hvac, roofers — plus
     /ai-receptionist-perth
   - Each page: unique H1/title/meta/OG, trade-specific FAQ + FAQPage
     schema, Service schema with the trade as audience, internal links
     to/from main pages, added to sitemap.xml
   - Copy must be genuinely differentiated per trade — different pain
     points and examples, not find-and-replace of the trade name. Draft
     one full example page (plumbers) in the plan for sign-off before
     generating the rest.
3. PERFORMANCE PASS — targets: mobile LCP < 2.5s, CLS < 0.1 on every
   page including new ones. Lazy-load below-fold media, preload hero
   fonts, font-display: swap, compress the demo MP3, audit GSAP payload,
   defer non-critical JS. Report before/after Lighthouse scores per page.
STOP and present the plan (with storyboard and example trade page).
Wait for approval.

## Step 2 — Continuity
Update TODO.md with Sprint 4 checkboxes. Update PROGRESS.md per item.
Document the trades.json schema and page-generation process in CLAUDE.md
so future trades can be added in one step.

## Inputs you need from me (ask in the plan if missing)
- Demo call transcript (verbatim text): [PASTE]
- Confirm initial trade list and whether to include more cities than
  Perth: [____]
- Any trade-specific pricing or service differences: [____]

## Hard constraints
- Brand palette/fonts and banned-words list as per CLAUDE.md.
- Spend the boldness in one place: the call sequence is the signature.
  Everything else stays quiet — no new scattered effects elsewhere.
- One amber element per viewport — the CTA.
- prefers-reduced-motion respected on every animation, no exceptions.
- Programmatic pages: no thin/duplicate content — if a trade page can't
  be meaningfully differentiated, cut it from the list rather than ship
  filler.
- Never fabricate stats or testimonials on generated pages.
- No new frameworks. If the page generation needs a build step, propose
  the lightest option (Node script run manually) in the plan first.

## Definition of done (Sprint 4)
- Call sequence live, scrubs smoothly on mobile, transcript crawlable,
  reduced-motion fallback verified
- All trade pages live, in sitemap, each with unique schema and
  differentiated copy
- Lighthouse mobile: LCP < 2.5s and CLS < 0.1 on home, ai-calls, and at
  least two generated pages — scores reported
- CLAUDE.md documents how to add a new trade page in one step
- TODO.md ticked, PROGRESS.md updated, full project summary written
```

---

## Usage notes

- Fill the `[____]` inputs before pasting, or leave them and let Claude Code
  ask in its plan — but never let it proceed past the checkpoint with
  unknowns unflagged.
- If a sprint runs long, end the session after PROGRESS.md is updated and
  resume with: "Read CLAUDE.md, PROGRESS.md, TODO.md and continue Sprint N
  from the first unticked item. Plan-first checkpoint still applies."
- After Sprint 4, run a final cross-sprint QA session: grep for placeholder
  artifacts, click every link, validate all schema, full Lighthouse pass.
