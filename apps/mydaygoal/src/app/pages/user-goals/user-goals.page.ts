/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, HostListener, OnInit } from '@angular/core';
import { isEqual } from 'lodash';
import { Observable } from 'rxjs';
import { AuthServiceResponse } from '../../services/authentication.service';
import { DatesService } from '../../services/dates.service';
import { DailyGoal, GoalsService } from '../../services/goals.service';
import {
  AppUserProfile,
  Goal,
  UserProfileService,
} from '../../services/user-profile.service';

@Component({
  selector: 'app-user-goals-page',
  templateUrl: './user-goals.page.html',
  styleUrls: ['./user-goals.page.scss'],
})
export class UserGoalsPage implements OnInit {
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.isUserGoalsChanged();
  }

  user = {} as AuthServiceResponse;
  userProfile = {} as AppUserProfile;
  userNameFound = false;
  currentUserGoals = [] as Goal[];
  orginalUserGoals = [] as Goal[];
  displayUserProfileUpdate = false;
  displaySaveButton = false;
  initialistionComplete = false;
  allDailyGoalObjects = {} as { [key: string]: DailyGoal };
  today = '';

  constructor(
    private userProfileService: UserProfileService,
    private goalsService: GoalsService,
    private date: DatesService
  ) {}

  ngOnInit() {
    this.initialiseSubscriptions();
  }

  // Functions related to user actions on page
  onGoalCheckboxChecked() {
    this.isUserGoalsChanged()
      ? (this.displaySaveButton = true)
      : (this.displaySaveButton = false);
  }

  onSaveChangesClicked() {
    this.userProfile.goals.dailyGoals[this.today] = this.currentUserGoals;
    this.setOrginalUserGoals();
    this.userProfileService.updateUserProfile();
    this.displaySaveButton = false;
  }

  // Functions related to user actions on embedded components
  updateUserProfile() {
    this.displayUserProfileUpdate = true;
  }

  onUpdateCanceled() {
    this.displayUserProfileUpdate = false;
  }

  onUpdateComplete() {
    this.setUserProfile();
    this.displayUserProfileUpdate = false;
  }

  // Private functions related to the initialisation of set up of the user profile page
  private initialiseSubscriptions() {
    this.userProfileService.currentUserProfile$.subscribe((userProfile) => {
      this.userProfile = userProfile;
      Object.keys(this.userProfile).length !== 0 ? this.initialisePage() : null;
    });
  }

  private async initialisePage() {
    this.initialistionComplete = false;
    this.today = this.date.getTodaysDateAsString();
    this.setUserProfile();
    this.getUsersGoals();
    this.initialistionComplete = true;
  }

  private async setUserProfile() {
    !this.userProfile.basicDetail.firstName
      ? (this.userProfile.basicDetail.firstName = 'There')
      : null;
  }

  private async getUsersGoals() {
    this.allDailyGoalObjects = await this.goalsService.getDailyGoalsObject();
    this.currentUserGoals = [];
    const unsortedGoals = this.userProfile.goals.dailyGoals[this.today];
    unsortedGoals.forEach((value) => {
      value.repeat ? this.currentUserGoals.push(value) : null;
    });
    unsortedGoals.forEach((value) => {
      !value.repeat ? this.currentUserGoals.push(value) : null;
    });
    this.setOrginalUserGoals();
  }

  private setOrginalUserGoals() {
    this.orginalUserGoals = [];
    this.currentUserGoals.forEach((goal) => {
      this.orginalUserGoals.push(JSON.parse(JSON.stringify(goal)));
    });
  }

  // Private functions to determine save status
  private isUserGoalsChanged(): boolean {
    return !isEqual(this.orginalUserGoals, this.currentUserGoals);
  }
}
