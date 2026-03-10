import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicepage/servicebanner/servicebanner.component';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [ServicebannerComponent],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent {
constructor(private meta: Meta) {
    this.meta.updateTag({
      rel: 'canonical',
      href: 'https://www.bhiive.com/about-us'
    });
  }
}
