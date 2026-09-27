// Shared SEO logic.
//
// Imported by the Angular app (SeoService, ArticleService, page components) AND
// by scripts/generate-static-seo.mjs after `ng build`. Keeping titles,
// descriptions, canonicals and JSON-LD in one plain-JS module means the HTML
// the build stamps for crawlers and the tags the running app sets can never
// disagree. Keep this file free of imports and browser/Node APIs.

export const SITE = {
  origin: 'https://bhiive.com',
  name: 'Bhiive',
  alternateName: 'Bhiive Digi Tech',
  tagline: 'Web design, digital marketing and automation agency in Chennai',
  email: 'sales@bhiive.com',
  phone: '+91-94459-74970',
  phoneDisplay: '+91 94459 74970',
  phoneHref: 'tel:+919445974970',
  whatsapp: 'https://wa.me/919445974970',
  streetAddress: 'Sriraman Street, Sembiyan, Perambur',
  postalCode: '600011',
  locality: 'Chennai',
  region: 'Tamil Nadu',
  country: 'IN',
  logo: '/assets/img/logo/logo1.png',
  logoWidth: 300,
  logoHeight: 148,
  defaultImage: '/assets/img/og/bhiive-og.jpg',
  locale: 'en_IN',
  language: 'en-IN',
  sameAs: [
    'https://www.facebook.com/share/1APJ3Ujr7A/',
    'https://www.instagram.com/bhiivedigital',
  ],
};

// ---------------------------------------------------------------- helpers

export function absoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return SITE.origin + '/';
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  let path = pathOrUrl.startsWith('/') ? pathOrUrl : '/' + pathOrUrl;
  // Canonical URLs never carry a trailing slash (except the root).
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return SITE.origin + path;
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '—', ndash: '–', hellip: '…', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“' };

export function plainText(html) {
  if (!html) return '';
  return String(html)
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#(\d+);/g, (_m, n) => String.fromCharCode(Number(n)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m)
    .replace(/\s+/g, ' ')
    .trim();
}

/** Cuts on a word boundary so meta descriptions never end mid-word. */
export function truncate(text, max = 160) {
  const t = plainText(text);
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.–—-]+$/, '') + '…';
}

/**
 * "Topic | Bhiive" unless the title already names the brand, or the suffix
 * would push it past ~60 characters and get it truncated in results.
 */
export function pageTitle(title) {
  const t = (title || '').trim();
  if (!t) return `${SITE.name} | ${SITE.tagline}`;
  if (/bhiive/i.test(t)) return t;
  const branded = `${t} | ${SITE.name}`;
  return branded.length <= 60 ? branded : t;
}

