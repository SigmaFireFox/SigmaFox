import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import {
  CheckoutService,
  PayFastParms,
} from 'src/app/services/checkout/checkout.service';
import { LocalStorageItem } from 'src/app/services/local-storage/local-storage.enum';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import {
  UserAddress,
  AppUserProfile,
} from 'src/app/services/user/user.interface';
import { UserService } from 'src/app/services/user/user.service';
import { BasketItem } from '../basket-view/basket-view.component';
import { CheckoutViewState } from './models/checkout.enum';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  viewState = CheckoutViewState;
  currentViewState: CheckoutViewState | undefined;
  currentUserID: string | null = '';
  user: User | undefined;
  userProfile: AppUserProfile | null | undefined;
  basketContent: BasketItem[] = [];
  payFastParms: PayFastParms | undefined;
  selectedAddress: UserAddress | undefined;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly authService: AuthenticationService,
    private readonly checkoutService: CheckoutService,
    private readonly userService: UserService
  ) {}

  async ngOnInit() {
    this.basketContent = this.localStorageService.get(LocalStorageItem.Basket);
    this.currentUserID = await this.authService.userID;
    if (!this.currentUserID) {
      this.currentViewState = CheckoutViewState.UserNotLoggedIn;
      return;
    }
    this.getUserProfile();
  }

  async getUserProfile(user?: User) {
    if (!user) {
      const currentUser = await this.authService.user;
      if (currentUser) {
        user = currentUser;
      }
    }

    this.currentUserID = await this.authService.userID;
    if (!this.currentUserID) return;

    this.userProfile = await this.userService.getUserProfileByID(
      this.currentUserID
    );
    if (!this.userProfile && user) {
      this.userProfile = this.buildUserProfile(user);
    }

    if (!this.userProfile) return;

    if (!this.isUserProfileComplete(this.userProfile)) {
      this.currentViewState = this.viewState.IncompleteProfile;
    }

    this.currentViewState = this.isUserProfileComplete(this.userProfile)
      ? this.viewState.AddressRequired
      : this.viewState.IncompleteProfile;
  }

  private buildUserProfile(user: User): AppUserProfile {
    const firstName =
      user.displayName?.substring(0, user.displayName?.indexOf(' ')) || '';
    const lastName =
      user.displayName?.substring(user.displayName?.indexOf(' ')) || '';
    const newUserProfile = {
      id: this.currentUserID,
      firstName,
      lastName,
      email: user.email,
      cellNumber: user.phoneNumber,
    } as AppUserProfile;
    return newUserProfile;
  }

  setUserProfile(userProfile: AppUserProfile) {
    this.userProfile = userProfile;
    if (!this.currentUserID) return;
    this.userProfile.id = this.currentUserID;
    this.userService.setUserProfile(this.userProfile);
  }

  isUserProfileComplete(userProfile: AppUserProfile): boolean {
    let isComplete = true;
    Object.keys(userProfile).forEach((key) => {
      if (!userProfile[key as keyof AppUserProfile]) {
        isComplete = false;
      }
    });
    return isComplete;
  }

  async onAddressSeleced(address: UserAddress) {
    this.selectedAddress = address;
    this.payFastParms = await this.checkoutService.generatePayFastParameters(
      this.basketContent,
      this.userProfile as AppUserProfile,
      this.selectedAddress
    );
    this.currentViewState = this.viewState.OrderConfirmation;
  }
}
