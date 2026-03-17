import { Component } from '@angular/core';
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-paidmarketing',
  standalone: true,
  imports: [SidebarsecComponent, ServicebannerComponent],
  templateUrl: './paidmarketing.component.html',
  styleUrl: './paidmarketing.component.scss'
})
export class PaidmarketingComponent {
constructor(private meta: Meta, private title: Title) {
    this.meta.updateTag({
      rel: 'canonical',
      href: 'https://bhiive/paid-marketing'
    });
}

  ngOnInit(): void {

    // Page Title
    this.title.setTitle(
      'Paid Marketing Services | PPC, Social Ads & Lead-Driven Campaigns – Bhiive'
    );

    // Meta Tags
    this.meta.updateTag({
      name: 'description',
      content: 'Get expert paid marketing services from Bhiive. We deliver performance-focused PPC, Google Ads, Meta Ads, and targeted ad campaigns that drive immediate traffic, qualified leads, and measurable ROI for your business growth.'
    });
    this.meta.updateTag({
      name: 'title',
      content: 'Paid Marketing Services | PPC, Social Ads & Lead-Driven Campaigns – Bhiive'
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'paid marketing services, PPC management, Google Ads, Facebook Ads, Instagram ads, paid advertising, Bhiive, targeted ad campaigns, performance marketing'
    });
  }
}
