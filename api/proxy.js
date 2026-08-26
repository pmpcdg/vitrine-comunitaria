export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const N8N_URL = process.env.N8N_URL;
  const { path } = req.query;

  if (!N8N_URL) {
    return res.status(500).json({ error: "N8N_URL não configurada na Vercel" });
  }

  try {
    const queryString = new URLSearchParams(req.query);
    queryString.delete('path');
    const targetUrl = `${N8N_URL.replace(/\/$/, '')}/${path}`;
    const finalUrl = queryString.toString() ? `${targetUrl}?${queryString}` : targetUrl;

    const response = await fetch(finalUrl, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
