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
    h: 'Your AI receptionist answers every call.',
    t: 'AI voice receptionist for Australian trades. From $249/month.',
  },
  {
    slug: 'ai-calls',
    h: 'Never miss another job to voicemail.',
    t: 'Answers 24/7 in a natural Aussie voice. Books jobs. Sends summaries.',
  },
  {
    slug: 'websites',
    h: 'Sites built to win business.',
    t: 'Custom-built in 30 days. Found by Google. Cited by AI.',
  },
  {
    slug: 'about',
    h: 'Built by someone who’s trained thousands of real receptionists.',
    t: 'A decade in CX and service ops. Perth, WA.',
  },
  {
    slug: 'contact',
    h: 'Book a free 15-minute call.',
    t: 'See exactly how the AI receptionist works — no pressure.',
  },
  {
    slug: 'book',
    h: 'Book a free 15-minute call.',
    t: 'See exactly how the AI receptionist works — no pressure.',
  },
  {
    slug: 'calculator',
    h: 'How much are missed calls costing you?',
    t: 'Find your number. Perth tradies lose $30K–$80K/year to voicemail.',
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
