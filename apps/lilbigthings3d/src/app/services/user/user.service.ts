import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { FirestoreManagementService } from '../firestore-management/firestore-management.service';
import { UserAddress, AppUserProfile } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly fs: FirestoreManagementService,
    private readonly authService: AuthenticationService
  ) {}

  async getUserProfileByID(id: string): Promise<AppUserProfile | null> {
    const userProfile = await this.fs.getUserProfile(id);
    if (!userProfile) return null;
    userProfile.id = id;
    return userProfile;
  }

  async getUserImage(): Promise<string> {
    const user = await this.authService.user;
    if (!user?.photoURL) return '';
    return user.photoURL;
  }

  async setUserProfile(userProfile: AppUserProfile) {
    this.fs.setUserProfile(userProfile);
  }

  async getUserDeliveryAddresses(id: string): Promise<UserAddress[]> {
    const userProfile = await this.fs.getUserProfile(id);
    if (!userProfile) return [];
    return userProfile.deliveryAddresses;
  }

  async addUserDeliveryAddress(
    id: string,
    address: UserAddress
  ): Promise<void> {
    const userProfile = await this.fs.getUserProfile(id);
    if (!userProfile) return;
    const currentAddresses = userProfile.deliveryAddresses || [];
    currentAddresses.push(address);
    userProfile.deliveryAddresses = currentAddresses;
    userProfile.id = id;
    this.setUserProfile(userProfile);
  }

  async updateUserDeliveryAddresses(
    id: string,
    addresses: UserAddress[]
  ): Promise<void> {
    const userProfile = await this.fs.getUserProfile(id);
    if (!userProfile) return;
    userProfile.deliveryAddresses = addresses;
    userProfile.id = id;
    this.setUserProfile(userProfile);
  }
}
