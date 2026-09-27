import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ServiceCatalog } from './service-catalog.service';
import { articlePath, normalizeArticle, resolvePillarSlug, type Article } from '../seo/seo-shared.mjs';
import { renderArticleContent, type RenderedContent } from './article-content';

export type { Article } from '../seo/seo-shared.mjs';

type ArticleRef = Pick<Article, 'slug' | 'title' | 'categorySlug' | 'servicePageSlug'>;

const LIST_FIELDS = ['title', 'slug', 'excerpt', 'publishedAt', 'updatedAt', 'readingTime', 'featured'];

/**
 * Articles come from the Strapi `article` collection. Each one is published
 * under a service pillar (/:pillar/:slug) — the pillar is resolved in
 * seo-shared.mjs so the build-time sitemap and the app agree on every URL.
 */
@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly http = inject(HttpClient);
  private readonly catalog = inject(ServiceCatalog);
  private readonly api = environment.cmsUrl;
  private list$?: Observable<Article[]>;
  private readonly detail = new Map<string, Observable<Article | null | undefined>>();
  /** Slug → canonical path, filled once the list has loaded. Used to fix old /blog links inside article bodies. */
  private readonly paths = new Map<string, string>();

  /** Every published article, newest first (all pages). Cached for the session; a CMS outage yields []. */
  list(): Observable<Article[]> {
    if (!this.list$) {
      const params = [
        'sort=publishedAt:desc',
        'pagination[pageSize]=100',
        ...LIST_FIELDS.map((f, i) => `fields[${i}]=${f}`),
        'populate[cover][fields][0]=url',
        'populate[cover][fields][1]=alternativeText',
        'populate[cover][fields][2]=width',
        'populate[cover][fields][3]=height',
        'populate[category][fields][0]=slug',
        'populate[category][fields][1]=name',
        'populate[author][fields][0]=name',
      ].join('&');
      const page = (n: number) => this.http.get<any>(`${this.api}/api/articles?${params}&pagination[page]=${n}`);
      this.list$ = page(1).pipe(
        // Strapi caps a page at 100; fetch the rest in parallel if there are more.
        switchMap(first => {
          const count = first?.meta?.pagination?.pageCount || 1;
          if (count <= 1) return of([first]);
          return forkJoin([of(first), ...Array.from({ length: count - 1 }, (_, i) => page(i + 2))]);
        }),
        map(pages => pages.flatMap(res => res?.data || []).map((raw: any) => normalizeArticle(raw, this.api)) as Article[]),
        map(list => {
          list.forEach(a => this.paths.set(a.slug, this.pathFor(a)));
          return list;
        }),
        catchError(() => {
          this.list$ = undefined; // let the next caller retry
          return of([] as Article[]);
        }),
        shareReplay(1),
      );
    }
    return this.list$;
  }

  /** Full article with body: `null` = no such article, `undefined` = CMS unreachable (not cached, so a retry can succeed). */
  bySlug(slug: string): Observable<Article | null | undefined> {
    let cached = this.detail.get(slug);
    if (!cached) {
      const params = [
        `filters[slug][$eq]=${encodeURIComponent(slug)}`,
        'populate[cover][fields][0]=url',
        'populate[cover][fields][1]=alternativeText',
        'populate[cover][fields][2]=width',
        'populate[cover][fields][3]=height',
        'populate[category][fields][0]=slug',
        'populate[category][fields][1]=name',
        'populate[author][fields][0]=name',
        'populate[author][fields][1]=bio',
        'populate[tags][fields][0]=name',
        'populate[seo][populate][0]=metaImage',
      ].join('&');
      cached = this.http.get<any>(`${this.api}/api/articles?${params}`).pipe(
        map(res => {
          const raw = (res?.data || [])[0];
          return raw ? normalizeArticle(raw, this.api) : null;
        }),
        catchError(() => {
          this.detail.delete(slug);
          return of(undefined);
        }),
        shareReplay(1),
      );
      this.detail.set(slug, cached);
    }
    return cached;
  }

  forPillar(pillarSlug: string): Observable<Article[]> {
    return this.list().pipe(map(list => list.filter(a => this.pillarSlugOf(a) === pillarSlug)));
  }

  latest(limit = 3): Observable<Article[]> {
    return this.list().pipe(map(list => list.slice(0, limit)));
  }

  /** Same pillar first, then the newest of the rest. */
  related(article: Article, limit = 3): Observable<Article[]> {
    const pillar = this.pillarSlugOf(article);
    return this.list().pipe(
      map(list => {
        const others = list.filter(a => a.slug !== article.slug);
        const same = others.filter(a => this.pillarSlugOf(a) === pillar);
        const rest = others.filter(a => this.pillarSlugOf(a) !== pillar);
        return [...same, ...rest].slice(0, limit);
      }),
    );
  }

  pillarSlugOf(article: ArticleRef): string {
    return resolvePillarSlug(article, this.catalog.pillars());
  }

  pathFor(article: ArticleRef): string {
    return articlePath(article, this.catalog.pillars());
  }

  render(article: Article): RenderedContent {
    return renderArticleContent(article.htmlContent, article.blocks, this.api, href => this.rewriteLink(href));
  }

  /** Old /blog/:slug links inside article bodies point straight at the new URL (no redirect hop). */
  private rewriteLink(href: string): string | null {
    const m = href.match(/^(?:https?:\/\/(?:www\.)?bhiive\.com)?\/blog\/([^/?#]+)/i);
    if (!m) return null;
    return this.paths.get(m[1]) || null;
  }
}
