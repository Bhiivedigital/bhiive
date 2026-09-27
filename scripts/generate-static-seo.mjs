// Post-build SEO stamping. Runs after `ng build` (see package.json "build").
//
// The site is a client-rendered Angular app served as static files from
// Hostinger, so crawlers and link previews that don't run JavaScript only ever
// saw index.html's homepage tags. This writes one HTML file per route with the
// right <head> already in place: title, description, canonical, robots, Open
// Graph/Twitter and the page's JSON-LD graph, plus a <noscript> summary with
// the page's key links. It also writes the 301 rules for the old /blog URLs
// into .htaccess. (The sitemap is served live by the CMS: /api/sitemap.xml.)
//
// All tag values come from src/app/core/seo/seo-shared.mjs — the same module
// the running app uses — so the stamped HTML and the live page always agree.
// Service pages and articles come from the CMS, like on the live site.
//
// Usage: node scripts/generate-static-seo.mjs [outputDir]
// CMS_URL overrides the Strapi origin read from src/environments/environment.ts.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE, absoluteUrl, articleSeo, careerSeo, graph, normalizeArticle, organizationNode,
  pillarSeo, resolvePillarSlug, serviceFromCms, servicePagesQuery, staticPageSeo, websiteNode,
} from '../src/app/core/seo/seo-shared.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = process.argv[2] || join(ROOT, 'dist', 'bhiive', 'browser');
const readJson = rel => JSON.parse(readFileSync(join(ROOT, rel), 'utf8'));

// ------------------------------------------------------------------ data

// Bundled copy of the service pages — used only if the CMS has none yet.
const bundledPillars = readJson('src/app/data/pillars/index.json').map(p => ({
  ...p,
  ...readJson(`src/app/data/pillars/${p.slug}.json`),
}));
const pages = readJson('src/app/data/pages.json');

async function fetchServicePages(cms) {
  const res = await fetch(`${cms}/api/service-pages?${servicePagesQuery()}`, { signal: AbortSignal.timeout(30_000) });
  if (!res.ok) throw new Error(`CMS responded ${res.status} for service pages`);
  const body = await res.json();
  return (body.data || []).map(raw => serviceFromCms(raw, cms));
}
const jobs = readJson('src/assets/careers.json');

function cmsOrigin() {
  if (process.env.CMS_URL) return process.env.CMS_URL.replace(/\/$/, '');
  const env = readFileSync(join(ROOT, 'src/environments/environment.ts'), 'utf8');
  return (env.match(/cmsUrl:\s*['"]([^'"]*)['"]/) || [])[1] || '';
}

async function fetchArticles(cms) {
  const all = [];
  for (let page = 1; page < 50; page++) {
    const params = [
      'sort=publishedAt:desc',
      `pagination[page]=${page}`,
      'pagination[pageSize]=100',
      'populate[cover][fields][0]=url',
      'populate[cover][fields][1]=alternativeText',
      'populate[category][fields][0]=slug',
      'populate[category][fields][1]=name',
      'populate[author][fields][0]=name',
      'populate[tags][fields][0]=name',
      'populate[seo][populate][0]=metaImage',
    ].join('&');
    const res = await fetch(`${cms}/api/articles?${params}`, { signal: AbortSignal.timeout(30_000) });
    if (!res.ok) throw new Error(`CMS responded ${res.status}`);
    const body = await res.json();
    all.push(...(body.data || []).map(raw => normalizeArticle(raw, cms)));
    if (page >= (body.meta?.pagination?.pageCount || 1)) break;
  }
  return all;
}

// ------------------------------------------------------------- stamping

const esc = s => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function upsert(html, pattern, tag) {
  return pattern.test(html) ? html.replace(pattern, () => tag) : html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}
const metaName = n => new RegExp(`<meta[^>]*\\bname=["']${n}["'][^>]*>`, 'i');
const metaProp = p => new RegExp(`<meta[^>]*\\bproperty=["']${p}["'][^>]*>`, 'i');
const removeProp = (html, p) => html.replace(new RegExp(`\\s*<meta[^>]*\\bproperty=["']${p}["'][^>]*>`, 'gi'), '');

