import { Component } from '@angular/core';
import { ServicebannerComponent } from '../../servicepage/servicebanner/servicebanner.component';
import { PostCommentComponent } from "../post-comment/post-comment.component";
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BlogService, BlogPost } from '../../shared/service/blog.service';
import { CommonModule } from '@angular/common';
import { CanonicalService } from '../../shared/service/canonical.service';
import { BlogformComponent } from '../blogform/blogform.component';

@Component({
  selector: 'app-blogdetails',
  standalone: true,
  imports: [ServicebannerComponent, PostCommentComponent, CommonModule, BlogformComponent],
  templateUrl: './blogdetails.component.html',
  styleUrl: './blogdetails.component.scss'
})
export class BlogdetailsComponent {
  slug: any;
  blogData: BlogPost | undefined;

  constructor(
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private canonicalService: CanonicalService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.canonicalService.setCanonical(`https://bhiive.com/blog/${slug}`);

    this.blogService.getBlog(slug || '').subscribe(post => {
      this.blogData = post;
      if (!post) return;

      const metaTitle = post.seo?.metaTitle || post.title;
      const metaDescription = post.seo?.metaDescription || post.intro;
      this.title.setTitle(`${metaTitle} – Bhiive`);
      this.meta.updateTag({ name: 'description', content: metaDescription });
      this.meta.updateTag({ property: 'og:title', content: metaTitle });
      this.meta.updateTag({ property: 'og:description', content: metaDescription });
      this.meta.updateTag({ property: 'og:type', content: 'article' });
      this.meta.updateTag({ property: 'og:url', content: `https://bhiive.com/blog/${slug}` });
      this.meta.updateTag({ property: 'og:image', content: post.image });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: metaTitle });
      this.meta.updateTag({ name: 'twitter:description', content: metaDescription });
    });
  }
}
