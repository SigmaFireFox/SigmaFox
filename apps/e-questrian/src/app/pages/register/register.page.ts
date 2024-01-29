/* eslint-disable @angular-eslint/component-class-suffix */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthErrors, RegisterDetails } from '@sigmafox/modals';
import { PageConfig } from '../../interfaces/common-page-configs.interface';
import { AuthenticationService } from '../../services/authentication/authentication.service';

/* eslint-disable @angular-eslint/component-selector */
@Component({
  selector: 'register-in',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  generalConfig = { header: 'e-Questrian', subHeader: '' } as PageConfig;
  firebaseAuthErrors = FirebaseAuthErrors;
  error: FirebaseAuthErrors = FirebaseAuthErrors.None;
  registerDetails: RegisterDetails | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  register(registerDetails: RegisterDetails) {
    this.registerDetails = registerDetails;
    this.authenticationService
      .UserRegistration(registerDetails)
      .then(() => {
        return this.router.navigateByUrl('/home');
      })
      .catch((error: FirebaseAuthErrors) => {
        this.error = error;
      });
  }

  onSignInClicked() {
    this.router.navigateByUrl('/signin');
  }

  onErrorModalClose() {
    this.error = FirebaseAuthErrors.None;
  }
}