function stamp(template, seo, { noscript } = {}) {
  const canonical = seo.canonical || absoluteUrl(seo.path);
  const image = absoluteUrl(seo.image || SITE.defaultImage);
  let html = template;

  html = upsert(html, /<title>[\s\S]*?<\/title>/i, `<title>${esc(seo.title)}</title>`);
  html = upsert(html, metaName('description'), `<meta name="description" content="${esc(seo.description)}">`);
  html = seo.keywords
    ? upsert(html, metaName('keywords'), `<meta name="keywords" content="${esc(seo.keywords)}">`)
    : html.replace(metaName('keywords'), '');
  html = upsert(html, metaName('robots'), `<meta name="robots" content="${esc(seo.robots)}">`);
  html = upsert(html, /<link[^>]*\brel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${esc(canonical)}">`);

  html = upsert(html, metaProp('og:type'), `<meta property="og:type" content="${seo.type}">`);
  html = upsert(html, metaProp('og:url'), `<meta property="og:url" content="${esc(canonical)}">`);
  html = upsert(html, metaProp('og:title'), `<meta property="og:title" content="${esc(seo.title)}">`);
  html = upsert(html, metaProp('og:description'), `<meta property="og:description" content="${esc(seo.description)}">`);
  html = upsert(html, metaProp('og:image'), `<meta property="og:image" content="${esc(image)}">`);
  html = upsert(html, metaProp('og:image:alt'), `<meta property="og:image:alt" content="${esc(seo.title)}">`);
  if (image !== absoluteUrl(SITE.defaultImage)) {
    // The width/height in the template describe the default share image only.
    html = removeProp(html, 'og:image:width');
    html = removeProp(html, 'og:image:height');
  }
  html = upsert(html, metaName('twitter:title'), `<meta name="twitter:title" content="${esc(seo.title)}">`);
  html = upsert(html, metaName('twitter:description'), `<meta name="twitter:description" content="${esc(seo.description)}">`);
  html = upsert(html, metaName('twitter:image'), `<meta name="twitter:image" content="${esc(image)}">`);

  if (seo.type === 'article') {
    if (seo.published) html = upsert(html, metaProp('article:published_time'), `<meta property="article:published_time" content="${esc(seo.published)}">`);
    if (seo.modified) html = upsert(html, metaProp('article:modified_time'), `<meta property="article:modified_time" content="${esc(seo.modified)}">`);
    if (seo.section) html = upsert(html, metaProp('article:section'), `<meta property="article:section" content="${esc(seo.section)}">`);
  }

  const json = JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c');
  html = html.replace(
    /<script type="application\/ld\+json" id="page-schema">[\s\S]*?<\/script>/i,
    () => `<script type="application/ld+json" id="page-schema">${json}</script>`,
  );

  if (noscript) html = html.replace(/<app-root><\/app-root>/i, () => `<app-root></app-root>\n  <noscript>${noscript}</noscript>`);
  return html;
}

/** Plain-HTML summary for crawlers and browsers that don't run JavaScript. */
function noscriptBlock(seo, links) {
  const items = links.map(l => `<li><a href="${esc(l.path)}">${esc(l.name)}</a></li>`).join('');
  return `<div style="max-width:760px;margin:40px auto;padding:0 20px;font-family:system-ui,sans-serif">`
    + `<h1>${esc(seo.h1 || seo.title)}</h1><p>${esc(seo.description)}</p>`
    + (items ? `<ul>${items}</ul>` : '')
    + `<p>Call <a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a> or email <a href="mailto:${SITE.email}">${SITE.email}</a>.</p></div>`;
}

function fileFor(path) {
  // "/"  → index.html;  "/web-development/x" → web-development/x.html
  // (served extensionless by .htaccess, so canonical URLs keep no trailing slash)
  return path === '/' ? 'index.html' : `${path.slice(1)}.html`;
}

// ------------------------------------------------------------------ main

async function main() {
  const templatePath = join(OUT, 'index.html');
  if (!existsSync(templatePath)) throw new Error(`No build found at ${templatePath} — run ng build first.`);
  // index.html is itself overwritten below (it is the "/" page), so strip what
  // an earlier run added — the script can be re-run on the same output.
  const template = readFileSync(templatePath, 'utf8')
    .replace(/(<app-root><\/app-root>)\s*<noscript>[\s\S]*?<\/noscript>/i, '$1');

  const cms = cmsOrigin();
  let articles = [];
  let pillars = bundledPillars;
  if (cms) {
    try {
      articles = await fetchArticles(cms);
      console.log(`[seo] ${articles.length} articles from ${cms}`);
    } catch (err) {
      // Deploying a build without articles would drop every article page and
      // every /blog 301 — so stop unless explicitly allowed.
      if (!process.env.SEO_ALLOW_OFFLINE) {
        throw new Error(`CMS unreachable (${err.message}). Fix the connection, or set SEO_ALLOW_OFFLINE=1 to stamp static routes only (not for deploys).`);
      }
      console.warn(`[seo] CMS unreachable (${err.message}) — SEO_ALLOW_OFFLINE set, stamping static routes only.`);
    }
    try {
      const fromCms = await fetchServicePages(cms);
      if (fromCms.length) pillars = fromCms;
      console.log(`[seo] ${fromCms.length ? `${fromCms.length} service pages from the CMS` : 'no service pages in the CMS yet — using the bundled copy'}`);
    } catch (err) {
      console.warn(`[seo] service pages unavailable (${err.message}) — using the bundled copy.`);
    }
  }

  const byPillar = slug => articles.filter(a => resolvePillarSlug(a, pillars) === slug);
  const pillarLinks = pillars.map(p => ({ name: p.name, path: '/' + p.slug }));
  const routes = [];

  for (const [path, page] of Object.entries(pages)) {
    if (path === '/not-found') continue;
    const extra = path === '/services' ? { itemList: pillarLinks }
      : path === '/articles' ? { itemList: articles.slice(0, 30).map(a => ({ name: a.title, path: `/${resolvePillarSlug(a, pillars)}/${a.slug}` })) }
      : {};
    const seo = staticPageSeo(path, { ...page, ...extra });
    const links = path === '/articles' ? extra.itemList : pillarLinks;
    routes.push({ seo, links });
  }

  for (const p of pillars) {
    const list = byPillar(p.slug);
    const seo = { ...pillarSeo(p, list), h1: p.h1 };
    routes.push({ seo, links: list.map(a => ({ name: a.title, path: `/${p.slug}/${a.slug}` })) });
  }

  const redirects = [];
  for (const a of articles) {
    const seo = articleSeo(a, pillars);
    const pillarSlug = resolvePillarSlug(a, pillars);
    routes.push({
      seo: { ...seo, h1: a.title },
      links: [{ name: pillars.find(p => p.slug === pillarSlug).name, path: '/' + pillarSlug }],
    });
    redirects.push([a.slug, seo.path]);
  }

  for (const job of jobs) {
    routes.push({ seo: { ...careerSeo(job), h1: job.title }, links: [{ name: 'All careers', path: '/career' }] });
  }

  // 1. One HTML file per route.
  for (const r of routes) {
    const file = join(OUT, fileFor(r.seo.path));
    mkdirSync(dirname(file), { recursive: true });
    const html = stamp(template, r.seo, {
      noscript: noscriptBlock(r.seo, r.links || []),
    });
    writeFileSync(file, html);
  }

  // 2. Fallback shell for any path without its own file (e.g. an article
  //    published after this build). No canonical/og:url, so it never claims
  //    to be the homepage; the app sets the real tags once it boots.
  const baseLd = JSON.stringify(graph([organizationNode(), websiteNode()])).replace(/</g, '\\u003c');
  const shell = template
    .replace(/\s*<link[^>]*\brel=["']canonical["'][^>]*>/i, '')
    .replace(/\s*<meta[^>]*\bproperty=["']og:url["'][^>]*>/i, '')
    // Only the site-wide nodes: the homepage's FAQ/WebPage graph must not describe other URLs.
    .replace(/(<script type="application\/ld\+json" id="page-schema">)[\s\S]*?(<\/script>)/i, (_m, a, b) => `${a}${baseLd}${b}`);
  writeFileSync(join(OUT, 'app.html'), shell);

  // 3. 301s for every old /blog/<slug> URL, straight to the article's new home.
  const htaccessPath = join(OUT, '.htaccess');
  if (existsSync(htaccessPath)) {
    const source = readFileSync(htaccessPath, 'utf8');
    const eol = source.includes('\r\n') ? '\r\n' : '\n'; // git may check the file out with CRLF
    const marker = /(# BEGIN generated blog redirects\r?\n)[\s\S]*?(# END generated blog redirects)/;
    if (!marker.test(source)) throw new Error('.htaccess is missing the "# BEGIN/END generated blog redirects" markers.');
    const rules = redirects
      .map(([slug, to]) => `RewriteRule ^blog/${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/?$ ${to} [R=301,L,NC]`)
      .join(eol);
    writeFileSync(htaccessPath, source.replace(marker, (_m, a, b) => `${a}${rules}${rules ? eol : ''}${b}`));
  } else if (redirects.length) {
    throw new Error(`${htaccessPath} not found — the /blog redirects could not be written.`);
  }

  console.log(`[seo] stamped ${routes.length} pages and ${redirects.length} blog redirects → ${OUT}`);
}

main().catch(err => {
  console.error('[seo] failed:', err);
  process.exit(1);
});
