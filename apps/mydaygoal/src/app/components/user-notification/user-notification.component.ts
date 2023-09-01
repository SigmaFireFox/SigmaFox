import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface UserNotification {
  heading: string;
  infoPara: string;
  buttons: string[];
}

export enum NotificationType {
  DAY_GOAL_ADDED,
  DAILY_GOAL_LIMIT_REACHED,
  REPEAT_GOAL_ADDED,
  REPEAT_GOAL_LIMIT_REACHED,
  SIGNOUT_ATTEMPT,
}

@Component({
  selector: 'app-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.scss'],
})
export class UserNotificationComponent implements OnInit {
  @Input() notificationType: NotificationType | undefined;

  @Output() buttonClicked = new EventEmitter<number>();

  notificationConfig = {} as UserNotification;

  ngOnInit() {
    this.setNotification();
  }

  setNotification() {
    switch (this.notificationType) {
      case NotificationType.DAY_GOAL_ADDED: {
        this.notificationConfig = {
          heading: 'Daily Goal Added',
          infoPara:
            'Congrats your daily goal has been added to your profile' +
            '\n\n' +
            'What you like to do next?',
          buttons: ['Check out my goals', 'Find another goal'],
        };
        return;
      }
      case NotificationType.DAILY_GOAL_LIMIT_REACHED: {
        this.notificationConfig = {
          heading: 'Daily Goal Limit Reached',
          infoPara:
            'It seems that your daily goal limit has been reached for the plan that you are on' +
            '\n\n' +
            'What you like to do next?',
          buttons: [
            'Upgrade my plan',
            'Check out my goals',
            'Cancel adding this goal',
          ],
        };
        return;
      }
      case NotificationType.REPEAT_GOAL_ADDED: {
        this.notificationConfig = {
          heading: 'Repeat Goal Added',
          infoPara:
            'Congrats your repeat goal has been added to your profile' +
            '\n\n' +
            'What you like to do next?',
          buttons: ['Check out my goals', 'Find another goal'],
        };
        return;
      }
      case NotificationType.REPEAT_GOAL_LIMIT_REACHED: {
        this.notificationConfig = {
          heading: 'Repeat Goal Limit Reached',
          infoPara:
            'It seems that your repeat goal limit has been reached for the plan that you are on' +
            '\n\n' +
            'What you like to do next?',
          buttons: [
            'Upgrade my plan',
            'Check out my goals',
            'Cancel adding this goal',
          ],
        };
        return;
      }
      case NotificationType.SIGNOUT_ATTEMPT: {
        this.notificationConfig = {
          heading: 'Are you sure you would like to sign out?',
          infoPara: '',
          buttons: ['No - Cancel Signout', 'Yes - Sign out'],
        };
      }
    }
  }

  onButtonClicked(buttonClicked: number) {
    this.buttonClicked.emit(buttonClicked);
  }
}
