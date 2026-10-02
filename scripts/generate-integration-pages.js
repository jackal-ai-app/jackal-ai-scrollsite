/**
 * generate-integration-pages.js
 * Run: node scripts/generate-integration-pages.js
 * Reads integrations.json, generates the /ai-for-{slug} integration pages, updates sitemap.xml.
 * Spec: docs/business-model-pivot/03-website-brief.md §6 (in the jackal-ai-website repo).
 * To add a page: add an entry to integrations.json and re-run. Never edit the generated index.html files.
 */
'use strict';

const fs   = require('fs');
const path = require('path');
const { GTM_HEAD, GTM_NOSCRIPT, ORG_SCHEMA, CSS, SOCIAL_SVGS, esc, upsertSitemap } = require('./lib/shared');

const rootDir = path.join(__dirname, '..');
const data    = JSON.parse(fs.readFileSync(path.join(rootDir, 'integrations.json'), 'utf8'));

const SITE_URL = 'https://jackalai.app';
const TODAY    = new Date().toISOString().slice(0, 10);
const PREFIX   = 'ai-for-';

const UNIVERSAL_FAQS = [
  { q: 'What does it cost?', a: "The consult's free. Fixes start at $1,500, and each one gets a fixed price in your written plan before you commit. AI Partner, where we keep it all running and report the numbers, starts at $495 a month." },
  { q: 'Will I have to change software?', a: "No. We plug into what you already use. If something truly can't connect, we'll tell you in the consult." },
  { q: 'Am I locked in?', a: 'No. Month to month, no exit fees. You own everything we build.' }
];

const EXTRA_CSS = `
    /* INTEGRATION PAGES */
    .fix-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .fix-card { background: rgba(17,17,17,0.4); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 24px; }
    .fix-stage { font-family: 'Archivo Black', sans-serif; font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--white); margin-bottom: 12px; }
    .fix-row { font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 8px; }
    .fix-row b { display: block; font-family: 'Archivo Black', sans-serif; font-weight: 400; font-size: 0.6rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--slate); }
    .fix-row.result { color: var(--sandstone); font-weight: 600; }
    .tool-strip { display: flex; flex-wrap: wrap; gap: 10px; }
    .tool-chip { font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: var(--text-body); border: 1px solid rgba(255,255,255,0.12); border-radius: 100px; padding: 8px 16px; }
    .tp-cta-band { text-align: center; }
    .tp-cta-band .tp-body { margin-left: auto; margin-right: auto; margin-bottom: 32px; }
    @media (max-width: 760px) { .fix-grid { grid-template-columns: 1fr; } }`;

function serviceSchema(page) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `AI integration for ${page.label}`,
    serviceType: 'AI integration and automation',
    description: page.metaDescription,
    provider: { '@type': 'Organization', name: 'Jackal AI', url: SITE_URL },
    areaServed: { '@type': 'City', name: 'Perth', containedInPlace: { '@type': 'State', name: 'Western Australia' } },
    offers: { '@type': 'Offer', name: 'Free Business Streamlining Consult', price: '0', priceCurrency: 'AUD' }
  }, null, 2);
}

function faqSchema(faqs) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
  }, null, 2);
}

function breadcrumbSchema(page) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: `AI for ${page.label}`, item: `${SITE_URL}/${PREFIX}${page.slug}` }
    ]
  }, null, 2);
}

