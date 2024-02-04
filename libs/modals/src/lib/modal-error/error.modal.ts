import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule, ButtonStyleClass } from 'libs/components/buttons/src';
import { StandardButtonConfig } from 'libs/components/buttons/src/lib/standard-button/models/interfaces';

export enum ButtonID {
  Close = 'close',
}

export enum FirebaseAuthError {
  None = `none`,
  UserNotFound = `auth/user-not-found`,
  WrongPassword = 'auth/wrong-password',
  EmailInUse = 'auth/email-already-in-use',
  NetworkRequestFailed = 'auth/network-request-failed',
}

@Component({
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, ButtonsModule],
  selector: 'sigmafox-modal-error',
  templateUrl: './error.modal.html',
  styleUrls: ['./error.modal.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ErrorModal {
  @Input() error: FirebaseAuthError = FirebaseAuthError.None;

  @Output() closed = new EventEmitter<void>();

  header = 'Error';
  errorDescription: string[] = [];
  buttons: StandardButtonConfig[] = [
    {
      buttonID: ButtonID.Close,
      buttonTextContent: 'Close',
      buttonStyleClass: ButtonStyleClass.WarningPrimary,
      isDisabled: false,
    },
  ];

  ngOnInit() {
    this.setModalContentFromError();
  }

  onButtonClicked(buttonID: string) {
    // Keep as switch to allow for possible updates for more buttons to be added in future
    switch (buttonID) {
      case ButtonID.Close: {
        this.closed.emit();
      }
    }
  }

  setModalContentFromError() {
    switch (this.error) {
      case FirebaseAuthError.None: {
        console.log(
          'ErrorModal',
          'FirebaseAuthErrors.None passed as error - this should error modal \
          should not render for this error'
        );
        break;
      }
      case FirebaseAuthError.UserNotFound: {
        this.header = 'User Not Found';
        this.errorDescription = [
          'The email provided does not seem to appear on our user database. \
          Please review and correct if needed',
          'If the the email provide is in fact correct, then it is likely \
          your email has not been registered correctly. In this case, please \
          click on the "Register" button to naviagate to registration form',
        ];
        break;
      }
      case FirebaseAuthError.WrongPassword: {
        this.header = 'Wrong Password';
        this.errorDescription = [
          'The password provided does not match the password associated to \
          this email on our user database. Please review and correct.',
          'If you are unable to remember your password, please click on the \
          "Register" button to have a reset link sent to your email address',
          ' ',
          'Hint: You can view your password by clicking the toggle password \
          "eye" icon',
        ];
        break;
      }
      case FirebaseAuthError.EmailInUse: {
        this.header = 'Email already registered';
        this.errorDescription = [
          'It seems the email provide has already been registered with us. If \
          the email provided is correct, please click on the "Sign In" button \
          to naviagte to our sign in form',
          'If you have forgotten your password, the sign in for itself with have \
          options to have your email reset',
        ];
        break;
      }
      case FirebaseAuthError.NetworkRequestFailed: {
        this.header = 'Network request failed';
        this.errorDescription = [
          'It seems that the network request has failed, The fail could be on our \
          network or yours.',
          'Please check your internet and perhaps try again. If this problem \
          continues to persist - then it is likely the issue is on our network, in \
          which case we ask you try this again a bit later while we sort out this \
          issue in the interim',
        ];
        break;
      }
      default: {
        this.header = 'Unspecified Error';
        this.errorDescription = [
          'The attempt to submit this form has returned an error. Unfortunately \
          we are unable to provide more details for this error. We advice that \
          you please retry.',
          'If there error continues to persist, please attempt this action in a \
          few minutes',
        ];
      }
    }
  }
}
