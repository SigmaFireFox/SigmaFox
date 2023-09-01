import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  AuthenticationService,
  SignInContext,
} from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    readonly authService: AuthenticationService,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    if (
      !this.loginForm.controls.email.value ||
      !this.loginForm.controls.password.value
    ) {
      return;
    }
    this.authService.signInWithEmail(
      SignInContext.Admin,
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value
    );
  }
}
