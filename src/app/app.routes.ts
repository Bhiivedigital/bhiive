// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./component/home-layout/home-layout.component')
        .then(m => m.HomeLayoutComponent),
    title: 'Bhiive | Web Design & Digital Marketing Company in Chennai'
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./component/aboutus/aboutus.component')
        .then(m => m.AboutusComponent),
    title: 'About Bhiive | Digital Marketing Agency in Chennai'
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./component/servicepage/servicepage.component')
        .then(m => m.ServicepageComponent),
    title: 'Our Services | Digital Marketing & Web Solutions – Bhiive'
  },
  {
    path: 'paid-marketing',
    loadComponent: () =>
      import('./component/servicepage/paidmarketing/paidmarketing.component')
        .then(m => m.PaidmarketingComponent),
    title: 'Paid Marketing Services | PPC, Social Ads & Lead-Driven Campaigns – Bhiive'
  },
  {
    path: 'brand-building',
    loadComponent: () =>
      import('./component/servicepage/brandbuilding/brandbuilding.component')
        .then(m => m.BrandbuildingComponent),
    title: 'Brand Building Services | Brand Strategy, Identity & Growth – Bhiive'
  },
  {
    path: 'web-development',
    loadComponent: () =>
      import('./component/servicepage/webdevlopment/webdevlopment.component')
        .then(m => m.WebdevlopmentComponent),
    title: 'Web Development Services | Custom, Responsive & SEO-Friendly Websites – Bhiive'
  },
  {
    path: 'workflow-automation',
    loadComponent: () =>
      import('./component/servicepage/workflowautomation/workflowautomation.component')
        .then(m => m.WorkflowautomationComponent),
    title: 'Workflow Automation Services | Business Process & Task Automation – Bhiive'
  },
  {
    path: 'digital-marketing',
    loadComponent: () =>
      import('./component/servicepage/digitalmarketing/digitalmarketing.component')
        .then(m => m.DigitalmarketingComponent),
    title: 'Digital Marketing Services | SEO, PPC, Social Media & Lead Generation – Bhiive'
  },
  {
    path: 'marketing-automation',
    loadComponent: () =>
      import('./component/servicepage/marketautomation/marketautomation.component')
        .then(m => m.MarketautomationComponent),
    title: 'Market Automation Services | Marketing Automation & Strategy – Bhiive'
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./component/blog/blog.component')
        .then(m => m.BlogComponent),
    title: 'Blog | Digital Marketing Tips & Insights – Bhiive'
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./component/blog/blogdetails/blogdetails.component')
        .then(m => m.BlogdetailsComponent),
    title: 'Blog – Bhiive'
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./component/pricvacypolicy/pricvacypolicy.component')
        .then(m => m.PricvacypolicyComponent),
    title: 'Privacy Policy – Bhiive'
  },
  {
    path: 'contact-us',
    loadComponent: () =>
      import('./component/contactpage/contactpage.component')
        .then(m => m.ContactpageComponent),
    title: 'Contact Us | Get a Free Quote – Bhiive'
  },
  {
    path: 'career',
    loadComponent: () =>
      import('./component/career/career.component')
        .then(m => m.CareerComponent),
    title: 'Careers at Bhiive | Join Our Digital Marketing Team in Chennai'
  },
  {
    path: 'careers/:slug',
    loadComponent: () =>
      import('./component/careerdetails/careerdetails.component')
        .then(m => m.CareerdetailsComponent)
  }
];