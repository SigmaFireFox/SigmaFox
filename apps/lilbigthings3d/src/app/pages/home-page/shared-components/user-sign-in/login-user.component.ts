/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  SignInContext,
} from 'apps/lilbigthings3d/src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss'],
})
export class SigninUserComponent implements OnInit {
  @Output() user: EventEmitter<User> = new EventEmitter();

  signInForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  componentCopy = {
    title: 'Sign in',
    subTitle: 'Please provide your details to sign in',
  };

  constructor(
    private readonly authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('sign-in')) {
      this.componentCopy.title = 'User not logged in';
      this.componentCopy.subTitle =
        'Sorry you need to be logged before you can checkout this order';
    }
  }

  async onSignin() {
    const user = await this.authService.signInWithEmail(
      SignInContext.Checkout,
      this.signInForm.get('email')?.value || '',
      this.signInForm.get('password')?.value || ''
    );
    if (!user) return;
    this.user.emit(user);
  }

  onRegisterClick() {
    //TODO
  }
}
