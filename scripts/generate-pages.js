/**
 * generate-pages.js
 * Run: node scripts/generate-pages.js
 * Reads trades.json, generates the /ai-receptionist-* pages (the AI receptionist fix), updates sitemap.xml.
 * Kept live for receptionist search equity (docs/business-model-pivot/03-website-brief.md §2, §8).
 * Primary CTA is the free Business Streamlining Consult; each page links to its matching /ai-for-{trade} page.
 * To add a new trade: edit trades.json and re-run this script.
 */
'use strict';

const fs   = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const data    = JSON.parse(fs.readFileSync(path.join(rootDir, 'trades.json'), 'utf8'));

const SITE_URL = 'https://jackalai.app';
const TODAY    = new Date().toISOString().slice(0, 10);

const { GTM_HEAD, GTM_NOSCRIPT, ORG_SCHEMA, CSS, SOCIAL_SVGS, esc, upsertSitemap } = require('./lib/shared');

const UNIVERSAL_FAQS = [
  {
    q: "Will callers know they're talking to an AI?",
    a: "It sounds like a natural Aussie receptionist, and it says it's an AI assistant if asked. A real person is always reachable. You can hear Jess answer a test call on the AI receptionist page before you commit."
  },
  {
    q: 'How quickly can I get set up?',
    a: "Most businesses are live within a week. You give us your business info, we build and configure the agent. You don't set up anything."
  },
  {
    q: 'Is it a lock-in contract?',
    a: "No. Month to month, cancel anytime. No exit fees, no lock-in. If it's not earning its keep, you can cancel with one email."
  }
];

/* ─── Schema builders ─── */

function serviceSchema(page, isLocation) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.schemaServiceName,
    serviceType: 'AI voice receptionist',
    description: `AI receptionist that answers calls 24/7, captures job details, books appointments, and sends SMS summaries. Built for ${page.schemaAudience}.`,
    provider: { '@type': 'Organization', name: 'Jackal AI', url: 'https://jackalai.app' },
    areaServed: isLocation
      ? { '@type': 'City', name: page.city, containedInPlace: { '@type': 'State', name: page.state } }
      : { '@type': 'Country', name: 'Australia' },
    offers: [
      { '@type': 'Offer', name: 'Capture', price: '249', priceCurrency: 'AUD', priceSpecification: { '@type': 'RecurringChargeSpecification', billingDuration: 'P1M' }, eligibleRegion: { '@type': 'Country', name: 'Australia' } },
      { '@type': 'Offer', name: 'Convert', price: '499', priceCurrency: 'AUD', priceSpecification: { '@type': 'RecurringChargeSpecification', billingDuration: 'P1M' }, eligibleRegion: { '@type': 'Country', name: 'Australia' } },
      { '@type': 'Offer', name: 'Command', price: '999', priceCurrency: 'AUD', priceSpecification: { '@type': 'RecurringChargeSpecification', billingDuration: 'P1M' }, eligibleRegion: { '@type': 'Country', name: 'Australia' } }
    ]
  }, null, 2);
}

function faqSchema(page) {
  const items = [...page.faqVariants, ...UNIVERSAL_FAQS].map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a }
  }));
  return JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items }, null, 2);
}

function breadcrumbSchema(page, slugPrefix) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jackalai.app/' },
      { '@type': 'ListItem', position: 2, name: page.label, item: `${SITE_URL}/${slugPrefix}${page.slug}` }
    ]
  }, null, 2);
}

/* ─── Page builder ─── */

