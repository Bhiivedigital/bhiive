import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';

@Component({
  selector: 'app-influencemarketing',
  standalone: true,
  imports: [ServicebannerComponent,],
  templateUrl: './influencemarketing.component.html',
  styleUrl: './influencemarketing.component.scss'
})
export class InfluencemarketingComponent {

}
