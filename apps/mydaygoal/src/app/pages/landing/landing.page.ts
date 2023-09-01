/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from '../../components/user-notification/user-notification.component';
import {
  AuthServiceResponse,
  AuthenticationService,
} from '../../services/authentication.service';
import { GoalsService } from '../../services/goals.service';
import {
  AppUserProfile,
  UserProfileService,
} from '../../services/user-profile.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  // Variables related to page config
  signedInUser = {} as AuthServiceResponse;
  userProfile = {} as AppUserProfile;
  avaliableGoalsReady = false;
  randomGoal = { id: '', string: 'One moment please...' };
  // Variables config of embedded components
  displaySignIn = false;
  displayNotification = false;
  displayUpgrade = false;
  notificationType: NotificationType | undefined;

  constructor(
    private goalsService: GoalsService,
    private authService: AuthenticationService,
    private userProfileService: UserProfileService,
    private route: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.initialiseSubscriptions();
  }

  // Function related to user actions on this landing page
  onAddGoalClicked(isRepeat: boolean) {
    this.signedInUser.success
      ? this.addGoalToUserProfile(isRepeat)
      : (this.displaySignIn = true);
    this.getRandomGoal();
  }

  onSuggestNewGoalClicked() {
    this.getRandomGoal();
  }

  // Function related to user actions on embedded components
  onNotificationButtonClicked(buttonClicked: number) {
    this.displayNotification = false;
    switch (this.notificationType) {
      case NotificationType.DAY_GOAL_ADDED:
      case NotificationType.REPEAT_GOAL_ADDED: {
        switch (buttonClicked) {
          case 0: {
            this.route.navigateByUrl('/user-goals');
            return;
          }
        }
        return;
      }
      case NotificationType.DAILY_GOAL_LIMIT_REACHED:
      case NotificationType.REPEAT_GOAL_LIMIT_REACHED: {
        switch (buttonClicked) {
          case 0: {
            this.displayUpgrade = true;
            return;
          }
          case 1: {
            this.route.navigateByUrl('/user-goals');
            return;
          }
        }
        return;
      }
    }
  }

  onUpgradeClose() {
    this.displayUpgrade = false;
  }

  onSigninClose() {
    this.displaySignIn = false;
  }

  // Private functions related to setting up the landing page
  private initialiseSubscriptions() {
    this.authService.user$.subscribe((user) => {
      this.signedInUser = user;
    });
    this.userProfileService.currentUserProfile$.subscribe((userProfile) => {
      this.userProfile = userProfile;
    });
    this.goalsService.avaliableGoalsReady$.subscribe((avaliableGoalsReady) => {
      this.avaliableGoalsReady = avaliableGoalsReady;
      this.avaliableGoalsReady ? this.getRandomGoal() : null;
    });
  }

  private getRandomGoal() {
    this.avaliableGoalsReady
      ? (this.randomGoal = this.goalsService.getRandomGoal())
      : null;
  }

  // Private functions related to user actions on page
  private addGoalToUserProfile(isRepeat: boolean) {
    const limitReached = isRepeat
      ? this.userProfileService.userReachedRepeatGoalLimit()
      : this.userProfileService.userReachedDayGoalLimit();
    if (limitReached) {
      isRepeat
        ? this.notifyUser(NotificationType.REPEAT_GOAL_LIMIT_REACHED)
        : this.notifyUser(NotificationType.DAILY_GOAL_LIMIT_REACHED);
    } else {
      this.userProfileService.addGoalToUserProfile(
        this.randomGoal.id,
        isRepeat
      );
      // TODO: Need to provide reponse where DB write fails
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.goalsService.recordGoalSelection(this.randomGoal.id!);
      isRepeat
        ? this.notifyUser(NotificationType.REPEAT_GOAL_ADDED)
        : this.notifyUser(NotificationType.DAY_GOAL_ADDED);
    }
  }

  private notifyUser(notificationType: NotificationType) {
    this.displayNotification = true;
    this.notificationType = notificationType;
  }
}
