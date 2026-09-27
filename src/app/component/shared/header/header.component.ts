import { Component, inject } from '@angular/core';
import { PreloaderComponent } from '../preloader/preloader.component';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeadService } from '../../../core/services/lead.service';
import { ServiceCatalog } from '../../../core/services/service-catalog.service';
import { CommonModule } from '@angular/common';

declare const bootstrap: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PreloaderComponent, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
form:any= FormGroup;
  submitted = false;
  // Services dropdown: the CMS service pages (bundled copy until the CMS answers).
  readonly pillars = inject(ServiceCatalog).pillars;

  constructor(private formBuilder: FormBuilder, private leads: LeadService) {}

   goToWhatsApp(): void {
  const phoneNumber = '9445974970'; // Use international format, no + or spaces
  const url = `https://wa.me/${phoneNumber}`;
  window.open(url, '_blank');
}
callNow(): void {
  const phoneNumber = '9445974970'; // Include country code if needed
  window.location.href = `tel:${phoneNumber}`;
}


ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]{10,13}$"), Validators.minLength(10),Validators.maxLength(10)]], // Ensure valid phone number
      message: [''] // Ensure message is required
    });
  }

  // Getter for easy access to form fields in template
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  async onSubmit() {
    this.submitted = true;

    // Stop submission if form is invalid
    if (this.form.invalid) {
      // alert("Please fill in all required fields correctly.");
      return;
    }

    try {
      // Saved in the CMS (Leads) and emailed via the same EmailJS template.
      await this.leads.send({
        name: this.form.value.name,
        email: this.form.value.email,
        mobile: this.form.value.mobile,
        message: this.form.value.message,
        source: 'Get Quote popup',
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
  if (!/^[0-9]$/.test(char)) {
    event.preventDefault();
  }
}
}
