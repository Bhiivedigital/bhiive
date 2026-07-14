import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicepage/servicebanner/servicebanner.component';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../shared/service/canonical.service';
import { SchemaService } from '../shared/service/schema.service';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [ServicebannerComponent],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent {
  constructor(private meta: Meta, private title: Title, private canonicalService: CanonicalService, private schemaService: SchemaService) {}

  ngOnInit(): void {
    this.title.setTitle('About Bhiive | Digital Marketing Agency in Chennai');

    this.meta.updateTag({ name: 'description', content: 'Learn about Bhiive – a Chennai-based digital marketing and web design agency helping businesses grow online through SEO, paid marketing, branding, and web development.' });
    this.meta.updateTag({ name: 'keywords', content: 'about Bhiive, digital marketing agency Chennai, web design company Chennai, SEO agency, Bhiive team' });
    this.canonicalService.setCanonical('https://bhiive.com/about-us');

    this.meta.updateTag({ property: 'og:title', content: 'About Bhiive | Digital Marketing Agency in Chennai' });
    this.meta.updateTag({ property: 'og:description', content: 'Learn about Bhiive – a Chennai-based digital marketing agency helping businesses grow online.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bhiive.com/about-us' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'About Bhiive | Digital Marketing Agency in Chennai' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Learn about Bhiive – a Chennai-based digital marketing agency helping businesses grow online.' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.schemaService.updateSchema({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://bhiive.com/about-us/#webpage",
      "url": "https://bhiive.com/about-us",
      "name": "About Bhiive",
      "description": "Learn about Bhiive – a Chennai-based digital marketing and web design agency.",
      "isPartOf": { "@id": "https://bhiive.com/#website" },
      "publisher": { "@id": "https://bhiive.com/#organization" }
    });
  }
}
