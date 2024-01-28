/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthErrors, SignInDetails } from '@sigmafox/modals';
import { PageConfig } from '../../interfaces/common-page-configs.interface';
import { AuthenticationService } from '../../services/authentication/authentication.service';

/* eslint-disable @angular-eslint/component-selector */
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  generalConfig = { header: 'e-Questrian', subHeader: '' } as PageConfig;
  firebaseAuthErrors = FirebaseAuthErrors;
  error: FirebaseAuthErrors = FirebaseAuthErrors.None;
  signInDetails: SignInDetails | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.verifyAuthentication();
  }

  async signin(signInDetails: SignInDetails) {
    this.signInDetails = signInDetails;
    this.authenticationService
      .UserSignIn(signInDetails)
      .then(() => {
        return this.router.navigateByUrl('/home');
      })
      .catch((error: FirebaseAuthErrors) => {
        this.error = error;
      });
  }

  onErrorModalClose() {
    this.error = FirebaseAuthErrors.None;
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
