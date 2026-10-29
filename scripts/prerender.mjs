// Prerenders every route to static HTML so crawlers get full content, headings,
// links and per-page meta on first fetch (no JavaScript needed). Also writes
// 404.html and sitemap.xml from the SEO registry in src/seo/pages.ts.
//
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.tsx`.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const { render, pages, notFoundPage, absoluteUrl } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

const escapeAttr = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const escapeText = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setTag(html, pattern, replacement) {
    if (!pattern.test(html)) throw new Error(`Template is missing ${pattern}`);
    return html.replace(pattern, replacement);
}

function buildHead(html, meta, { canonical = true } = {}) {
    const url = absoluteUrl(meta.path);
    const image = absoluteUrl(meta.image);
    html = setTag(html, /<title>.*?<\/title>/s, `<title>${escapeText(meta.title)}</title>`);
    const tags = [
        ['name="description"', meta.description],
        ['name="robots"', meta.noindex ? 'noindex, follow' : 'index, follow'],
        ['property="og:title"', meta.title],
        ['property="og:description"', meta.description],
        ['property="og:url"', url],
        ['property="og:image"', image],
        ['name="twitter:title"', meta.title],
        ['name="twitter:description"', meta.description],
        ['name="twitter:image"', image],
    ];
    for (const [attr, value] of tags) {
        html = setTag(html, new RegExp(`<meta ${attr} content=".*?" />`), `<meta ${attr} content="${escapeAttr(value)}" />`);
    }
    html = canonical
        ? setTag(html, /<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${escapeAttr(url)}" />`)
        : html.replace(/\s*<link rel="canonical" href=".*?" \/>/, '');
    // "<" is escaped so a value can never close the script tag early.
    const jsonLd = meta.schemas
        .map(schema => `<script type="application/ld+json" data-page-ld>${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`)
        .join('\n    ');
    return jsonLd ? html.replace('</head>', `    ${jsonLd}\n  </head>`) : html;
}

function check(meta, appHtml) {
    const problems = [];
    if (meta.title.length > 60) problems.push(`title is ${meta.title.length} chars`);
    if (meta.description.length > 160) problems.push(`description is ${meta.description.length} chars`);
    const h1s = appHtml.match(/<h1[\s>]/g) ?? [];
    if (h1s.length !== 1) problems.push(`${h1s.length} <h1> elements`);
    if (problems.length) throw new Error(`${meta.path}: ${problems.join(', ')}`);
}

function outFile(path) {
    // With "cleanUrls" in vercel.json, /about is served from about.html.
    return path === '/' ? join(distDir, 'index.html') : join(distDir, `${path.slice(1)}.html`);
}

for (const meta of pages) {
    const appHtml = await render(meta.path);
    check(meta, appHtml);
    const html = buildHead(template, meta).replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    const file = outFile(meta.path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    console.log(`prerendered ${meta.path}`);
}

// Served by Vercel with a real 404 status for any unknown URL.
const notFoundHtml = await render('/this-page-does-not-exist');
writeFileSync(
    join(distDir, '404.html'),
    buildHead(template, notFoundPage, { canonical: false }).replace('<div id="root"></div>', `<div id="root">${notFoundHtml}</div>`)
);
console.log('prerendered 404.html');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
    .filter(p => !p.noindex)
    .map(p => `  <url>\n    <loc>${absoluteUrl(p.path)}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n  </url>`)
    .join('\n')}
</urlset>
`;
writeFileSync(join(distDir, 'sitemap.xml'), sitemap);
console.log(`sitemap.xml: ${pages.filter(p => !p.noindex).length} URLs`);

rmSync(ssrDir, { recursive: true, force: true });
