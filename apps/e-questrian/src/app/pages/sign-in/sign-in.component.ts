/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageConfig } from '../../interfaces/common-page-configs.interface';
import { SignInDetails } from '../../modals/sign-in/sign-in.modal';
import { AuthenticationService } from '../../services/authentication/authentication.service';

/* eslint-disable @angular-eslint/component-selector */
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
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
    this.authenticationService.UserSignIn(signInDetails).then((user) => {
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
