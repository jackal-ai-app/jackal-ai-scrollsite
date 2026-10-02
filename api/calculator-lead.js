// Calculator leads → Comp AI CRM (Projects/crm). Needs CRM_API_URL and CRM_API_KEY in Vercel env.
// Creates the contact (or finds it by email if it already exists) and adds a note with their numbers.

async function crm(path, body) {
  const res = await fetch(`${process.env.CRM_API_URL}/rest${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.CRM_API_KEY },
    body: JSON.stringify(body),
  });
  return { status: res.status, data: res.ok ? await res.json() : await res.text() };
}

async function contactId({ name, email, phone }) {
  const created = await crm('/contacts', { firstName: name, email, phone: phone || undefined });
  if (created.status < 300) return created.data.id;
  if (created.status !== 409) throw new Error(`create ${created.status}: ${created.data}`);
  const found = await crm('/contacts/search', { q: email, pageSize: 10 });
  const row = found.data.rows?.find(r => (r.email || '').toLowerCase() === email.toLowerCase());
  if (!row) throw new Error('409 but no contact found for that email');
  return row.id;
}

const aud = n => `$${Math.round(Number(n) || 0).toLocaleString('en-AU')}`;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://jackalai.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const b = req.body || {};
  const name = String(b.name || '').trim();
  const email = String(b.email || '').trim();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Name and a valid email are required' });

  try {
    const id = await contactId({ name, email, phone: String(b.phone || '').trim() });
    await crm('/activities', {
      type: 'NOTE',
      contactId: id,
      subject: 'Admin & missed-work calculator',
      body: [
        `Trade: ${b.trade_type || 'not given'}`,
        `Monthly cost (admin + missed work): ${aud(b.monthly_loss)}`,
        `Admin: ${b.admin_hours_per_week || 0} hrs/week at ${aud(b.hourly_rate)}/hr`,
        `Missed work: ${b.missed_calls_per_week || 0} enquiries/week, ${aud(b.avg_job_value)} avg job, ${b.conversion_rate || 0}% win rate`,
        `Tier: ${b.score_tier || 'n/a'}`,
        `Marketing consent: ${b.marketing_consent ? 'YES (ticked the box)' : 'NO (send their numbers only)'}`,
      ].join('\n'),
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Comp AI CRM error:', err.message);
    return res.status(502).json({ error: 'Failed to save lead' });
  }
};
