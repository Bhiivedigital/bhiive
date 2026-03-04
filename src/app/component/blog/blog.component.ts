import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicepage/servicebanner/servicebanner.component';
import { RouterLink } from "@angular/router";
import { BlogdetailsComponent } from './blogdetails/blogdetails.component';
import { SchemaService } from '../shared/service/schema.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [ServicebannerComponent, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  constructor(private schemaService:SchemaService){ }
  
ngOnInit() {
  this.schemaService.updateSchema({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": "https://bhiive.com/blog/post-slug/#blogposting",
    "headline": "SEO Tips for 2025",
    "description": "Latest SEO strategies for better ranking",
    "image": "https://bhiive.com/assets/blog/seo.jpg",
    "author": {
      "@type": "Person",
      "name": "Bhiive Team"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://bhiive.com/#organization"
    },
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-10"
  });
}

}
