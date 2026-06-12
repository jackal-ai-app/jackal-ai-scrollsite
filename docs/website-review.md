# Jackal AI Website Review — Design, Layout, Copy, SEO & Conversion

**Site:** www.jackalai.app
**Pages reviewed:** Home, AI Calls, Websites, About, Contact
**Goal:** High-converting site funnelling to a Cal.com booking (or signup). Every item written to be implementable by Claude Code.

---

## TL;DR — The 5 biggest levers

1. **One funnel, one CTA.** You currently have ~10 different CTA labels ("Talk to Our AI", "Book a Free AI Consult", "Get A Free Audit", "Claim Your Life Back", "Get a Quote", "Book a Demo", "See It In Action", "Hear a demo call", "Get started", "Get your site built") all landing on a contact form. Pick one primary action — **Book a call (Cal.com)** — and make everything else secondary.
2. **The live AI demo is your killer asset and it's buried.** A working phone number answered by your own AI *is* the product demo, the social proof, and the conversion mechanism in one. Right now the AI Calls page literally says "Or call us: —". That placeholder is actively costing you trust.
3. **Your animated stat counters render as zeros to Google and AI crawlers.** "0 hrs lost to admin", "$0K+ gone to voicemail" — that's what's in the HTML. Crawlers don't run your count-up animation. This kneecaps both SEO and AI-search citation.
4. **No keywords in any H1.** "More time. Less bulls#!t." is a great brand line but a dead H1. Search engines and AI answer engines weight H1s heavily.
5. **Direct-to-Stripe checkout with a $1,500–$4,500 setup fee is too much friction for cold traffic.** Primary path should be the booking; Stripe stays as the fast lane for hot buyers.

---

## 1. CONVERSION ARCHITECTURE (highest priority)

