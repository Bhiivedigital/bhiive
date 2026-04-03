import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './component/home-layout/home-layout.component';
import { ServicepageComponent } from './component/servicepage/servicepage.component';
import { PaidmarketingComponent } from './component/servicepage/paidmarketing/paidmarketing.component';
import { BrandbuildingComponent } from './component/servicepage/brandbuilding/brandbuilding.component';
import { WebdevlopmentComponent } from './component/servicepage/webdevlopment/webdevlopment.component';
import { WorkflowautomationComponent } from './component/servicepage/workflowautomation/workflowautomation.component';
import { DigitalmarketingComponent } from './component/servicepage/digitalmarketing/digitalmarketing.component';
import { MarketautomationComponent } from './component/servicepage/marketautomation/marketautomation.component';
import { AboutusComponent } from './component/aboutus/aboutus.component';
import { ContactpageComponent } from './component/contactpage/contactpage.component';
import { BlogComponent } from './component/blog/blog.component';
import { BlogdetailsComponent } from './component/blog/blogdetails/blogdetails.component';
import { PricvacypolicyComponent } from './component/pricvacypolicy/pricvacypolicy.component';
import { CareerComponent } from './component/career/career.component';
import { CareerdetailsComponent } from './component/careerdetails/careerdetails.component';

export const routes: Routes = [
  { path: '', component: HomeLayoutComponent, title: 'Bhiive | Web Design & Digital Marketing Company in Chennai' },
  { path: 'about-us', component: AboutusComponent, title: 'About Bhiive | Digital Marketing Agency in Chennai' },
  { path: 'services', component: ServicepageComponent, title: 'Our Services | Digital Marketing & Web Solutions – Bhiive' },
  { path: 'paid-marketing', component: PaidmarketingComponent, title: 'Paid Marketing Services | PPC, Social Ads & Lead-Driven Campaigns – Bhiive' },
  { path: 'brand-building', component: BrandbuildingComponent, title: 'Brand Building Services | Brand Strategy, Identity & Growth – Bhiive' },
  { path: 'web-development', component: WebdevlopmentComponent, title: 'Web Development Services | Custom, Responsive & SEO-Friendly Websites – Bhiive' },
  { path: 'workflow-automation', component: WorkflowautomationComponent, title: 'Workflow Automation Services | Business Process & Task Automation – Bhiive' },
  { path: 'digital-marketing', component: DigitalmarketingComponent, title: 'Digital Marketing Services | SEO, PPC, Social Media & Lead Generation – Bhiive' },
  { path: 'market-automation', component: MarketautomationComponent, title: 'Market Automation Services | Marketing Automation & Strategy – Bhiive' },
  { path: 'blog', component: BlogComponent, title: 'Blog | Digital Marketing Tips & Insights – Bhiive' },
  { path: 'blog/:slug', component: BlogdetailsComponent, title: 'Blog – Bhiive' },
  { path: 'privacy-policy', component: PricvacypolicyComponent, title: 'Privacy Policy – Bhiive' },
  { path: 'contact-us', component: ContactpageComponent, title: 'Contact Us | Get a Free Quote – Bhiive' },
  { path: 'career', component: CareerComponent, title: 'Careers at Bhiive | Join Our Digital Marketing Team in Chennai' },
  {
    path: 'careers/:slug',
    loadComponent: () =>
      import('./component/careerdetails/careerdetails.component')
        .then(m => m.CareerdetailsComponent)
  }
];
