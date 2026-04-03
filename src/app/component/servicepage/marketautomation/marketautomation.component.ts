import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';
import { Meta, Title } from '@angular/platform-browser';
import { SchemaService } from '../../shared/service/schema.service';

@Component({
  selector: 'app-marketautomation',
  standalone: true,
  imports: [ServicebannerComponent, SidebarsecComponent],
  templateUrl: './marketautomation.component.html',
  styleUrl: './marketautomation.component.scss'
})
export class MarketautomationComponent {
  constructor(private meta: Meta, private title: Title, private schemaService: SchemaService) {}

  ngOnInit(): void {
    this.title.setTitle('Market Automation Services | Marketing Automation & Strategy – Bhiive');

    this.meta.updateTag({ name: 'description', content: 'streamline your marketing operations with Bhiives market automation services. Automate campaigns, lead nurturing, email follow-ups and analytics to boost conversions and improve ROI.' });
    this.meta.updateTag({ name: 'keywords', content: 'market automation services, marketing automation, lead nurturing automation, campaign automation, Bhiive Chennai' });
    this.meta.updateTag({ rel: 'canonical', href: 'https://bhiive.com/market-automation' });

    this.meta.updateTag({ property: 'og:title', content: 'Market Automation Services | Marketing Automation & Strategy – Bhiive' });
    this.meta.updateTag({ property: 'og:description', content: 'streamline your marketing operations with Bhiives market automation services. Automate campaigns, lead nurturing, email follow-ups and analytics to boost conversions and improve ROI.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bhiive.com/market-automation' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Market Automation Services | Marketing Automation & Strategy – Bhiive' });
    this.meta.updateTag({ name: 'twitter:description', content: 'streamline your marketing operations with Bhiives market automation services. Automate campaigns, lead nurturing, email follow-ups and analytics to boost conversions and improve ROI.' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.schemaService.updateSchema({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://bhiive.com/market-automation/#service",
      "name": "Market Automation Services",
      "description": "Marketing automation including campaigns, lead nurturing, and analytics.",
      "provider": { "@type": "Organization", "@id": "https://bhiive.com/#organization" },
      "areaServed": { "@type": "Country", "name": "India" }
    });
  }
}
