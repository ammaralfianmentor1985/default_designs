#!/usr/bin/env node
// Static server that behaves like GitHub Pages: directory index, redirect to the trailing slash, 404.html for
// unknown addresses, gzip for text. Use it to test the site under the staging sub-path.
//   node site-src/qa/serve.mjs [dir=site] [port=8802] [urlPrefix=/default_designs]
//   -> http://localhost:8802/default_designs/
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const [, , dirArg = 'site', port = '8802', prefix = '/default_designs'] = process.argv;
const dir = path.resolve(dirArg);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
const notFound = (res) => {
  const f = path.join(dir, '404.html');
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  fs.existsSync(f) ? fs.createReadStream(f).pipe(res) : res.end('not found');
};
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (prefix) {
    if (p !== prefix && !p.startsWith(prefix + '/')) return notFound(res);
    p = p.slice(prefix.length) || '/';
  }
  let f = path.join(dir, p);
  if (!f.startsWith(dir)) return notFound(res);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) {
    if (!p.endsWith('/')) { res.writeHead(301, { Location: prefix + p + '/' }); return res.end(); }
    f = path.join(f, 'index.html');
  }
  if (!fs.existsSync(f)) return notFound(res);
  const ext = path.extname(f);
  const headers = { 'Content-Type': types[ext] || 'application/octet-stream', 'Cache-Control': 'public, max-age=600' };
  if (['.html', '.css', '.js', '.svg', '.xml', '.txt'].includes(ext) && /gzip/.test(req.headers['accept-encoding'] || '')) {
    headers['Content-Encoding'] = 'gzip';
    res.writeHead(200, headers);
    return res.end(zlib.gzipSync(fs.readFileSync(f), { level: 6 }));
  }
  res.writeHead(200, headers);
  fs.createReadStream(f).pipe(res);
}).listen(Number(port), () => console.log(`serving ${dir} at http://localhost:${port}${prefix}/`));
