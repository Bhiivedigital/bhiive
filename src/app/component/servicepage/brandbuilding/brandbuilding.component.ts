import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';
import { Meta, Title } from '@angular/platform-browser';
import { SchemaService } from '../../shared/service/schema.service';

@Component({
  selector: 'app-brandbuilding',
  standalone: true,
  imports: [ServicebannerComponent, SidebarsecComponent],
  templateUrl: './brandbuilding.component.html',
  styleUrl: './brandbuilding.component.scss'
})
export class BrandbuildingComponent {
  constructor(private meta: Meta, private title: Title, private schemaService: SchemaService) {}

  ngOnInit(): void {
    this.title.setTitle('Brand Building Services | Brand Strategy, Identity & Growth – Bhiive');

    this.meta.updateTag({ name: 'description', content: 'Boost your brand visibility with Bhiives expert brand building services. We craft strategic brand identities, compelling messaging, logo design and brand positioning to help your business stand out and grow.' });
    this.meta.updateTag({ name: 'keywords', content: 'brand building services, brand strategy, brand identity design, logo design, brand positioning, Bhiive Chennai' });
    this.meta.updateTag({ rel: 'canonical', href: 'https://bhiive.com/brand-building' });

    this.meta.updateTag({ property: 'og:title', content: 'Brand Building Services | Brand Strategy, Identity & Growth – Bhiive' });
    this.meta.updateTag({ property: 'og:description', content: 'Boost your brand visibility with Bhiives expert brand building services. We craft strategic brand identities, compelling messaging, logo design and brand positioning to help your business stand out and grow.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bhiive.com/brand-building' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Brand Building Services | Brand Strategy, Identity & Growth – Bhiive' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Boost your brand visibility with Bhiives expert brand building services. We craft strategic brand identities, compelling messaging, logo design and brand positioning to help your business stand out and grow.' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.schemaService.updateSchema({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://bhiive.com/brand-building/#service",
      "name": "Brand Building Services",
      "description": "Strategic brand identities, messaging, logo design and brand positioning services.",
      "provider": { "@type": "Organization", "@id": "https://bhiive.com/#organization" },
      "areaServed": { "@type": "Country", "name": "India" }
    });
  }
}
