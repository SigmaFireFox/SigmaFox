import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@sigmafox/buttons';

export interface SignInDetails {
  email: string;
  password: string;
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
  @Output() closed = new EventEmitter<void>();
  @Output() signin = new EventEmitter<SignInDetails>();
  @Output() register = new EventEmitter<SignInDetails>();

  signInForm = new UntypedFormGroup({
    email: new UntypedFormControl('', Validators.email),
    password: new UntypedFormControl('', Validators.required),
  });
  showPassword = false;
  isRegister = false;

  onSubmitClick() {
    return this.isRegister
      ? this.register.emit(this.signInForm.value as SignInDetails)
      : this.signin.emit(this.signInForm.value as SignInDetails);
  }

  onRegisterClick() {
    this.isRegister = true;
    this.onSubmitClick();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
