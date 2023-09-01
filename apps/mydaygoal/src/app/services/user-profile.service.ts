/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import {
  AuthenticationService,
  AuthServiceResponse,
} from './authentication.service';
import { DatesService } from './dates.service';

export interface AppUserProfile {
  basicDetail: UserBasicDetails;
  accountDetails: UserAccountDetails;
  goals: UserGoals;
}

export interface UserBasicDetails {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserAccountDetails {
  planType: UserPlan;
  planTerm: PlanTerm;
  paidUpUntil: any;
}

export interface UserGoals {
  dailyGoals: { [date: string]: Goal[] };
  repeatGoals: string[];
}

export interface Goal {
  goalID: string;
  repeat: boolean;
  complete: boolean;
}

export interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}

export enum UserPlan {
  FREE,
  BASIC,
  PREMIUM,
}

export enum PlanTerm {
  NONE,
  MONTHLY,
  SIX_MONTHS,
  TWELVE_MONTHS,
}

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(
    private afs: AngularFirestore,
    private authService: AuthenticationService,
    private date: DatesService
  ) {
    this.getUserProfile();
  }

  signedInUser = {} as AuthServiceResponse;
  userFirebaseProfileDocument: any;
  currentUserProfile = {} as AppUserProfile;
  today = this.date.getTodaysDateAsString();

  private userProfile = new BehaviorSubject<AppUserProfile>(
    {} as AppUserProfile
  );
  currentUserProfile$ = this.userProfile.asObservable();

  // Fuctions required to call the userProfile from Firebase and set this as the
  // currentUserProfile, if there is no userProfile on file then a temp userProfile
  // is created as the currentUserProfile
  async getUserProfile() {
    // This function determines if there is a logged is user,
    // if so an attempt it made to get their profile from the firebase,
    // if there is no profile a profile is created and saved to firebase
    this.signedInUser = await this.authService.getSignedInUser();
    this.signedInUser.success
      ? (await this.isUserProfileOnFile())
        ? (this.currentUserProfile = this.userFirebaseProfileDocument.data())
        : (this.currentUserProfile = this.createUserProfile(true))
      : (this.currentUserProfile = this.createUserProfile(false)); // What should happen if user is not logged in?
    this.updateUserProfile();
  }

  private async isUserProfileOnFile(): Promise<boolean> {
    // This function only validates if there is a userProfile on firebase
    // If there is it will store it
    this.userFirebaseProfileDocument = await this.afs
      .collection('user-profiles')
      .doc(this.signedInUser.user.uid)
      .get()
      .toPromise();
    return this.userFirebaseProfileDocument.exists ? true : false;
  }

  private createUserProfile(isUserSignedIn: boolean): AppUserProfile {
    // This fuction is only called if there no userProfile on firebase
    // If the user is signed in then the profile provided will contain the
    // signed in user's email, else if the user is not logged in the userProfle
    // provide will be completely empty
    return {
      basicDetail: {
        firstName: '',
        lastName: '',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        email: isUserSignedIn ? this.signedInUser.user.email! : '',
      },
      accountDetails: {
        planType: UserPlan.FREE,
        planTerm: PlanTerm.MONTHLY,
        paidUpUntil: new Date(),
      },
      goals: { dailyGoals: {}, repeatGoals: [] },
    };
  }

  // Functions required to determine if the user has reached their goal limits based
  // on the plan per their currentUserProfile
  userReachedDayGoalLimit(): boolean {
    if (this.currentUserProfile.accountDetails.planType !== UserPlan.FREE) {
      return false;
    } else {
      if (!this.currentUserProfile.goals.dailyGoals[this.today]) {
        return false;
      } else {
        let userDayGoalsCount = 0;
        this.currentUserProfile.goals.dailyGoals[this.today].forEach(
          (value) => {
            !value.repeat ? userDayGoalsCount++ : null;
          }
        );
        return userDayGoalsCount >= 2 ? true : false;
      }
    }
  }

  userReachedRepeatGoalLimit(): boolean {
    switch (this.currentUserProfile.accountDetails.planType) {
      case UserPlan.FREE: {
        return this.currentUserProfile.goals.repeatGoals.length >= 1
          ? true
          : false;
      }
      case UserPlan.BASIC: {
        return this.currentUserProfile.goals.repeatGoals.length >= 5
          ? true
          : false;
      }
      case UserPlan.PREMIUM: {
        return false;
      }
    }
  }

  // Functions related to the modification of userProfile
  addGoalToUserProfile(goalID: string, isRepeat: boolean) {
    if (this.signedInUser.success) {
      if (this.currentUserProfile.goals.dailyGoals === undefined) {
        this.currentUserProfile.goals.dailyGoals = {
          [this.today]: [],
        };
      }
      isRepeat ? this.addRepeatGoalToCurrentProfile(goalID) : null;
      this.addDayGoalToCurrentProfile(goalID, isRepeat);
      this.updateUserProfile();
    }
  }

  setUserNewPlan(newPlan: { plan: UserPlan; term: PlanTerm }) {
    this.currentUserProfile.accountDetails.planType = newPlan.plan;
    this.currentUserProfile.accountDetails.planTerm = newPlan.term;
    let monthsToAdd = 0;
    newPlan.term === 1
      ? (monthsToAdd = 1)
      : newPlan.term === 2
      ? (monthsToAdd = 6)
      : (monthsToAdd = 12);
    this.currentUserProfile.accountDetails.paidUpUntil = new Date(
      new Date().setMonth(new Date().getMonth() + monthsToAdd)
    );
    this.updateUserProfile();
  }

  updateUserProfile() {
    this.afs
      .collection('user-profiles')
      .doc(this.signedInUser.user.uid)
      .set(this.currentUserProfile);
    // TODO: Need to handle write fail reponses
    this.userProfile.next(this.currentUserProfile);
  }

  private addDayGoalToCurrentProfile(goalID: string, isRepeat: boolean) {
    let todaysGoals = [] as Goal[];
    this.currentUserProfile.goals.dailyGoals[this.today] !== undefined
      ? (todaysGoals = this.currentUserProfile.goals.dailyGoals[this.today])
      : null;
    todaysGoals.push({ goalID: goalID, complete: false, repeat: isRepeat });
    this.currentUserProfile.goals.dailyGoals[this.today] = todaysGoals;
  }

  private addRepeatGoalToCurrentProfile(goalID: string) {
    let repeatGoals = [] as string[];
    this.currentUserProfile.goals.repeatGoals !== undefined
      ? (repeatGoals = this.currentUserProfile.goals.repeatGoals)
      : null;
    repeatGoals.push(goalID);
    this.currentUserProfile.goals.repeatGoals = repeatGoals;
  }
}
