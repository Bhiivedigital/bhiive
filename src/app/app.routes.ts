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
    {path:'', component:HomeLayoutComponent, title:'Bhiive | Web Design & Digital Marketing Company in Chennai'},       
    {path:'about-us', component:AboutusComponent, title:'About Us'},
    {path:'services', component:ServicepageComponent, title:'services'},
    {path:'paid-marketing', component:PaidmarketingComponent, title:'Paid Marketing'},
    {path:'brand-building', component:BrandbuildingComponent, title:'Branding'},
    {path:'web-development', component:WebdevlopmentComponent, title:'Web Development'},
    {path:'workflow-automation', component:WorkflowautomationComponent, title:'Work Flow Auutomation'},
    {path:'digital-marketing', component:DigitalmarketingComponent, title:'Digital Marketing'},
    {path:'market-automation', component:MarketautomationComponent, title:'Market Automation & Stategy'},
    {path:'blog', component:BlogComponent, title:'Blogs'},
    {path:'blog-details', component:BlogdetailsComponent, title:'Blog Details'},
    {path:'privacy-policy', component:PricvacypolicyComponent, title:'Privacy Policy'},
    {path:'contact-us', component:ContactpageComponent, title:'Contact Us'},
    {path:'career', component:CareerComponent, title:'career'},
   {path: 'careers/:slug',
  loadComponent: () =>
    import('./component/careerdetails/careerdetails.component')
      .then(m => m.CareerdetailsComponent)}
];
