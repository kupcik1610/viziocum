// One-time migration: rewrite the captured Joomla/SP Page Builder content.html
// files in place as clean, readable, semantic HTML. Run with:
//   node scripts/clean-content.mjs
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ALLOWED = {
  a: ['href', 'target', 'rel'],
  img: ['src', 'alt'],
  iframe: ['src', 'width', 'height', 'title', 'loading'],
  td: ['colspan', 'rowspan'],
  th: ['colspan', 'rowspan'],
};
const UNWRAP = ['div', 'section', 'span', 'header', 'footer', 'article', 'figure', 'figcaption', 'label', 'small', 'font'];
const DROP = ['style', 'script', 'i', 'svg', 'button', 'nav'];
const BLOCK = 'p|h[1-6]|ul|ol|li|table|thead|tbody|tr|td|th|blockquote|iframe|img|hr';

function attrs(tag, raw) {
  const allow = ALLOWED[tag];
  if (!allow) return '';
  const out = [];
  for (const name of allow) {
    const m = raw.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'));
    if (m) {
      const val = (m[2] ?? m[3] ?? '').trim();
      if (val) out.push(`${name}="${val}"`);
    }
  }
  return out.length ? ' ' + out.join(' ') : '';
}

function cleanHtml(raw) {
  let html = raw;
  for (const tag of DROP) {
    html = html.replace(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?</${tag}>`, 'gi'), '');
    html = html.replace(new RegExp(`<${tag}\\b[^>]*/?>`, 'gi'), '');
  }
  html = html.replace(/<!--[\s\S]*?-->/g, '');
  for (const tag of UNWRAP) html = html.replace(new RegExp(`</?${tag}\\b[^>]*>`, 'gi'), '');
  html = html
    .replace(/<(\/?)h3\b/gi, '<$1h4')
    .replace(/<(\/?)h2\b/gi, '<$1h3')
    .replace(/<(\/?)h1\b/gi, '<$1h2');
  html = html.replace(/<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*?)(\/?)>/g, (_m, tag, rest, slash) =>
    `<${tag.toLowerCase()}${attrs(tag.toLowerCase(), rest)}${slash ? ' /' : ''}>`
  );
  const grid = html.search(/<h[1-6][^>]*>\s*OCHORENIA\s*<\/h[1-6]>/i);
  if (grid > 0) html = html.slice(0, grid);
  html = html
    .replace(/<h([2-6])>\s*\d+\s*<\/h\1>/gi, '')
    .replace(/<(p|h2|h3|h4|h5|li|em|strong)>\s*(?:&nbsp;|\s)*<\/\1>/gi, '');

  // pretty-print: put each block-level tag on its own line
  html = html
    .replace(new RegExp(`\\s*(</?(?:${BLOCK})\\b[^>]*>)\\s*`, 'gi'), '\n$1\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .replace(/^\s+|\s+$/g, '')
    .replace(/ \n/g, '\n');
  return html + '\n';
}

const FILES = [
  'app/elektrostimulacia/content.html',
  'app/zapozicanie-prenosneho-tonometra/content.html',
  'app/ochorenia/glaukom/content.html',
  'app/ochorenia/hypoplazia-zrakoveho-nervu/content.html',
  'app/ochorenia/leberova-dedicna-opticka-neuropatia/content.html',
  'app/ochorenia/poruchy-zraku-a-opticka-neuritida/content.html',
  'app/ochorenia/poskodenie-zrakoveho-nervu-z-nedokrvenia/content.html',
  'app/ochorenia/poskodenie-zraku-po-poraneni-mozgu/content.html',
  'app/ochorenia/retinitis-pigmentosa/content.html',
  'app/ochorenia/tupozrakost-cize-amblyopia/content.html',
];

for (const rel of FILES) {
  const file = join(process.cwd(), rel);
  const before = readFileSync(file, 'utf8');
  const after = cleanHtml(before);
  writeFileSync(file, after);
  console.log(`${rel}: ${before.split('\n').length} -> ${after.split('\n').length} lines`);
}
