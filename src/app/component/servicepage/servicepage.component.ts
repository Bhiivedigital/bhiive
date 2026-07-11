import { Component } from '@angular/core';
import { ServicebannerComponent } from './servicebanner/servicebanner.component';
import { RouterLink } from '@angular/router';
import { SchemaService } from '../shared/service/schema.service';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../shared/service/canonical.service';

@Component({
  selector: 'app-servicepage',
  standalone: true,
  imports: [ServicebannerComponent, RouterLink],
  templateUrl: './servicepage.component.html',
  styleUrl: './servicepage.component.scss'
})
export class ServicepageComponent {
  constructor(private schemaService: SchemaService, private meta: Meta, private title: Title, private canonicalService: CanonicalService) {}

  ngOnInit() {
    this.title.setTitle('Our Services | Digital Marketing & Web Solutions – Bhiive');

    this.meta.updateTag({ name: 'description', content: 'Explore Bhiive\'s full range of services including digital marketing, SEO, paid advertising, brand building, web development, and workflow automation in Chennai.' });
    this.meta.updateTag({ name: 'keywords', content: 'digital marketing services, SEO, paid marketing, brand building, web development, workflow automation, Bhiive Chennai' });
    this.canonicalService.setCanonical('https://bhiive.com/services');

    this.meta.updateTag({ property: 'og:title', content: 'Our Services | Digital Marketing & Web Solutions – Bhiive' });
    this.meta.updateTag({ property: 'og:description', content: 'Explore Bhiive\'s full range of digital marketing, SEO, and web development services.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bhiive.com/services' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Our Services | Digital Marketing & Web Solutions – Bhiive' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Explore Bhiive\'s full range of digital marketing and web development services.' });

    this.schemaService.updateSchema({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://bhiive.com/services/#webpage",
      "url": "https://bhiive.com/services",
      "name": "Services – Bhiive",
      "description": "Digital marketing, SEO, paid advertising, brand building, web development, and workflow automation services.",
      "isPartOf": { "@id": "https://bhiive.com/#website" },
      "publisher": { "@id": "https://bhiive.com/#organization" }
    });
  }
}
