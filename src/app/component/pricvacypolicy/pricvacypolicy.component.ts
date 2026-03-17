import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pricvacypolicy',
  standalone: true,
  imports: [],
  templateUrl: './pricvacypolicy.component.html',
  styleUrl: './pricvacypolicy.component.scss'
})
export class PricvacypolicyComponent {
 constructor(private meta:Meta){
  this.meta.updateTag({
      rel: 'canonical',
      href: 'https://bhiive/privacy-policy'
    });
 }
}
