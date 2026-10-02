/**
 * Shared page shell for the programmatic page generators
 * (generate-pages.js → /ai-receptionist-*, generate-integration-pages.js → /ai-for-*).
 */
'use strict';

const fs = require('fs');

/* ─── Shared boilerplate snippets ─── */

const GTM_HEAD = `  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-5JQ32785');</script>
  <!-- End Google Tag Manager -->`;

const GTM_NOSCRIPT = `  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5JQ32785"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->`;

const ORG_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
  name: 'Jackal AI',
  url: 'https://jackalai.app',
  logo: 'https://jackalai.app/logo.png',
  description: 'AI integration partner for trades and local service businesses, Perth WA. Jackal AI finds where a business leaks time and money and plugs AI into the tools it already uses. Free Business Streamlining Consult. ABN 92 509 551 334.',
  foundingDate: '2024',
  taxID: '92 509 551 334',
  telephone: '+61851226302',
  address: { '@type': 'PostalAddress', addressLocality: 'Perth', addressRegion: 'WA', addressCountry: 'AU' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  email: 'hello@jackalai.app',
  sameAs: [
    'https://www.instagram.com/jackal.ai/',
    'https://www.facebook.com/people/Jackal-AI/61587872414237/',
    'https://www.linkedin.com/in/jack-alexander-0b898a192'
  ],
  founder: { '@type': 'Person', name: 'Jack Alexander', sameAs: 'https://www.linkedin.com/in/jack-alexander-0b898a192' }
}, null, 2);

/* ─── CSS ─── */

