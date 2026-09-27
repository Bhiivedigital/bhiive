import { Component } from '@angular/core';
import { ServicebannerComponent } from '../servicepage/servicebanner/servicebanner.component';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/seo/seo.service';
import { LeadService } from '../../core/services/lead.service';

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

  constructor(private formBuilder: FormBuilder, private seo: SeoService, private leads: LeadService) {}

  ngOnInit(): void {
    // Title, description, canonical, Open Graph and JSON-LD: src/app/data/pages.json
    this.seo.applyPage('/contact-us');

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]{10,13}$"), Validators.minLength(10), Validators.maxLength(10)]],
      message: ['']
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  async onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
    try {
      // Saved in the CMS (Leads) and emailed via the same EmailJS template.
      await this.leads.send({
        name: this.form.value.name,
        email: this.form.value.email,
        mobile: this.form.value.mobile,
        message: this.form.value.message,
        source: 'Contact page',
      });
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
