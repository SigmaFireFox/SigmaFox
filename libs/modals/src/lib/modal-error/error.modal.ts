import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule, ButtonStyleClass } from '@sigmafox/buttons';
import { StandardButtonConfig } from 'libs/buttons/src/lib/standard-button/models/interfaces';

export enum ButtonID {
  Close = 'close',
}

export enum FirebaseAuthError {
  None = `none`,
  UserNotFound = `auth/user-not-found`,
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
          'FirebaseAuthErrors.None passed as error - this should error modal should not render for this error'
        );
        break;
      }
      case FirebaseAuthError.UserNotFound: {
        this.header = 'User not found';
        this.errorDescription = [
          'The email provided does not seem to appear on our user database. \
          Please review and correct if needed',
          'If the the email provide is in fact correct, then it is likely \
          your email has not been registered correctly. In this case, please \
          click on the "Register" button to naviagate to registration form',
        ];
      }
    }
  }
}
