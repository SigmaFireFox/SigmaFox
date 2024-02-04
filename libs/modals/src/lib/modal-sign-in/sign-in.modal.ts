import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { ButtonStyleClass } from 'libs/components/buttons/src';
import { DynamicModalConfig } from '../dynamic-modal/models/interfaces';
import { DynamicModal } from '../dynamic-modal/dynamic.modal';
import { DynamicModalFormFieldType } from '../dynamic-modal/models/enum';
import { Router } from '@angular/router';

export interface SignInDetails {
  email: string;
  password: string;
}

export enum ButtonNames {
  SignIn = 'signIn',
  Register = 'register',
  ForgotPassword = 'forgotPassword',
  Cancel = 'cancel',
  ResetPassword = 'resetPassword',
}

export enum FormFieldNames {
  Email = 'email',
  Password = 'password',
}

export enum ViewState {
  SIGN_IN,
  FORGOT_PASSWORD,
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
  @Output() resetPassword = new EventEmitter<SignInDetails>();

  viewState = ViewState;
  currentViewState = ViewState.SIGN_IN;

  signInModalConfig: DynamicModalConfig | undefined;
  forgotPasswordModalConfig: DynamicModalConfig | undefined;

  ngOnInit() {
    this.signInModalConfig = {
      header: { value: 'Sign in' },
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
            isSubmit: true,
            buttonConfig: {
              buttonID: ButtonNames.SignIn,
              buttonTextContent: 'Sign in',
              buttonStyleClass: ButtonStyleClass.Primary,
              isDisabled: true,
            },
          },
          [ButtonNames.ForgotPassword]: {
            buttonConfig: {
              buttonID: ButtonNames.ForgotPassword,
              buttonTextContent: 'Forgot password',
              buttonStyleClass: ButtonStyleClass.Secondary,
              isDisabled: false,
            },
          },
          [ButtonNames.Register]: {
            buttonConfig: {
              buttonID: ButtonNames.Register,
              buttonLabel: 'Not yet a user?',
              buttonTextContent: 'Register',
              buttonStyleClass: ButtonStyleClass.Secondary,
              isDisabled: false,
            },
          },
        },
        buttonsOrder: [
          ButtonNames.SignIn,
          ButtonNames.ForgotPassword,
          ButtonNames.Register,
        ],
      },
    };

    this.forgotPasswordModalConfig = {
      header: { value: 'Forgot Password' },
      subHeader: [
        'If you have forgotten your password - please provide \
        your email below and we will email a reset password link',
      ],
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
        },
        fieldsOrder: [FormFieldNames.Email],
      },
      actionPanel: {
        buttons: {
          [ButtonNames.ResetPassword]: {
            isSubmit: true,
            buttonConfig: {
              buttonID: ButtonNames.ResetPassword,
              buttonTextContent: 'Send Reset Email',
              buttonStyleClass: ButtonStyleClass.Primary,
              isDisabled: true,
            },
          },
          [ButtonNames.Cancel]: {
            buttonConfig: {
              buttonID: ButtonNames.Cancel,
              buttonTextContent: 'Cancel',
              buttonStyleClass: ButtonStyleClass.Secondary,
              isDisabled: false,
            },
          },
        },
        buttonsOrder: [ButtonNames.ResetPassword, ButtonNames.Cancel],
      },
    };
  }

  ngOnChanges() {}

  onButtonClicked(buttonID: string) {
    // Keep as switch to allow for possible updates for more buttons to be added in future
    switch (buttonID) {
      case ButtonNames.SignIn: {
        return this.signin.emit(this.signInDetails);
      }
      case ButtonNames.Register: {
        return this.register.emit();
      }
      case ButtonNames.ForgotPassword: {
        return (this.currentViewState = ViewState.FORGOT_PASSWORD);
      }
      case ButtonNames.Cancel: {
        return (this.currentViewState = ViewState.SIGN_IN);
      }
      case ButtonNames.ResetPassword: {
        this.resetPassword.emit(this.signInDetails);
        return;
      }
    }
  }

  onFormSubmitted(signInDetails: Object) {
    this.signInDetails = signInDetails as SignInDetails;
  }
}
