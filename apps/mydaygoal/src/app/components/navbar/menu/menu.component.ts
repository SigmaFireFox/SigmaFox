/* eslint-disable @angular-eslint/component-selector */
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthServiceResponse,
  AuthenticationService,
} from '../../../services/authentication.service';

import { NotificationType } from '../../user-notification/user-notification.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() closeMenu = new EventEmitter<void>();
  @Output() userSignedOut = new EventEmitter<void>();

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobileDisplay();
  }

  user = {} as AuthServiceResponse;
  userSignedIn = false;
  displaySignIn = false;
  mobileDisplay = false;
  displayNotification = false;
  notificationType: NotificationType | undefined;
  menuStyle = {};
  displayNewGoalSuggestion = false;

  constructor(
    private authService: AuthenticationService,
    private route: Router
  ) {}

  async ngOnInit() {
    await this.isUserSignedIn();
    this.isMobileDisplay();
  }

  onSignOutClick() {
    this.displayNotification = true;
    this.notificationType = NotificationType.SIGNOUT_ATTEMPT;
  }

  onSignInClick() {
    this.displaySignIn = true;
  }

  onSignInClosed() {
    this.displaySignIn = false;
    this.closeMenu.emit();
  }

  onMyProfileClick() {
    this.route.navigateByUrl('/user-profile');
    this.closeMenu.emit();
  }

  onMyGoalsClick() {
    this.route.navigateByUrl('/user-goals');
    this.closeMenu.emit();
  }

  onNewGoalSuggestionClick() {
    this.displayNewGoalSuggestion = true;
  }

  onNewGoalSuggestionClosed() {
    this.displayNewGoalSuggestion = false;
    this.closeMenu.emit();
  }

  async onNotificationButtonClicked(buttonClicked: number) {
    this.displayNotification = false;
    switch (this.notificationType) {
      case NotificationType.SIGNOUT_ATTEMPT: {
        switch (buttonClicked) {
          case 0: {
            this.closeMenu.emit();
            return;
          }
          case 1: {
            await this.authService.signOutUser();
            this.userSignedOut.emit();
            this.closeMenu.emit();
          }
        }
      }
    }
  }

  async isUserSignedIn() {
    this.user = await this.authService.getSignedInUser();
    this.userSignedIn = this.user.success;
  }

  private isMobileDisplay() {
    window.innerWidth < 420
      ? (this.mobileDisplay = true)
      : (this.mobileDisplay = false);
    this.setStyle();
  }

  setStyle() {
    this.mobileDisplay
      ? (this.menuStyle = { width: '100%' })
      : (this.menuStyle = { width: 'auto' });
  }
}
