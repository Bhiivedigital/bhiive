import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './component/home-layout/home-layout.component';
import { ServicepageComponent } from './component/servicepage/servicepage.component';
import { SeopageComponent } from './component/servicepage/seopage/seopage.component';
import { PaidmarketingComponent } from './component/servicepage/paidmarketing/paidmarketing.component';
import { BrandbuildingComponent } from './component/servicepage/brandbuilding/brandbuilding.component';
import { WebdevlopmentComponent } from './component/servicepage/webdevlopment/webdevlopment.component';
import { WorkflowautomationComponent } from './component/servicepage/workflowautomation/workflowautomation.component';
import { MarkersategyComponent } from './component/servicepage/markersategy/markersategy.component';
import { InfluencemarketingComponent } from './component/servicepage/influencemarketing/influencemarketing.component';
import { GoogleadsComponent } from './component/servicepage/googleads/googleads.component';


export const routes: Routes = [
    {path:'', component:HomeLayoutComponent, title:'Bhiive | Web Design & Digital Marketing Company in Chennai'},
    {path:'services', component:ServicepageComponent, title:'services'},
    {path:'seopage', component:SeopageComponent, title:'Search Engine Optimization'},
    {path:'paidmarketing', component:PaidmarketingComponent, title:'Paid Marketing'},
    {path:'brandbuilding', component:BrandbuildingComponent, title:'Branding'},
    {path:'webbuilding', component:WebdevlopmentComponent, title:'Web Development'},
    {path:'workflowautomation', component:WorkflowautomationComponent, title:'Work Flow Auutomation'},
    {path:'markersategy', component:MarkersategyComponent, title:'Marketing Strategy'},
    {path:'influencemarketing', component:InfluencemarketingComponent, title:'Influencer Marketing'},
    {path:'googleads', component:GoogleadsComponent, title:'Google Ads'}

];
