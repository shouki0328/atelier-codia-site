import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize, relative, resolve } from 'node:path';

const root = resolve('dist');
const requiredFiles = [
  'index.html',
  'works/index.html',
  'request/index.html',
  'about/index.html',
  '404.html',
  'assets/hero-jewelry.jpg',
  'assets/earrings-lumiere.jpg',
  'assets/necklace-aube.jpg',
  'assets/silver-moonstone.jpg',
  'assets/atelier-workbench.jpg'
];

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    failures.push(`Missing required output: ${file}`);
  }
}

const walk = (dir) => {
  const entries = readdirSync(dir);
  return entries.flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
};

const htmlFiles = existsSync(root) ? walk(root).filter((file) => extname(file) === '.html') : [];
const internalUrlPattern = /\b(?:href|src)="([^"]+)"/g;

const shouldSkip = (url) =>
  url.startsWith('#') ||
  url.startsWith('mailto:') ||
  url.startsWith('tel:') ||
  url.startsWith('http://') ||
  url.startsWith('https://') ||
  url.startsWith('data:');

const outputTargetExists = (fromFile, url) => {
  const cleanUrl = url.split('#')[0].split('?')[0];
  if (!cleanUrl || shouldSkip(cleanUrl)) return true;
  const resolved = normalize(resolve(fromFile, '..', cleanUrl));
  if (!resolved.startsWith(root)) return false;
  if (existsSync(resolved) && statSync(resolved).isFile()) return true;
  if (existsSync(join(resolved, 'index.html'))) return true;
  return false;
};

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  if (/Van\s*Cleef|Arpels|Alhambra|アルハンブラ|四葉|クローバー/i.test(html)) {
    failures.push(`Potential protected-brand motif text in ${relative(root, file)}`);
  }

  const imgTags = html.match(/<img\b[^>]*>/g) ?? [];
  for (const tag of imgTags) {
    if (/\saria-hidden="true"/.test(tag)) continue;
    if (!/\salt="[^"]{4,}"/.test(tag)) {
      failures.push(`Image missing meaningful alt in ${relative(root, file)}: ${tag}`);
    }
  }

  let match;
  while ((match = internalUrlPattern.exec(html)) !== null) {
    const url = match[1];
    if (!outputTargetExists(file, url)) {
      failures.push(`Broken local reference from ${relative(root, file)} to ${url}`);
    }
  }
}

const builtCss = existsSync(root)
  ? walk(root).filter((file) => extname(file) === '.css').map((file) => readFileSync(file, 'utf8')).join('\n')
  : '';

if (!builtCss.includes('prefers-reduced-motion')) {
  failures.push('Built CSS does not include prefers-reduced-motion handling');
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`dist check passed: ${htmlFiles.length} html files verified`);
