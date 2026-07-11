import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../../shared/service/canonical.service';
import { SchemaService } from '../../shared/service/schema.service';

@Component({
  selector: 'app-webdevlopment',
  standalone: true,
  imports: [ServicebannerComponent, SidebarsecComponent],
  templateUrl: './webdevlopment.component.html',
  styleUrl: './webdevlopment.component.scss'
})
export class WebdevlopmentComponent {
  constructor(private meta: Meta, private title: Title, private schemaService: SchemaService, private canonicalService: CanonicalService) {}

  ngOnInit(): void {
    this.title.setTitle('Web Development Services | Custom, Responsive & SEO-Friendly Websites – Bhiive');

    this.meta.updateTag({ name: 'description', content: 'Get professional web development services from Bhiive. We build custom, responsive, and SEO-optimized websites, e-commerce stores, and web applications tailored to increase traffic and conversions.' });
    this.meta.updateTag({ name: 'keywords', content: 'web development services, custom website development, responsive web design, e-commerce development, SEO websites, Bhiive Chennai' });
    this.canonicalService.setCanonical('https://bhiive.com/web-development');

    this.meta.updateTag({ property: 'og:title', content: 'Web Development Services | Custom, Responsive & SEO-Friendly Websites – Bhiive' });
    this.meta.updateTag({ property: 'og:description', content: 'Get professional web development services from Bhiive. We build custom, responsive, and SEO-optimized websites, e-commerce stores, and web applications tailored to increase traffic and conversions.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bhiive.com/web-development' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Web Development Services | Custom, Responsive & SEO-Friendly Websites – Bhiive' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Get professional web development services from Bhiive. We build custom, responsive, and SEO-optimized websites, e-commerce stores, and web applications tailored to increase traffic and conversions.' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.schemaService.updateSchema({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://bhiive.com/web-development/#service",
      "name": "Web Development Services",
      "description": "Custom, responsive, and SEO-optimized websites and web applications.",
      "provider": { "@type": "Organization", "@id": "https://bhiive.com/#organization" },
      "areaServed": { "@type": "Country", "name": "India" }
    });
  }
}
