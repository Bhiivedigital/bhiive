import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';

@Component({
  selector: 'app-brandbuilding',
  standalone: true,
  imports: [ServicebannerComponent, SidebarsecComponent],
  templateUrl: './brandbuilding.component.html',
  styleUrl: './brandbuilding.component.scss'
})
export class BrandbuildingComponent {

}
