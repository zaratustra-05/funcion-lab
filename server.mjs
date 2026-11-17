import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), 'dist');
const PORT = Number(process.env.PORT || 3000);
const HOST = '0.0.0.0';
const MODEL = process.env.FUNCION_LAB_AI_MODEL || 'gpt-5-mini';
const MAX_BODY = 12000;
const rate = new Map();

const siteContext = `Eres el asistente educativo de Función Lab, una página en español para estudiantes de grados 10 y 11. Ayuda a comprender funciones lineales, cuadráticas, de valor absoluto, cúbicas, exponenciales y logarítmicas. Explica la conexión entre expresión algebraica, tabla y gráfica. Usa lenguaje claro, amable y breve; guía con preguntas y pasos, no entregues respuestas de retos sin explicación. Puedes usar ejemplos sencillos. Si preguntan algo ajeno a matemáticas escolares o a la página, dilo con honestidad y redirige a estos temas. No pidas nombres, correos, contraseñas ni datos personales. Evita afirmar que eres una persona o que puedes ver datos del visitante.`;

function json(res, status, data) { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); }
function clientKey(req) { return (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'visitor').toString().split(',')[0].trim(); }
function allowed(req) { const key = clientKey(req); const now = Date.now(); const current = rate.get(key) || { start: now, count: 0 }; if (now - current.start > 60000) { current.start = now; current.count = 0; } current.count += 1; rate.set(key, current); return current.count <= 20; }
function contentType(file) { return ({ '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' })[extname(file)] || 'application/octet-stream'; }

async function answer(messages, context = {}) {
  const base = process.env.BUILT_IN_FORGE_API_URL;
  const key = process.env.BUILT_IN_FORGE_API_KEY;
  if (!base || !key) throw new Error('El servicio de IA no está configurado todavía.');
  const activeContext = context?.family ? `\nContexto visible en la mesa: familia ${String(context.family).slice(0,80)}, expresión ${String(context.expression || '').slice(0,240)}.` : '';
  const response = await fetch(`${base.replace(/\/$/, '')}/v1/chat/completions`, { method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: MODEL, messages: [{ role: 'system', content: siteContext + activeContext }, ...messages.slice(-8)], max_completion_tokens: 900 }) });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || 'No se pudo consultar al asistente.');
  return data?.choices?.[0]?.message?.content?.trim() || 'No encontré una respuesta clara. Intenta formular la pregunta de otra manera.';
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && req.url === '/api/health') return json(res, 200, { ok: true, service: 'funcion-lab' });
    if (req.method === 'POST' && req.url === '/api/assistant') {
      if (!allowed(req)) return json(res, 429, { error: 'Has enviado muchas preguntas. Espera un momento e inténtalo de nuevo.' });
      let raw = ''; for await (const chunk of req) { raw += chunk; if (raw.length > MAX_BODY) return json(res, 413, { error: 'La pregunta es demasiado larga.' }); }
      let body; try { body = JSON.parse(raw || '{}'); } catch { return json(res, 400, { error: 'Formato de pregunta inválido.' }); }
      const messages = Array.isArray(body.messages) ? body.messages.filter(item => item && ['user', 'assistant'].includes(item.role) && typeof item.content === 'string').map(item => ({ role: item.role, content: item.content.slice(0, 1800) })) : [];
      if (!messages.length || !messages.some(item => item.role === 'user')) return json(res, 400, { error: 'Escribe una pregunta para comenzar.' });
      return json(res, 200, { answer: await answer(messages, body.context) });
    }
    if (req.method !== 'GET') return json(res, 405, { error: 'Método no permitido.' });
    const requested = decodeURIComponent((req.url || '/').split('?')[0]);
    const relative = requested === '/' ? '/index.html' : requested;
    const safe = normalize(relative).replace(/^\.\.(\/|\\|$)/, '');
    const file = join(ROOT, safe);
    if (!file.startsWith(ROOT)) return json(res, 403, { error: 'Acceso no permitido.' });
    const data = await readFile(file); res.writeHead(200, { 'Content-Type': contentType(file), 'Cache-Control': requested === '/' ? 'no-cache' : 'public, max-age=3600' }); res.end(data);
  } catch (error) { if (req.url?.startsWith('/api/')) return json(res, 500, { error: error.message || 'Error inesperado del asistente.' }); res.writeHead(404); res.end('Not found'); }
});
server.listen(PORT, HOST, () => console.log(`Función Lab server listening on ${HOST}:${PORT}`));