export function slugify(text) {
  return plainText(text)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

// ---------------------------------------------------------------- pillars

/**
 * Every article lives under one service pillar: /:pillar/:article.
 * 1. the CMS category, if it is mapped to a pillar;
 * 2. otherwise keywords in the slug/title (articles with no category yet);
 * 3. otherwise the broadest pillar.
 * The same function runs at build time and in the browser, so the prerendered
 * canonical and the runtime canonical always match.
 */
export function resolvePillarSlug(article, pillars) {
  // The CMS decides (bhiive-cms: utils/service-pages.js) and sends the answer
  // as servicePageSlug. The steps below are only a fallback for when it hasn't.
  const fromCms = article?.servicePageSlug;
  if (fromCms && pillars.some(p => p.slug === fromCms)) return fromCms;
  const cat = article?.categorySlug;
  if (cat) {
    const byCategory = pillars.find(p => p.slug === cat || (p.categories || []).includes(cat));
    if (byCategory) return byCategory.slug;
  }
  const haystack = `${article?.slug || ''} ${slugify(article?.title || '')}`;
  // Narrow topics first ("workflow" before "automation" before "marketing").
  const ordered = [...pillars].sort((a, b) => (a.matchOrder ?? 99) - (b.matchOrder ?? 99));
  for (const p of ordered) {
    if ((p.keywords || []).some(k => haystack.includes(k))) return p.slug;
  }
  return pillars.find(p => p.fallback)?.slug || pillars[0].slug;
}

export function articlePath(article, pillars) {
  return `/${resolvePillarSlug(article, pillars)}/${article.slug}`;
}

// ---------------------------------------------------------------- CMS

function mediaUrl(url, cmsOrigin) {
  if (!url) return '';
  return /^https?:\/\//i.test(url) ? url : (cmsOrigin || '') + url;
}

/**
 * Strapi 5 article → the shape every consumer uses. `cmsOrigin` is prefixed to
 * relative /uploads URLs (empty in dev, where the dev-server proxies them).
 */
export function normalizeArticle(raw, cmsOrigin = '') {
  const seo = raw.seo || {};
  const publishedAt = raw.publishedAt || raw.createdAt || null;
  // Strapi stamps publishedAt a moment after updatedAt; never report a
  // modification date earlier than the publication date.
  const updatedAt = [raw.updatedAt, publishedAt].filter(Boolean).sort().pop() || null;
  return {
    id: raw.documentId || raw.id,
    slug: raw.slug,
    title: raw.title || '',
    excerpt: plainText(raw.excerpt || ''),
    cover: mediaUrl(raw.cover?.url, cmsOrigin),
    coverAlt: raw.cover?.alternativeText || raw.title || '',
    coverWidth: raw.cover?.width || null,
    coverHeight: raw.cover?.height || null,
    publishedAt,
    updatedAt,
    readingTime: raw.readingTime || null,
    categorySlug: raw.category?.slug || null,
    categoryName: raw.category?.name || null,
    servicePageSlug: raw.servicePageSlug || null,
    authorName: raw.author?.name || null,
    authorBio: raw.author?.bio || null,
    tags: (raw.tags || []).map(t => t.name).filter(Boolean),
    featured: !!raw.featured,
    htmlContent: raw.htmlContent || '',
    blocks: raw.content || [],
    seo: {
      metaTitle: seo.metaTitle || '',
      metaDescription: seo.metaDescription || '',
      keywords: seo.keywords || '',
      metaRobots: seo.metaRobots || '',
      canonicalURL: seo.canonicalURL || '',
      ogTitle: seo.ogTitle || '',
      ogDescription: seo.ogDescription || '',
      image: mediaUrl(seo.metaImage?.url, cmsOrigin),
    },
  };
}

// ------------------------------------------------------- CMS service pages

/** Strapi query for published Service Pages with everything a page renders. */
export function servicePagesQuery(slug) {
  return [
    slug ? `filters[slug][$eq]=${encodeURIComponent(slug)}` : '',
    'sort=menuOrder:asc',
    'pagination[pageSize]=50',
    'populate[sections][on][service-sections.text]=true',
    'populate[sections][on][service-sections.cards][populate][items]=true',
    'populate[sections][on][service-sections.checklist]=true',
    'populate[sections][on][service-sections.steps][populate][items]=true',
    'populate[sections][on][service-sections.statements][populate][items]=true',
    'populate[sections][on][service-sections.tags]=true',
    'populate[faqs]=true',
    'populate[related][fields][0]=slug',
    'populate[categories][fields][0]=slug',
    'populate[seo][populate][0]=metaImage',
  ].filter(Boolean).join('&');
}

/** Lighter query for menus and cards: no page body. */
export function serviceListQuery() {
  const fields = ['name', 'slug', 'shortName', 'heading', 'eyebrow', 'summary', 'menuText', 'icon', 'menuOrder',
    'serviceType', 'matchKeywords', 'matchPriority', 'isDefault'];
  return [
    'sort=menuOrder:asc',
    'pagination[pageSize]=50',
    ...fields.map((f, i) => `fields[${i}]=${f}`),
    'populate[categories][fields][0]=slug',
    'populate[seo]=true',
  ].join('&');
}

const splitLines = text => String(text || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
const splitParagraphs = text => String(text || '')
  .split(/\r?\n\s*\r?\n/)
  .map(s => s.replace(/\s*\r?\n\s*/g, ' ').trim())
  .filter(Boolean);

// Ids used by the pillar page itself; a section anchor must not collide with them.
const RESERVED_IDS = new Set(['faqs', 'articles', 'main']);

/** CMS Service Page → the pillar shape the site renders (same as data/pillars/*.json). */
export function serviceFromCms(raw, cmsOrigin = '') {
  const used = new Set();
  const sections = (raw.sections || []).map((s, i) => {
    const type = String(s.__component || '').split('.')[1];
    let id = s.anchor || slugify(s.heading) || `section-${i + 1}`;
    if (RESERVED_IDS.has(id)) id = `${id}-section`;
    for (let n = 2, base = id; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    const base = { type, id, heading: s.heading || '' };
    switch (type) {
      case 'text':
        return { ...base, paragraphs: splitParagraphs(s.paragraphs), list: splitLines(s.list), closing: s.closing || undefined };
      case 'cards':
        return {
          ...base,
          intro: s.intro || undefined,
          items: (s.items || []).map(c => ({ title: c.title, text: c.text || '', paragraphs: splitParagraphs(c.details), points: splitLines(c.points) })),
        };
      case 'checklist':
        return { ...base, intro: s.intro || undefined, items: splitLines(s.items) };
      case 'steps':
        return { ...base, intro: s.intro || undefined, items: (s.items || []).map(x => ({ title: x.title, text: x.text || '' })) };
      case 'statements':
        return { ...base, items: (s.items || []).map(x => ({ lead: x.lead, text: x.text || '' })) };
      case 'tags':
        return { ...base, paragraphs: splitParagraphs(s.paragraphs), items: splitLines(s.items) };
      default:
        return null;
    }
  }).filter(Boolean);

  const seoImage = raw.seo?.metaImage?.url;
  return {
    slug: raw.slug,
    name: raw.name,
    shortName: raw.shortName || raw.name,
    icon: raw.icon || 'fa-solid fa-star',
    menuText: raw.menuText || '',
    summary: raw.summary || '',
    h1: raw.heading || raw.name,
    eyebrow: raw.eyebrow || '',
    serviceType: raw.serviceType || raw.name,
    categories: (raw.categories || []).map(c => c.slug),
    keywords: splitLines(raw.matchKeywords).map(k => k.toLowerCase()),
    matchOrder: raw.matchPriority ?? 50,
    fallback: !!raw.isDefault,
    seo: {
      title: raw.seo?.metaTitle || pageTitle(raw.name),
      description: raw.seo?.metaDescription || truncate(raw.summary, 160),
      keywords: raw.seo?.keywords || '',
    },
    image: seoImage ? (/^https?:\/\//i.test(seoImage) ? seoImage : cmsOrigin + seoImage) : undefined,
    lead: raw.lead || '',
    intro: splitParagraphs(raw.intro),
    highlights: splitLines(raw.highlights),
    sections,
    faqs: (raw.faqs || []).map(f => ({ q: f.question, a: f.answer })).filter(f => f.q && f.a),
    related: (raw.related || []).map(r => r.slug).filter(Boolean),
    cta: {
      heading: raw.ctaHeading || `Talk to us about ${raw.shortName || raw.name}`,
      text: raw.ctaText || 'Tell us what you need. We will come back with a plan and a clear quote.',
    },
  };
}

// ---------------------------------------------------------------- JSON-LD

const ORG_ID = `${SITE.origin}/#organization`;
const WEBSITE_ID = `${SITE.origin}/#website`;

export function organizationNode() {
  return {
    // ProfessionalService is a LocalBusiness (and so an Organization) subtype:
    // it lets the same node carry the Chennai address for local search.
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: SITE.name,
    alternateName: SITE.alternateName,
    url: SITE.origin + '/',
    logo: { '@type': 'ImageObject', url: absoluteUrl(SITE.logo), width: SITE.logoWidth, height: SITE.logoHeight },
    email: SITE.email,
    telephone: SITE.phone,
    image: absoluteUrl(SITE.defaultImage),
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      postalCode: SITE.postalCode,
      addressCountry: SITE.country,
    },
    areaServed: [{ '@type': 'City', name: 'Chennai' }, { '@type': 'Country', name: 'India' }],
    sameAs: SITE.sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      email: SITE.email,
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['English', 'Tamil'],
    },
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.origin + '/',
    name: SITE.name,
    alternateName: SITE.alternateName,
    inLanguage: SITE.language,
    publisher: { '@id': ORG_ID },
  };
}

export function webPageNode({ path, name, description, type = 'WebPage', image, datePublished, dateModified, hasBreadcrumb = true }) {
  const url = absoluteUrl(path);
  const node = {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: SITE.language,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
  };
  if (hasBreadcrumb) node.breadcrumb = { '@id': `${url}#breadcrumb` };
  if (image) node.primaryImageOfPage = { '@type': 'ImageObject', url: absoluteUrl(image) };
  if (datePublished) node.datePublished = datePublished;
  if (dateModified) node.dateModified = dateModified;
  return node;
}

/** items: [{ name, path }] — Home is prepended automatically. */
export function breadcrumbNode(path, items) {
  const trail = [{ name: 'Home', path: '/' }, ...items];
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqNode(path, faqs) {
  if (!faqs?.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: plainText(f.q),
      acceptedAnswer: { '@type': 'Answer', text: plainText(f.a) },
    })),
  };
}

