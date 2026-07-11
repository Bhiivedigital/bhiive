import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicepage/servicebanner/servicebanner.component';
import { RouterLink } from "@angular/router";
import { SchemaService } from '../shared/service/schema.service';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../shared/service/canonical.service';
import { CommonModule } from '@angular/common';
import { BlogService } from '../shared/service/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [ServicebannerComponent, RouterLink, CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  blogs: any[] = [];

  constructor(private schemaService: SchemaService, private meta: Meta, private title: Title, private blogService: BlogService, private canonicalService: CanonicalService) {}

  ngOnInit() {
    this.title.setTitle('Blog | Digital Marketing Tips & Insights – Bhiive');

    this.meta.updateTag({ name: 'description', content: 'Explore the Bhiive blog for the latest digital marketing tips, SEO strategies, web development insights, and industry trends to help grow your business online.' });
    this.meta.updateTag({ name: 'keywords', content: 'digital marketing blog, SEO tips, web development insights, social media marketing, Bhiive blog' });
    this.canonicalService.setCanonical('https://bhiive.com/blog');

    this.meta.updateTag({ property: 'og:title', content: 'Blog | Digital Marketing Tips & Insights – Bhiive' });
    this.meta.updateTag({ property: 'og:description', content: 'Explore the Bhiive blog for digital marketing tips, SEO strategies and industry insights.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bhiive.com/blog' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Blog | Digital Marketing Tips & Insights – Bhiive' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Explore the Bhiive blog for digital marketing tips, SEO strategies and industry insights.' });

    this.schemaService.updateSchema({
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": "https://bhiive.com/blog/#blog",
      "url": "https://bhiive.com/blog",
      "name": "Bhiive Blog",
      "description": "Digital marketing tips, SEO strategies, and web development insights from Bhiive.",
      "publisher": { "@id": "https://bhiive.com/#organization" }
    });

    this.blogService.getBlogs().subscribe(data => {
      this.blogs = data;
    });
  }
}
