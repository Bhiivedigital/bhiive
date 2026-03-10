import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-brandbuilding',
  standalone: true,
  imports: [ServicebannerComponent, SidebarsecComponent],
  templateUrl: './brandbuilding.component.html',
  styleUrl: './brandbuilding.component.scss'
})
export class BrandbuildingComponent {
constructor(private meta: Meta, private title: Title) {
  this.meta.updateTag({
      rel: 'canonical',
      href: 'https://www.bhiive.com/brand-building'
    });
}

  ngOnInit(): void {

    // Page Title
    this.title.setTitle(
      'Brand Building Services | Brand Strategy, Identity & Growth – Bhiive'
    );

    // Meta Tags
    this.meta.updateTag({
      name: 'description',
      content: 'Boost your brand visibility with Bhiive Digi Tech’s expert brand building services. We craft strategic brand identities, compelling messaging, logo design and brand positioning to help businesses create meaningful connections, stand out in the marketplace and grow.'
    });
    this.meta.updateTag({
      name: 'title',
      content: 'Brand Building Services | Brand Strategy, Identity & Growth – Bhiive'
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'brand building services, brand strategy, brand identity design, brand positioning, logo design, brand growth solutions, Bhiive'
    });
  }
}
