import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, distinctUntilChanged, from, map, switchMap, tap } from 'rxjs';
import type { Pillar, PillarSummary } from '../../core/models/pillar.model';
import { pillarSeo } from '../../core/seo/seo-shared.mjs';
import { SeoService } from '../../core/seo/seo.service';
import { ArticleService, type Article } from '../../core/services/article.service';
import { ServiceCatalog } from '../../core/services/service-catalog.service';
import { ServicebannerComponent } from '../servicepage/servicebanner/servicebanner.component';
import { SidebarsecComponent } from '../servicepage/sidebarsec/sidebarsec.component';

/**
 * A service page (/web-development, /digital-marketing, …) in the theme's
 * service-detail layout. The content is the CMS "Service Page" (falling back
 * to the copy bundled with the site), followed by every article filed under
 * the service, so each service page links to its articles and back.
 */
@Component({
  selector: 'app-pillar',
  standalone: true,
  imports: [RouterLink, ServicebannerComponent, SidebarsecComponent],
  templateUrl: './pillar.component.html',
})
export class PillarComponent implements OnInit, OnDestroy {
  state: 'loading' | 'ready' | 'missing' = 'loading';
  pillar?: Pillar;
  others: PillarSummary[] = [];
  articles: Article[] = [];

  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly articleService = inject(ArticleService);
  private readonly catalog = inject(ServiceCatalog);
  private readonly subs = new Subscription();
  private articlesSub?: Subscription;

  ngOnInit(): void {
    // The same instance is reused when moving between services, so follow the param.
    this.subs.add(
      this.route.paramMap.pipe(
        map(p => p.get('pillar') || ''),
        distinctUntilChanged(),
        tap(() => {
          this.state = 'loading';
          this.articles = [];
          this.articlesSub?.unsubscribe();
        }),
        // switchMap drops a slow response for a page the visitor already left.
        switchMap(slug => from(this.catalog.load(slug))),
      ).subscribe(pillar => this.show(pillar)),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.articlesSub?.unsubscribe();
  }

  articlePath(a: Article): string {
    return this.articleService.pathFor(a);
  }

  private show(pillar: Pillar | undefined): void {
    if (!pillar) {
      this.pillar = undefined;
      this.others = this.catalog.pillars();
      this.state = 'missing';
      this.seo.applyPage('/not-found');
      return;
    }

    this.pillar = pillar;
    this.state = 'ready';
    this.seo.apply(pillarSeo(pillar));

    // Deep links (#faqs) arrive before the async content renders; scroll once it has.
    const hash = location.hash.slice(1);
    if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 120);

    this.articlesSub = this.articleService.forPillar(pillar.slug).subscribe(list => {
      this.articles = list;
      // Re-apply so the JSON-LD ItemList includes this service's articles.
      if (list.length) this.seo.apply(pillarSeo(pillar, list));
    });
  }
}
