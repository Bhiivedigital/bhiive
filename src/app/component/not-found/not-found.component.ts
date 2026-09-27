import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';
import { ServiceCatalog } from '../../core/services/service-catalog.service';
import { ServicebannerComponent } from '../servicepage/servicebanner/servicebanner.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, ServicebannerComponent],
  template: `
    <app-servicebanner title="Page Not Found"></app-servicebanner>
    <section class="service-detaile-section section-padding fix">
      <div class="container text-center">
        <h3>We couldn't find that page.</h3>
        <p class="mt-3">The link may be old or mistyped. These are the services we offer:</p>
        <ul class="brandingul d-inline-block text-start mt-3">
          @for (p of pillars(); track p.slug) {
            <li><a [routerLink]="['/', p.slug]">{{ p.name }}</a></li>
          }
        </ul>
        <div class="mt-4">
          <a routerLink="/" class="theme-btn">Back to Home <i class="fa fa-arrow-right"></i></a>
        </div>
      </div>
    </section>
  `,
})
export class NotFoundComponent implements OnInit {
  readonly pillars = inject(ServiceCatalog).pillars;
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    // noindex, follow — see src/app/data/pages.json
    this.seo.applyPage('/not-found');
  }
}
