/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormFieldType } from 'apps/assemble-ez/src/app/enums/form.eum';
import { FormConfig } from 'apps/assemble-ez/src/app/interfaces/form-screen.interface';

@Component({
  selector: 'app-basic-details-screen',
  templateUrl: './basic-details.screen.html',
  styleUrls: ['./basic-details.screen.scss'],
})
export class BasicDetailsComponent {
  @Input() isFirstTimeRegistration = false;
  @Input() currentValues: { [key: string]: unknown } = {};
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();
  @Output() isPasswordMismatched = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  registerFormConfig = {} as FormConfig;

  ngOnInit() {
    this.registerFormConfig = {
      formTitle: '',
      isInExpansionTable: false,
      isDynamic: true,
      canProceed: false,
      proceedBlocked: true,
      canCancel: true,
      fields: [
        {
          fieldDisplay: 'First name',
          fieldName: 'firstName',
          fieldType: FormFieldType.INPUT_GENERAL,
          defaultValue: this.currentValues['firstName'] || '',
        },
        {
          fieldDisplay: 'Last name',
          fieldName: 'lastName',
          fieldType: FormFieldType.INPUT_GENERAL,
          defaultValue: this.currentValues['lastName'] || '',
        },
        {
          fieldDisplay: 'Email',
          fieldName: 'email',
          fieldType: FormFieldType.INPUT_GENERAL,
          defaultValue: this.currentValues['email'] || '',
        },
        {
          fieldDisplay: 'Contact number',
          fieldName: 'contactNumber',
          fieldType: FormFieldType.INPUT_GENERAL,
          defaultValue: this.currentValues['contactNumber'] || '',
        },
      ],
      proceedText: 'Proceed',
    };

    if (this.isFirstTimeRegistration) {
      this.registerFormConfig.proceedBlocked = false;
      this.registerFormConfig.formTitle =
        'Registering is a quick easy three-step process, \
          lets start by gettig your basic details';
      this.registerFormConfig.fields.push(
        {
          fieldDisplay: 'Password',
          fieldName: 'password',
          fieldType: FormFieldType.PASSWORD,
          defaultValue: '',
        },
        {
          fieldDisplay: 'Confirm password',
          fieldName: 'confirmPassword',
          fieldType: FormFieldType.PASSWORD,
          defaultValue: '',
        }
      );
    }
  }

  onFormChanged(formValue: { [key: string]: string }) {
    this.registerFormConfig.proceedBlocked = !this.changeMade(formValue);
  }

  onFormCancelled() {
    this.editCancelled.emit();
  }

  onRegisterFormSubmitted(formValue: { [key: string]: string }) {
    if (this.isFirstTimeRegistration) {
      this.passwordsmatch(formValue)
        ? this.formSubmitted.emit(formValue)
        : this.isPasswordMismatched.emit();
      return;
    }
    this.changeMade(formValue)
      ? this.formSubmitted.emit(formValue)
      : this.editCancelled.emit();
  }

  private passwordsmatch(formValue: { [key: string]: string }): boolean {
    return formValue['password'] === formValue['confirmPassword'];
  }

  private changeMade(formValue: { [key: string]: string }): boolean {
    let changeMade = false;
    Object.keys(formValue).forEach((fieldName) => {
      if (formValue[fieldName] != this.currentValues[fieldName]) {
        changeMade = true;
      }
    });
    return changeMade;
  }
}
