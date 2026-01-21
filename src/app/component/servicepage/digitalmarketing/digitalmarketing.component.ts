import { Component } from '@angular/core';
import { BrandbuildingComponent } from "../brandbuilding/brandbuilding.component";
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';
import { SidebarsecComponent } from "../sidebarsec/sidebarsec.component";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-digitalmarketing',
  standalone: true,
  imports: [ServicebannerComponent, SidebarsecComponent],
  templateUrl: './digitalmarketing.component.html',
  styleUrl: './digitalmarketing.component.scss'
})
export class DigitalmarketingComponent {
constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {

    // Page Title
    this.title.setTitle(
      'Digital Marketing Services | SEO, PPC, Social Media & Lead Generation – Bhiive'
    );

    // Meta Tags
    this.meta.updateTag({
      name: 'description',
      content: 'Grow your online presence with Bhiive Digi Tech’s result-driven digital marketing services. We offer SEO, social media marketing, PPC advertising, content strategy and lead generation solutions tailored to your business goals for measurable growth and ROI'
    });
    this.meta.updateTag({
      name: 'title',
      content: 'Digital Marketing Services | SEO, PPC, Social Media & Lead Generation – Bhiive'
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'digital marketing services, SEO services, PPC advertising, social media marketing, lead generation, online marketing agency, content strategy, Bhiive'
    });
  }
}
