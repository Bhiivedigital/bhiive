import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-marketautomation',
  standalone: true,
  imports: [ServicebannerComponent, SidebarsecComponent],
  templateUrl: './marketautomation.component.html',
  styleUrl: './marketautomation.component.scss'
})
export class MarketautomationComponent {
constructor(private meta: Meta, private title: Title) {
   this.meta.updateTag({
      rel: 'canonical',
      href: 'https://bhiive/market-automation'
    });
}

  ngOnInit(): void {

    // Page Title
    this.title.setTitle(
      'Market Automation Services | Marketing Automation & Workflow Optimization – Bhiive'
    );

    // Meta Tags
    this.meta.updateTag({
      name: 'description',
      content: 'Streamline your marketing operations with Bhiive’s market automation services. Automate campaigns, lead nurturing, email follow-ups and analytics to boost conversions, save time, and improve ROI with intelligent workflows tailored to your business.'
    });
    this.meta.updateTag({
      name: 'title',
      content: 'Market Automation Services | Marketing Automation & Workflow Optimization – Bhiive'
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'market automation services, marketing automation, automated workflows, lead nurturing automation, campaign automation, digital marketing automation, Bhiive'
    });
  }
}
