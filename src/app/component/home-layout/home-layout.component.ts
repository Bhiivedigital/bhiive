import { Component } from '@angular/core';
import { HerosliderComponent } from './heroslider/heroslider.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutsectionComponent } from "./aboutsection/aboutsection.component";
import { ServicesectionComponent } from './servicesection/servicesection.component';
import { WhychooseComponent } from './whychoose/whychoose.component';
import { SeoscoreComponent } from './seoscore/seoscore.component';
import { TestmonialComponent } from './testmonial/testmonial.component';
import { ContactsectionComponent } from './contactsection/contactsection.component';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [HerosliderComponent, WelcomeComponent, AboutsectionComponent, ServicesectionComponent, WhychooseComponent, SeoscoreComponent, TestmonialComponent, ContactsectionComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss'
})
export class HomeLayoutComponent {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    // Title, description, canonical, Open Graph and JSON-LD (incl. the FAQs
    // shown on this page): src/app/data/pages.json
    this.seo.applyPage('/');
  }
}
