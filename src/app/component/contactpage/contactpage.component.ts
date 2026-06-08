import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicepage/servicebanner/servicebanner.component';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { CommonModule } from '@angular/common';
import { SchemaService } from '../shared/service/schema.service';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../shared/service/canonical.service';

@Component({
  selector: 'app-contactpage',
  standalone: true,
  imports: [ServicebannerComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contactpage.component.html',
  styleUrl: './contactpage.component.scss'
})
export class ContactpageComponent {
  form: any = FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private schemaService: SchemaService, private meta: Meta, private title: Title, private canonicalService: CanonicalService) {}

  ngOnInit(): void {
    this.title.setTitle('Contact Us | Get a Free Quote – Bhiive');

    this.meta.updateTag({ name: 'description', content: 'Get in touch with Bhiive for web design, SEO, digital marketing, and paid advertising services in Chennai. Request a free consultation today.' });
    this.meta.updateTag({ name: 'keywords', content: 'contact Bhiive, digital marketing agency Chennai contact, SEO services quote, free consultation' });
    this.canonicalService.setCanonical('https://bhiive.com/contact-us');

    this.meta.updateTag({ property: 'og:title', content: 'Contact Us | Get a Free Quote – Bhiive' });
    this.meta.updateTag({ property: 'og:description', content: 'Get in touch with Bhiive for web design, SEO, and digital marketing services in Chennai.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bhiive.com/contact-us' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Contact Us | Get a Free Quote – Bhiive' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Get in touch with Bhiive for web design, SEO, and digital marketing services in Chennai.' });

    emailjs.init('bKJipK3m800SQHwLe');
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]{10,13}$"), Validators.minLength(10), Validators.maxLength(10)]],
      message: ['']
    });

    this.schemaService.updateSchema({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://bhiive.com/#localbusiness",
      "name": "Bhiive",
      "url": "https://bhiive.com/",
      "telephone": "+91-94459-74970",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sriraman Street, Sembiyan, Perambur",
        "addressLocality": "Chennai",
        "addressRegion": "TN",
        "postalCode": "600011",
        "addressCountry": "IN"
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  async onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
    try {
      let response = await emailjs.send("service_wjjtovg", "template_tt1n5xt", {
        subject: this.form.value.subject,
        message: this.form.value.message,
        mobile: this.form.value.mobile,
        email: this.form.value.email,
        name: this.form.value.name,
      });
      console.log("Email sent successfully!", response);
      alert('Message sent successfully!');
      this.submitted = false;
      this.form.reset();
    } catch (error) {
      console.error("Email sending failed:", error);
      alert('Failed to send message. Please try again.');
    }
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const char = event.key;
    if (!/^[0-9]$/.test(char)) event.preventDefault();
  }
}
