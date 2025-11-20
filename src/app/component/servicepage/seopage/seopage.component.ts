import { Component } from '@angular/core';
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';

@Component({
  selector: 'app-seopage',
  standalone: true,
  imports: [SidebarsecComponent, ServicebannerComponent],
  templateUrl: './seopage.component.html',
  styleUrl: './seopage.component.scss'
})
export class SeopageComponent {

}
