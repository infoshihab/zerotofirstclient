// Vercel serverless function — proxies browser requests to Anthropic API
// Your API key stays server-side in ANTHROPIC_API_KEY env var

export default async function handler(req, res) {
  // CORS for safety (same-origin so technically not needed, but doesn't hurt)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const apiKey = (process.env.ANTHROPIC_API_KEY || '').trim().replace(/^["']|["']$/g, '');
  if (!apiKey) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY env var not set. Add it in Vercel project settings → Environment Variables.'
    });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}

// Vercel config — give Claude responses up to 60 seconds before timing out
export const config = {
  maxDuration: 60,
};
