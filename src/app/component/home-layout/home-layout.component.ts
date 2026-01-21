import { Component } from '@angular/core';
import { HerosliderComponent } from './heroslider/heroslider.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutsectionComponent } from "./aboutsection/aboutsection.component";
import { ServicesectionComponent } from './servicesection/servicesection.component';
import { WhychooseComponent } from './whychoose/whychoose.component';
import { SeoscoreComponent } from './seoscore/seoscore.component';
import { CasestudyComponent } from './casestudy/casestudy.component';
import { TestmonialComponent } from './testmonial/testmonial.component';
import { ContactsectionComponent } from './contactsection/contactsection.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [HerosliderComponent, WelcomeComponent, AboutsectionComponent, ServicesectionComponent, WhychooseComponent,SeoscoreComponent,TestmonialComponent,ContactsectionComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss'
})
export class HomeLayoutComponent {
 constructor(
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.meta.removeTag('name="description"');

  // force add
  this.meta.addTag(
    {
      name: 'description',
      content: 'Bhiive Digi Tech – Digital Marketing Agency'
    },
    true // <-- FORCE
  );
}
}
