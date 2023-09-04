import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Button,
  NotificationContent,
} from 'app/~global-interfaces/notification-content.interface';
import { AuthService } from '../../../services/authentication/auth.service';
import { SignInError } from './SignInErrors.enum';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  @Output() resetPassword = new EventEmitter<string>();
  @Output() signUp = new EventEmitter<boolean>();

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(3)]),
  });
  hide = true;
  userNotification = {} as NotificationContent;
  showNotification = false;
  currentError = SignInError.NONE;

  constructor(private authService: AuthService, private router: Router) {}

  get userEmail() {
    return this.signin.get('email')?.value;
  }

  get userPassword() {
    return this.signin.get('password')?.value;
  }

  // Button click callbacks -------------------
  onLogInClick() {
    if (this.isLoginValid()) {
      this.attemptLogin();
    }
  }

  onGoogleButtonClick() {
    this.authService.signInGoogle().then((result: void | { message: any }) => {
      if (result) {
        this.handleReceivedErrorOnLogin(
          (result as unknown as string).toString()
        );
      } else {
        this.router.navigateByUrl('dashboard');
      }
    });
  }

  onResetClick() {
    this.resetPassword.emit(this.userEmail);
  }

  onSignUpClick() {
    this.signUp.emit(true);
  }

  // Returned emitters callbacks -------------------
  userNotificationPrimaryBtnClicked() {
    switch (this.currentError) {
      case SignInError.TOO_MANY_ATTEMPTS: {
        this.showNotification = false;
        this.onResetClick();
        break;
      }
      default: {
        this.showNotification = false;
      }
    }
  }

  userNotificationSecondaryBtnClicked() {
    switch (this.currentError) {
      case SignInError.UNREGISTERED_EMAIL: {
        this.showNotification = false;
        this.onSignUpClick();
        break;
      }
      case SignInError.TOO_MANY_ATTEMPTS: {
        this.showNotification = false;
        break;
      }
    }
  }

  // Private functions -------------------
  private isLoginValid(): boolean {
    if (!this.userEmail) {
      this.currentError = SignInError.NO_EMAIL;
      this.notifyUser();
      return false;
    }
    if (this.signin.get('email')?.invalid) {
      this.currentError = SignInError.INVALID_EMAIL;
      this.notifyUser();
      return false;
    }
    if (!this.userPassword) {
      this.currentError = SignInError.NO_PASSWORD;
      this.notifyUser();
      return false;
    }
    return true;
  }

  private attemptLogin() {
    this.authService
      .signIn(this.userEmail, this.userPassword)
      .then((result: void | { message: any }) => {
        if (result) {
          this.handleReceivedErrorOnLogin(
            (result as unknown as string).toString()
          );
        } else {
          this.router.navigateByUrl('dashboard');
        }
      });
  }

  private handleReceivedErrorOnLogin(resultString: string) {
    if (resultString.includes('auth/user-not-found')) {
      this.currentError = SignInError.UNREGISTERED_EMAIL;
      this.notifyUser(this.userEmail);
    }
    if (resultString.includes('auth/wrong-password')) {
      this.currentError = SignInError.WRONG_PASSWORD;
      this.notifyUser(this.userEmail);
    }
    if (resultString.includes('auth/wrong-password')) {
      this.currentError = SignInError.TOO_MANY_ATTEMPTS;
      this.notifyUser(this.userEmail);
    }
    if (resultString.includes('auth/popup-blocked')) {
      this.currentError = SignInError.BLOCKED_POPUP;
      this.notifyUser(this.userEmail);
    }
    if (resultString.includes('auth/cancelled-popup-request')) {
      this.currentError = SignInError.BLOCKED_POPUP;
      this.notifyUser(this.userEmail);
    }
  }

  private notifyUser(email?: string) {
    switch (this.currentError) {
      case SignInError.NO_EMAIL: {
        this.userNotification = {
          header: 'Whoops!',
          bodyText:
            `Seems that you have forgotten to enter your email.` +
            '\n' +
            `Please enter your email before trying to log in`,
          primaryBtn: { title: 'Got it' } as Button,
          secondaryBtn: { title: '' } as Button,
        };
        this.showNotification = true;
        break;
      }
      case SignInError.NO_PASSWORD: {
        this.userNotification = {
          header: 'Bleg!',
          bodyText:
            `Seems that you have forgotten to enter your password.` +
            '\n' +
            `Please enter your password before trying to log in`,
          primaryBtn: { title: 'Got it' } as Button,
          secondaryBtn: { title: '' } as Button,
        };
        this.showNotification = true;
        break;
      }
      case SignInError.INVALID_EMAIL: {
        this.userNotification = {
          header: 'Darn!',
          bodyText:
            `The email you entered seems to be invalid.` +
            '\n' +
            `Please check your email - likely a silly error`,
          primaryBtn: { title: 'Got it' } as Button,
          secondaryBtn: { title: '' } as Button,
        };
        this.showNotification = true;
        break;
      }
      case SignInError.UNREGISTERED_EMAIL: {
        this.userNotification = {
          header: 'Hmmm...',
          bodyText:
            `Seems the email "` +
            email +
            `" is not registered with us.` +
            '\n' +
            `Either the email has been mis-typed OR you need to sign up`,
          primaryBtn: { title: 'Let me retry' } as Button,
          secondaryBtn: { title: 'Sign me up' } as Button,
        };
        this.showNotification = true;
        break;
      }
      case SignInError.WRONG_PASSWORD: {
        this.userNotification = {
          header: 'Doh!',
          bodyText:
            `The password you entered wasn't correct for the email you entered.` +
            '\n' +
            `Probably a silly typo, please try again (tip - click on the "eye" icon if you want to check the password you have entered)`,
          primaryBtn: { title: 'Let me retry' } as Button,
          secondaryBtn: { title: '' } as Button,
        };
        this.showNotification = true;
        break;
      }
      case SignInError.TOO_MANY_ATTEMPTS: {
        this.userNotification = {
          header: 'Houston, we got a problem',
          bodyText:
            `So you have made too many attepts to log in to this account with the wrong password.` +
            '\n' +
            `You could wait a while and try again later, but we recommend that you reset your password - quick and easy and you can log in now...`,
          primaryBtn: { title: `Let's reset` } as Button,
          secondaryBtn: { title: `I'll wait` } as Button,
        };
        this.showNotification = true;
        break;
      }
      case SignInError.BLOCKED_POPUP: {
        this.userNotification = {
          header: 'Err....',
          bodyText:
            `Something went wrong and we are not 100% what.` +
            '\n' +
            `We think that your browser blocked the pop up - it some times happens when you click the button more then once?` +
            '\n' +
            `The only thing we can recommend if you try again - This time be sure to click only once`,
          primaryBtn: { title: `Okay, let's retry` } as Button,
          secondaryBtn: { title: `` } as Button,
        };
        this.showNotification = true;
        break;
      }
    }
  }
}
