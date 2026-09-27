// Turns an article body from the CMS into page-ready HTML.
//
// Authors write either in the HTML editor (htmlContent, which may be a whole
// pasted document with its own <style>) or in Strapi's blocks editor. Either
// way the output must: keep a single <h1> on the page (the article title), give
// every section heading an anchor for the table of contents, keep CMS styles
// from leaking into the header/footer, and never execute scripts.
//
// Parsing uses the browser's own HTML and CSS parsers (DOMParser, CSSOM) rather
// than regexes, so odd-but-valid markup can't slip past the clean-up.

import { slugify } from '../seo/seo-shared.mjs';

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface RenderedContent {
  html: string;
  toc: TocItem[];
}

const SCOPE = '.article-body';
const DROP = 'script, noscript, object, embed, applet, base, meta, link, title, frame, frameset, form';
const URL_ATTRS = ['href', 'src', 'xlink:href', 'action', 'formaction', 'poster', 'background'];
const EMBED_HOSTS = /^https:\/\/(www\.)?(youtube(-nocookie)?\.com|player\.vimeo\.com)\//i;

export function renderArticleContent(
  htmlContent: string,
  blocks: any[],
  cmsOrigin: string,
  rewriteLink: (href: string) => string | null,
): RenderedContent {
  const authored = (htmlContent || '').trim();
  const source = authored || blocksToHtml(blocks || []);
  const doc = new DOMParser().parseFromString(`<!doctype html><html><head></head><body>${source}</body></html>`, 'text/html');
  // A pasted full document ends up with its <style> in <head>; keep it.
  const styles = Array.from(doc.head.querySelectorAll('style'));
  const body = doc.body;
  styles.forEach(s => body.prepend(s));

  sanitize(body, cmsOrigin);
  body.querySelectorAll('style').forEach(s => (s.textContent = scopeCss(s.textContent || '')));
  body.querySelectorAll('h1').forEach(h => renameElement(h, 'h2'));
  body.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
    if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    if (!img.hasAttribute('alt')) img.setAttribute('alt', '');
  });
  body.querySelectorAll('a[href]').forEach(a => enhanceLink(a as HTMLAnchorElement, rewriteLink));

  const headings = anchorHeadings(body);
  // Articles that already ship their own in-page link list don't need ours.
  const ownTocLinks = Array.from(body.querySelectorAll('a[href^="#"]'))
    .filter(a => headings.some(h => `#${h.id}` === a.getAttribute('href'))).length;
  const h2s = headings.filter(h => h.level === 2);
  const toc = ownTocLinks >= 2 ? [] : (h2s.length >= 2 ? headings : headings.filter(h => h.level === 3));

  return { html: body.innerHTML, toc: toc.length >= 2 ? toc : [] };
}

// ------------------------------------------------------------ sanitising

function sanitize(root: HTMLElement, cmsOrigin: string): void {
  root.querySelectorAll(DROP).forEach(el => el.remove());
  root.querySelectorAll('iframe').forEach(el => {
    if (!EMBED_HOSTS.test(el.getAttribute('src') || '')) el.remove();
  });
  root.querySelectorAll('*').forEach(el => {
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      if (name.startsWith('on') || name === 'srcdoc') {
        el.removeAttribute(attr.name);
      } else if (URL_ATTRS.includes(name)) {
        const value = attr.value.trim();
        // Browsers ignore whitespace/control chars inside a scheme ("java\tscript:").
        if (/^(javascript|vbscript|data):/i.test(value.replace(/[\s\u0000-\u001f]/g, '')) && !/^data:image\//i.test(value)) {
          el.setAttribute(attr.name, '#');
        } else if (value.startsWith('/uploads/')) {
          // Media uploaded to Strapi comes back as /uploads/... — make it absolute.
          el.setAttribute(attr.name, cmsOrigin + value);
        }
      } else if (name === 'style' && /expression\s*\(|javascript:/i.test(attr.value)) {
        el.removeAttribute(attr.name);
      }
    }
  });
}

function renameElement(el: Element, tag: string): void {
  const next = el.ownerDocument.createElement(tag);
  for (const attr of Array.from(el.attributes)) next.setAttribute(attr.name, attr.value);
  while (el.firstChild) next.appendChild(el.firstChild);
  el.replaceWith(next);
}

