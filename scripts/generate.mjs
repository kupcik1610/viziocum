// Generates Next.js App Router pages from the captured Joomla site.
// For each *.html in the capture it extracts the <body> inner HTML and the
// per-page <style> blocks, rewrites internal links to Next routes and asset
// references to absolute /public paths, and writes app/<route>/{page.tsx,
// content.html, styles.css}.
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  mkdirSync,
  rmSync,
  existsSync,
} from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..');
const SRC = join(process.env.HOME, 'viziocum/capture/viziocum.sk');
const APP = join(ROOT, 'app');

// ---- collect html files -------------------------------------------------
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

const SKIP = /(^|\/)svg-shape-[^/]*\.html$/;
const files = walk(SRC)
  .map((p) => relative(SRC, p))
  .filter((rel) => !SKIP.test(rel))
  .sort();

// ---- route mapping ------------------------------------------------------
function relToRoute(rel) {
  let r = rel.replace(/\.html$/, '');
  const parts = r.split('/');
  if (parts[parts.length - 1] === 'index') parts.pop();
  return parts.join('/'); // '' for home
}
function routeHref(route) {
  return route === '' ? '/' : '/' + route + '/';
}
const routeByRel = new Map(files.map((rel) => [rel, relToRoute(rel)]));

// ---- reference rewriting ------------------------------------------------
function posixNormalize(p) {
  const parts = [];
  for (const seg of p.split('/')) {
    if (seg === '' || seg === '.') continue;
    if (seg === '..') parts.pop();
    else parts.push(seg);
  }
  return parts.join('/');
}

function rewriteRef(pageRel, raw) {
  if (!raw) return raw;
  const val = raw.trim();
  if (
    /^(https?:|mailto:|tel:|data:|javascript:|#|\/\/)/i.test(val) ||
    val === ''
  ) {
    return raw;
  }
  // split off query / hash
  const m = val.match(/^([^?#]*)([?#].*)?$/);
  let pathPart = m[1];
  const suffix = m[2] || '';
  if (pathPart.startsWith('/')) return raw; // already absolute
  const rootRel = posixNormalize(join(dirname(pageRel), pathPart));
  if (rootRel.endsWith('.html')) {
    const route = routeByRel.has(rootRel)
      ? routeByRel.get(rootRel)
      : relToRoute(rootRel);
    return routeHref(route) + suffix;
  }
  return '/' + rootRel + suffix;
}

function rewriteHtml(pageRel, html) {
  let out = html;
  // attributes carrying a single URL
  for (const attr of [
    'href',
    'src',
    'data-src',
    'poster',
    'data-large-src',
    'data-bg',
  ]) {
    const re = new RegExp(`(\\s${attr}=")([^"]*)(")`, 'gi');
    out = out.replace(re, (_, a, v, b) => a + rewriteRef(pageRel, v) + b);
  }
  // srcset / data-srcset: comma separated "url descriptor"
  for (const attr of ['srcset', 'data-srcset']) {
    const re = new RegExp(`(\\s${attr}=")([^"]*)(")`, 'gi');
    out = out.replace(re, (_, a, v, b) => {
      const parts = v.split(',').map((item) => {
        const t = item.trim();
        const sp = t.split(/\s+/);
        sp[0] = rewriteRef(pageRel, sp[0]);
        return sp.join(' ');
      });
      return a + parts.join(', ') + b;
    });
  }
  // url(...) inside inline styles / css
  out = out.replace(/url\((['"]?)([^)'"]+)\1\)/gi, (full, q, u) => {
    return `url(${q}${rewriteRef(pageRel, u)}${q})`;
  });
  return out;
}

// ---- extraction ---------------------------------------------------------
function extractBody(html) {
  const start = html.search(/<body[^>]*>/i);
  const open = html.indexOf('>', start) + 1;
  const end = html.lastIndexOf('</body>');
  let body = html.slice(open, end);
  // drop HTTrack mirror comments
  body = body.replace(/<!--\s*Mirrored from[\s\S]*?-->/gi, '');
  return body.trim();
}
function extractHeadStyles(html) {
  const head = html.slice(0, html.search(/<\/head>/i));
  const blocks = [];
  const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = re.exec(head))) {
    // skip the one we already hardcode in layout
    if (/sppb-row-container/.test(m[1]) && m[1].length < 120) continue;
    blocks.push(m[1]);
  }
  return blocks.join('\n');
}

// ---- page template ------------------------------------------------------
const PAGE_TSX = `import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const dir = dirname(fileURLToPath(import.meta.url));

export default function Page() {
  const css = readFileSync(join(dir, 'styles.css'), 'utf8');
  const html = readFileSync(join(dir, 'content.html'), 'utf8');
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
`;

// ---- clean previously generated routes ----------------------------------
for (const name of readdirSync(APP)) {
  const p = join(APP, name);
  if (statSync(p).isDirectory()) rmSync(p, { recursive: true, force: true });
}
// remove a stale root page if present
if (existsSync(join(APP, 'page.tsx'))) rmSync(join(APP, 'page.tsx'));
if (existsSync(join(APP, 'content.html'))) rmSync(join(APP, 'content.html'));
if (existsSync(join(APP, 'styles.css'))) rmSync(join(APP, 'styles.css'));

// ---- generate -----------------------------------------------------------
let count = 0;
for (const rel of files) {
  const html = readFileSync(join(SRC, rel), 'utf8');
  const route = routeByRel.get(rel);
  const outDir = route === '' ? APP : join(APP, route);
  mkdirSync(outDir, { recursive: true });

  const body = rewriteHtml(rel, extractBody(html));
  const css = rewriteHtml(rel, extractHeadStyles(html));

  writeFileSync(join(outDir, 'content.html'), body);
  writeFileSync(join(outDir, 'styles.css'), css);
  writeFileSync(join(outDir, 'page.tsx'), PAGE_TSX);
  count++;
}

console.log(`Generated ${count} routes:`);
for (const rel of files) console.log('  ', routeHref(routeByRel.get(rel)), '  <-', rel);
