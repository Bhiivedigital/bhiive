import { Component } from '@angular/core';
import { ServicebannerComponent } from './servicebanner/servicebanner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-servicepage',
  standalone: true,
  imports: [ServicebannerComponent, RouterLink],
  templateUrl: './servicepage.component.html',
  styleUrl: './servicepage.component.scss'
})
export class ServicepageComponent {

}
