import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { SeoService } from '../../core/seo/seo.service';
import { ArticleService, type Article } from '../../core/services/article.service';
import { ServiceCatalog } from '../../core/services/service-catalog.service';
import { ServicebannerComponent } from '../servicepage/servicebanner/servicebanner.component';

/** /articles — replaced /blog; same listing layout, links go to /:service/:slug. */
@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [ServicebannerComponent, RouterLink],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent implements OnInit, OnDestroy {
  blogs: Article[] = [];
  loading = true;

  pageSize = 4;
  currentPage = 1;

  private readonly seo = inject(SeoService);
  private readonly articles = inject(ArticleService);
  private readonly catalog = inject(ServiceCatalog);
  private readonly sub = new Subscription();

  ngOnInit(): void {
    // Title, description, canonical and JSON-LD: src/app/data/pages.json
    this.seo.applyPage('/articles');

    // Wait for the service list too: it decides each article's URL.
    this.sub.add(
      combineLatest([this.articles.list(), this.catalog.ready$]).subscribe(([list]) => {
        this.blogs = list;
        this.loading = false;
        this.seo.applyPage('/articles', {
          itemList: list.slice(0, 30).map(a => ({ name: a.title, path: this.pathFor(a) })),
        });
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  pathFor(a: Article): string {
    return this.articles.pathFor(a);
  }

  topicOf(a: Article): string {
    return this.catalog.summary(this.articles.pillarSlugOf(a))?.shortName ?? '';
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.blogs.length / this.pageSize));
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get pagedBlogs(): Article[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.blogs.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
