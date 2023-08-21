/* eslint-disable @nx/enforce-module-boundaries */
import { Component, EventEmitter, Output } from '@angular/core';
import { FormFieldType } from 'apps/assemble-ez/src/app/enums/form.eum';
import { FormConfig } from 'apps/assemble-ez/src/app/interfaces/form-screen.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-forgot-password-screen',
  templateUrl: './forgot-password.screen.html',
  styleUrls: ['./forgot-password.screen.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ForgotPasswordScreen {
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();

  forgotPasswordFormConfig: FormConfig = {
    formTitle: 'Please enter your registered email to have a reset email sent',
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
    ],
    proceedText: 'Send reset email',
  };

  forgotPasswordFormSubmitted(formValue: { [key: string]: string }) {
    this.formSubmitted.emit(formValue);
  }
}
