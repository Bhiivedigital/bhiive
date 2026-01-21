import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-webdevlopment',
  standalone: true,
  imports: [ServicebannerComponent, SidebarsecComponent],
  templateUrl: './webdevlopment.component.html',
  styleUrl: './webdevlopment.component.scss'
})
export class WebdevlopmentComponent {
constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {

    // Page Title
    this.title.setTitle(
      'Web Development Services | Custom, Responsive & SEO-Friendly Websites – Bhiive Digi Tech'
    );

    // Meta Tags
    this.meta.updateTag({
      name: 'description',
      content: 'Get professional web development services from Bhiive Digi Tech. We build custom, responsive, and SEO-optimized websites, e-commerce stores, and web applications tailored to your business goals to increase traffic, lead conversion and online growth.'
    });
    this.meta.updateTag({
      name: 'title',
      content: 'Web Development Services | Custom, Responsive & SEO-Friendly Websites – Bhiive Digi Tech'
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'web development services, custom website development, responsive website design, e-commerce development, SEO optimized websites, business web solutions, web apps, Bhiive Digi Tech'
    });
  }
}
