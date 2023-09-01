import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum NotificationType {
  REGISTER,
  FORGOT_PASSWORD,
  LEAD,
  CHANGE_PASSWORD,
  PROFILE_UPDATED,
  REQUIRES_AGENT_PASSWORD,
}

export enum Notification {
  RESET_PASSWORD_EMAIL_SENT,
  LEAD_ADDED,
  LEAD_EDITED,
  REGISTRATION_COMPLETE,
  PERSONAL_PASSWORD_CHANGED,
  AGENT_PASSWORD_CHANGED,
  PROFILE_UPDATED,
  REQUIRES_AGENT_PASSWORD,
}

export interface NotificationConfig {
  type: NotificationType;
  notification: Notification;
}

@Component({
  selector: 'app-notifications-modal',
  templateUrl: './notifications.modal.html',
  styleUrls: ['./notifications.modal.scss'],
})
export class NotificationsModal implements OnInit {
  @Input() notificationConfig: NotificationConfig | undefined;
  @Output() proceed: EventEmitter<void> = new EventEmitter();

  header = '';
  body = '';
  proceedButtonText = '';

  ngOnInit(): void {
    this.setHeader();
    this.setBody();
    this.setButtons();
  }

  onConfirmClick() {
    this.proceed.emit();
  }

  private setHeader() {
    switch (this.notificationConfig?.type) {
      case NotificationType.FORGOT_PASSWORD: {
        this.header = 'Password reset email sent';
        return;
      }
      case NotificationType.LEAD: {
        switch (this.notificationConfig?.notification) {
          case Notification.LEAD_ADDED: {
            this.header = 'Lead added';
            return;
          }
          case Notification.LEAD_EDITED: {
            this.header = 'Lead edited';
            return;
          }
        }
        return;
      }
      case NotificationType.REGISTER: {
        this.header = 'Registration complete';
        return;
      }
      case NotificationType.CHANGE_PASSWORD: {
        this.header = 'Password updated';
        return;
      }
      case NotificationType.PROFILE_UPDATED: {
        this.header = 'Profile updated';
        return;
      }
      case NotificationType.REQUIRES_AGENT_PASSWORD: {
        this.header = 'Agent password requird';
        return;
      }
    }
  }

  private setBody() {
    switch (this.notificationConfig?.notification) {
      case Notification.RESET_PASSWORD_EMAIL_SENT: {
        this.body =
          'An email has been sent to the email provided, \
          please check that email for the link to have your \
          email reset';
        return;
      }
      case Notification.LEAD_ADDED:
      case Notification.LEAD_EDITED: {
        this.body = '';
        return;
      }
      case Notification.REGISTRATION_COMPLETE: {
        this.body =
          'Your account has been registered. Remember \
          if you need to change any of the details you \
          have provided here, you can do so in your profile \
          on the Settings page';
        return;
      }
      case Notification.PERSONAL_PASSWORD_CHANGED: {
        this.body = 'Your password have been successfully updated';
        return;
      }
      case Notification.AGENT_PASSWORD_CHANGED: {
        this.body = 'Your agent default have been successfully updated';
        return;
      }
      case Notification.PROFILE_UPDATED: {
        this.body = 'Your profile have been successfully updated';
        return;
      }
      case Notification.REQUIRES_AGENT_PASSWORD: {
        this.body =
          'Before we can add your first agent, \
          we notived that you have not set up your agent default \
          password. You will need to do this before you can add an agent';
        return;
      }
    }
  }

  private setButtons() {
    switch (this.notificationConfig?.type) {
      case NotificationType.FORGOT_PASSWORD:
      case NotificationType.LEAD:
      case NotificationType.REGISTER:
      case NotificationType.CHANGE_PASSWORD:
      case NotificationType.PROFILE_UPDATED: {
        this.proceedButtonText = 'Understood';
        return;
      }
      case NotificationType.REQUIRES_AGENT_PASSWORD: {
        this.proceedButtonText = 'To agent password set up';
        return;
      }
    }
  }
}
