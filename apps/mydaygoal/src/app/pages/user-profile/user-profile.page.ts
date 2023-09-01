/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { AuthServiceResponse } from '../../services/authentication.service';
import {
  AppUserProfile,
  UserProfileService,
  UserPlan,
} from '../../services/user-profile.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  initialistionComplete = false;
  user = {} as AuthServiceResponse;
  userProfile = {} as AppUserProfile;
  displayName = '';
  userNameFound = false;
  displayUpdateProfile = false;
  displayUpgradePlan = false;
  userPlanString = '';
  userPlanExpityDateReady = false;

  constructor(private userProfileService: UserProfileService) {}

  async ngOnInit(): Promise<void> {
    this.initialiseSubscriptions();
  }

  private initialiseSubscriptions() {
    this.userProfileService.currentUserProfile$.subscribe((userProfile) => {
      this.userProfile = userProfile;
      Object.keys(this.userProfile).length !== 0 ? this.initialisePage() : null;
    });
  }

  private async initialisePage() {
    await this.setUserProfile();
    await this.setUserAccountDetails();
    this.initialistionComplete = true;
  }

  onUpdateUserProfileClicked() {
    this.displayUpdateProfile = true;
  }

  onUpdateCanceled() {
    this.displayUpdateProfile = false;
  }

  onUpdateComplete() {
    this.displayUpdateProfile = false;
    this.setUserProfile();
  }

  onUpgradeAccountClicked() {
    this.displayUpgradePlan = true;
  }

  onUpgradeCanceled() {
    this.displayUpgradePlan = false;
  }

  onUpgradeComplete() {
    this.displayUpgradePlan = false;
    this.setUserProfile();
  }

  private async setUserProfile() {
    if (this.userProfile.basicDetail.firstName) {
      this.displayName = this.userProfile.basicDetail.firstName;
      this.userNameFound = true;
    } else {
      this.displayName = 'There';
    }
  }

  private async setUserAccountDetails() {
    switch (this.userProfile.accountDetails.planType) {
      case UserPlan.FREE: {
        this.userPlanString = 'Free';
        return;
      }
      case UserPlan.BASIC: {
        this.userPlanString = 'Basic';
        return;
      }
      case UserPlan.PREMIUM: {
        this.userPlanString = 'Premium';
      }
    }
  }
}
