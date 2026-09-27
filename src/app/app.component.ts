import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/shared/header/header.component';
import { FooterComponent } from './component/shared/footer/footer.component';
import { LeadPopupComponent } from './component/shared/lead-popup/lead-popup.component';
import { BrowserModule, Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, LeadPopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
})

export class AppComponent {

  constructor(
  ) {}

  ngOnInit(): void {
  
}
}