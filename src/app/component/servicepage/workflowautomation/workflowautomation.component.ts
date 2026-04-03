import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicebanner/servicebanner.component';
import { SidebarsecComponent } from '../sidebarsec/sidebarsec.component';
import { Meta, Title } from '@angular/platform-browser';
import { SchemaService } from '../../shared/service/schema.service';

@Component({
  selector: 'app-workflowautomation',
  standalone: true,
  imports: [ServicebannerComponent, SidebarsecComponent],
  templateUrl: './workflowautomation.component.html',
  styleUrl: './workflowautomation.component.scss'
})
export class WorkflowautomationComponent {
  constructor(private meta: Meta, private title: Title, private schemaService: SchemaService) {}

  ngOnInit(): void {
    this.title.setTitle('Workflow Automation Services | Business Process & Task Automation – Bhiive');

    this.meta.updateTag({ name: 'description', content: 'Transform your operations with Bhiives workflow automation services. We streamline repetitive tasks, improve process efficiency, reduce manual work, and help businesses scale with smart automated workflows.' });
    this.meta.updateTag({ name: 'keywords', content: 'workflow automation, business process automation, task automation, operational efficiency, Bhiive Chennai' });
    this.meta.updateTag({ rel: 'canonical', href: 'https://bhiive.com/workflow-automation' });

    this.meta.updateTag({ property: 'og:title', content: 'Workflow Automation Services | Business Process & Task Automation – Bhiive' });
    this.meta.updateTag({ property: 'og:description', content: 'Transform your operations with Bhiives workflow automation services. We streamline repetitive tasks, improve process efficiency, reduce manual work, and help businesses scale with smart automated workflows.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bhiive.com/workflow-automation' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Workflow Automation Services | Business Process & Task Automation – Bhiive' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Transform your operations with Bhiives workflow automation services. We streamline repetitive tasks, improve process efficiency, reduce manual work, and help businesses scale with smart automated workflows.' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.schemaService.updateSchema({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://bhiive.com/workflow-automation/#service",
      "name": "Workflow Automation Services",
      "description": "Smart automated workflows to streamline business operations and improve efficiency.",
      "provider": { "@type": "Organization", "@id": "https://bhiive.com/#organization" },
      "areaServed": { "@type": "Country", "name": "India" }
    });
  }
}
