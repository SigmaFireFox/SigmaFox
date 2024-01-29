import {
  Component,
  createNgModule,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormGroup,
  ValidationErrors,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@sigmafox/buttons';
import { SignInDetails } from '../modal-sign-in/sign-in.modal';
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

  showPassword = false;
  emailErrorMessage = '';
  passwordErrorMessage = '';

  ngOnInit() {
    if (!this.config)
      return console.log('DynamicModal', 'No DynamicModalConfig provided');

    if (this.config.form) {
      this.setForm();
    }
  }

  onButtonClicked(buttonID: string) {
    const currentButton = this.config?.actionPanel.buttons[buttonID];

    if (currentButton?.isSubmit) {
      this.formSubmitted.emit(this.dynamicForm.value);
    }

    this.buttonClicked.emit(buttonID);
  }

  togglePassword(controlName: string) {
    if (!this.config || !this.config.form) return;

    let currentFormField = this.config.form.fields[controlName];
    currentFormField.showPassword = !currentFormField.showPassword;
  }

  validateForm() {
    if (!this.config?.actionPanel) return;

    Object.keys(this.config?.actionPanel.buttons).forEach((buttonKey) => {
      let currentButton = this.config?.actionPanel.buttons[buttonKey];
      if (currentButton?.requiresValidation) {
        currentButton.buttonConfig.isDisabled = !this.dynamicForm.valid;
      }
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
}
