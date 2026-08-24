export default async function handler(req, res) {
  // Libera CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { path } = req.query;
  
  // COLOQUE AQUI A URL PUBLICA DO SEU N8N QUANDO TIVER
  const N8N_URL = process.env.N8N_URL || 'https://SEU-N8N-AQUI.com/webhook';

  try {
    const url = `${N8N_URL}/${path}`;
    const response = await fetch(url, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
    });
    const data = await response.text();
    return res.status(response.status).send(data);
  } catch (e) {
    return res.status(500).json({ message: 'Erro proxy: ' + e.message });
  }
}