function buildPage(page) {
  const fullSlug  = `${PREFIX}${page.slug}`;
  const canonical = `${SITE_URL}/${fullSlug}`;
  const utm       = `utm_source=site&utm_content=${fullSlug}`;
  const faqs      = [...page.faq, ...UNIVERSAL_FAQS];

  const leaksHTML = page.leaks.map((l, i) => `
          <div class="pain-card">
            <div class="pain-n">0${i + 1}</div>
            <h3>${esc(l.heading)}</h3>
            <p>${esc(l.body)}</p>
          </div>`).join('');

  const fixesHTML = page.fixes.map(f => `
          <div class="fix-card">
            <div class="fix-stage">${esc(f.stage)}</div>
            <p class="fix-row"><b>What we plug in</b>${esc(f.fix)}</p>
            <p class="fix-row result"><b>The result</b>${esc(f.result)}</p>
          </div>`).join('');

  const toolsHTML = page.tools.map(t => `<span class="tool-chip">${esc(t)}</span>`).join('\n          ');

  const faqHTML = faqs.map((faq, i) => `
        <div class="faq-item" id="faq-${i}">
          <button class="faq-q" onclick="toggleFaq(${i})" aria-expanded="false">
            <span class="faq-q-text">${esc(faq.q)}</span>
            <div class="faq-chevron">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </button>
          <div class="faq-a"><p>${esc(faq.a)}</p></div>
        </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
${GTM_HEAD}
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(page.metaTitle)}</title>
  <meta name="description" content="${esc(page.metaDescription)}">
  <meta property="og:title" content="${esc(page.metaTitle)}">
  <meta property="og:description" content="${esc(page.metaDescription)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SITE_URL}/assets/og/home.png">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" type="image/png" href="../brandmark.png">

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
  ${ORG_SCHEMA}
  </script>
  <script type="application/ld+json">
  ${serviceSchema(page)}
  </script>
  <script type="application/ld+json">
  ${faqSchema(faqs)}
  </script>
  <script type="application/ld+json">
  ${breadcrumbSchema(page)}
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>${CSS}${EXTRA_CSS}
  </style>
</head>
<body>
${GTM_NOSCRIPT}

  <!-- NAVBAR -->
  <nav id="navbar">
    <div class="nav-inner">
      <a href="/" class="nav-logo">
        <img src="../brandmark.png" alt="Jackal AI" width="28" height="28">
        <span class="nav-wordmark">JACKAL<sup>AI</sup></span>
      </a>
      <div class="nav-links">
        <a href="/#how">How it works</a>
        <a href="/#fixes">Fixes</a>
        <a href="/about">About</a>
        <a href="/consultation?${utm}-nav" class="nav-cta">Book your free consult</a>
      </div>
      <button class="nav-hamburger" id="navHamburger" aria-label="Open menu" aria-expanded="false" onclick="toggleMobileNav()">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="nav-mobile" id="navMobile">
    <a href="/#how">How it works</a>
    <a href="/#fixes">Fixes</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
    <a href="/consultation?${utm}-nav" class="nav-mobile-cta">Book your free consult</a>
  </div>

  <!-- HERO -->
  <section class="tp-hero">
    <div class="tp-hero-inner">
      <p class="tp-eyebrow">${esc(page.eyebrow)}</p>
      <h1 class="tp-h1">${esc(page.h1)}</h1>
      <p class="tp-sub">${esc(page.heroSub)}</p>
      <div class="tp-hero-btns">
        <a href="/consultation?${utm}-hero" class="btn-amber">Book your free consult</a>
        <a href="/calculator" class="btn-ghost">Work out what admin's costing you &rarr;</a>
      </div>
    </div>
  </section>

  <!-- LEAKS -->
  <section class="tp-section">
    <div class="tp-inner">
      <p class="tp-label">Where it leaks</p>
      <h2 class="tp-heading">Sound familiar?</h2>
      <div class="pain-grid">
        ${leaksHTML}
      </div>
    </div>
  </section>

  <!-- FIXES -->
  <section class="tp-section tp-section-alt">
    <div class="tp-inner">
      <p class="tp-label">What we plug in</p>
      <h2 class="tp-heading">Fixes for ${esc(page.label.toLowerCase())}.</h2>
      <p class="tp-body">We don't sell you all of these. The consult finds the one that pays back first, and we start there.</p>
      <div class="fix-grid">
        ${fixesHTML}
      </div>
    </div>
  </section>

  <!-- TOOLS -->
  <section class="tp-section">
    <div class="tp-inner">
      <p class="tp-label">Works with what you've already got</p>
      <h2 class="tp-heading">No ripping out your systems.</h2>
      <p class="tp-body">We make the ones you already pay for work together.</p>
      <div class="tool-strip">
          ${toolsHTML}
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="tp-section tp-section-alt">
    <div class="tp-inner">
      <p class="tp-label">How it works</p>
      <h2 class="tp-heading">Three steps. No lock-in.</h2>
      <div class="hiw-steps">
          <div class="hiw-step" data-n="01">
            <h3>Free Business Streamlining Consult (30 min)</h3>
            <p>We walk through how a job moves through your business. You get a written plan: the top 3 fixes, what each should save you in hours and dollars, and a fixed price for each.</p>
          </div>
          <div class="hiw-step" data-n="02">
            <h3>First fix, fixed price</h3>
            <p>We build the one that pays back fastest, plug it into your existing tools, and test it before it goes live. Fixes start at $1,500.</p>
          </div>
          <div class="hiw-step" data-n="03">
            <h3>AI Partner, month to month</h3>
            <p>We keep your fixes running, add more as you need them, and send you a monthly report with the real numbers. From $495 a month.</p>
          </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="tp-section">
    <div class="tp-inner">
      <p class="tp-label">FAQ</p>
      <h2 class="tp-heading">Straight answers.</h2>
      <div class="faq-list">
        ${faqHTML}
      </div>
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="tp-section tp-section-alt tp-cta-band">
    <div class="tp-inner">
      <h2 class="tp-heading">Find out where your business is leaking.</h2>
      <p class="tp-body">30 minutes, free, and you keep the plan either way.</p>
      <a href="/consultation?${utm}-final" class="btn-amber">Book your free consult</a>
    </div>
  </section>

  <!-- INTERNAL LINKS -->
  <div class="tp-link-bar">
    <div class="tp-inner" style="text-align:center">
      <a href="${page.relatedReceptionistPage}">Losing calls on the tools? &rarr; <strong>The AI receptionist</strong></a>
      &nbsp;&middot;&nbsp;
      <a href="/websites">Hard to find online? &rarr; <strong>Websites built for Google and AI search</strong></a>
    </div>
  </div>

  <!-- FOOTER -->
  <footer>
    <div class="foot-inner">
      <div class="foot-top">
        <div>
          <div class="foot-brand-logo">
            <img src="../brandmark.png" alt="Jackal AI" width="26" height="26">
            <span class="foot-wordmark">JACKAL<sup>AI</sup></span>
          </div>
          <p class="foot-tagline">More time. Less bullsh*t.</p>
          <div class="foot-social">
            ${SOCIAL_SVGS}
          </div>
        </div>
        <div class="foot-col">
          <h4>Navigate</h4>
          <a href="/consultation">Free consult</a>
          <a href="/#fixes">Fixes</a>
          <a href="/ai-calls">AI Receptionist</a>
          <a href="/websites">Websites</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
        <div class="foot-col">
          <h4>Legal</h4>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </div>
      <div class="foot-bottom">
        <span class="foot-loc">Built in Perth, Western Australia</span>
        <span class="foot-copy">&copy; 2026 Jackal AI &middot; jackalai.app</span>
        <div class="foot-legal">
          <a href="/privacy-policy">Privacy</a>
          <a href="/terms-of-service">Terms</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- MOBILE STICKY BAR -->
  <div class="sticky-bar" id="stickyBar">
    <a class="sb-primary" href="/consultation?${utm}-sticky">Book your free consult</a>
    <a href="/calculator" class="sb-secondary">Admin cost?</a>
  </div>

  <script>
  (function () {
    function toggleMobileNav() {
      const nav = document.getElementById('navMobile');
      const btn = document.getElementById('navHamburger');
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    window.toggleMobileNav = toggleMobileNav;

    const stickyBar = document.getElementById('stickyBar');
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          stickyBar.classList.toggle('visible', window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    window.toggleFaq = function (i) {
      const item = document.getElementById('faq-' + i);
      const open = item.classList.toggle('open');
      item.querySelector('.faq-q').setAttribute('aria-expanded', open ? 'true' : 'false');
    };
  })();
  </script>
</body>
</html>`;
}

/* ─── Generate ─── */

for (const page of data.pages) {
  const dir = path.join(rootDir, `${PREFIX}${page.slug}`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildPage(page), 'utf8');
  console.log(`✓  /${PREFIX}${page.slug}/`);
}

upsertSitemap(
  path.join(rootDir, 'sitemap.xml'),
  data.pages.map(p => `${SITE_URL}/${PREFIX}${p.slug}`),
  TODAY,
  '0.8'
);
console.log('✓  sitemap.xml updated');
console.log(`\nDone — ${data.pages.length} pages generated.`);
