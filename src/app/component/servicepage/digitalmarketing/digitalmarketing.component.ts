import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../../shared/service/canonical.service';
import { SchemaService } from '../../shared/service/schema.service';

@Component({
  selector: 'app-digitalmarketing',
  standalone: true,
  imports: [ServicebannerComponent, SidebarsecComponent],
  templateUrl: './digitalmarketing.component.html',
  styleUrl: './digitalmarketing.component.scss'
})
export class DigitalmarketingComponent {
  constructor(private meta: Meta, private title: Title, private schemaService: SchemaService, private canonicalService: CanonicalService) {}

  ngOnInit(): void {
    this.title.setTitle('Digital Marketing Services | SEO, PPC, Social Media & Lead Generation – Bhiive');

    this.meta.updateTag({ name: 'description', content: 'Grow your online presence with Bhiives result-driven digital marketing services. We offer SEO, social media marketing, PPC advertising, content strategy and lead generation tailored to your business goals.' });
    this.meta.updateTag({ name: 'keywords', content: 'digital marketing services, SEO services, PPC advertising, social media marketing, lead generation, online marketing agency, Bhiive Chennai' });
    this.canonicalService.setCanonical('https://bhiive.com/digital-marketing');

    this.meta.updateTag({ property: 'og:title', content: 'Digital Marketing Services | SEO, PPC, Social Media & Lead Generation – Bhiive' });
    this.meta.updateTag({ property: 'og:description', content: 'Grow your online presence with Bhiives result-driven digital marketing services. We offer SEO, social media marketing, PPC advertising, content strategy and lead generation tailored to your business goals.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bhiive.com/digital-marketing' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Digital Marketing Services | SEO, PPC, Social Media & Lead Generation – Bhiive' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Grow your online presence with Bhiives result-driven digital marketing services. We offer SEO, social media marketing, PPC advertising, content strategy and lead generation tailored to your business goals.' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.schemaService.updateSchema({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://bhiive.com/digital-marketing/#service",
      "name": "Digital Marketing Services",
      "description": "Result-driven digital marketing services including SEO, PPC, and social media marketing.",
      "provider": { "@type": "Organization", "@id": "https://bhiive.com/#organization" },
      "areaServed": { "@type": "Country", "name": "India" }
    });
  }
}
