import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { fadeInOut } from '../animations/routing-animations';

import { EmailRequestService } from '../../services/email-request.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    fadeInOut()
  ]
})
export class ContactComponent implements OnInit {

  emailForm: FormGroup;
  formErrors = {
    'firstName': '',
    'lastName': '',
    'contactEmail': '',
    'message': ''
  };
  formErrorMessages = {
    'firstName': {
      'required': 'First name is required',
      'minlength': 'First name must be at least 2 characters'
    },
    'lastName': {
      'required': 'Last name is required',
      'minlength': 'Last name must be at least 2 characters'
    },
    'contactEmail': {
      'required': 'Contact email is required',
      'email': 'Email address is not valid'
    },
    'message': {
      'required': 'Message is required',
      'minlength': 'Message must be at least 10 characters',
      'maxlength': 'Message must be at most 240 characters'
    }
  };
  errMsg = '';
  submitStatus = 'Submit';

  constructor(private formBuilder: FormBuilder,
    private emailService: EmailRequestService) {
    this.emailForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      contactEmail: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(240)]],
      recaptcha: ['', [Validators.required]]
    });
    this.emailForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  ngOnInit() { }

  onValueChanged(data?: any) {
    if (!this.emailForm) return;

    const form = this.emailForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.formErrorMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.submitStatus = 'Sending...';
    const newEmail = this.emailForm.value;
    newEmail.timestamp = new Date().toString();
    this.emailService.submitEmail(newEmail)
      .subscribe(submissionResponse => {
        this.resetForm('Sent!');
        setTimeout(() => {
          this.submitStatus = 'Submit';
        }, 3000)
      }, error => this.errMsg = error);
  }

  resetForm(status?: string) {
    this.submitStatus = status || 'Submit';
    this.errMsg = '';
    this.emailForm.reset();
    for (let i in this.emailForm.controls) {
      this.emailForm.controls[i].setErrors(null);
    }
  }

}
