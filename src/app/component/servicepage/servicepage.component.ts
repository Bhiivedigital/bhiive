import { Component } from '@angular/core';
import { ServicebannerComponent } from './servicebanner/servicebanner.component';

@Component({
  selector: 'app-servicepage',
  standalone: true,
  imports: [ServicebannerComponent],
  templateUrl: './servicepage.component.html',
  styleUrl: './servicepage.component.scss'
})
export class ServicepageComponent {

}
