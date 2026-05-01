// Vercel Edge Function / Netlify Function / Cloudflare Worker
// Deploy as serverless function at /api/guess
// Set environment variable: OPENAI_API_KEY=sk-...

export default async function handler(req) {
  // CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500 });
  }

  try {
    const { image } = await req.json();
    if (!image) {
      return new Response(JSON.stringify({ error: 'No image provided' }), { status: 400 });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Kamu adalah ahli matematika. Lihat foto grafik yang digambar tangan ini.

Tugasmu:
1. Identifikasi bentuk grafik (linear, kuadrat, kubik, trigonometri, eksponensial, dll)
2. Tebak persamaan matematikanya seakurat mungkin

Format jawaban HARUS:
PERSAMAAN: [persamaan, gunakan: x^2 untuk kuadrat, sin(x) untuk sinus, sqrt(x) untuk akar, abs(x) untuk absolut, exp(x) untuk eksponensial, pi untuk pi, * untuk kali]
PENJELASAN: [1-2 kalimat dalam bahasa Indonesia kenapa kamu memilih persamaan itu]

Contoh PERSAMAAN yang valid: x^2 - 3*x + 2 | 2*sin(x) | 0.5*x^3 - 2*x | abs(x - 1) + 2
Jangan gunakan LaTeX.`
            },
            {
              type: 'image_url',
              image_url: { url: image, detail: 'high' }
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return new Response(JSON.stringify({ error: err.error?.message || `OpenAI error ${response.status}` }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    const eqMatch = reply.match(/PERSAMAAN:\s*(.+)/i);
    const reasonMatch = reply.match(/PENJELASAN:\s*(.+)/i);

    return new Response(JSON.stringify({
      equation: eqMatch ? eqMatch[1].trim().replace(/^y\s*=\s*/i, '') : null,
      explanation: reasonMatch ? reasonMatch[1].trim() : null,
      raw: reply,
    }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}

export const config = { runtime: 'edge' };
