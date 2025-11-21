import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';

@Component({
  selector: 'app-marketautomation',
  standalone: true,
  imports: [ServicebannerComponent, SidebarsecComponent],
  templateUrl: './marketautomation.component.html',
  styleUrl: './marketautomation.component.scss'
})
export class MarketautomationComponent {

}
