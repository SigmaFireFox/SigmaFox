import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormGroup,
  ValidationErrors,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from 'libs/components/buttons/src';
import { DynamicModalConfig } from './models/interfaces';
import { DynamicModalFormFieldType } from './models/enum';
import { VarDirective } from '@sigmafox/directives';

export enum ButtonID {
  SignIn = 'sign-in',
  Register = 'register',
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    ButtonsModule,
    VarDirective,
  ],
  selector: 'sigmafox-dynamic-modal',
  templateUrl: './dynamic.modal.html',
  styleUrls: ['./dynamic.modal.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class DynamicModal {
  @Input() config: DynamicModalConfig | undefined;

  @Output() buttonClicked = new EventEmitter<string>();
  @Output() formSubmitted = new EventEmitter<Object>();

  dynamicModalFormFieldType = DynamicModalFormFieldType;
  dynamicForm = new UntypedFormGroup({});

  ngOnInit() {
    if (!this.config)
      return console.log('DynamicModal', 'No DynamicModalConfig provided');

    if (this.config.form) {
      this.setForm();
      this.validateForm();
    }
  }

  onButtonClicked(buttonID: string) {
    const currentButton = this.config?.actionPanel.buttons[buttonID];

    // If the button is a submit AND
    // The form does not need to match passwords OR it does require matching and they do match
    // Submit the form
    if (currentButton?.isSubmit) {
      if (
        !this.config?.form?.passwordFieldsToMatch ||
        this.checkPasswordMatching()
      ) {
        this.formSubmitted.emit(this.dynamicForm.value);
      }
    }

    // If the form forms needs to be reset
    if (currentButton?.requiresFormReset) {
      this.resetform();
    }

    this.buttonClicked.emit(buttonID);
  }

  validateForm() {
    if (!this.config?.actionPanel || !this.config?.editMode) return;

    // Update all submit buttons base on the valid status of the form
    const formIsSubmittable =
      this.dynamicForm.valid && this.changesMadeToOrginalData();

    Object.keys(this.config?.actionPanel.buttons).forEach((buttonKey) => {
      let currentButton = this.config?.actionPanel.buttons[buttonKey];
      if (currentButton?.specialSubmitState) {
        currentButton.buttonConfig.buttonStyleClass = formIsSubmittable
          ? currentButton?.specialSubmitState.onSubmit
          : currentButton.specialSubmitState.onUnSubmit;
      }
      if (currentButton?.isSubmit) {
        currentButton.buttonConfig.isDisabled = !formIsSubmittable;
      }
    });

    // If the form is valid - need to remove all error states
    if (!this.dynamicForm.valid || !this.config.form) return;

    Object.keys(this.config.form.fields).forEach((fieldName) => {
      if (!this.config?.form) return;
      this.config.form.fields[fieldName].errorMessage = '';
    });
  }

  validateControl(controlName: string) {
    if (!this.config || !this.config.form) return;

    let currentFormField = this.config.form.fields[controlName];

    const errors: ValidationErrors | null | undefined =
      this.dynamicForm.get(controlName)?.errors;

    if (errors == null || errors == undefined) {
      currentFormField.errorMessage = '';
      return;
    }

    const firstError = Object.keys(errors)[0];
    switch (firstError) {
      case 'required': {
        currentFormField.errorMessage = `${currentFormField.label} required`;
        break;
      }
      case 'minlength': {
        currentFormField.errorMessage = currentFormField.minChar
          ? `Minimum of ${currentFormField.minChar} characters required`
          : 'Minimum characters required';
        break;
      }
      case 'email': {
        currentFormField.errorMessage = `${currentFormField.label} must be in correct email format`;
        break;
      }
    }

    this.validateForm();
  }

  private setForm() {
    if (!this.config?.form) return;
    let form = this.config.form;

    Object.keys(form.fields).forEach((fieldKey) => {
      this.dynamicForm.addControl(
        fieldKey,
        new FormControl(
          form.fields[fieldKey].value,
          form.fields[fieldKey].validations
        )
      );
    });
  }

  private checkPasswordMatching(): boolean {
    if (
      !this.config ||
      !this.config.form ||
      !this.config.form.passwordFieldsToMatch
    )
      return false;

    const form = this.config.form;
    if (!form.passwordFieldsToMatch) return false;

    const passwordFieldName = form.passwordFieldsToMatch.password;
    const confirmationFieldName = form.passwordFieldsToMatch.confirmation;

    const passwordField = this.dynamicForm.get(passwordFieldName);
    const confirmationField = this.dynamicForm.get(confirmationFieldName);

    if (passwordField?.value !== confirmationField?.value) {
      const errorMessage = 'Passwords do not match';
      form.fields[passwordFieldName].errorMessage = errorMessage;
      form.fields[confirmationFieldName].errorMessage = errorMessage;
      return false;
    }

    return true;
  }

  private changesMadeToOrginalData(): boolean {
    let changesMade = false;

    Object.keys(this.dynamicForm.value).forEach((key) => {
      if (changesMade) return;
      if (
        this.dynamicForm.get(key)?.value != this.config?.form?.fields[key].value
      ) {
        changesMade = true;
        return;
      }
    });
    return changesMade;
  }

  private resetform() {
    Object.keys(this.dynamicForm.value).forEach((key) => {
      if (!this.config || !this.config.form) return;
      this.dynamicForm.controls[key].setValue(
        this.config.form.fields[key].value
      );
    });
    this.validateForm();
  }
}
