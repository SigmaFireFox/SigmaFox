import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule, ButtonStyleClass } from 'libs/components/buttons/src';
import { StandardButtonConfig } from 'libs/components/buttons/src/lib/standard-button/models/interfaces';

export enum ButtonID {
  Close = 'close',
}

export enum SuccessMessage {
  None = `none`,
  ResetPassword = `resetPassword`,
}

@Component({
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, ButtonsModule],
  selector: 'sigmafox-modal-success',
  templateUrl: './success.modal.html',
  styleUrls: ['./success.modal.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class SuccessModal {
  @Input() message: SuccessMessage = SuccessMessage.None;

  @Output() closed = new EventEmitter<void>();

  header = 'Success';
  successDescription: string[] = [];
  buttons: StandardButtonConfig[] = [
    {
      buttonID: ButtonID.Close,
      buttonTextContent: 'Close',
      buttonStyleClass: ButtonStyleClass.SuccessPrimary,
      isDisabled: false,
    },
  ];

  ngOnInit() {
    this.setModalContentFromMessage();
  }

  onButtonClicked(buttonID: string) {
    // Keep as switch to allow for possible updates for more buttons to be added in future
    switch (buttonID) {
      case ButtonID.Close: {
        this.closed.emit();
      }
    }
  }

  setModalContentFromMessage() {
    switch (this.message) {
      case SuccessMessage.None: {
        console.log(
          'SuccessModal',
          'SuccessMessage.None passed as message - this success modal \
          should not render for this message'
        );
        break;
      }
      case SuccessMessage.ResetPassword: {
        this.header = 'Reset password email sent';
        this.successDescription = [
          'We have identified your email and have send a reset password email. \
          Please give it a moment - the email should land in your inbox shortly. ',
          'When it does, just click on the link within to begin the simple reset \
          process',
        ];
        break;
      }
      default: {
        this.header = 'Unspecified Success';
        this.successDescription = [
          'We are not sure what you did - but you did it well.',
          'Congrats?',
        ];
      }
    }
  }
}
