/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageConfig } from '../../interfaces/common-page-configs.interface';
import { AuthenticationService } from '../../services/authentication/authentication.service';

export interface SignInDetails {
  email: string;
  password: string;
}

/* eslint-disable @angular-eslint/component-selector */
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  generalConfig = { header: 'e-Questrian', subHeader: '' } as PageConfig;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.verifyAuthentication();
  }

  async signin(signInDetails: SignInDetails) {
    this.authenticationService.UserSignIn(signInDetails).then(() => {
      this.verifyAuthentication();
    });
  }

  register(signInDetails: SignInDetails) {
    this.authenticationService.UserRegistration(signInDetails);
  }

  async verifyAuthentication(): Promise<void> {
    await this.authenticationService
      .isAuthenticated()
      .then((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigateByUrl('home');
          return;
        }
      });
  }
}
