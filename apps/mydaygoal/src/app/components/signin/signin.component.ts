/* eslint-disable @angular-eslint/component-selector */
import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthenticationService,
  AuthServiceResponse,
} from '../../services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  @Output() signInClosed = new EventEmitter<void>();

  constructor(private auth: AuthenticationService) {}

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  hidePassword = true;
  displayErrorMessage = false;
  errorMessage = '';
  displayRegisterButton = true;
  displayForgotPasswordButton = false;

  get emailInput() {
    return this.signin.get('email');
  }
  get passwordInput() {
    return this.signin.get('password');
  }

  async signIn() {
    this.resetErrorMessage();
    if (this.findInvalidControls().length > 0) {
      this.errorMessage =
        'One or more of the inputs above have not been completed correctly. Please ensure email and password are correctly entered before attemptiong to signin';
      this.displayErrorMessage = true;
    } else {
      const authResponse = await this.auth.signInWithEmail(
        this.emailInput?.value,
        this.passwordInput?.value
      );
      authResponse.success
        ? this.signInClosed.emit()
        : this.displayAuthError(authResponse);
    }
  }

  async signUp() {
    this.resetErrorMessage();
    if (this.findInvalidControls().length > 0) {
      this.errorMessage =
        'One or more of the inputs above have not been completed correctly. Please ensure email and password are correctly entered before attemptiong to signin';
      this.displayErrorMessage = true;
    } else {
      const authResponse = await this.auth.signUpWithEmail(
        this.emailInput?.value,
        this.passwordInput?.value
      );
      authResponse.success
        ? this.signInClosed.emit()
        : this.displayAuthError(authResponse);
    }
  }

  async forgotPassword() {
    this.resetErrorMessage();

    const authResponse = await this.auth.resetUserPassword(
      this.emailInput?.value
    );
    if (authResponse.success) {
      this.displayErrorMessage = true;
      this.errorMessage =
        'An email with a reset password link has been emailed to ' +
        this.emailInput?.value;
    } else {
      this.displayAuthError(authResponse);
    }
  }

  private resetErrorMessage() {
    this.displayErrorMessage = false;
    this.errorMessage = '';
    this.displayForgotPasswordButton = false;
    this.displayRegisterButton = true;
  }

  private findInvalidControls(): string[] {
    const invalid = [];
    const controls = this.signin.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  private displayAuthError(authResponse: AuthServiceResponse) {
    this.displayErrorMessage = true;
    switch (authResponse.errorCode) {
      case 'auth/wrong-password': {
        this.errorMessage =
          'The password you have entered seems to not match the password we have on file for ' +
          this.emailInput?.value +
          '. Please check your password and retry signing in. If you have forgotten your password - click the Reset password button above and we email you a link to reset your password';
        this.displayForgotPasswordButton = true;
        this.displayRegisterButton = false;
        return;
      }
      case 'auth/user-not-found': {
        this.errorMessage =
          'The email ' +
          this.emailInput?.value +
          ' does not seem to be registered with us. Please check your email and retry signing in or if you are not registered as user with myDayGoal, please click the regsiter button below';
        return;
      }
      case 'auth/email-already-in-use': {
        this.errorMessage =
          'The email ' +
          this.emailInput?.value +
          ' seems to already be registered with us. If you have forgotten your password - click the Reset password button above and we email you a link to reset your password';
        this.displayForgotPasswordButton = true;
        this.displayRegisterButton = false;

        return;
      }
      default: {
        this.errorMessage =
          'An unhandled error with referance ' +
          authResponse.errorCode +
          ' was given. Please check your entered details before retrying your desired action';
      }
    }
  }
}
