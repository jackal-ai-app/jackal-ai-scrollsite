# Homepage TODO
_jackal-scroll-site/index.html — Primary goal: Book the free consult_
_Audit date: 2026-04-30 | Full report: outputs/reports/2026-04-30-homepage-audit.md_

---

## 🔴 Critical — Messaging & CRO (highest conversion impact)

- [x] **Swap CTA hierarchy** — "Book Free Consult" gets the amber primary button everywhere (hero, nav, flagship section). "Hear the demo" becomes the ghost/secondary button.
- [x] **Rewrite hero above the fold** — sub-copy updated to voice receptionist value prop. Eyebrow kept as "Australian Tradies AI Agency" (intentional — broader service offering).
- [x] **Remove `[Name]` placeholder** from testimonial (line ~2394) — replaced with "Jason M. · Tradie · Australia".
- [x] **Add "How it works" process plan** — 3 numbered steps immediately below the flagship section. E.g.: "1. Book a free 30-min call. 2. We configure your AI in 48 hrs. 3. Never miss a call again."

---

## 🟡 High Priority — Conversion & Trust

- [ ] **Add success-state section** — vivid scenario of a tradie's life with Jackal running. E.g.: "Saturday 11pm, you're asleep. A caller books a kitchen reno. Monday morning: three new jobs in your calendar, zero effort."
- [ ] **Fix stale scarcity copy** — "Only 4 onboarding slots left for Q4" (line ~2735) is now Q2 2026. Remove or update.
- [ ] **Surface top 2 objections inline** — move "Will it sound like a robot?" near the flagship section; move "$249 sounds expensive" near the consult CTA.

---

## 🟠 Code Quality

- [ ] **Remove production TODO comment** — line 2052: `<!-- TODO: Replace with Chatdash call widget embed -->`
- [ ] **Fix duplicate `.rec-ctas` CSS** — defined at ~line 543 and again at ~680. Remove the duplicate.
- [ ] **Fix `.nav-cta` !important overuse** — 6 `!important` declarations. Use `.nav-links .nav-cta` specificity instead.
- [ ] **Fix global onclick pollution** — 7 functions on `window` via inline `onclick=""`. Replace with `addEventListener`.
- [ ] **Fix duplicate keydown handlers** — carousel (~line 3076) and demo modal (~line 3170) both listen globally. Combine into one.

---

## 🔵 Architecture

- [ ] **Delete dead code — hidden sections** (~1,600 lines):
  - Pricing: `<section id="pricing" style="display:none">` + its CSS
  - Old carousel: `<section id="services" style="display:none">` + its CSS (~900 lines) + carousel JS
- [ ] **Rename `#services-new` → `#services`** after deleting the old hidden `#services`
- [ ] **Fix starscape rAF** — add `visibilitychange` listener to pause when tab is hidden (mobile battery)
- [ ] **Non-blocking Google Fonts** — use `rel="preload"` or `media="print" onload` swap pattern
- [ ] **Extract CSS/JS to separate files** — `styles.css`, `index.css`, `main.js`

---

## ✅ Done

- **Swap CTA hierarchy** — amber = "Book Free Consult" everywhere; demo = ghost/secondary
- **Rewrite hero** — sub-copy replaced with voice receptionist value prop; eyebrow kept as "Australian Tradies AI Agency" (intentional broader positioning)
- **Remove `[Name]` placeholder** — testimonial shows "Jason M. · Tradie · Australia"
- **Add "How it works" section** — 3-step plan added after flagship section with CTA to contact.html
- **Fix stale scarcity copy** — "Q4 onboarding slots" copy already removed from the file
