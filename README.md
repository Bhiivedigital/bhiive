# Bhiive website

Angular 18 site for [bhiive.com](https://bhiive.com). Articles, service pages, the sitemap and stored leads live in the Strapi CMS at `cms.bhiive.com` (repo: `bhiive-cms`, see its DEPLOY.md); everything else is in this repo.

## Commands

| Command | What it does |
|---|---|
| `npm start` | Dev server on http://localhost:4200. `/api` and `/uploads` are proxied to a local Strapi on :1337 (`proxy.conf.json`). |
| `npm run build` | Production build **and** SEO stamping (see below). Output: `dist/bhiive/browser`. |
| `npm run seo:stamp` | Re-run only the SEO stamping on an existing build (e.g. after publishing articles). |

Deploy: upload the contents of `dist/bhiive/browser` (including `.htaccess`) to Hostinger `public_html`.

## How the site is organised

```
/                         Home
/services                 Services hub
/:service                 Service pillar page (6 of them, e.g. /web-development)
/:service/:article        Article, filed under the service it supports
/articles                 All articles (?topic=<service> filters)
/about-us /contact-us /career /careers/:job /privacy-policy
/blog, /blog/:slug        Old URLs → 301 to /articles and to each article's new URL
```

Each service page is the hub for its articles, and each article links back to its service — a hub-and-spoke (pillar/cluster) structure.

- **Service content** is edited in Strapi (**Service Page**). `ServiceCatalog` loads it; menus render first from the bundled copy in `src/app/data/pillars/` and switch to the CMS list when it arrives. The bundled copy is also the fallback if the CMS is down or has no service pages yet — keep it roughly in sync, but the CMS wins.
- **Static page titles, descriptions and FAQs** live in `src/app/data/pages.json`.
- **Which service an article belongs to** is decided by the CMS (category → Service Page, else match keywords, else the default service) and sent as `servicePageSlug` on every article. `resolvePillarSlug` in `seo-shared.mjs` only repeats that rule as a fallback. Give every article a category so its URL is stable.

## SEO

- `src/app/core/seo/seo-shared.mjs` is the single source for titles, descriptions, canonical URLs and JSON-LD (Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage, BlogPosting, ItemList). It is plain JS so both the app (`SeoService`) and the build script use it — the HTML crawlers see and the live page can't disagree.
- `scripts/generate-static-seo.mjs` runs after `ng build`. For every route (static pages, services, each CMS article, each job) it writes an HTML file with the right `<head>` and JSON-LD already filled in, plus a `<noscript>` summary, using the CMS service pages and articles. It also writes the `/blog/<slug>` 301 rules in `.htaccess`.
- **Sitemap** is live in the CMS (`cms.bhiive.com/api/sitemap.xml`); `robots.txt` lists it and `/sitemap.xml` redirects to it. New articles appear there, and are pinged to IndexNow (key file `public/4ec0467775079dd7c568efc3a0692ad5.txt`), as soon as they are published.
- **After publishing or re-categorising articles, rebuild and redeploy when convenient** so they get pre-stamped pages and `/blog` redirects. Until then they still work (the app renders them and sets their tags) and are already in the live sitemap.
- `public/.htaccess` forces `https://bhiive.com` (no `www`), serves pages without `.html` or a trailing slash, and returns real 404s for missing files.

## Design

The site uses the original SEOZ theme (`src/assets/css/main.css`, jQuery/WOW/GSAP scripts in `index.html`, styles in `src/styles.scss`). Service pages and articles use the theme's own service-detail and blog layouts; the only markup additions are SEO ones (the banner / article title is the page `<h1>`, styled like the old `<h2>`).

## Forms

Every enquiry form (header popup, homepage hero and contact section, sidebar, contact and career pages) keeps its original markup and calls `LeadService`, which saves the lead in the CMS (**Lead**) and sends the EmailJS email (same service and template as before) in parallel; either succeeding counts as sent. The source says which form it came from. The CMS validates and rate-limits submissions.
