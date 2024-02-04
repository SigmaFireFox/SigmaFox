/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FirebaseAuthErrors,
  SignInDetails,
  SuccessMessage,
} from '@sigmafox/modals';
import { PageConfig } from '../../interfaces/common-page-configs.interface';
import { AppRoutePaths } from '../../models/routing.enum';
import { AuthenticationService } from '../../services/authentication/authentication.service';

/* eslint-disable @angular-eslint/component-selector */
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  signInDetails: SignInDetails | undefined;
  firebaseAuthErrors = FirebaseAuthErrors;
  error: FirebaseAuthErrors = FirebaseAuthErrors.None;
  successMessage = SuccessMessage;
  message: SuccessMessage = SuccessMessage.None;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.verifyAuthentication();
  }

  async onSignInClicked(signInDetails: SignInDetails) {
    this.signInDetails = signInDetails;
    this.authenticationService
      .UserSignIn(signInDetails)
      .then(() => {
        return this.router.navigate([AppRoutePaths.Dashboard]);
      })
      .catch((error: FirebaseAuthErrors) => {
        this.error = error;
      });
  }

  onRegisterClicked() {
    this.router.navigateByUrl('/register');
  }

  onResetPasswordClicked(signInDetails: SignInDetails) {
    this.authenticationService
      .resetPassword(signInDetails)
      .then(() => {
        this.message = SuccessMessage.ResetPassword;
        return;
      })
      .catch((error: FirebaseAuthErrors) => {
        this.error = error;
      });
  }

  onErrorModalClose() {
    this.error = FirebaseAuthErrors.None;
  }

  onSuccessModalClose() {
    this.message = SuccessMessage.None;
  }

  private async verifyAuthentication(): Promise<void> {
    await this.authenticationService
      .isAuthenticated()
      .then((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/home');
          return;
        }
      });
  }
}
