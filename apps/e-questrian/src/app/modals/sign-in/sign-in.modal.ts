import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

export interface SignInDetails {
  email: string;
  password: string;
}

@Component({
  selector: 'e-questrian-sign-in-modal',
  templateUrl: './sign-in.modal.html',
  styleUrls: ['./sign-in.modal.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class SignInModal {
  @Output() closed = new EventEmitter<void>();
  @Output() signin = new EventEmitter<SignInDetails>();
  @Output() register = new EventEmitter<SignInDetails>();

  signInForm = new UntypedFormGroup({
    email: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
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
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
