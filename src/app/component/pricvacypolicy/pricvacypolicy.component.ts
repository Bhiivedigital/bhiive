import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-pricvacypolicy',
  standalone: true,
  imports: [],
  templateUrl: './pricvacypolicy.component.html',
  styleUrl: './pricvacypolicy.component.scss',
})
export class PricvacypolicyComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.applyPage('/privacy-policy');
  }
}
