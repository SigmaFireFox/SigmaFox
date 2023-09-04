import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Button,
  NotificationContent,
} from '../../../~global-interfaces/notification-content.interface';
import { AuthService } from '../../../services/authentication/auth.service';
import { SignUpError } from './SignUpErrors.enum';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  @Output() signIn = new EventEmitter<boolean>();
  @Output() resetPassword = new EventEmitter<string>();

  signup: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
  });
  hide = true;
  userNotification = {} as NotificationContent;
  showNotification = false;
  currentError = SignUpError.NONE;

  get userFirstName() {
    return this.signup.get('firstName')?.value;
  }

  get userLastName() {
    return this.signup.get('lastName')?.value;
  }

  get userEmail() {
    return this.signup.get('email')?.value;
  }

  get userPassword() {
    return this.signup.get('password')?.value;
  }

  constructor(private authService: AuthService, private router: Router) {}

  // Button click callbacks -------------------
  onSignUpClick() {
    if (this.isSignUpValid()) {
      this.attemptSignUp();
    }
  }

  onGoogleSignUpClick() {
    this.authService.signInGoogle();
  }

  onLoginClick() {
    this.signIn.emit(true);
  }

  // Returned emitters callbacks -------------------
  userNotificationPrimaryBtnClicked() {
    switch (this.currentError) {
      case SignUpError.DUPLICATE_EMAIL: {
        this.resetPassword.emit(this.userEmail);
        this.showNotification = false;
        break;
      }
      default: {
        this.showNotification = false;
      }
    }
  }

  userNotificationSecondaryBtnClicked() {
    switch (this.currentError) {
      case SignUpError.DUPLICATE_EMAIL: {
        this.showNotification = false;
        this.onLoginClick();
        break;
      }
    }
  }

  // Private functions -------------------
  private isSignUpValid(): boolean {
    if (!this.userFirstName) {
      this.currentError = SignUpError.NO_FIRST_NAME;
      this.notifyUser();
      return false;
    }
    if (!this.userLastName) {
      this.currentError = SignUpError.NO_LAST_NAME;
      this.notifyUser();
      return false;
    }
    if (!this.userEmail) {
      this.currentError = SignUpError.NO_EMAIL;
      this.notifyUser();
      return false;
    }
    if (this.signup.get('email')?.invalid) {
      this.currentError = SignUpError.INVALID_EMAIL;
      this.notifyUser();
      return false;
    }
    if (!this.userPassword) {
      this.currentError = SignUpError.NO_PASSWORD;
      this.notifyUser();
      return false;
    }
    return true;
  }

  private async attemptSignUp() {
    await this.authService
      .signUp(
        this.userFirstName,
        this.userLastName,
        this.userEmail,
        this.userPassword
      )
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
    if (resultString.includes('auth/email-already-in-use')) {
      this.currentError = SignUpError.DUPLICATE_EMAIL;
      this.notifyUser(this.userEmail);
    }
    if (resultString.includes('auth/weak-password')) {
      this.currentError = SignUpError.WEAK_PASSWORD;
      this.notifyUser(this.userEmail);
    }
  }

  private notifyUser(email?: string) {
    switch (this.currentError) {
      case SignUpError.NO_FIRST_NAME: {
        this.userNotification = {
          header: 'Whoops!',
          bodyText:
            `Seems that you have forgotten to enter your first name.` +
            '\n' +
            `Please enter your first name before trying to sign up`,
          primaryBtn: { title: 'Got it' } as Button,
          secondaryBtn: { title: '' } as Button,
        };
        this.showNotification = true;
        break;
      }
      case SignUpError.NO_LAST_NAME: {
        this.userNotification = {
          header: 'Whoops!',
          bodyText:
            `Seems that you have forgotten to enter your last name.` +
            '\n' +
            `Please enter your last name before trying to sign up`,
          primaryBtn: { title: 'Got it' } as Button,
          secondaryBtn: { title: '' } as Button,
        };
        this.showNotification = true;
        break;
      }
      case SignUpError.NO_EMAIL: {
        this.userNotification = {
          header: 'Whoops!',
          bodyText:
            `Seems that you have forgotten to enter your email.` +
            '\n' +
            `Please enter your email before trying to sign up`,
          primaryBtn: { title: 'Got it' } as Button,
          secondaryBtn: { title: '' } as Button,
        };
        this.showNotification = true;
        break;
      }
      case SignUpError.NO_PASSWORD: {
        this.userNotification = {
          header: 'Bleg!',
          bodyText:
            `Seems that you have forgotten to enter your password.` +
            '\n' +
            `Please enter your password before trying to sign up`,
          primaryBtn: { title: 'Got it' } as Button,
          secondaryBtn: { title: '' } as Button,
        };
        this.showNotification = true;
        break;
      }
      case SignUpError.INVALID_EMAIL: {
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
      case SignUpError.DUPLICATE_EMAIL: {
        this.userNotification = {
          header: 'Hmmm...',
          bodyText:
            `Seems the email "` +
            email +
            `" is already registered with us.` +
            '\n' +
            `Either if you have forgotten your password, consider reseting it, else you should go to sign in rather?`,
          primaryBtn: { title: 'Reset' } as Button,
          secondaryBtn: { title: 'Sign in' } as Button,
        };
        this.showNotification = true;
        break;
      }
      case SignUpError.WEAK_PASSWORD: {
        this.userNotification = {
          header: 'Errr',
          bodyText:
            `The password you entered seems a little weak.` +
            '\n' +
            `Passwords need to be a mininum of 6 characters`,
          primaryBtn: { title: 'Got it' } as Button,
          secondaryBtn: { title: '' } as Button,
        };
        this.showNotification = true;
        break;
      }
    }
  }
}
