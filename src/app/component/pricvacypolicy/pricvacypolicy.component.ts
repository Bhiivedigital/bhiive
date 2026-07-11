import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../shared/service/canonical.service';

@Component({
  selector: 'app-pricvacypolicy',
  standalone: true,
  imports: [],
  templateUrl: './pricvacypolicy.component.html',
  styleUrl: './pricvacypolicy.component.scss'
})
export class PricvacypolicyComponent {
  constructor(private meta: Meta, private title: Title, private canonicalService: CanonicalService) {}

  ngOnInit(): void {
    this.title.setTitle('Privacy Policy – Bhiive');
    this.meta.updateTag({ name: 'description', content: 'Read Bhiive\'s privacy policy to understand how we collect, use, and protect your personal information.' });
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    this.canonicalService.setCanonical('https://bhiive.com/privacy-policy');
  }
}
