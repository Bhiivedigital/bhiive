import { Component } from '@angular/core';
import { ServicebannerComponent } from "../servicebanner/servicebanner.component";
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';

@Component({
  selector: 'app-workflowautomation',
  standalone: true,
  imports: [ServicebannerComponent, SidebarsecComponent],
  templateUrl: './workflowautomation.component.html',
  styleUrl: './workflowautomation.component.scss'
})
export class WorkflowautomationComponent {

}
