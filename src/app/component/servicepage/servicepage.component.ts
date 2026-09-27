import { Component } from '@angular/core';
import { ServicebannerComponent } from './servicebanner/servicebanner.component';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';
import { ServiceCatalog } from '../../core/services/service-catalog.service';

@Component({
  selector: 'app-servicepage',
  standalone: true,
  imports: [ServicebannerComponent, RouterLink],
  templateUrl: './servicepage.component.html',
  styleUrl: './servicepage.component.scss'
})
export class ServicepageComponent {
  constructor(private seo: SeoService, private catalog: ServiceCatalog) {}

  ngOnInit() {
    // Title, description, canonical and JSON-LD: src/app/data/pages.json,
    // plus the list of services for the ItemList structured data.
    this.seo.applyPage('/services', {
      itemList: this.catalog.pillars().map(p => ({ name: p.name, path: '/' + p.slug })),
    });
  }
}
