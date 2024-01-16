/* eslint-disable @angular-eslint/component-class-suffix */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageConfig } from '../../interfaces/common-page-configs.interface';
import { AuthenticationService } from '../../services/authentication/authentication.service';

export interface RegisterDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/* eslint-disable @angular-eslint/component-selector */
@Component({
  selector: 'register-in',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  generalConfig = { header: 'e-Questrian', subHeader: '' } as PageConfig;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  register(registerDetails: RegisterDetails) {
    this.authenticationService.UserRegistration(registerDetails);
  }
}
