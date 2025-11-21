import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './component/home-layout/home-layout.component';
import { ServicepageComponent } from './component/servicepage/servicepage.component';
import { PaidmarketingComponent } from './component/servicepage/paidmarketing/paidmarketing.component';
import { BrandbuildingComponent } from './component/servicepage/brandbuilding/brandbuilding.component';
import { WebdevlopmentComponent } from './component/servicepage/webdevlopment/webdevlopment.component';
import { WorkflowautomationComponent } from './component/servicepage/workflowautomation/workflowautomation.component';
import { DigitalmarketingComponent } from './component/servicepage/digitalmarketing/digitalmarketing.component';
import { MarketautomationComponent } from './component/servicepage/marketautomation/marketautomation.component';
import { AboutsectionComponent } from './component/home-layout/aboutsection/aboutsection.component';
import { AboutusComponent } from './component/aboutus/aboutus.component';


export const routes: Routes = [
    {path:'', component:HomeLayoutComponent, title:'Bhiive | Web Design & Digital Marketing Company in Chennai'},       
    {path:'aboutus', component:AboutusComponent, title:'About Us'},
    {path:'services', component:ServicepageComponent, title:'services'},
    {path:'paidmarketing', component:PaidmarketingComponent, title:'Paid Marketing'},
    {path:'brandbuilding', component:BrandbuildingComponent, title:'Branding'},
    {path:'webbuilding', component:WebdevlopmentComponent, title:'Web Development'},
    {path:'workflowautomation', component:WorkflowautomationComponent, title:'Work Flow Auutomation'},
    {path:'digitalmarketing', component:DigitalmarketingComponent, title:'Digital Marketing'},
    {path:'marketautomation', component:MarketautomationComponent, title:'Market Automation & Stategy'}

];
