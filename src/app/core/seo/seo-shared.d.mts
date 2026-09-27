// Types for seo-shared.mjs (plain JS so scripts/generate-static-seo.mjs can
// import it without a TypeScript toolchain).

import type { PillarSummary, Pillar, Faq } from '../models/pillar.model';

export interface SiteConfig {
  origin: string;
  name: string;
  alternateName: string;
  tagline: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsapp: string;
  streetAddress: string;
  postalCode: string;
  locality: string;
  region: string;
  country: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  defaultImage: string;
  locale: string;
  language: string;
  sameAs: string[];
}

export interface ArticleSeoFields {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string;
  canonicalURL: string;
  ogTitle: string;
  ogDescription: string;
  image: string;
}

export interface Article {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  coverAlt: string;
  coverWidth: number | null;
  coverHeight: number | null;
  publishedAt: string | null;
  updatedAt: string | null;
  readingTime: number | null;
  categorySlug: string | null;
  categoryName: string | null;
  /** Service page the CMS files this article under (bhiive-cms utils/service-pages.js). */
  servicePageSlug: string | null;
  authorName: string | null;
  authorBio: string | null;
  tags: string[];
  featured: boolean;
  htmlContent: string;
  blocks: any[];
  seo: ArticleSeoFields;
}

export interface JsonLdGraph {
  '@context': string;
  '@graph': Record<string, unknown>[];
}

export interface RouteSeo {
  path: string;
  canonical?: string;
  title: string;
  description: string;
  keywords: string;
  image: string;
  type: 'website' | 'article';
  robots: string;
  published?: string | null;
  modified?: string | null;
  author?: string;
  section?: string;
  jsonLd: JsonLdGraph;
}

export interface StaticPage {
  title: string;
  description: string;
  keywords?: string;
  breadcrumb?: string;
  schemaType?: string;
  image?: string;
  noindex?: boolean;
  faqs?: Faq[];
  itemList?: { name: string; path: string }[];
}

export interface BreadcrumbItem { name: string; path: string; }

export const SITE: SiteConfig;

export function absoluteUrl(pathOrUrl?: string | null): string;
export function plainText(html?: string | null): string;
export function truncate(text: string | null | undefined, max?: number): string;
export function pageTitle(title?: string | null): string;
export function slugify(text: string): string;

type ArticleRef = Pick<Article, 'slug' | 'title' | 'categorySlug'> & { servicePageSlug?: string | null };
export function resolvePillarSlug(article: ArticleRef, pillars: PillarSummary[]): string;
export function articlePath(article: ArticleRef, pillars: PillarSummary[]): string;
export function servicePagesQuery(slug?: string): string;
export function serviceListQuery(): string;
export function serviceFromCms(raw: any, cmsOrigin?: string): Pillar;
export function normalizeArticle(raw: any, cmsOrigin?: string): Article;
export function articleDescription(article: Article): string;

export function organizationNode(): Record<string, unknown>;
export function websiteNode(): Record<string, unknown>;
export function webPageNode(opts: {
  path: string; name: string; description: string; type?: string; image?: string;
  datePublished?: string | null; dateModified?: string | null; hasBreadcrumb?: boolean;
}): Record<string, unknown>;
export function breadcrumbNode(path: string, items: BreadcrumbItem[]): Record<string, unknown>;
export function faqNode(path: string, faqs?: Faq[]): Record<string, unknown> | null;
export function itemListNode(path: string, name: string, items: BreadcrumbItem[]): Record<string, unknown> | null;
export function serviceNode(pillar: Pillar, offers?: string[]): Record<string, unknown>;
export function articleNode(article: Article, path: string, pillar?: PillarSummary): Record<string, unknown>;
export function graph(nodes: (Record<string, unknown> | null)[]): JsonLdGraph;

export function staticPageSeo(path: string, page: StaticPage): RouteSeo;
export function pillarSeo(pillar: Pillar, articles?: Pick<Article, 'slug' | 'title'>[]): RouteSeo;
export function articleSeo(article: Article, pillars: PillarSummary[]): RouteSeo;
export function careerSeo(job: { slug: string; title: string; experience: string; location: string; summary: string }): RouteSeo;
