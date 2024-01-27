import { Component, EventEmitter, Output } from '@angular/core';
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

export interface RegisterDetails {
  firstName: string;
  lastName: string;
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
  selector: 'sigmafox-modal-register',
  templateUrl: './register.modal.html',
  styleUrls: ['./register.modal.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class RegisterModal {
  @Output() closed = new EventEmitter<void>();
  @Output() register = new EventEmitter<RegisterDetails>();

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
      buttonID: ButtonID.SignIn,
      buttonTextContent: 'Register',
      buttonStyleClass: ButtonStyleClass.Secondary,
      isDisabled: !this.registerForm.valid,
    },
  ];

  onButtonClicked(buttonID: string) {
    switch (buttonID) {
      case ButtonID.Register: {
        this.setPasswordMatch();
        if (!this.isPasswordMatch) return;
        this.register.emit(this.registerForm.value as RegisterDetails);
      }
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  setPasswordMatch() {
    this.isPasswordMatch =
      this.registerForm.get('password')?.value ===
      this.registerForm.get('passwordConfirm')?.value;
    if (this.isPasswordMatch) return;
    console.log('Passwords dont match');
  }
}
