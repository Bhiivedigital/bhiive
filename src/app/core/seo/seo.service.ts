import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PAGES } from '../data/site-data';
import { SITE, absoluteUrl, staticPageSeo, type RouteSeo, type StaticPage } from './seo-shared.mjs';

/**
 * One place that writes every head tag a page needs: title, description,
 * robots, canonical, Open Graph, Twitter and the page's JSON-LD graph.
 * The descriptors come from seo-shared.mjs — the same builders the post-build
 * script uses to stamp static HTML — so crawlers and the live app agree.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly doc = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  /** Static pages listed in data/pages.json. */
  applyPage(path: string, extra: Partial<StaticPage> = {}): void {
    const page = PAGES[path];
    if (!page) return;
    this.apply(staticPageSeo(path, { ...page, ...extra }));
  }

  apply(seo: RouteSeo): void {
    const canonical = seo.canonical || absoluteUrl(seo.path);
    const image = absoluteUrl(seo.image || SITE.defaultImage);

    this.title.setTitle(seo.title);
    this.setName('description', seo.description);
    this.setName('keywords', seo.keywords);
    this.setName('robots', seo.robots);
    this.setCanonical(canonical);

    this.setProperty('og:site_name', SITE.name);
    this.setProperty('og:locale', SITE.locale);
    this.setProperty('og:type', seo.type);
    this.setProperty('og:url', canonical);
    this.setProperty('og:title', seo.title);
    this.setProperty('og:description', seo.description);
    this.setProperty('og:image', image);
    this.setProperty('og:image:alt', seo.title);
    // Dimensions are only known for the default share image.
    const isDefaultImage = image === absoluteUrl(SITE.defaultImage);
    this.setProperty('og:image:width', isDefaultImage ? '1200' : null);
    this.setProperty('og:image:height', isDefaultImage ? '630' : null);

    this.setName('twitter:card', 'summary_large_image');
    this.setName('twitter:title', seo.title);
    this.setName('twitter:description', seo.description);
    this.setName('twitter:image', image);

    const isArticle = seo.type === 'article';
    this.setProperty('article:published_time', isArticle ? seo.published : null);
    this.setProperty('article:modified_time', isArticle ? seo.modified : null);
    this.setProperty('article:section', isArticle ? seo.section : null);
    this.setProperty('article:author', isArticle ? seo.author : null);

    this.setJsonLd(seo.jsonLd);
  }

  private setName(name: string, content?: string | null): void {
    if (content) this.meta.updateTag({ name, content });
    else this.meta.removeTag(`name="${name}"`);
  }

  private setProperty(property: string, content?: string | null): void {
    if (content) this.meta.updateTag({ property, content });
    else this.meta.removeTag(`property="${property}"`);
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(data: unknown): void {
    let script = this.doc.getElementById('page-schema') as HTMLScriptElement | null;
    if (!script) {
      script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'page-schema';
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
