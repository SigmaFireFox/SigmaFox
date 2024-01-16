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

export interface RegisterDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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

  onSubmitClick() {
    if (
      this.registerForm.get('password')?.value ===
      this.registerForm.get('passwordConfirm')?.value
    ) {
      this.register.emit(this.registerForm.value as RegisterDetails);
    } else {
      console.log('Passwords dont match');
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
