/* eslint-disable @nx/enforce-module-boundaries */
import { Component, EventEmitter, Output } from '@angular/core';
import { FormFieldType } from 'apps/assemble-ez/src/app/enums/form.eum';
import { FormConfig } from 'apps/assemble-ez/src/app/interfaces/form-screen.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-sign-in-screen',
  templateUrl: './sign-in.screen.html',
  styleUrls: ['./sign-in.screen.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class SignInScreen {
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();

  signInFormConfig: FormConfig = {
    formTitle: '',
    isInExpansionTable: false,
    isDynamic: false,
    canProceed: false,
    proceedBlocked: false,
    fields: [
      {
        fieldDisplay: 'Email',
        fieldName: 'email',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
      {
        fieldDisplay: 'Password',
        fieldName: 'password',
        fieldType: FormFieldType.PASSWORD,
        defaultValue: '',
      },
    ],
    proceedText: 'Sign in',
  };

  onSignInFormSubmitted(formValue: { [key: string]: string }) {
    this.formSubmitted.emit(formValue);
  }
}
