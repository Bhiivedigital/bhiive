import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicepage/servicebanner/servicebanner.component';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { CommonModule } from '@angular/common';
import { SchemaService } from '../shared/service/schema.service';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from '../shared/service/canonical.service';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [ServicebannerComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss'
})
export class CareerComponent {
  form: any = FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private schemaService: SchemaService, private meta: Meta, private title: Title, private canonicalService: CanonicalService) {}

  ngOnInit(): void {
    this.title.setTitle('Careers at Bhiive | Join Our Digital Marketing Team in Chennai');

    this.meta.updateTag({ name: 'description', content: 'Join the Bhiive team in Chennai. Explore open roles in digital marketing, web development, SEO, and more. Build your career with a fast-growing agency.' });
    this.meta.updateTag({ name: 'keywords', content: 'careers at Bhiive, digital marketing jobs Chennai, SEO jobs, web development jobs, Bhiive hiring' });
    this.canonicalService.setCanonical('https://bhiive.com/career');

    this.meta.updateTag({ property: 'og:title', content: 'Careers at Bhiive | Join Our Digital Marketing Team in Chennai' });
    this.meta.updateTag({ property: 'og:description', content: 'Explore open roles at Bhiive in digital marketing, web development, and SEO in Chennai.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bhiive.com/career' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: 'https://bhiive.com/assets/img/logo/logo1.png' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Careers at Bhiive | Join Our Digital Marketing Team in Chennai' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Explore open roles at Bhiive in digital marketing, web development, and SEO.' });

    emailjs.init('bKJipK3m800SQHwLe');
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]{10,13}$"), Validators.minLength(10), Validators.maxLength(10)]],
      message: ['']
    });

    this.schemaService.updateSchema({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://bhiive.com/career/#webpage",
      "url": "https://bhiive.com/career",
      "name": "Careers at Bhiive",
      "description": "Join our growing team in Chennai. Explore open roles and build your career in digital marketing and technology.",
      "isPartOf": { "@id": "https://bhiive.com/#website" },
      "publisher": { "@id": "https://bhiive.com/#organization" }
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
