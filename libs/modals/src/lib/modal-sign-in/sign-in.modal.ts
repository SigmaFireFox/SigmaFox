import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { ButtonStyleClass } from 'libs/components/buttons/src';
import { DynamicModalConfig } from '../dynamic-modal/models/interfaces';
import { DynamicModal } from '../dynamic-modal/dynamic.modal';
import { DynamicModalFormFieldType } from '../dynamic-modal/models/enum';

export interface SignInDetails {
  email: string;
  password: string;
}

export enum ButtonNames {
  SignIn = 'signIn',
  Register = 'register',
}

export enum FormFieldNames {
  Email = 'email',
  Password = 'password',
}

@Component({
  standalone: true,
  imports: [CommonModule, DynamicModal],
  selector: 'sigmafox-modal-sign-in',
  templateUrl: './sign-in.modal.html',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class SignInModal implements OnInit {
  @Input() signInDetails: SignInDetails | undefined;

  @Output() signin = new EventEmitter<SignInDetails>();
  @Output() register = new EventEmitter<void>();

  dynamicModalConfig: DynamicModalConfig | undefined;

  ngOnInit() {
    this.dynamicModalConfig = {
      header: { value: 'Sign in', editable: false },
      editMode: true,
      form: {
        fields: {
          [FormFieldNames.Email]: {
            fieldType: DynamicModalFormFieldType.StandardInput,
            label: 'Email',
            value: this.signInDetails?.email || '',
            validations: [Validators.required, Validators.email],
            errorMessage: '',
          },
          [FormFieldNames.Password]: {
            fieldType: DynamicModalFormFieldType.PasswordInput,
            label: 'Password',
            value: this.signInDetails?.password || '',
            showPassword: false,
            validations: [Validators.required, Validators.minLength(6)],
            minChar: 6,
            errorMessage: '',
          },
        },
        fieldsOrder: [FormFieldNames.Email, FormFieldNames.Password],
      },
      actionPanel: {
        buttons: {
          [ButtonNames.SignIn]: {
            requiresValidation: true,
            isSubmit: true,
            buttonConfig: {
              buttonID: ButtonNames.SignIn,
              buttonTextContent: 'Sign in',
              buttonStyleClass: ButtonStyleClass.Primary,
              isDisabled: true,
            },
          },
          [ButtonNames.Register]: {
            requiresValidation: false,
            isSubmit: false,
            buttonConfig: {
              buttonID: ButtonNames.Register,
              buttonLabel: 'Not yet a user?',
              buttonTextContent: 'Register',
              buttonStyleClass: ButtonStyleClass.Secondary,
              isDisabled: false,
            },
          },
        },
        buttonsOrder: [ButtonNames.SignIn, ButtonNames.Register],
      },
    };
  }

  onButtonClicked(buttonID: string) {
    // Keep as switch to allow for possible updates for more buttons to be added in future
    switch (buttonID) {
      case ButtonNames.SignIn: {
        // Button is a submit button - will emit onFormSubmitted - nothing further required
        break;
      }
      case ButtonNames.Register: {
        return this.register.emit();
      }
    }
  }

  onFormSubmitted(signInDetails: Object) {
    this.signInDetails = signInDetails as SignInDetails;
    this.signin.emit(this.signInDetails);
  }
}
