import { Component } from '@angular/core';
import { HerosliderComponent } from './heroslider/heroslider.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutsectionComponent } from "./aboutsection/aboutsection.component";
import { ServicesectionComponent } from './servicesection/servicesection.component';
import { WhychooseComponent } from './whychoose/whychoose.component';
import { SeoscoreComponent } from './seoscore/seoscore.component';
import { CasestudyComponent } from './casestudy/casestudy.component';
import { TestmonialComponent } from './testmonial/testmonial.component';
import { ContactsectionComponent } from './contactsection/contactsection.component';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../shared/service/canonical.service';
import { SchemaService } from '../shared/service/schema.service';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [HerosliderComponent, WelcomeComponent, AboutsectionComponent, ServicesectionComponent, WhychooseComponent, SeoscoreComponent, TestmonialComponent, ContactsectionComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss'
})
export class HomeLayoutComponent {
  constructor(
    private title: Title,
    private meta: Meta,
    private schemaService: SchemaService, private canonicalService: CanonicalService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Bhiive | Web Design & Digital Marketing Company in Chennai');

    this.meta.updateTag({ name: 'description', content: 'Professional web design, SEO, Google Ads & social media marketing services in Chennai. Boost your business online with Bhiive. Get a free quote now!' });
    this.meta.updateTag({ name: 'keywords', content: 'digital marketing agency Chennai, web design Chennai, SEO services Chennai, Google Ads, social media marketing, performance marketing, Bhiive' });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: 'Bhiive | Web Design & Digital Marketing Company in Chennai' });
    this.meta.updateTag({ property: 'og:description', content: 'Professional web design, SEO, Google Ads & social media marketing services in Chennai. Boost your business online with Bhiive. Get a free quote now!' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bhiive.com/' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Bhiive | Web Design & Digital Marketing Company in Chennai' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Professional web design, SEO, Google Ads & social media marketing services in Chennai. Boost your business online with Bhiive.' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    // Canonical
    this.canonicalService.setCanonical('https://bhiive.com/');

    this.schemaService.updateSchema({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://bhiive.com/#website",
      "url": "https://bhiive.com/",
      "name": "Bhiive",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://bhiive.com/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    });
  }
}
