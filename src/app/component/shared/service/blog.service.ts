import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface BlogPost {
  slug: string;
  title: string;
  image: string;
  intro: string;
  date: string | null;
  readingTime: number | null;
  category: string | null;
  contentHtml?: string;
  seo?: any;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private api = environment.cmsUrl;

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<BlogPost[]> {
    const url = `${this.api}/api/articles`
      + `?sort=publishedAt:desc`
      + `&pagination[pageSize]=100`
      + `&populate[cover][fields][0]=url`
      + `&populate[category][fields][0]=name`;
    return this.http.get<any>(url).pipe(
      map(res => (res.data || []).map((a: any) => this.toPost(a)))
    );
  }

  getBlog(slug: string): Observable<BlogPost | undefined> {
    const url = `${this.api}/api/articles`
      + `?filters[slug][$eq]=${encodeURIComponent(slug)}`
      + `&populate[cover][fields][0]=url`
      + `&populate[category][fields][0]=name`
      + `&populate[seo]=true`;
    return this.http.get<any>(url).pipe(
      map(res => {
        const a = (res.data || [])[0];
        return a ? this.toPost(a, true) : undefined;
      })
    );
  }

  private toPost(a: any, withContent = false): BlogPost {
    const cover = a.cover?.url
      ? (a.cover.url.startsWith('http') ? a.cover.url : this.api + a.cover.url)
      : 'assets/img/news/post-1.jpg';
    const post: BlogPost = {
      slug: a.slug,
      title: a.title,
      image: cover,
      intro: a.excerpt || '',
      date: a.publishedAt || null,
      readingTime: a.readingTime || null,
      category: a.category?.name || null,
      seo: a.seo || null,
    };
    if (withContent) {
      post.contentHtml = this.blocksToHtml(a.content || []);
    }
    return post;
  }

  // --- Strapi "blocks" rich text -> HTML matching the blog's existing styling ---

  private escape(t: string): string {
    return t
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  private inline(nodes: any[]): string {
    return (nodes || []).map(n => {
      if (n.type === 'link') {
        return `<a href="${this.escape(n.url || '#')}" target="_blank" rel="noopener">${this.inline(n.children)}</a>`;
      }
      let t = this.escape(n.text || '');
      if (n.code) t = `<code>${t}</code>`;
      if (n.bold) t = `<strong>${t}</strong>`;
      if (n.italic) t = `<em>${t}</em>`;
      if (n.underline) t = `<u>${t}</u>`;
      if (n.strikethrough) t = `<s>${t}</s>`;
      return t;
    }).join('');
  }

  private blocksToHtml(blocks: any[]): string {
    return (blocks || []).map(b => {
      switch (b.type) {
        case 'heading': {
          const tag = 'h' + Math.min(6, (b.level || 2) + 1);
          return `<${tag} class="mt-4">${this.inline(b.children)}</${tag}>`;
        }
        case 'list': {
          const items = (b.children || []).map((li: any) =>
            b.format === 'ordered'
              ? `<li>${this.inline(li.children)}</li>`
              : `<li><i class="fa fa-check fs-5"></i> ${this.inline(li.children)}</li>`
          ).join('');
          return b.format === 'ordered'
            ? `<ol class="mb-4">${items}</ol>`
            : `<ul class="checked-list mb-4">${items}</ul>`;
        }
        case 'quote':
          return `<blockquote class="mt-3 mb-3">${this.inline(b.children)}</blockquote>`;
        case 'code':
          return `<pre><code>${this.inline(b.children)}</code></pre>`;
        case 'image': {
          const url = b.image?.url || '';
          const src = url.startsWith('http') ? url : this.api + url;
          return `<img src="${this.escape(src)}" alt="${this.escape(b.image?.alternativeText || '')}" class="single-post-image mt-3 mb-3" />`;
        }
        case 'paragraph':
        default:
          return `<p class="mt-2">${this.inline(b.children)}</p>`;
      }
    }).join('\n');
  }
}
