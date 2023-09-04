import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationContent } from 'app/~global-interfaces/notification-content.interface';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss'],
})
export class UserNotificationsComponent {
  @Input() notificationContent = {} as NotificationContent;
  @Output() primaryBtnClicked = new EventEmitter<void>();
  @Output() secondaryBtnClicked = new EventEmitter<void>();

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  onPrimaryBtnClick() {
    this.primaryBtnClicked.emit();
  }
  onSecondaryBtnClick() {
    this.secondaryBtnClicked.emit();
  }
}
