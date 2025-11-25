import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicepage/servicebanner/servicebanner.component';

@Component({
  selector: 'app-contactpage',
  standalone: true,
  imports: [ServicebannerComponent],
  templateUrl: './contactpage.component.html',
  styleUrl: './contactpage.component.scss'
})
export class ContactpageComponent {

}
