import { Component } from '@angular/core';
import { ServicebannerComponent } from "../servicebanner/servicebanner.component";
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-workflowautomation',
  standalone: true,
  imports: [ServicebannerComponent, SidebarsecComponent],
  templateUrl: './workflowautomation.component.html',
  styleUrl: './workflowautomation.component.scss'
})
export class WorkflowautomationComponent {
constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {

    // Page Title
    this.title.setTitle(
      'Workflow Automation Services | Business Process & Task Automation – Bhiive'
    );

    // Meta Tags
    this.meta.updateTag({
      name: 'description',
      content: 'Transform your operations with Bhiive Digi Tech’s workflow automation services. We streamline repetitive tasks, improve process efficiency, reduce manual work, and help businesses scale with smart automated workflows tailored to your needs.'
    });
    this.meta.updateTag({
      name: 'title',
      content: 'Workflow Automation Services | Business Process & Task Automation – Bhiive'
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'workflow automation, business process automation, task automation, automated workflows, operational efficiency, workflow tools, Bhiive'
    });
  }
}
