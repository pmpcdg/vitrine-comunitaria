export default async function handler(req, res) {
  // Libera CORS para a Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const N8N_URL = process.env.N8N_URL; // tem que ser https://vitrine-n8n.onrender.com
  const { path } = req.query;

  if (!N8N_URL) {
    return res.status(200).json({
      error: "N8N_URL ainda não configurada na Vercel. Vá em Settings > Environment Variables"
    });
  }

  try {
    const targetUrl = `${N8N_URL}/${path}`;
    const queryString = new URLSearchParams(req.query);
    queryString.delete('path');

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
