import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { DatesService } from './dates.service';
import { AppUserProfile, UserProfileService } from './user-profile.service';

export interface DailyGoal {
  id?: string;
  goalString: string;
  numberTimesPresented: number;
  numberTimesSelected: number;
}

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  userProfile = {} as AppUserProfile;
  listOfAvaliableDailyGoals = [] as DailyGoal[];

  constructor(
    private afs: AngularFirestore,
    private userProfileService: UserProfileService,
    private date: DatesService
  ) {
    this.userProfileService.currentUserProfile$.subscribe(
      async (userProfile) => {
        this.avaliableGoalsReady.next(false);
        this.userProfile = userProfile;
        this.userProfile.goals ? await this.setListOfAvaliableGoals() : null;
      }
    );
  }

  private avaliableGoalsReady = new BehaviorSubject<boolean>(false);
  avaliableGoalsReady$ = this.avaliableGoalsReady.asObservable();

  getRandomGoal(): { id: string; string: string } {
    let index = Math.floor(
      Math.random() * this.listOfAvaliableDailyGoals.length
    );
    let randomGoal = this.listOfAvaliableDailyGoals[index];
    return { id: randomGoal.id!, string: randomGoal.goalString };
  }

  private async setListOfAvaliableGoals() {
    this.listOfAvaliableDailyGoals = [] as DailyGoal[];
    const allDailyGoalsList = await this.getAllDailyGoalsList();
    const userDayGoals = this.userProfile.goals.dailyGoals[
      this.date.getTodaysDateAsString()
    ]
      ? this.userProfile.goals.dailyGoals[this.date.getTodaysDateAsString()]
      : [];
    const userRepeatGoals = this.userProfile.goals.repeatGoals;
    let userGoals = [] as string[];
    userDayGoals.forEach((goal) => {
      userGoals.push(goal.goalID);
    });
    userRepeatGoals.forEach((goal) => {
      userGoals.push(goal);
    });
    allDailyGoalsList.forEach((goal) => {
      if (!userGoals.includes(goal.id!)) {
        this.listOfAvaliableDailyGoals.push(goal);
      }
    });
    this.avaliableGoalsReady.next(true);
  }

  async getAllDailyGoalsList(): Promise<DailyGoal[]> {
    let listOfGoals: DailyGoal[] = [];
    const snapshot = this.afs.firestore.collection('daily-goals').get();
    (await snapshot).docs.map((doc) => {
      let document = doc.data() as DailyGoal;
      listOfGoals.push({
        id: doc.id,
        goalString: document.goalString,
        numberTimesPresented: document.numberTimesPresented,
        numberTimesSelected: document.numberTimesSelected,
      });
    });
    return listOfGoals;
  }

  async getDailyGoalsObject(): Promise<{ [key: string]: DailyGoal }> {
    let objectOfGoals = {} as { [key: string]: any };
    const snapshot = this.afs.firestore.collection('daily-goals').get();
    (await snapshot).docs.map((doc) => {
      let document = doc.data() as DailyGoal;
      objectOfGoals[doc.id] = {
        goalString: document.goalString,
        numberTimesPresented: document.numberTimesPresented,
        numberTimesSelected: document.numberTimesSelected,
      };
    });
    return objectOfGoals;
  }

  async recordGoalPresentation(goalID: string) {
    let document = await this.afs
      .collection('daily-goals')
      .doc(goalID)
      .get()
      .toPromise();
    let goal = document?.data() as DailyGoal;
    goal.numberTimesPresented++;
    this.afs.collection('daily-goals').doc(goalID).set(goal);
  }

  async recordGoalSelection(goalID: string) {
    let document = await this.afs
      .collection('daily-goals')
      .doc(goalID)
      .get()
      .toPromise();
    let goal = document?.data() as DailyGoal;
    goal.numberTimesSelected++;
    this.afs.collection('daily-goals').doc(goalID).set(goal);
  }

  async resetAllGoalCounts() {
    const listOfGoals = (await this.getAllDailyGoalsList()) as DailyGoal[];
    listOfGoals.forEach((goal) => {
      this.afs.collection('daily-goals').doc(goal.id).set({
        goalString: goal.goalString,
        numberTimesPresented: 0,
        numberTimesSelected: 0,
      });
    });
  }

  addNewGoal(newGoal: string) {
    this.afs.collection('daily-goals').add({
      goalString: newGoal,
      numberTimesPresented: 0,
      numberTimesSelected: 0,
    });
  }
}