function buildPage(page, slugPrefix, isLocation) {
  const fullSlug   = `${slugPrefix}${page.slug}`;
  const canonical  = `${SITE_URL}/${fullSlug}`;
  const utmContent = fullSlug.replace(/\//g, '-');

  const allFaqs = [...page.faqVariants, ...UNIVERSAL_FAQS];

  const faqHTML = allFaqs.map((faq, i) => `
        <div class="faq-item" id="faq-${i}">
          <button class="faq-q" onclick="toggleFaq(${i})" aria-expanded="false">
            <span class="faq-q-text">${esc(faq.q)}</span>
            <div class="faq-chevron">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </button>
          <div class="faq-a"><p>${esc(faq.a)}</p></div>
        </div>`).join('');

  const painHTML = page.painPoints.map(p => `
          <div class="pain-card">
            <div class="pain-n">${esc(p.n)}</div>
            <h3>${esc(p.heading)}</h3>
            <p>${esc(p.body)}</p>
          </div>`).join('');

  const hiwHTML = page.howItWorks.map(s => `
          <div class="hiw-step" data-n="${esc(s.n)}">
            <h3>${esc(s.title)}</h3>
            <p>${esc(s.body)}</p>
          </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
${GTM_HEAD}
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(page.metaTitle)}</title>
  <meta name="description" content="${esc(page.metaDescription)}">
  <meta property="og:title" content="${esc(page.ogTitle)}">
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
  ${serviceSchema(page, isLocation)}
  </script>
  <script type="application/ld+json">
  ${faqSchema(page)}
  </script>
  <script type="application/ld+json">
  ${breadcrumbSchema(page, slugPrefix)}
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>${CSS}
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
        <a href="/#fixes">Fixes</a>
        <a href="/ai-calls">AI Receptionist</a>
        <a href="/websites">Websites</a>
        <a href="/about">About</a>
        <a href="/consultation" class="nav-cta">Book your free consult</a>
      </div>
      <button class="nav-hamburger" id="navHamburger" aria-label="Open menu" aria-expanded="false" onclick="toggleMobileNav()">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="nav-mobile" id="navMobile">
    <a href="/#fixes">Fixes</a>
    <a href="/ai-calls">AI Receptionist</a>
    <a href="/websites">Websites</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
    <a href="/consultation" class="nav-mobile-cta">Book your free consult</a>
  </div>

  <!-- HERO -->
  <section class="tp-hero">
    <div class="tp-hero-inner">
      <p class="tp-eyebrow">${esc(page.eyebrow)}</p>
      <h1 class="tp-h1">${esc(page.h1)}</h1>
      <p class="tp-sub">${esc(page.heroSub)}</p>
      <div class="tp-hero-btns">
        <a href="/consultation?utm_source=site&utm_content=${utmContent}-hero" class="btn-amber">Book your free consult</a>
        <a href="/ai-calls" class="btn-ghost">See how it works &rarr;</a>
      </div>
    </div>
  </section>

  <!-- WHY TRADIES MISS CALLS -->
  <section class="tp-section">
    <div class="tp-inner">
      <p class="tp-label">The Problem</p>
      <h2 class="tp-heading">Why ${esc(page.label.toLowerCase())} lose work to voicemail.</h2>
      <div class="pain-grid">
        ${painHTML}
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="tp-section tp-section-alt">
    <div class="tp-inner">
      <p class="tp-label">How It Works</p>
      <h2 class="tp-heading">From first ring to booked job.</h2>
      <p class="tp-body">Jackal answers in under a second, captures everything you need, and puts the job in your calendar. You get an SMS summary before you've even put your tools down.</p>
      <div class="hiw-steps">
        ${hiwHTML}
      </div>
    </div>
  </section>

  <!-- PRICING -->
  <section class="tp-section">
    <div class="tp-inner">
      <p class="tp-label">Pricing</p>
      <h2 class="tp-heading">Simple pricing. No surprises.</h2>
      <p class="tp-body">Month to month. No lock-in. Cancel anytime. One-time setup fee covers configuration, testing, and going live. Not sure calls are your biggest leak? Book the free consult first.</p>
      <div class="price-cta-grid">
        <div class="price-card">
          <div class="price-tier">Capture</div>
          <div class="price-amount"><sup>$</sup>249</div>
          <div class="price-period">per month</div>
          <div class="price-setup">+ $1,500 one-time setup</div>
          <div class="price-features">
            <div class="price-feature">24/7 AI receptionist</div>
            <div class="price-feature">Caller detail capture</div>
            <div class="price-feature">SMS &amp; email summaries</div>
            <div class="price-feature">Calendar booking</div>
          </div>
          <a class="price-btn" href="/consultation?utm_source=site&utm_content=${utmContent}-capture">Book your free consult</a>
        </div>
        <div class="price-card featured">
          <div class="price-badge">Most Popular</div>
          <div class="price-tier">Convert</div>
          <div class="price-amount"><sup>$</sup>499</div>
          <div class="price-period">per month</div>
          <div class="price-setup">+ $2,750 one-time setup</div>
          <div class="price-features">
            <div class="price-feature">Everything in Capture</div>
            <div class="price-feature">Lead qualification</div>
            <div class="price-feature">Call routing</div>
            <div class="price-feature">Priority handling</div>
          </div>
          <a class="price-btn" href="/consultation?utm_source=site&utm_content=${utmContent}-convert">Book your free consult</a>
        </div>
        <div class="price-card">
          <div class="price-tier">Command</div>
          <div class="price-amount"><sup>$</sup>999</div>
          <div class="price-period">per month</div>
          <div class="price-setup">+ $4,500 one-time setup</div>
          <div class="price-features">
            <div class="price-feature">Everything in Convert</div>
            <div class="price-feature">Full operational assistant</div>
            <div class="price-feature">Multi-calendar support</div>
            <div class="price-feature">Advanced integrations</div>
          </div>
          <a class="price-btn" href="/consultation?utm_source=site&utm_content=${utmContent}-command">Book your free consult</a>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="tp-section tp-section-alt">
    <div class="tp-inner">
      <p class="tp-label">FAQ</p>
      <h2 class="tp-heading">Common questions.</h2>
      <div class="faq-list">
        ${faqHTML}
      </div>
    </div>
  </section>

  <!-- INTERNAL LINK -->
  <div class="tp-link-bar">
    <div class="tp-inner" style="text-align:center">
      <a href="/ai-calls">Full product details, demo call &amp; integrations &rarr; <strong>AI receptionist page</strong></a>
      ${page.relatedIntegrationPage ? `<br><br><a href="${page.relatedIntegrationPage}">Calls are one leak. See the rest of the job cycle &rarr; <strong>${esc(page.relatedIntegrationLabel)}</strong></a>` : ''}
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
    <a class="sb-primary" href="/consultation?utm_source=site&utm_content=${utmContent}-sticky">Book your free consult</a>
    <a href="/ai-calls" class="sb-secondary">See pricing</a>
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

const pages = [
  ...data.trades.map(t      => ({ page: t, prefix: 'ai-receptionist-for-', isLocation: false })),
  ...data.locationPages.map(l => ({ page: l, prefix: 'ai-receptionist-',     isLocation: true  }))
];

for (const { page, prefix, isLocation } of pages) {
  const dir = path.join(rootDir, `${prefix}${page.slug}`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildPage(page, prefix, isLocation), 'utf8');
  console.log(`✓  /${prefix}${page.slug}/`);
}

/* ─── Update sitemap.xml ─── */

upsertSitemap(
  path.join(rootDir, 'sitemap.xml'),
  pages.map(({ page, prefix }) => `${SITE_URL}/${prefix}${page.slug}`),
  TODAY,
  '0.7'
);
console.log(`✓  sitemap.xml updated`);
console.log(`\nDone — ${pages.length} pages generated.`);
