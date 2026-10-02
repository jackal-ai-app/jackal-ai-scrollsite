/**
 * OG Image Generator — Jackal AI
 * Renders branded 1200×630 PNG cards for each page.
 *
 * Run: npx puppeteer-cli screenshot <url> <output> (or use the puppeteer approach below)
 * Requires: npx puppeteer (no local install needed)
 *
 * Usage:  node scripts/generate-og.js
 * Or:     npx -y @cloudflare/puppeteer -- node scripts/generate-og.js  (if puppeteer not installed)
 *
 * Requires puppeteer: npm install puppeteer  (one-time, dev only)
 */

const puppeteer = require('puppeteer');
const path = require('path');

const templatePath = path.resolve(__dirname, '../og-templates/base.html');
const outputDir = path.resolve(__dirname, '../assets/og');

const pages = [
  {
    slug: 'home',
    h: 'More money. More time back.',
    t: 'AI integration for Perth trades & local service businesses. Free Business Streamlining Consult.',
  },
  {
    slug: 'ai-calls',
    h: 'Stop losing jobs to voicemail.',
    t: 'The AI receptionist: one of the fixes. Answers 24/7, books jobs, sends summaries.',
  },
  {
    slug: 'websites',
    h: 'Sites built to win business.',
    t: 'Custom-built in 30 days. Found by Google. Cited by AI.',
  },
  {
    slug: 'about',
    h: 'Built by someone who’s trained thousands of real receptionists.',
    t: 'A decade in CX. Now finding where Perth businesses leak time and money.',
  },
  {
    slug: 'contact',
    h: 'Let’s talk.',
    t: 'Book your free consult, or grab a quick call.',
  },
  {
    slug: 'book',
    h: 'Find out where your business is leaking.',
    t: 'Free 30-minute Business Streamlining Consult. You keep the plan either way.',
  },
  {
    slug: 'consult',
    h: 'Find out where your business is leaking.',
    t: 'Free 30-minute Business Streamlining Consult. You keep the plan either way.',
  },
  {
    slug: 'calculator',
    h: 'What’s admin (and missed work) costing you?',
    t: 'Your numbers, not an industry average. Takes a minute.',
  },
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

  for (const p of pages) {
    const params = new URLSearchParams({ h: p.h, t: p.t });
    const url = `file://${templatePath}?${params.toString()}`;
    await page.goto(url, { waitUntil: 'networkidle0' });
    // Wait for fonts
    await new Promise(r => setTimeout(r, 800));
    const outPath = path.join(outputDir, `${p.slug}.png`);
    await page.screenshot({ path: outPath, type: 'png' });
    console.log(`✓ ${p.slug}.png`);
  }

  await browser.close();
  console.log('\nAll OG images written to assets/og/');
})();
