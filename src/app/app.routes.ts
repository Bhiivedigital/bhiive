import { Routes, UrlMatchResult, UrlSegment } from '@angular/router';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Hub-and-spoke: every service is a pillar page at /:pillar, and every article
// lives under the pillar it supports at /:pillar/:articleSlug. Services are
// edited in the CMS, so these match any slug-shaped path; the pages show the
// 404 view themselves when the service or article doesn't exist. They come
// after every fixed route below, so /about-us etc. always win.
function pillarMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  return segments.length === 1 && SLUG.test(segments[0].path)
    ? { consumed: segments, posParams: { pillar: segments[0] } }
    : null;
}

function articleMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  return segments.length === 2 && SLUG.test(segments[0].path) && SLUG.test(segments[1].path)
    ? { consumed: segments, posParams: { pillar: segments[0], articleSlug: segments[1] } }
    : null;
}

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./component/home-layout/home-layout.component').then(m => m.HomeLayoutComponent),
  },
  {
    path: 'about-us',
    loadComponent: () => import('./component/aboutus/aboutus.component').then(m => m.AboutusComponent),
  },
  {
    path: 'services',
    loadComponent: () => import('./component/servicepage/servicepage.component').then(m => m.ServicepageComponent),
  },
  {
    path: 'articles',
    loadComponent: () => import('./component/articles/articles.component').then(m => m.ArticlesComponent),
  },

  // The blog became /articles. .htaccess answers these with a 301 for known
  // posts; these routes cover in-app links and anything the server rules miss.
  { path: 'blog', redirectTo: 'articles', pathMatch: 'full' },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./component/articles/legacy-blog-redirect.component').then(m => m.LegacyBlogRedirectComponent),
  },

  {
    path: 'privacy-policy',
    loadComponent: () => import('./component/pricvacypolicy/pricvacypolicy.component').then(m => m.PricvacypolicyComponent),
  },
  {
    path: 'contact-us',
    loadComponent: () => import('./component/contactpage/contactpage.component').then(m => m.ContactpageComponent),
  },
  {
    path: 'career',
    loadComponent: () => import('./component/career/career.component').then(m => m.CareerComponent),
  },
  { path: 'careers', redirectTo: 'career', pathMatch: 'full' },
  {
    path: 'careers/:slug',
    loadComponent: () => import('./component/careerdetails/careerdetails.component').then(m => m.CareerdetailsComponent),
  },
  {
    matcher: pillarMatcher,
    loadComponent: () => import('./component/pillar/pillar.component').then(m => m.PillarComponent),
  },
  {
    matcher: articleMatcher,
    loadComponent: () => import('./component/article-detail/article-detail.component').then(m => m.ArticleDetailComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./component/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];
