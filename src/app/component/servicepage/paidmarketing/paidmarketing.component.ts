import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';
import { Meta, Title } from '@angular/platform-browser';
import { SchemaService } from '../../shared/service/schema.service';

@Component({
  selector: 'app-paidmarketing',
  standalone: true,
  imports: [ServicebannerComponent, SidebarsecComponent],
  templateUrl: './paidmarketing.component.html',
  styleUrl: './paidmarketing.component.scss'
})
export class PaidmarketingComponent {
  constructor(private meta: Meta, private title: Title, private schemaService: SchemaService) {}

  ngOnInit(): void {
    this.title.setTitle('Paid Marketing Services | PPC, Google Ads & Social Ads – Bhiive');

    this.meta.updateTag({ name: 'description', content: 'Get expert paid marketing services from Bhiive. We deliver performance-focused PPC, Google Ads, Meta Ads, and targeted campaigns that drive immediate traffic, qualified leads, and measurable ROI.' });
    this.meta.updateTag({ name: 'keywords', content: 'paid marketing services, PPC management, Google Ads, Facebook Ads, Instagram ads, performance marketing, Bhiive Chennai' });
    this.meta.updateTag({ rel: 'canonical', href: 'https://bhiive.com/paid-marketing' });

    this.meta.updateTag({ property: 'og:title', content: 'Paid Marketing Services | PPC, Google Ads & Social Ads – Bhiive' });
    this.meta.updateTag({ property: 'og:description', content: 'Get expert paid marketing services from Bhiive. We deliver performance-focused PPC, Google Ads, Meta Ads, and targeted campaigns that drive immediate traffic, qualified leads, and measurable ROI.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bhiive.com/paid-marketing' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Paid Marketing Services | PPC, Google Ads & Social Ads – Bhiive' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Get expert paid marketing services from Bhiive. We deliver performance-focused PPC, Google Ads, Meta Ads, and targeted campaigns that drive immediate traffic, qualified leads, and measurable ROI.' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.schemaService.updateSchema({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://bhiive.com/paid-marketing/#service",
      "name": "Paid Marketing Services",
      "description": "Performance-focused PPC, Google Ads, Meta Ads, and targeted ad campaigns.",
      "provider": { "@type": "Organization", "@id": "https://bhiive.com/#organization" },
      "areaServed": { "@type": "Country", "name": "India" }
    });
  }
}