const CSS = `
    :root {
      --graphite: #111111; --iron: #2A2A28; --slate: #71706C;
      --dust: #B8A88E; --sandstone: #E5D5BE; --white: #FAFAF7;
      --amber: #F59E0B; --amber-dark: #D97706; --amber-light: #FCD34D;
      --bg: #111111; --text-primary: #FAFAF7;
      --text-body: #E5D5BE; --text-muted: #B8A88E;
      --radius: 8px; --radius-lg: 16px;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: var(--graphite); color: var(--text-body); font-family: 'Outfit', sans-serif; }
    a { color: inherit; text-decoration: none; }
    img { max-width: 100%; display: block; }

    /* NAV */
    #navbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 900;
      background: rgba(17,17,17,0.92); backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .nav-inner {
      max-width: 1280px; margin: 0 auto; padding: 0 32px;
      height: 64px; display: flex; align-items: center; justify-content: space-between;
    }
    .nav-logo { display: flex; align-items: center; gap: 10px; }
    .nav-logo img { height: 28px; width: auto; }
    .nav-wordmark {
      font-family: 'Archivo Black', sans-serif; font-size: 0.85rem;
      letter-spacing: 0.1em; color: var(--white); text-transform: uppercase;
    }
    .nav-wordmark sup { font-size: 0.5em; vertical-align: super; color: var(--amber); }
    .nav-links { display: flex; align-items: center; gap: 28px; }
    .nav-links a { font-family: 'Outfit', sans-serif; font-size: 0.78rem; color: var(--text-muted); letter-spacing: 0.04em; transition: color 0.2s; }
    .nav-links a:hover { color: var(--white); }
    .nav-cta {
      background: var(--amber); color: #111111 !important;
      font-family: 'Archivo Black', sans-serif !important;
      font-size: 0.72rem !important; letter-spacing: 0.08em; text-transform: uppercase;
      padding: 9px 18px; border-radius: var(--radius); transition: background 0.2s; cursor: pointer;
    }
    .nav-cta:hover { background: var(--amber-dark) !important; }
    .nav-hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
    .nav-hamburger span { width: 22px; height: 2px; background: var(--white); border-radius: 2px; }
    .nav-mobile {
      display: none; flex-direction: column; padding: 20px 32px 28px;
      background: rgba(17,17,17,0.98); border-bottom: 1px solid rgba(255,255,255,0.07);
      position: fixed; top: 64px; left: 0; right: 0; z-index: 899;
    }
    .nav-mobile.open { display: flex; }
    .nav-mobile a { font-family: 'Outfit', sans-serif; font-size: 1rem; color: var(--text-body); padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .nav-mobile a:last-child { border-bottom: none; }
    .nav-mobile-cta {
      margin-top: 16px; background: var(--amber); color: #111111 !important;
      font-family: 'Archivo Black', sans-serif !important; font-size: 0.8rem !important;
      text-transform: uppercase; letter-spacing: 0.08em;
      padding: 13px 22px; border-radius: var(--radius); text-align: center;
      border-bottom: none !important; cursor: pointer;
    }
    @media (max-width: 768px) { .nav-links { display: none; } .nav-hamburger { display: flex; } }

    /* HERO */
    .tp-hero {
      min-height: 88vh; display: flex; align-items: center;
      padding: 120px 0 80px; position: relative; overflow: hidden;
    }
    .tp-hero::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse 70% 60% at 60% 40%, rgba(245,158,11,0.07) 0%, transparent 65%);
      pointer-events: none;
    }
    .tp-hero-inner { max-width: 900px; margin: 0 auto; padding: 0 48px; }
    .tp-eyebrow { font-family: 'Outfit', sans-serif; font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--amber); margin-bottom: 20px; }
    .tp-h1 { font-family: 'Archivo Black', sans-serif; font-size: clamp(2.2rem, 5vw, 4rem); line-height: 1.0; text-transform: uppercase; color: var(--white); margin-bottom: 28px; letter-spacing: -0.02em; }
    .tp-sub { font-family: 'Outfit', sans-serif; font-size: clamp(1rem, 2vw, 1.18rem); color: var(--text-body); line-height: 1.65; max-width: 680px; margin-bottom: 40px; }
    .tp-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
    .btn-amber { display: inline-block; background: var(--amber); color: #111111; font-family: 'Archivo Black', sans-serif; font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 15px 30px; border-radius: var(--radius); transition: background 0.2s, transform 0.2s; cursor: pointer; border: none; }
    .btn-amber:hover { background: var(--amber-dark); transform: translateY(-1px); }
    .btn-ghost { display: inline-block; background: transparent; color: var(--text-body); font-family: 'Archivo Black', sans-serif; font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 15px 30px; border-radius: var(--radius); border: 1px solid rgba(255,255,255,0.18); transition: background 0.2s, border-color 0.2s, transform 0.2s; }
    .btn-ghost:hover { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.35); transform: translateY(-1px); }
    @media (max-width: 600px) { .tp-hero-inner { padding: 0 24px; } }

    /* SECTION SHARED */
    .tp-section { padding: 90px 0; }
    .tp-section-alt { background: var(--iron); }
    .tp-inner { max-width: 1100px; margin: 0 auto; padding: 0 48px; }
    .tp-label { font-family: 'Outfit', sans-serif; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--amber); margin-bottom: 18px; }
    .tp-heading { font-family: 'Archivo Black', sans-serif; font-size: clamp(1.6rem, 3.5vw, 2.6rem); line-height: 1.05; text-transform: uppercase; color: var(--white); margin-bottom: 20px; letter-spacing: -0.01em; }
    .tp-body { font-family: 'Outfit', sans-serif; font-size: 0.95rem; color: var(--text-muted); line-height: 1.65; max-width: 600px; margin-bottom: 56px; }
    @media (max-width: 600px) { .tp-inner { padding: 0 24px; } .tp-section { padding: 60px 0; } }

    /* PAIN POINTS */
    .pain-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .pain-card { background: rgba(17,17,17,0.6); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 28px 24px; }
    .tp-section-alt .pain-card { background: rgba(17,17,17,0.4); }
    .pain-n { font-family: 'Archivo Black', sans-serif; font-size: 2rem; color: var(--amber); line-height: 1; margin-bottom: 18px; letter-spacing: -0.03em; }
    .pain-card h3 { font-family: 'Archivo Black', sans-serif; font-size: 0.78rem; text-transform: uppercase; color: var(--white); letter-spacing: 0.06em; margin-bottom: 10px; line-height: 1.35; }
    .pain-card p { font-family: 'Outfit', sans-serif; font-size: 0.82rem; color: var(--text-muted); line-height: 1.65; }
    @media (max-width: 900px) { .pain-grid { grid-template-columns: 1fr; gap: 16px; } }

    /* HOW IT WORKS */
    .hiw-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; }
    .hiw-step { position: relative; padding-left: 52px; }
    .hiw-step::before { content: attr(data-n); position: absolute; left: 0; top: 0; font-family: 'Archivo Black', sans-serif; font-size: 1.8rem; color: var(--amber); line-height: 1; letter-spacing: -0.03em; }
    .hiw-step h3 { font-family: 'Archivo Black', sans-serif; font-size: 0.78rem; text-transform: uppercase; color: var(--white); letter-spacing: 0.06em; margin-bottom: 8px; line-height: 1.3; }
    .hiw-step p { font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: var(--text-muted); line-height: 1.65; }
    @media (max-width: 768px) { .hiw-steps { grid-template-columns: 1fr; gap: 28px; } }

    /* PRICING */
    .price-cta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
    .price-card { background: var(--iron); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 32px 28px; position: relative; }
    .price-card.featured { border-color: var(--amber); }
    .price-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--amber); color: #111111; font-family: 'Archivo Black', sans-serif; font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 14px; border-radius: 100px; white-space: nowrap; }
    .price-tier { font-family: 'Archivo Black', sans-serif; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--amber); margin-bottom: 12px; }
    .price-amount { font-family: 'Archivo Black', sans-serif; font-size: 2.4rem; color: var(--white); line-height: 1; margin-bottom: 6px; }
    .price-amount sup { font-size: 0.45em; vertical-align: super; }
    .price-period { font-family: 'Outfit', sans-serif; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 6px; }
    .price-setup { font-family: 'Outfit', sans-serif; font-size: 0.75rem; color: var(--slate); margin-bottom: 24px; }
    .price-features { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
    .price-feature { display: flex; align-items: flex-start; gap: 10px; font-family: 'Outfit', sans-serif; font-size: 0.82rem; color: var(--text-body); }
    .price-feature::before { content: '✓'; color: var(--amber); font-size: 0.75rem; flex-shrink: 0; margin-top: 2px; }
    .price-btn { display: block; width: 100%; text-align: center; background: var(--amber); color: #111111; font-family: 'Archivo Black', sans-serif; font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 14px 20px; border-radius: var(--radius); border: none; cursor: pointer; transition: background 0.2s; }
    .price-btn:hover { background: var(--amber-dark); }
    @media (max-width: 900px) { .price-cta-grid { grid-template-columns: 1fr; max-width: 400px; margin-left: auto; margin-right: auto; } }

    /* FAQ */
    .faq-list { display: flex; flex-direction: column; gap: 8px; }
    .faq-item { border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; overflow: hidden; }
    .faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; gap: 16px; text-align: left; }
    .faq-q-text { font-family: 'Archivo Black', sans-serif; font-size: 0.82rem; text-transform: uppercase; color: var(--white); letter-spacing: 0.04em; line-height: 1.35; }
    .faq-chevron { flex-shrink: 0; width: 22px; height: 22px; border: 1px solid rgba(255,255,255,0.18); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: transform 0.25s, background 0.2s, border-color 0.2s; }
    .faq-chevron svg { transition: transform 0.25s; }
    .faq-item.open .faq-chevron { background: var(--amber); border-color: var(--amber); }
    .faq-item.open .faq-chevron svg { transform: rotate(180deg); }
    .faq-a { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; padding: 0 24px; }
    .faq-item.open .faq-a { max-height: 500px; padding: 0 24px 20px; }
    .faq-a p { font-family: 'Outfit', sans-serif; font-size: 0.875rem; color: var(--text-muted); line-height: 1.7; }

    /* INTERNAL LINK BAR */
    .tp-link-bar { border-top: 1px solid rgba(255,255,255,0.06); padding: 28px 0; text-align: center; }
    .tp-link-bar a { font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: var(--text-muted); transition: color 0.2s; }
    .tp-link-bar a:hover { color: var(--amber); }
    .tp-link-bar strong { color: var(--amber); font-weight: 400; }

    /* FOOTER */
    footer { background: var(--graphite); border-top: 1px solid rgba(255,255,255,0.07); padding: 60px 0 32px; }
    .foot-inner { max-width: 1280px; margin: 0 auto; padding: 0 48px; }
    .foot-top { display: grid; grid-template-columns: 1.6fr 1fr 1fr; gap: 48px; padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,0.07); margin-bottom: 28px; }
    .foot-brand-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
    .foot-brand-logo img { height: 26px; width: auto; }
    .foot-wordmark { font-family: 'Archivo Black', sans-serif; font-size: 0.85rem; letter-spacing: 0.1em; color: var(--white); text-transform: uppercase; }
    .foot-wordmark sup { font-size: 0.5em; vertical-align: super; color: var(--amber); }
    .foot-tagline { font-family: 'Outfit', sans-serif; font-size: 0.82rem; color: var(--text-muted); margin-bottom: 20px; }
    .foot-social { display: flex; gap: 12px; }
    .foot-social-link { color: var(--text-muted); transition: color 0.2s; }
    .foot-social-link:hover { color: var(--amber); }
    .foot-col h4 { font-family: 'Archivo Black', sans-serif; font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--dust); margin-bottom: 18px; }
    .foot-col a { display: block; font-family: 'Outfit', sans-serif; font-size: 0.82rem; color: var(--text-muted); margin-bottom: 12px; transition: color 0.2s; }
    .foot-col a:hover { color: var(--white); }
    .foot-bottom { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    .foot-loc, .foot-copy { font-family: 'Outfit', sans-serif; font-size: 0.75rem; color: var(--slate); }
    .foot-legal { display: flex; gap: 18px; }
    .foot-legal a { font-family: 'Outfit', sans-serif; font-size: 0.75rem; color: var(--slate); transition: color 0.2s; }
    .foot-legal a:hover { color: var(--text-muted); }
    @media (max-width: 768px) { .foot-top { grid-template-columns: 1fr; gap: 32px; } .foot-inner { padding: 0 24px; } .foot-bottom { flex-direction: column; text-align: center; } }

    /* MOBILE STICKY BAR */
    .sticky-bar { position: fixed; bottom: 0; left: 0; right: 0; z-index: 800; background: rgba(17,17,17,0.96); backdrop-filter: blur(10px); border-top: 1px solid rgba(255,255,255,0.08); padding: 12px 20px; display: flex; gap: 10px; align-items: center; transform: translateY(100%); transition: transform 0.35s ease; }
    .sticky-bar.visible { transform: translateY(0); }
    .sb-primary { flex: 1; text-align: center; background: var(--amber); color: #111111; font-family: 'Archivo Black', sans-serif; font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; padding: 12px 16px; border-radius: var(--radius); border: none; cursor: pointer; }
    .sb-secondary { flex: 1; text-align: center; background: transparent; color: var(--text-body); font-family: 'Archivo Black', sans-serif; font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; padding: 12px 16px; border-radius: var(--radius); border: 1px solid rgba(255,255,255,0.18); }
    @media (min-width: 768px) { .sticky-bar { display: none; } }
    @media (prefers-reduced-motion: reduce) { .sticky-bar { transition: none; } }`;

