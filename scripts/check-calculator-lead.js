// Run: node scripts/check-calculator-lead.js — checks api/calculator-lead.js against a fake Comp AI CRM.
const assert = require('assert');
process.env.CRM_API_URL = 'https://crm.test';
process.env.CRM_API_KEY = 'crm_test';
const handler = require('../api/calculator-lead');

function run(existing) {
  const calls = [];
  global.fetch = async (url, opts) => {
    const body = JSON.parse(opts.body);
    calls.push({ path: url.replace('https://crm.test/rest', ''), body, key: opts.headers['x-api-key'] });
    const reply = (status, data) => ({ ok: status < 300, status, json: async () => data, text: async () => JSON.stringify(data) });
    if (url.endsWith('/contacts')) return existing ? reply(409, 'dupe') : reply(200, { id: 'new1' });
    if (url.endsWith('/contacts/search')) return reply(200, { rows: [{ id: 'old1', email: 'Jo@Example.com' }] });
    return reply(200, { id: 'act1' });
  };
  const res = { code: 0, setHeader() {}, status(c) { this.code = c; return this; }, json() { return this; }, end() { return this; } };
  const req = { method: 'POST', body: { name: 'Jo', email: 'jo@example.com', monthly_loss: 5196, marketing_consent: true } };
  return handler(req, res).then(() => ({ code: res.code, calls }));
}

(async () => {
  let r = await run(false);
  assert.equal(r.code, 200);
  assert.equal(r.calls.at(-1).body.contactId, 'new1');
  assert.equal(r.calls[0].key, 'crm_test');
  assert.match(r.calls.at(-1).body.body, /Marketing consent: YES/);

  r = await run(true);                                  // duplicate email → found by search
  assert.equal(r.code, 200);
  assert.equal(r.calls.at(-1).body.contactId, 'old1');

  const bad = { code: 0, setHeader() {}, status(c) { this.code = c; return this; }, json() { return this; } };
  await handler({ method: 'POST', body: { name: 'Jo', email: 'nope' } }, bad);
  assert.equal(bad.code, 400);
  console.log('calculator-lead: ok');
})();
