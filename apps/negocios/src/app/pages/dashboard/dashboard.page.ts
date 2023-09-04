import { ChangeDetectorRef, Component } from '@angular/core';
import {
  Button,
  NotificationContent,
} from '../../~global-interfaces/notification-content.interface';
import { AuthService } from '../../services/authentication/auth.service';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { DashboardNotifications } from './dashboard-notifications.enum';
import { ViewState } from './ViewState.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  ViewState = ViewState;
  currentViewState = ViewState.PROFILE;
  sidebarMenu = ['User Profile', 'Valuations', 'Sign out'];
  clientValuations: string[] = [];
  userID: string | undefined;
  showNewNameFloat = false;
  userNotification = {} as NotificationContent;
  showNotification = false;
  dashboardNotification = DashboardNotifications.NONE;
  targetValuationID = '';

  constructor(
    private authService: AuthService,
    private fbase: FirebaseService,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.getUserID();
    this.getClientValuations();
  }

  // Button click callbacks -------------------
  onMenuOptionClicked(option: string) {
    switch (option) {
      case 'User Profile': {
        this.currentViewState = ViewState.PROFILE;
        break;
      }
      case 'Valuations': {
        this.currentViewState = ViewState.VALUATIONS;
        break;
      }
      case 'Sign out': {
        this.dashboardNotification = DashboardNotifications.SIGN_OUT;
        this.showNotification = true;
        this.notifyUser();
        break;
      }
    }
  }

  // Returned emitters callbacks -------------------
  addValuation() {
    this.showNewNameFloat = true;
  }

  async viewValuation(valuationID: string) {
    await this.fbase.viewValuation(valuationID);
  }

  async deleteValuation(valuationID: string) {
    this.targetValuationID = valuationID;
    this.dashboardNotification = DashboardNotifications.DELETE_VALUATION;
    this.showNotification = true;
    this.notifyUser();
  }

  async setNewValuation(valuationTitle: string) {
    this.showNewNameFloat = false;
    if (this.userID) {
      await this.fbase.addNewValuationByUserID(this.userID, valuationTitle);
      this.getClientValuations();
    } else {
      await this.getUserID();
      this.getClientValuations();
    }
  }

  cancelNewValuation() {
    this.showNewNameFloat = false;
  }

  userNotificationPrimaryBtnClicked() {
    switch (this.dashboardNotification) {
      case DashboardNotifications.SIGN_OUT: {
        this.authService.SignOut();
        this.showNotification = false;
        break;
      }
      case DashboardNotifications.DELETE_VALUATION: {
        this.deleteFirbaseValuation();
        this.showNotification = false;
        break;
      }
    }
  }

  userNotificationSecondaryBtnClicked() {
    this.showNotification = false;
  }

  // Private functions -------------------
  private async getUserID() {
    const user = await this.authService.getUser();
    if (!user) return;
    this.userID = user.uid;
  }

  private async getClientValuations() {
    if (this.userID) {
      this.clientValuations = await this.fbase.getOrSetClientValuationList(
        this.userID
      );
    }
    this.cd.detectChanges();
  }

  async deleteFirbaseValuation() {
    if (!this.userID) {
      await this.getUserID();
    } else {
    }
    await this.fbase.deleteValuation(this.userID!, this.targetValuationID);
    this.getClientValuations();
  }

  private notifyUser() {
    switch (this.dashboardNotification) {
      case DashboardNotifications.SIGN_OUT: {
        this.userNotification = {
          header: 'Woah there!',
          bodyText: `Just to check - You sure you want to sign out?`,
          primaryBtn: { title: 'Yes please' } as Button,
          secondaryBtn: { title: 'My bad - No' } as Button,
        };
        this.showNotification = true;
        break;
      }
      case DashboardNotifications.DELETE_VALUATION: {
        this.userNotification = {
          header: 'Woah there!',
          bodyText: `Just to check - You sure you want to delete this valuation?`,
          primaryBtn: { title: 'Yeah' } as Button,
          secondaryBtn: { title: 'My bad - No' } as Button,
        };
        this.showNotification = true;
        break;
      }
    }
  }
}
