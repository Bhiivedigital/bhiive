import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricvacypolicy',
  standalone: true,
  imports: [],
  templateUrl: './pricvacypolicy.component.html',
  styleUrl: './pricvacypolicy.component.scss'
})
export class PricvacypolicyComponent {
  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Privacy Policy – Bhiive');
    this.meta.updateTag({ name: 'description', content: 'Read Bhiive\'s privacy policy to understand how we collect, use, and protect your personal information.' });
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    this.meta.updateTag({ rel: 'canonical', href: 'https://bhiive.com/privacy-policy' });
  }
}
