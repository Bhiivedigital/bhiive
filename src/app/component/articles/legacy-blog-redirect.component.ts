import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../core/services/article.service';

/**
 * /blog/:slug → /:pillar/:slug. The server answers known posts with a 301
 * (rules generated at build time); this covers in-app navigation and posts
 * published after the last build.
 */
@Component({
  selector: 'app-legacy-blog-redirect',
  standalone: true,
  template: `<div class="container section text-center"><p>Taking you to the article…</p></div>`,
})
export class LegacyBlogRedirectComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly articles = inject(ArticleService);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    this.articles.list().subscribe(list => {
      const match = list.find(a => a.slug === slug);
      this.router.navigateByUrl(match ? this.articles.pathFor(match) : '/articles', { replaceUrl: true });
    });
  }
}
