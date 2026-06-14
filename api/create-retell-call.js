module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://api.retellai.com/v1/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ agent_id: 'agent_a68c85f710a1410b5f86219f20' }),
    });

    if (!response.ok) {
      console.error('Retell API error:', response.status, await response.text());
      return res.status(502).json({ error: 'Failed to create call' });
    }

    const data = await response.json();
    return res.status(200).json({ access_token: data.access_token });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
