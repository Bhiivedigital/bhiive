import { Component } from '@angular/core';
import { ServicebannerComponent } from './servicebanner/servicebanner.component';
import { RouterLink } from '@angular/router';
import { SchemaService } from '../shared/service/schema.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-servicepage',
  standalone: true,
  imports: [ServicebannerComponent, RouterLink],
  templateUrl: './servicepage.component.html',
  styleUrl: './servicepage.component.scss'
})
export class ServicepageComponent {
  constructor(private schemaService:SchemaService,private meta:Meta ){
    
      this.meta.updateTag({
          rel: 'canonical',
          href: 'https://bhiive/services'
        });
     
  }
  ngOnInit() {
  const slug = 'digital-marketing';

  this.schemaService.updateSchema({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://bhiive.com/${slug}/#service`,
    "name": "Digital Marketing Services",
    "description": "Professional digital marketing services in India",
    "provider": {
      "@type": "Organization",
      "@id": "https://bhiive.com/#organization"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    }
  });
}

}