/* ─── Social SVGs (reused in footer) ─── */

const SOCIAL_SVGS = `
            <a href="https://www.instagram.com/jackal.ai/" target="_blank" rel="noopener" aria-label="Instagram" class="foot-social-link">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://www.facebook.com/people/Jackal-AI/61587872414237/" target="_blank" rel="noopener" aria-label="Facebook" class="foot-social-link">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/jack-alexander-0b898a192" target="_blank" rel="noopener" aria-label="LinkedIn" class="foot-social-link">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>`;

/* Escape HTML special chars in text content */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Insert or refresh sitemap entries for the given URLs. Idempotent: existing <url> blocks for the
 * same <loc> are removed before the fresh ones are appended, so re-running never duplicates.
 */
function upsertSitemap(sitemapPath, urls, today, priority) {
  const wanted = new Set(urls);
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  sitemap = sitemap.replace(/\s*<url>([\s\S]*?)<\/url>/g, (block, inner) => {
    const m = inner.match(/<loc>([^<]*)<\/loc>/);
    return m && wanted.has(m[1].trim()) ? '' : block;
  });
  const entries = urls.map(loc =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
  ).join('\n');
  sitemap = sitemap.replace(/\s*<\/urlset>/, '\n' + entries + '\n</urlset>');
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
}

module.exports = { GTM_HEAD, GTM_NOSCRIPT, ORG_SCHEMA, CSS, SOCIAL_SVGS, esc, upsertSitemap };
