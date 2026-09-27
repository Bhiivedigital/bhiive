import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ServicebannerComponent } from "../servicepage/servicebanner/servicebanner.component";
import { careerSeo } from '../../core/seo/seo-shared.mjs';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-careerdetails',
  standalone: true,
  imports: [CommonModule, ServicebannerComponent],
  templateUrl: './careerdetails.component.html',
  styleUrl: './careerdetails.component.scss'
})
export class CareerdetailsComponent {

  job: any;
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private seo: SeoService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');

    this.http.get<any[]>('assets/careers.json')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.job = data.find(j => j.slug === slug);
        if (this.job) this.seo.apply(careerSeo(this.job));
        else this.seo.applyPage('/not-found');
      });
  }
}
