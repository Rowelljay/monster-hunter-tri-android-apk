import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'showcase');
const host = '127.0.0.1';
const port = Number(process.env.PORT || 4188);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon' };
const allowed = new Set(['index.html', 'styles.css', 'app.js', 'site.config.js']);

const server = http.createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      return response.end('Method not allowed.');
    }
    const requested = decodeURIComponent(new URL(request.url, `http://${host}:${port}`).pathname).replace(/^\/+/, '') || 'index.html';
    const segments = requested.split('/');
    if (segments.some(segment => segment === '..' || segment.startsWith('.')) || requested.includes('\\') || requested.includes('\0')
      || (!allowed.has(requested) && !requested.startsWith('assets/')) || !types[extname(requested).toLowerCase()]) {
      response.writeHead(404);
      return response.end('Not found.');
    }
    const target = resolve(root, requested);
    if (!target.startsWith(root + '/assets/') && !target.startsWith(root + '\\assets\\') && !allowed.has(requested)) {
      response.writeHead(404);
      return response.end('Not found.');
    }
    const file = await readFile(target);
    response.writeHead(200, {
      'Content-Type': types[extname(target).toLowerCase()],
      'Content-Length': file.length,
      'Cache-Control': 'no-store',
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; object-src 'none'; base-uri 'self'; frame-src 'none'; frame-ancestors 'none'; form-action 'none'",
    });
    response.end(request.method === 'HEAD' ? undefined : file);
  } catch (error) {
    response.writeHead(error instanceof URIError ? 400 : 404);
    response.end(error instanceof URIError ? 'Invalid URL.' : 'Not found.');
  }
});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, host, () => console.log(`Local preview: http://${host}:${port}`));
