import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BannerConfig, BannerMap } from '../../shared/banner-config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicebanner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicebanner.component.html',
  styleUrl: './servicebanner.component.scss'
})
export class ServicebannerComponent {

  bannerImage: string = '';
  pageName: string = '';
  breadcrumbName:string='';
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setBanner(this.router.url);
    // Listen for route changes
    this.router.events.subscribe(() => {
      this.setBanner(this.router.url);
    });
  }

  setBanner(url: string): void {
    if (url.includes('services')) {
      this.pageName = 'Services';
      this.bannerImage = '../../../../assets/img/breadcrumb.jpg';
      this.breadcrumbName = 'Services';
    } 
    else if (url.includes('paidmarketing')) {
      this.pageName = 'Paid Marketing';
      this.bannerImage = '../../../../assets/img/breadcrumb.jpg';
      this.breadcrumbName = 'Paid Marketing';
    } 
    else if (url.includes('brandbuilding')) {
      this.pageName = 'Brand Building';
      this.bannerImage = '../../../../assets/img/service/servicebanner/brand.jpg';
      this.breadcrumbName = ' Brand Building';
    } 
     else if (url.includes('digitalmarketing')) {
      this.pageName = 'Digital Marketing';
      this.bannerImage = '../../../../assets/img/breadcrumb.jpg';
      this.breadcrumbName = 'Digital Marketing';
    } 
     else if (url.includes('webbuilding')) {
      this.pageName = ' Website Development ';
      this.bannerImage = '../../../../assets/img/breadcrumb.jpg';
      this.breadcrumbName = ' Website Development ';
    } 
     else if (url.includes('workflowautomation')) {
      this.pageName = 'Workflow Automation';
      this.bannerImage = '../../../../assets/img/breadcrumb.jpg';
      this.breadcrumbName = 'Workflow Automation';
    } 
     else if (url.includes('markersategy')) {
      this.pageName = 'Marketing Strategy';
      this.bannerImage = '../../../../assets/img/breadcrumb.jpg';
      this.breadcrumbName = 'Marketing Strategy';
    } 
     else if (url.includes('marketautomation')) {
      this.pageName = 'Market Automation & Stategy';
      this.bannerImage = '../../../../assets/img/breadcrumb.jpg';
      this.breadcrumbName = 'Market Automation & Stategy';
    } 
      else if (url.includes('aboutus')) {
      this.pageName = 'About Our Company';
      this.bannerImage = '../../../../assets/img/breadcrumb.jpg';
      this.breadcrumbName = 'About Our Company';
    } 
    else {
      this.pageName = 'Default';
      this.bannerImage = 'assets/banners/default-banner.jpg';
    }
  }
}
