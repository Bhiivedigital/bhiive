import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';

@Component({
  selector: 'app-googleads',
  standalone: true,
  imports: [ServicebannerComponent],
  templateUrl: './googleads.component.html',
  styleUrl: './googleads.component.scss'
})
export class GoogleadsComponent {

}