export function itemListNode(path, name, items) {
  if (!items?.length) return null;
  return {
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#list`,
    name,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(item.path),
      name: item.name,
    })),
  };
}

export function serviceNode(pillar, offers = []) {
  const url = absoluteUrl('/' + pillar.slug);
  const node = {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: pillar.name,
    serviceType: pillar.serviceType || pillar.name,
    description: pillar.summary,
    url,
    provider: { '@id': ORG_ID },
    areaServed: [{ '@type': 'City', name: 'Chennai' }, { '@type': 'Country', name: 'India' }],
  };
  if (offers.length) {
    node.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${pillar.name} services`,
      itemListElement: offers.map(name => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    };
  }
  return node;
}

export function articleNode(article, path, pillar) {
  const url = absoluteUrl(path);
  const image = article.seo?.image || article.cover;
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: (article.seo?.metaTitle || article.title).slice(0, 110),
    description: articleDescription(article),
    url,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    image: image ? [absoluteUrl(image)] : [absoluteUrl(SITE.defaultImage)],
    datePublished: article.publishedAt || undefined,
    dateModified: article.updatedAt || article.publishedAt || undefined,
    author: article.authorName
      ? { '@type': 'Person', name: article.authorName }
      : { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    articleSection: pillar?.name,
    keywords: article.seo?.keywords || article.tags?.join(', ') || undefined,
    inLanguage: SITE.language,
    isPartOf: { '@id': WEBSITE_ID },
  };
}

export function graph(nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) };
}

// ---------------------------------------------------------------- route SEO
//
// Every builder returns the same descriptor:
// { path, title, description, keywords, image, type, robots, published,
//   modified, author, section, jsonLd }

function baseNodes() {
  return [organizationNode(), websiteNode()];
}

/** Static pages described in src/app/data/pages.json. */
export function staticPageSeo(path, page) {
  const title = page.title;
  const description = page.description;
  const nodes = [...baseNodes()];
  const isHome = path === '/';
  nodes.push(webPageNode({ path, name: title, description, type: page.schemaType || 'WebPage', hasBreadcrumb: !isHome }));
  if (!isHome) nodes.push(breadcrumbNode(path, [{ name: page.breadcrumb || title, path }]));
  if (page.faqs?.length) nodes.push(faqNode(path, page.faqs));
  if (page.itemList?.length) nodes.push(itemListNode(path, page.breadcrumb || title, page.itemList));
  return {
    path,
    title,
    description,
    keywords: page.keywords || '',
    image: page.image || SITE.defaultImage,
    type: 'website',
    robots: page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    jsonLd: graph(nodes),
  };
}

/** Service pillar pages at /:slug. `pillar` = index entry merged with its content file. */
export function pillarSeo(pillar, articles = []) {
  const path = '/' + pillar.slug;
  const offers = (pillar.sections || [])
    .filter(s => s.type === 'cards')
    .flatMap(s => s.items.map(i => i.title));
  const nodes = [
    ...baseNodes(),
    webPageNode({ path, name: pillar.seo.title, description: pillar.seo.description }),
    breadcrumbNode(path, [{ name: 'Services', path: '/services' }, { name: pillar.name, path }]),
    serviceNode(pillar, offers),
    faqNode(path, pillar.faqs),
    itemListNode(path, `${pillar.name} articles`, articles.map(a => ({ name: a.title, path: `${path}/${a.slug}` }))),
  ];
  return {
    path,
    title: pillar.seo.title,
    description: pillar.seo.description,
    keywords: pillar.seo.keywords || '',
    image: pillar.image || SITE.defaultImage,
    type: 'website',
    robots: 'index, follow, max-image-preview:large',
    jsonLd: graph(nodes),
  };
}

export function articleDescription(article) {
  return truncate(article.seo?.metaDescription || article.excerpt || plainText(article.htmlContent), 160);
}

/** A CMS canonical is honoured only if it points at one of this site's current URLs. */
function isUsableCanonical(url) {
  return /^https:\/\/(www\.)?bhiive\.com\//i.test(url || '') && !/\/blog\//i.test(url);
}

export function articleSeo(article, pillars) {
  const pillarSlug = resolvePillarSlug(article, pillars);
  const pillar = pillars.find(p => p.slug === pillarSlug);
  const path = `/${pillarSlug}/${article.slug}`;
  const title = pageTitle(article.seo?.metaTitle || article.title);
  const description = articleDescription(article);
  const image = article.seo?.image || article.cover || SITE.defaultImage;
  const noindex = /noindex/i.test(article.seo?.metaRobots || '');
  const nodes = [
    ...baseNodes(),
    webPageNode({ path, name: title, description, image, datePublished: article.publishedAt, dateModified: article.updatedAt }),
    breadcrumbNode(path, [
      { name: pillar.name, path: '/' + pillar.slug },
      { name: article.title, path },
    ]),
    articleNode(article, path, pillar),
  ];
  return {
    path,
    canonical: isUsableCanonical(article.seo?.canonicalURL) ? article.seo.canonicalURL : absoluteUrl(path),
    title,
    description,
    keywords: article.seo?.keywords || article.tags?.join(', ') || '',
    image,
    type: 'article',
    robots: noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    published: article.publishedAt,
    modified: article.updatedAt,
    author: article.authorName || SITE.name,
    section: pillar.name,
    jsonLd: graph(nodes),
  };
}

/** /careers/:slug — jobs come from src/assets/careers.json. */
export function careerSeo(job) {
  const path = `/careers/${job.slug}`;
  const title = `${job.title} Job in Chennai | Careers at Bhiive`;
  const description = truncate(`${job.title} (${job.experience}, ${job.location}). ${job.summary}`, 160);
  return {
    path,
    title,
    description,
    keywords: `${job.title} job Chennai, ${job.title} careers, Bhiive jobs`,
    image: SITE.defaultImage,
    type: 'website',
    robots: 'index, follow',
    jsonLd: graph([
      ...baseNodes(),
      webPageNode({ path, name: title, description }),
      breadcrumbNode(path, [{ name: 'Careers', path: '/career' }, { name: job.title, path }]),
    ]),
  };
}
