import { Component } from '@angular/core';
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';

@Component({
  selector: 'app-paidmarketing',
  standalone: true,
  imports: [SidebarsecComponent, ServicebannerComponent],
  templateUrl: './paidmarketing.component.html',
  styleUrl: './paidmarketing.component.scss'
})
export class PaidmarketingComponent {

}
