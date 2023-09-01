/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'apps/lilbigthings3d/src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    readonly authService: AuthenticationService,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    if (
      !this.registerForm.controls.email.value ||
      !this.registerForm.controls.password.value
    ) {
      return;
    }
    this.authService.signUpWithEmail(
      this.registerForm.controls.email.value,
      this.registerForm.controls.password.value
    );
  }
}
