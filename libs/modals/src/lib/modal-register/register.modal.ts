import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule, ButtonStyleClass } from '@sigmafox/buttons';
import { StandardButtonConfig } from 'libs/buttons/src/lib/standard-button/models/interfaces';
import { DynamicModalConfig } from '../dynamic-modal/models/interfaces';
import { ButtonID, DynamicModal } from '../dynamic-modal/dynamic.modal';
import { DynamicModalFormFieldType } from '../dynamic-modal/models/enum';

export interface RegisterDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export enum ButtonNames {
  Register = 'register',
  SignIn = 'signIn',
}

export enum FormFieldNames {
  FirstName = 'firstName',
  LastName = 'lastName',
  Email = 'email',
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
}

@Component({
  standalone: true,
  imports: [CommonModule, DynamicModal],
  selector: 'sigmafox-modal-register',
  templateUrl: './register.modal.html',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class RegisterModal implements OnInit {
  @Input() registerDetails: RegisterDetails | undefined;

  @Output() register = new EventEmitter<RegisterDetails>();
  @Output() signin = new EventEmitter<void>();

  dynamicModalConfig: DynamicModalConfig | undefined;

  registerForm = new UntypedFormGroup({
    firstName: new UntypedFormControl('', Validators.required),
    lastName: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', Validators.email),
    password: new UntypedFormControl('', Validators.required),
    passwordConfirm: new UntypedFormControl('', Validators.required),
  });
  showPassword = false;
  showConfirmPassword = false;
  isPasswordMatch = false;

  buttons: StandardButtonConfig[] = [
    {
      buttonID: ButtonID.Register,
      buttonTextContent: 'Register',
      buttonStyleClass: ButtonStyleClass.Primary,
      isDisabled: !this.registerForm.valid,
    },
  ];

  ngOnInit() {
    this.dynamicModalConfig = {
      header: 'Register',
      form: {
        fields: {
          [FormFieldNames.FirstName]: {
            fieldType: DynamicModalFormFieldType.StandardInput,
            label: 'First name',
            value: this.registerDetails?.firstName || '',
            validations: [Validators.required],
            errorMessage: '',
          },
          [FormFieldNames.LastName]: {
            fieldType: DynamicModalFormFieldType.StandardInput,
            label: 'Last name',
            value: this.registerDetails?.lastName || '',
            validations: [Validators.required],
            errorMessage: '',
          },
          [FormFieldNames.Email]: {
            fieldType: DynamicModalFormFieldType.StandardInput,
            label: 'Email',
            value: this.registerDetails?.email || '',
            validations: [Validators.required, Validators.email],
            errorMessage: '',
          },
          [FormFieldNames.Password]: {
            fieldType: DynamicModalFormFieldType.PasswordInput,
            label: 'Password',
            value: this.registerDetails?.password || '',
            validations: [Validators.required, Validators.minLength(6)],
            minChar: 6,
            errorMessage: '',
          },
          [FormFieldNames.ConfirmPassword]: {
            fieldType: DynamicModalFormFieldType.PasswordConfirmationInput,
            label: 'Confirmation password',
            value: this.registerDetails?.confirmPassword || '',
            validations: [Validators.required, Validators.minLength(6)],
            minChar: 6,
            errorMessage: '',
          },
        },
        fieldsOrder: [
          FormFieldNames.FirstName,
          FormFieldNames.LastName,
          FormFieldNames.Email,
          FormFieldNames.Password,
          FormFieldNames.ConfirmPassword,
        ],
        passwordFieldsToMatch: {
          password: FormFieldNames.Password,
          confirmation: FormFieldNames.ConfirmPassword,
        },
      },
      actionPanel: {
        buttons: {
          [ButtonNames.Register]: {
            requiresValidation: true,
            isSubmit: true,
            buttonConfig: {
              buttonID: ButtonNames.Register,
              buttonTextContent: 'Register',
              buttonStyleClass: ButtonStyleClass.Primary,
              isDisabled: true,
            },
          },
          [ButtonNames.SignIn]: {
            requiresValidation: false,
            isSubmit: false,
            buttonConfig: {
              buttonID: ButtonNames.SignIn,
              buttonLabel: 'Already a user?',
              buttonTextContent: 'Sign in',
              buttonStyleClass: ButtonStyleClass.Secondary,
              isDisabled: false,
            },
          },
        },
        buttonsOrder: [ButtonNames.Register, ButtonNames.SignIn],
      },
    };
  }

  onButtonClicked(buttonID: string) {
    // Keep as switch to allow for possible updates for more buttons to be added in future
    switch (buttonID) {
      case ButtonNames.Register: {
        // Button is a submit button - will emit onFormSubmitted - nothing further required
        break;
      }
      case ButtonNames.SignIn: {
        this.signin.emit();
        break;
      }
    }
  }

  onFormSubmitted(registerDetails: Object) {
    this.register.emit(registerDetails as RegisterDetails);
  }
}
