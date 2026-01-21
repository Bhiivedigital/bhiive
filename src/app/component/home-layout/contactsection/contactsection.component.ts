import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contactsection',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './contactsection.component.html',
  styleUrl: './contactsection.component.scss'
})
export class ContactsectionComponent {
form:any= FormGroup;
  submitted = false;

 constructor(private formBuilder: FormBuilder) {}

ngOnInit(): void {
    emailjs.init('bKJipK3m800SQHwLe'); // Ensure EmailJS is initialized
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
  if (!/^[0-9]$/.test(char)) {
    event.preventDefault();
  }
}
}

