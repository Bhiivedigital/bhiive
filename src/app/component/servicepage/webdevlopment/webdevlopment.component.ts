import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';

@Component({
  selector: 'app-webdevlopment',
  standalone: true,
  imports: [ServicebannerComponent, SidebarsecComponent],
  templateUrl: './webdevlopment.component.html',
  styleUrl: './webdevlopment.component.scss'
})
export class WebdevlopmentComponent {

}