function enhanceLink(a: HTMLAnchorElement, rewriteLink: (href: string) => string | null): void {
  const href = a.getAttribute('href') || '';
  const rewritten = rewriteLink(href);
  if (rewritten) a.setAttribute('href', rewritten);
  const final = rewritten || href;
  const external = /^https?:\/\//i.test(final) && !/^https?:\/\/(www\.)?bhiive\.com(\/|$)/i.test(final);
  if (!external) return;
  if (!a.hasAttribute('target')) a.setAttribute('target', '_blank');
  const rel = new Set((a.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
  rel.add('noopener');
  a.setAttribute('rel', Array.from(rel).join(' '));
}

function anchorHeadings(root: HTMLElement): TocItem[] {
  const used = new Set(Array.from(root.querySelectorAll('[id]')).map(el => el.id));
  const headings: TocItem[] = [];
  root.querySelectorAll('h2, h3').forEach(h => {
    const text = (h.textContent || '').replace(/\s+/g, ' ').trim();
    if (!text) return;
    if (!h.id) {
      const base = slugify(text) || `section-${headings.length + 1}`;
      let id = base;
      for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
      used.add(id);
      h.id = id;
    }
    headings.push({ id: h.id, text, level: h.tagName === 'H2' ? 2 : 3 });
  });
  // Authored HTML can repeat an id; the TOC needs each target once.
  const seen = new Set<string>();
  return headings.filter(h => !seen.has(h.id) && !!seen.add(h.id));
}

// -------------------------------------------------------------- CSS scope

/** Prefixes every selector in an authored <style> block with .article-body. */
export function scopeCss(css: string): string {
  if (typeof CSSStyleSheet === 'undefined' || !('replaceSync' in CSSStyleSheet.prototype)) return '';
  const sheet = new CSSStyleSheet();
  try {
    sheet.replaceSync(css.replace(/@import[^;]+;/gi, ''));
  } catch {
    return ''; // unparseable: drop it rather than risk site-wide styles
  }
  return scopeRules(sheet.cssRules);
}

function scopeRules(rules: CSSRuleList): string {
  let out = '';
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSStyleRule) {
      const selectors = splitSelectors(rule.selectorText).map(scopeSelector).join(', ');
      out += `${selectors}{${rule.style.cssText}}`;
    } else if (rule instanceof CSSMediaRule) {
      out += `@media ${rule.conditionText}{${scopeRules(rule.cssRules)}}`;
    } else if (rule instanceof CSSSupportsRule) {
      out += `@supports ${rule.conditionText}{${scopeRules(rule.cssRules)}}`;
    } else if (rule instanceof CSSKeyframesRule || rule instanceof CSSFontFaceRule) {
      out += rule.cssText;
    }
    // Anything else (@layer, @page, @property, …) is dropped: it can't be scoped.
  }
  return out;
}

/** Splits on top-level commas only — not inside :is(a, b) or [title="a, b"]. */
function splitSelectors(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let quote = '';
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quote) { if (c === quote && text[i - 1] !== '\\') quote = ''; continue; }
    if (c === '"' || c === "'") quote = c;
    else if (c === '(' || c === '[') depth++;
    else if (c === ')' || c === ']') depth--;
    else if (c === ',' && depth === 0) { parts.push(text.slice(start, i)); start = i + 1; }
  }
  parts.push(text.slice(start));
  return parts.map(p => p.trim()).filter(Boolean);
}

function scopeSelector(selector: string): string {
  // "html body p" → ".article-body p"; "body" → ".article-body"
  const rest = selector.replace(/^(?:(?:html|body|:root)(?=[\s>+~.#:[]|$)\s*>?\s*)+/i, '').trim();
  return rest ? `${SCOPE} ${rest}` : SCOPE;
}

// --------------------------------------------------- Strapi "blocks" → HTML

function escape(t: string): string {
  return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function inline(nodes: any[]): string {
  return (nodes || []).map(n => {
    if (n.type === 'link') return `<a href="${escape(n.url || '#')}">${inline(n.children)}</a>`;
    let t = escape(n.text || '');
    if (n.code) t = `<code>${t}</code>`;
    if (n.bold) t = `<strong>${t}</strong>`;
    if (n.italic) t = `<em>${t}</em>`;
    if (n.underline) t = `<u>${t}</u>`;
    if (n.strikethrough) t = `<s>${t}</s>`;
    return t;
  }).join('');
}

/**
 * Same markup and theme classes the blog has always used for block content.
 * Relative /uploads URLs are made absolute later, in sanitize().
 */
function blocksToHtml(blocks: any[]): string {
  return blocks.map(b => {
    switch (b.type) {
      case 'heading': {
        // The page title is the only <h1>, so CMS headings start at <h2>.
        const tag = 'h' + Math.min(6, (b.level || 2) + 1);
        return `<${tag} class="mt-4">${inline(b.children)}</${tag}>`;
      }
      case 'list': {
        const items = (b.children || []).map((li: any) =>
          b.format === 'ordered'
            ? `<li>${inline(li.children)}</li>`
            : `<li><i class="fa fa-check fs-5"></i> ${inline(li.children)}</li>`,
        ).join('');
        return b.format === 'ordered'
          ? `<ol class="mb-4">${items}</ol>`
          : `<ul class="checked-list mb-4">${items}</ul>`;
      }
      case 'quote':
        return `<blockquote class="mt-3 mb-3">${inline(b.children)}</blockquote>`;
      case 'code':
        return `<pre><code>${inline(b.children)}</code></pre>`;
      case 'image':
        return `<img src="${escape(b.image?.url || '')}" alt="${escape(b.image?.alternativeText || '')}" class="single-post-image mt-3 mb-3" />`;
      case 'paragraph':
      default:
        return `<p class="mt-2">${inline(b.children)}</p>`;
    }
  }).join('\n');
}
