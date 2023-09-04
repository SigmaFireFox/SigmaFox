import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Button,
  NotificationContent,
} from 'app/~global-interfaces/notification-content.interface';
import { AuthService } from '../../../services/authentication/auth.service';
import { ResetError } from './ResetErrors.enum';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.screen.html',
  styleUrls: ['./reset-password.screen.scss'],
})
export class ResetPasswordScreen {
  @Input() receivedUserEmail: string | undefined;
  @Output() signIn = new EventEmitter<boolean>();

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  currentError = ResetError.NONE;
  userNotification = {} as NotificationContent;
  showNotification = false;

  constructor(private authService: AuthService) {}

  get userEmail() {
    return this.signin.get('email')?.value;
  }

  ngOnInit() {
    if (this.receivedUserEmail) {
      this.signin.controls['email'].setValue(this.receivedUserEmail);
    }
  }

  // Button click callbacks -------------------
  onResetClick() {
    if (this.isEmailValid()) {
      this.authService.resetPassword(this.userEmail);
    }
  }

  onLoginClick() {
    this.signIn.emit(true);
  }

  // Returned emitters callbacks -------------------
  userNotificationPrimaryBtnClicked() {
    this.showNotification = false;
  }

  // Private functions -------------------
  private isEmailValid() {
    if (!this.userEmail) {
      this.currentError = ResetError.NO_EMAIL;
      this.notifyUser();
      return false;
    }
    if (this.signin.get('email')?.invalid) {
      this.currentError = ResetError.INVALID_EMAIL;
      this.notifyUser();
      return false;
    }
    return true;
  }

  private notifyUser() {
    switch (this.currentError) {
      case ResetError.NO_EMAIL: {
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
      case ResetError.INVALID_EMAIL: {
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
    }
  }
}
