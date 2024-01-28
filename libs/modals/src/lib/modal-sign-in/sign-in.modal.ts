import { Component, EventEmitter, Input, Output } from '@angular/core';
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

export interface SignInDetails {
  email: string;
  password: string;
}

export enum ButtonID {
  SignIn = 'sign-in',
  Register = 'register',
}

@Component({
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, ButtonsModule],
  selector: 'sigmafox-modal-sign-in',
  templateUrl: './sign-in.modal.html',
  styleUrls: ['./sign-in.modal.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class SignInModal {
  @Input() signInDetails: SignInDetails | undefined;

  @Output() signin = new EventEmitter<SignInDetails>();
  @Output() register = new EventEmitter<void>();

  signInForm = new UntypedFormGroup({});
  buttons: StandardButtonConfig[] = [
    {
      buttonID: ButtonID.SignIn,
      buttonTextContent: 'Sign in',
      buttonStyleClass: ButtonStyleClass.Primary,
      isDisabled: !this.signInForm.valid,
    },
    {
      buttonID: ButtonID.SignIn,
      buttonTextContent: 'Register',
      buttonStyleClass: ButtonStyleClass.Secondary,
      isDisabled: !this.signInForm.valid,
    },
  ];

  showPassword = false;
  emailErrorMessage = '';
  passwordErrorMessage = '';

  ngOnInit() {
    this.signInForm = new UntypedFormGroup({
      email: new UntypedFormControl(this.signInDetails?.email || '', [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl(this.signInDetails?.password || '', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onButtonClicked(buttonID: string) {
    // Keep as switch to allow for possible updates for more buttons to be added in future
    switch (buttonID) {
      case ButtonID.SignIn: {
        this.signin.emit(this.signInForm.value as SignInDetails);
        break;
      }
      case ButtonID.Register: {
        return this.register.emit();
      }
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onInputKeyUp() {
    this.buttons[0].isDisabled = !this.signInForm.valid;
    this.buttons[1].isDisabled = !this.signInForm.valid;
  }

  validateEmailControl() {
    this.emailErrorMessage = '';

    if (this.signInForm.get('email')?.errors?.hasOwnProperty('required')) {
      this.emailErrorMessage = 'Email required';
    }

    if (this.signInForm.get('email')?.errors?.hasOwnProperty('email')) {
      this.emailErrorMessage = 'Email format incorrect';
    }
  }

  validatePasswordControl() {
    this.passwordErrorMessage = '';

    console.log(this.signInForm.get('password')?.errors);

    if (this.signInForm.get('password')?.errors?.hasOwnProperty('required')) {
      this.passwordErrorMessage = 'Password required';
    }

    if (this.signInForm.get('password')?.errors?.hasOwnProperty('minlength')) {
      this.passwordErrorMessage = 'Password requires minumum of 6 characters';
    }
  }
}