### 1.1 Cal.com booking funnel
- [ ] Create a dedicated `/book` page with Cal.com **inline embed** (use Cal's embed snippet, `layout: "month_view"`, brand-themed: graphite background, amber accent).
- [ ] Add Cal.com **element-click embed** so any CTA button site-wide opens the booking modal without a page navigation — fewer steps, higher conversion.
- [ ] Pass context into bookings: append `?utm_source=site&utm_content={page}` and prefill name/email where known so you see which page converted.
- [ ] Sticky header CTA on every page: **"Book a free call"** → Cal.com modal. Same label everywhere. Repetition builds the action; variety dilutes it.
- [ ] Keep the contact form as a secondary path ("Prefer to write? Send a message") below the embedded calendar on `/book` — not as the primary destination.
- [ ] Mobile: persistent bottom-bar CTA (thumb zone) with two buttons: **Book a call** / **Call the AI**. Tradies browse on phones at smoko — design for one-thumb action.

### 1.2 The live demo as a conversion weapon
- [ ] Get a dedicated phone number answered by your own Jackal agent and put it everywhere: header, hero, footer, CTA bands. Copy: **"Don't take our word for it — ring the AI: 08 XXXX XXXX."** This is the single most convincing thing you can do, and almost no competitor does it.
- [ ] Fix the `Or call us: —` placeholder on ai-calls.html immediately. An AI receptionist company with no phone number is a walking contradiction.
- [ ] Keep the web-call widget ("Start Live Call") but elevate it: floating action button on every page, pulsing amber, labelled "Talk to Jackal".
- [ ] After a demo call/audio ends, show one next step: "Want this answering your phone? Book a call." (modal CTA).

### 1.3 Pricing flow
- [ ] On pricing cards, swap CTA hierarchy: primary button = **"Book a setup call"** (Cal.com), secondary text link = "Ready now? Start checkout →" (existing Stripe links).
- [ ] Remove the tildes from `~$499` and `~$2,750` / `~$4,500`. Approximate pricing on a pricing page reads unfinished and erodes trust. Commit to numbers.
- [ ] Break out pricing to its own URL: `/pricing` (see SEO section — own URLs win citations). Keep the cards on ai-calls.html too; duplicate is fine with a canonical decision.
- [ ] Add an annual option or setup-fee-waived incentive if you want to push self-serve signup — otherwise the $1,500 setup will push everyone to "book a call" anyway, which is fine, just be deliberate about it.

### 1.4 Social proof (currently the weakest part of the site)
- [ ] One anonymous testimonial ("Jason M. Tradie · Australia") with a broken `99` quote-mark glyph is doing more harm than good. Fix the glyph, and either get 2–3 named testimonials with photos/business names, or replace the section with what you *can* prove:
  - Kelec case study card with real numbers (built in 48 hrs, live link — but see 4.2 re the vercel.app domain)
  - Embedded demo-call audio with a transcript
  - "Built in Perth, WA" + ABN + founder photo + real phone number = legitimacy stack
- [ ] The ChatDash analytics mock on the homepage shows **declining** metrics (↓ 8.3% conversations). You're demoing your own product with red arrows. Flip the mock data to positive trends.

### 1.5 Kill the contradictions
Crawlers and humans both notice these:
- [ ] Contact page: "live within 4–5 weeks" vs AI Calls FAQ: "Takes days, not weeks" vs Websites: "30 days" vs Kelec: "under 48 hours". Pick a number per product and use it everywhere. Suggest: AI receptionist = "live in under a week", websites = "30 days".
- [ ] "Less bulls#!t" (homepage hero) vs "Less bullsh*t" (footer). Pick one censoring style.
- [ ] Nav inconsistency: websites.html drops the FAQ link and swaps "Hear a demo call" for "Get a Quote". One nav, all pages: AI Calls · Websites · About · Contact + persistent **Book a free call** button.
- [ ] Footer social links are `#` placeholders and the LinkedIn URL renders as raw text. Remove dead icons, use a proper LinkedIn icon link.

---

## 2. PAGE-BY-PAGE

### 2.1 Homepage
**Positioning problem:** the homepage sells seven services (email responder, social content, quotes, expense tracking, chatbots, lead gen, web/brand design) while the AI Calls page sells one product. Cold visitors can hold one idea. Lead with the receptionist as the flagship; demote everything else.

- [ ] **Hero rework.** Keep the attitude, add the keywords:
  - Eyebrow: `AI Receptionist for Australian Tradies` (this also becomes keyword-bearing context)
  - H1: `More time. Less bulls#!t.` can stay as the visual headline **only if** you add a keyword-rich `<h1>` strategy — better: make the H1 `Your AI receptionist answers every call. You stay on the tools.` and keep "More time. Less bulls#!t." as a stylised kicker above it. Search engines read the H1; humans read the big type. You can style whichever line you want largest.
  - Subcopy: current line ("Suddenly there's a lot more getting done — and you're barely involved") is vague. Replace with concrete: `Answers 24/7 in a natural Aussie voice, captures the job details, books it into your calendar, texts you the summary. From $249/month.`
  - CTAs: primary **Book a free call**, secondary **Ring the AI now: 08 XXXX XXXX**.
- [ ] **Stats band:** fix the zero-rendering (see 4.1) AND the substance. "$XK+ gone to voicemail monthly" with no source violates your own "no made-up case studies" value. Replace with either (a) sourced industry stats with a citation line, or (b) the **ROI calculator** (see 5.2) — interactive, honest, and far more persuasive.
- [ ] **"Why your business is stuck" section:** five numbered problems is two too many. Cut to three (Missed calls, Admin after dark, Paying for a receptionist who sleeps). "Data Blindness" and "Leaking Cash" are weak/abstract for this audience.
- [ ] **Service stack:** compress the seven cards into a horizontal strip titled "Also in the toolbox" with one-liners, each linking out. Rewrite the two fluffy ones:
  - "Find New Jobs" — "break new ground" says nothing. Try: `Lead lists of real businesses in your area that match your ideal customer. Names, numbers, ready to call.`
  - "Fresh Web & Brand Design" — currently muddled. Try: `A site and brand built from what actually wins work in your trade — not a designer's mood board.`
- [ ] **FAQ:** good content (the "$249 sounds expensive" entry is genuinely strong). Add FAQPage schema (see 4.3) and 3–4 more question-phrased entries that match real search queries (see 4.4).
- [ ] **Final CTA band:** "Still on the tools... until midnight?" is great. Change the button from "Claim Your Life Back" → **Book a free call** (consistency beats cleverness at the point of action).

### 2.2 AI Calls page
This is your best page. Sharpen, don't rebuild.

- [ ] Hero CTAs: "Hear a demo call" is good as secondary; primary should be **Book a free call**. Add the phone number under the buttons.
- [ ] "How it works" currently runs two overlapping numbered sequences back-to-back (3 steps then 4 steps). Merge into one 4-step scroll-driven sequence (see 5.1).
- [ ] Comparison table (Jackal vs Voicemail vs Answering Service vs Receptionist) is excellent — it's exactly the kind of structured content AI engines cite. Keep it, ensure it's a real HTML `<table>`, and consider a "Share of cost" visual.
- [ ] The "What Else We Build" carousel ("Spin to explore") at the bottom of a product page leaks attention right before the close. Move it below the final CTA or cut to a slim 3-item strip.
- [ ] Claims hygiene: "answered in under 1 second", "70% of callers won't leave a voicemail" (rendering as 0%) — make sure every number is either true-and-stated or sourced. The voicemail stat has real industry sources; cite one.

### 2.3 Websites page
- [ ] Strongest copy on the site ("Found by Google. Cited by AI." is a great hook — practice what it preaches, see section 4). Main gaps:
- [ ] **Showcase credibility:** Kelec lives at `kelecec.vercel.app`. A web design agency showcasing a free-hosting subdomain undercuts the pitch. Put client sites on custom domains before linking them as portfolio.
- [ ] Only one real project + one "Your Business Name Here" placeholder = thin portfolio. Until you have 3+, restructure as a single deep case study (before/after, build time, Lighthouse scores, ranking results) rather than a grid that highlights how empty it is.
- [ ] No price anchor at all. "We quote after a call" is fine but add a from-price (`Sites from $X,XXX`) to qualify leads and reduce junk bookings.
- [ ] CTAs → Cal.com modal, label **Book a discovery call** consistently (currently mixes "Get a quote", "Get yours", "Get your site built", "Book a Discovery Call").

### 2.4 About page
- [ ] H1 "Built by someone who's trained thousands of real ones" — "real ones" is ambiguous out of context. Make it land instantly: `Built by someone who's trained thousands of real receptionists.`
- [ ] This page has your best trust content (founder story, principles, "no hype" values). Pull a condensed founder block (photo + 2 lines + credentials strip) onto the **homepage** — solo-founder authenticity converts in the tradie market; don't hide it three clicks deep.
- [ ] End-of-page CTA goes to the homepage demo anchor — change to Cal.com modal + phone number.
- [ ] Add `Person` schema for Jack Alexander linked to the Organization (see 4.3).

### 2.5 Contact page
- [ ] Becomes the secondary path once `/book` exists. Restructure: Cal.com embed at top ("Fastest way — grab a time"), form below ("Or send the details and we'll call you").
- [ ] Form: 6 fields + optional message is reasonable, but drop Last Name (first name + mobile + trade is enough to call someone back). Every removed field lifts completion.
- [ ] "Most businesses are live within 4–5 weeks" — see 1.5, contradicts everything else. Fix.

---

## 3. COPY & VOICE

Overall: the voice is genuinely good — direct, Aussie, no banned buzzwords spotted. Issues are consistency and specificity, not tone.

- [ ] **ALL-CAPS full-sentence headings** ("EVERY MISSED CALL IS MONEY OUT THE DOOR", "WORKS WITH WHAT YOU'VE ALREADY GOT") hurt readability and skimmability. Rule: caps for short labels/eyebrows (≤4 words), sentence case for headlines. Archivo Black carries plenty of weight without shouting.
- [ ] **Be specific over clever at decision points.** Clever lines belong in heroes and section intros; buttons and pricing copy should say exactly what happens ("Book a free call", "Hear a 90-second demo call").
- [ ] "Cinematic" appears 4× on the Websites page. Vary it: scroll-driven, frame-by-frame, film-grade — or just show it and say it less.
- [ ] Sweep for placeholder artifacts: `99` testimonial glyph, `—` phone, `#` socials, raw URLs as link text.

---

## 4. SEO & AI SEARCH OPTIMISATION (GEO)

### 4.1 The crawler-visible-zeros bug (fix first)
Your count-up animations leave `0`, `0+`, `$0K+` in the served HTML. Googlebot renders JS inconsistently and AI crawlers (GPTBot, ClaudeBot, PerplexityBot) mostly don't run JS at all — they see a site claiming tradies lose **zero dollars** to voicemail.
- [ ] Put the **final value in the markup** (`<span data-countup data-target="12">12</span>`), then have JS reset to 0 and animate **only after** an IntersectionObserver fires, with a `prefers-reduced-motion` bypass. Crawlers and reduced-motion users see real numbers; everyone else gets the animation.

### 4.2 Technical SEO checklist (Claude Code tasks)
- [ ] Verify/create `sitemap.xml` and `robots.txt` (with `Sitemap:` line). Submit to Google Search Console.
- [ ] **Don't block AI crawlers** in robots.txt — explicitly allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended if you want AI citations (you do — your Websites page sells exactly this).
- [ ] Clean URLs: drop `.html` extensions (Vercel: `"cleanUrls": true` in vercel.json) with 301s from old paths.
- [ ] Canonical tags on every page; ensure www/non-www and trailing-slash consistency.
- [ ] Per-page OG images at 1200×630 — currently `logo.png` everywhere. Generate branded cards (graphite + amber, page-specific headline).
- [ ] Descriptive `alt` text on all images (client photos, founder photo, brandmark) — currently generic.
- [ ] Performance budget: GSAP/canvas heroes are fine, but tradies are on 4G phones. Targets: LCP < 2.5s mobile, lazy-load below-fold media, preload the hero font, compress the demo MP3, `font-display: swap`.
- [ ] Set up **Google Business Profile** (Perth) — the single biggest local-discovery lever, and it feeds AI answers for "AI receptionist Perth".

### 4.3 Structured data (JSON-LD) — currently the biggest missing layer
Add to every page as appropriate:
- [ ] `Organization` + `LocalBusiness` (name, logo, Perth WA address/area served, phone, founder, sameAs → LinkedIn, ABN if comfortable).
- [ ] `Service` schema on Home/AI Calls (serviceType: "AI voice receptionist", areaServed: Australia, provider: Jackal AI).
- [ ] `Product`/`Offer` schema for the three plans with real prices ($249/$499/$999 AUD) — pricing schema is heavily used by AI answer engines for "how much does X cost" queries.
- [ ] `FAQPage` schema on both FAQ sections.
- [ ] `Person` schema (Jack Alexander, jobTitle, worksFor, sameAs LinkedIn) on About.
- [ ] `BreadcrumbList` site-wide.

### 4.4 Content for AI citation
AI engines cite pages that answer questions with concrete, extractable facts.
- [ ] Add an `llms.txt` at the root: one-page plain-text summary of who you are, what you do, pricing, location, integrations, contact.
- [ ] Rewrite/add FAQ entries phrased as real queries: "How much does an AI receptionist cost in Australia?", "What's the best AI phone answering service for tradies?", "Can an AI receptionist book jobs into ServiceM8?". Answer each in the first sentence, plainly, with the number/name included.
- [ ] State citable facts in plain HTML text (not just graphics): founded year, Perth WA, founder name, price points, integration list (ServiceM8, Tradify, Simpro, Xero, MYOB, Google Calendar). The integrations marquee should also exist as a crawlable text list.
- [ ] **Programmatic landing pages** — the big growth lever once the core is fixed: `/ai-receptionist-for-plumbers`, `/ai-receptionist-for-electricians`, `/ai-receptionist-perth`, etc. Same template, trade-specific copy, FAQ and schema per page. This is how you own long-tail queries like "AI receptionist for plumbers Australia" in both Google and AI answers. Claude Code can generate these from a single template + a JSON file of trades.
- [ ] Entity consistency: identical business name + one-line description across site, LinkedIn, GBP, Stripe checkout. AI engines reconcile entities across the web; inconsistency = no citation.

### 4.5 Page titles & H1s
| Page | Current issue | Fix |
|---|---|---|
| Home | H1 has zero keywords | H1: "Your AI receptionist answers every call. You stay on the tools." Title is already decent. |
| AI Calls | H1 "STOP LOSING JOBS TO VOICEMAIL" — punchy but keyword-light | Keep as visual headline; add keyword context in eyebrow + first paragraph ("AI voice receptionist for Australian trades") — already partially there, strengthen. |
| Websites | Title fine; thin body content | Add the case-study depth (4.2.3) — more crawlable substance. |
| About | "real ones" ambiguity | "…trained thousands of real receptionists" |
| Contact | Generic | Title: "Book a Call — Jackal AI | AI Receptionist for Aussie Tradies" |

---

## 5. DESIGN & ANIMATION DIRECTION

You asked for award-site quality without AI slop. The slop tells to avoid: dark page + glowing gradient orbs + glassmorphism cards + identical three-column feature grids + purple-blue gradients + generic numbered circles. Your brand already has the antidote — Graphite #111111 + Signal Amber #FFB800 + Archivo Black is a strong, ownable system. Lean into it harder.

### 5.1 The signature moment: a scroll-scrubbed live call
Spend the animation budget in ONE place (Apple-style scroll narrative, which you already like):
- [ ] On the AI Calls page, replace the two overlapping "how it works" lists with a single pinned, scroll-driven sequence: phone rings → tradie up a ladder ignores it → Jackal answers → a **real call transcript types out line by line as you scroll** (use your actual demo-call transcript) → calendar slot fills → SMS summary lands. The product demo *is* the animation. GSAP ScrollTrigger + pinned section; transcript as real HTML text (crawlable bonus).
- [ ] Everything else stays disciplined: subtle reveals (opacity/translate, 0.4–0.6s, custom ease), hover micro-interactions on cards, the existing integrations marquee. No parallax soup.

### 5.2 ROI calculator (conversion + engagement + citation in one)
- [ ] Build a missed-call calculator: two sliders (avg job value, missed calls/week) → "You're losing ~$X,XXX/month. Jackal costs $249." → **Book a free call** button. Replaces the unsourced stat counters with honest, personalised maths. Vanilla JS, no dependencies.

### 5.3 Visual identity sharpening
- [ ] **Imagery:** the stock "happy business owner client" headshots on the Websites page read as filler. Real Aussie job-site photography (or none) — utes, tool belts, ladders, dust. One strong authentic image beats three stock smiles.
- [ ] **Type system:** Archivo Black for short, hard-hitting display lines (2–5 words); Outfit for everything else. Avoid setting full sentences in the display face — that's what's forcing the ALL-CAPS shouting.
- [ ] **Amber discipline:** one amber element per viewport — the CTA. If amber highlights headings, stats, and buttons simultaneously, the CTA stops popping.
- [ ] **Numbered markers (01–05):** keep only where order genuinely matters (the build process, the call flow). Remove from the "problems" grid — those aren't a sequence.
- [ ] **Familiar where it counts:** sticky nav, standard pricing cards, accordion FAQs, footer sitemap. Differentiate with motion, type, and voice — not with navigation users have to learn.
- [ ] Respect `prefers-reduced-motion` globally; visible focus states; 44px+ touch targets on mobile.

### 5.4 Reference patterns (study, don't copy)
- **Apple product pages** — pinned scroll-scrubbed product narrative (your call sequence).
- **Linear / Stripe** — restraint: one accent colour, motion only in the hero/product demo, ruthless copy economy.
- **Awwwards SOTD trade/industrial sites** — search "Awwwards industrial" / "construction" for heroes that use grit and big type instead of gradients; that's your lane.
- **Smith.ai / competitor receptionist sites** — note how they all look the same (blue SaaS, stock photos, no live demo). Your dark/amber + a phone number that the AI actually answers is instant differentiation.

---

## 6. PRIORITISED BUILD ORDER FOR CLAUDE CODE

**Sprint 1 — Conversion plumbing (do first, ~1 session)**
1. Cal.com: `/book` page (inline embed) + element-click modal wired to every CTA
2. Unify CTA labels site-wide → "Book a free call" primary
3. Fix placeholders: phone number, `#` socials, `99` glyph, `~` prices, censoring consistency, timeline contradictions
4. Mobile sticky bottom CTA bar
5. Pricing cards: Book-a-call primary, Stripe secondary

**Sprint 2 — SEO/GEO foundation (~1 session)**
6. Counter fix (real values in markup, animate-on-scroll)
7. JSON-LD across all pages (Org, LocalBusiness, Service, Offer, FAQPage, Person)
8. sitemap.xml, robots.txt (AI crawlers allowed), clean URLs + 301s, canonicals
9. Per-page OG images, alt text sweep, llms.txt
10. H1/title rewrites per table in 4.5

**Sprint 3 — Content & trust (~1–2 sessions)**
11. Homepage hero rework + problems cut to 3 + service stack compressed
12. ROI calculator
13. Social proof rebuild (Kelec case study, founder block on homepage, analytics mock fixed)
14. FAQ expansion with query-phrased entries

**Sprint 4 — Signature animation & scale (~2 sessions)**
15. Scroll-scrubbed call sequence on AI Calls page
16. Programmatic trade/location landing pages from template + JSON
17. Performance pass (LCP, lazy-load, font preload)

---

*Prepared for Jack / Jackal AI — June 2026. Every checkbox is scoped to be a discrete Claude Code task; feed sprints in order, one sprint per session, with the usual plan-first checkpoint.*
