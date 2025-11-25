import { Component } from '@angular/core';
import { PreloaderComponent } from '../preloader/preloader.component';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PreloaderComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
