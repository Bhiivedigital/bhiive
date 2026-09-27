import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicepage/servicebanner/servicebanner.component';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [ServicebannerComponent],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    // Title, description, canonical, Open Graph and JSON-LD (incl. the FAQs
    // shown on this page): src/app/data/pages.json
    this.seo.applyPage('/about-us');
  }
}
