import { Component } from '@angular/core';
import { BrandbuildingComponent } from "../brandbuilding/brandbuilding.component";
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';
import { SidebarsecComponent } from "../sidebarsec/sidebarsec.component";

@Component({
  selector: 'app-digitalmarketing',
  standalone: true,
  imports: [ServicebannerComponent, SidebarsecComponent],
  templateUrl: './digitalmarketing.component.html',
  styleUrl: './digitalmarketing.component.scss'
})
export class DigitalmarketingComponent {

}
