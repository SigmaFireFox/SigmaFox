import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum WarningType {
  SIGN_IN,
  REGISTER,
  LEADS,
  FORGOT_PASSWORD,
  PASSWORD_CHANGE,
  GENERAL,
}

export enum Warning {
  INVALID_EMAIL,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
  EMAIL_ALREADY_EXISTS,
  WEAK_PASSWORD,
  MISMATCHED_PASSWORD,
  UNABLE_TO_ADD,
  UNABLE_TO_EDIT,
  GENERAL,
}

export interface WarningConfig {
  type: WarningType;
  warning: Warning;
}

@Component({
  selector: 'app-warnings-modal',
  templateUrl: './warnings.modal.html',
  styleUrls: ['./warnings.modal.scss'],
})
export class WarningsModal implements OnInit {
  @Input() warningConfig: WarningConfig | undefined;
  @Output() proceed: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  header = '';
  body = '';
  proceedButtonText = '';
  cancelButtonText = '';

  ngOnInit(): void {
    this.setHeader();
    this.setBody();
    this.setButtons();
  }

  onConfirmClick() {
    this.proceed.emit();
  }

  onCancelClick() {
    this.cancel.emit();
  }

  private setHeader() {
    switch (this.warningConfig?.type) {
      case WarningType.SIGN_IN: {
        this.header = 'Unable to sign in';
        return;
      }
      case WarningType.REGISTER: {
        this.header = 'Unable to register user';
        return;
      }
      case WarningType.PASSWORD_CHANGE: {
        this.header = 'Unable to change password';
        return;
      }
      case WarningType.LEADS: {
        switch (this.warningConfig?.warning) {
          case Warning.UNABLE_TO_ADD: {
            this.header = 'Unable to add lead';
            return;
          }
          case Warning.UNABLE_TO_EDIT: {
            this.header = 'Unable to edit lead';
            return;
          }
        }
        break;
      }
      case WarningType.FORGOT_PASSWORD: {
        this.header = 'Unable to send';
        return;
      }
      case WarningType.GENERAL: {
        this.header = 'Something went wrong';
        return;
      }
    }
  }

  private setBody() {
    switch (this.warningConfig?.warning) {
      case Warning.EMAIL_ALREADY_EXISTS: {
        this.body =
          'It seems your email is already in our system, \
        please return to the sign in page and sign in. If you have \
        forgotten your password, please select the "Forgot Password" \
        option below';
        return;
      }
      case Warning.INVALID_EMAIL: {
        this.body =
          'The email you have entered does not appear to be \
        valid, please enter your email address';
        return;
      }
      case Warning.USER_NOT_FOUND: {
        this.body =
          'It seems the email you have entered does not exist \
        on our system, please re-check the email you have entered. If \
        you are a new user, please click on the register option below \
        to register for a new account';
        return;
      }
      case Warning.WRONG_PASSWORD: {
        this.body =
          'The password you have entered is incorrect, please \
        re-try';
        return;
      }
      case Warning.WEAK_PASSWORD: {
        this.body =
          'The password you have entered is considered week, please enter \
          a stronger password at least 6 charaters log';
        return;
      }
      case Warning.MISMATCHED_PASSWORD: {
        this.body =
          'The passwords you have entered do not match each other. Please correct and retry';
        return;
      }
      case Warning.UNABLE_TO_ADD: {
        switch (this.warningConfig?.type) {
          case WarningType.LEADS: {
            this.body =
              'We were unable to add your lead at this time. Please retry';
            return;
          }
        }
        return;
      }
      case Warning.UNABLE_TO_EDIT: {
        switch (this.warningConfig?.type) {
          case WarningType.LEADS: {
            this.body =
              'We were unable to edit your lead at this time. Please retry';
            return;
          }
        }
        return;
      }
      case Warning.GENERAL: {
        this.body =
          'Something went wrong, we are unsure what it is, but it has been logged, please try again';
        return;
      }
    }
  }

  private setButtons() {
    switch (this.warningConfig?.type) {
      case WarningType.GENERAL:
      case WarningType.REGISTER:
      case WarningType.SIGN_IN:
      case WarningType.FORGOT_PASSWORD: {
        this.proceedButtonText = 'Understood';
        this.cancelButtonText = '';
        return;
      }
    }
  }
}
