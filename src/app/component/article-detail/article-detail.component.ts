import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription, distinctUntilChanged, forkJoin, map, switchMap, tap } from 'rxjs';
import type { PillarSummary } from '../../core/models/pillar.model';
import { absoluteUrl, articleSeo } from '../../core/seo/seo-shared.mjs';
import { SeoService } from '../../core/seo/seo.service';
import { ArticleService, type Article } from '../../core/services/article.service';
import { ServiceCatalog } from '../../core/services/service-catalog.service';
import { BlogformComponent } from '../blog/blogform/blogform.component';
import { ServicebannerComponent } from '../servicepage/servicebanner/servicebanner.component';

type State = 'loading' | 'ready' | 'missing' | 'error';

/** An article at /:service/:slug, in the theme's blog-details layout. */
@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, ServicebannerComponent, BlogformComponent],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  state: State = 'loading';
  article?: Article;
  pillar?: PillarSummary;
  // Post body comes from the CMS. Angular's default [innerHTML] sanitiser drops
  // <style> blocks and inline style attributes, which breaks posts written in
  // the CMS HTML editor — so the markup is trusted here instead. The renderer
  // (core/services/article-content.ts) already strips scripts and handlers.
  html: SafeHtml | null = null;
  related: Article[] = [];
  share = { linkedin: '', x: '', facebook: '', whatsapp: '' };

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly articles = inject(ArticleService);
  private readonly catalog = inject(ServiceCatalog);
  private readonly seo = inject(SeoService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly subs = new Subscription();

  get bannerTitle(): string {
    if (this.state === 'missing') return 'Article Not Found';
    return this.pillar?.name || 'Articles';
  }

  ngOnInit(): void {
    this.subs.add(
      this.route.paramMap.pipe(
        map(p => p.get('articleSlug') || ''),
        distinctUntilChanged(),
        tap(() => { this.state = 'loading'; this.html = null; }),
        // The list (cached after first load) maps old /blog links in the body to
        // their new URLs; the service list decides which service it sits under.
        switchMap(slug => forkJoin([this.articles.bySlug(slug), this.articles.list(), this.catalog.ready$])),
      ).subscribe(([a]) => this.show(a)),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  retry(): void {
    const slug = this.route.snapshot.paramMap.get('articleSlug') || '';
    this.state = 'loading';
    this.articles.bySlug(slug).subscribe(a => this.show(a));
  }

  /** Links inside CMS HTML are plain <a href>; keep internal ones inside the app. */
  onBodyClick(event: MouseEvent): void {
    const a = (event.target as HTMLElement).closest('a');
    if (!a || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#')) {
      event.preventDefault();
      document.getElementById(decodeURIComponent(href.slice(1)))?.scrollIntoView({ behavior: 'smooth' });
    } else if (href.startsWith('/') && !href.startsWith('//') && a.target !== '_blank') {
      event.preventDefault();
      this.router.navigateByUrl(href);
    }
  }

  articlePath(a: Article): string {
    return this.articles.pathFor(a);
  }

  private show(a: Article | null | undefined): void {
    if (a === undefined) { this.state = 'error'; return; }
    if (a === null) {
      this.state = 'missing';
      this.seo.applyPage('/not-found');
      return;
    }

    // One URL per article: if it was reached under another service, move to the canonical one.
    const canonicalPath = this.articles.pathFor(a);
    if (canonicalPath !== `/${this.route.snapshot.paramMap.get('pillar')}/${a.slug}`) {
      this.router.navigateByUrl(canonicalPath, { replaceUrl: true });
      return;
    }

    this.article = a;
    this.pillar = this.catalog.summary(this.articles.pillarSlugOf(a));
    this.html = this.sanitizer.bypassSecurityTrustHtml(this.articles.render(a).html);
    this.state = 'ready';

    const url = encodeURIComponent(absoluteUrl(canonicalPath));
    const text = encodeURIComponent(a.title);
    this.share = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      x: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };

    this.seo.apply(articleSeo(a, this.catalog.pillars()));
    this.articles.related(a, 4).subscribe(list => (this.related = list));

    // Deep links (#section) arrive before the body exists; honour them once it renders.
    const hash = location.hash.slice(1);
    if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 80);
  }
}
