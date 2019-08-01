import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

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
export class ContactComponent implements OnInit, OnDestroy {

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
  resumeURL = 'assets/pdf/Andrew-Wanex-resume.pdf';
  formSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private emailService: EmailRequestService) {
      this.emailForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        contactEmail: ['', [Validators.required, Validators.email]],
        message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(240)]],
        recaptcha: ['', [Validators.required]]
      });
  }

  ngOnInit() {
    this.formSubscription = this.emailForm.valueChanges
      .subscribe(_ => this.onValueChanged());
    this.onValueChanged();
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }

  /**
   * Check form validation on changes and add any error messages to display
   *
   * @params: none
   *
   * @return: none
  **/
  onValueChanged(): void {
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

  /**
   * Submit form and call emailService submitEmail, clear the form on successful
   * http request, display error if response is not 200
   *
   * @params: none
   *
   * @return: none
  **/
  onSubmit() {
    this.submitStatus = 'Sending...';
    const newEmail = this.emailForm.value;
    newEmail.timestamp = new Date().toString();
    this.emailService.submitEmail(newEmail)
      .subscribe(submissionResponse => {
        if (submissionResponse.statusCode = 200) {
          this.resetForm('Sent!');
          setTimeout(() => {
            this.submitStatus = 'Submit';
          }, 3000);
        }
      }, error => this.errMsg = error);
  }

  /**
   * Clear form fields and error messages
   *
   * @params: [status] - defaults to 'Submit', set to 'Sent!' if email was
   * successfully sent
   *
   * @return: none
  **/
  resetForm(status?: string) {
    this.submitStatus = status || 'Submit';
    this.errMsg = '';
    this.emailForm.reset();
    for (let i in this.emailForm.controls) {
      this.emailForm.controls[i].setErrors(null);
    }
  }

}
