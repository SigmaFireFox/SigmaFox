import { Injectable } from '@angular/core';
import { UserInfo } from 'app/interfaces/api.interface';
import {
  CollectionType,
  DataManagementService,
} from './data-management.service';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor(private dataManagementService: DataManagementService) {}

  getUserInfo(): UserInfo {
    return sessionStorage['userInfo']
      ? JSON.parse(sessionStorage['userInfo'])
      : {};
  }

  async updateUserInfo(updatedUserInfo: UserInfo): Promise<void> {
    const url =
      'https://us-central1-assembl-ez.cloudfunctions.net/updateUserProfile';
    const body = { userInfo: { ...this.getUserInfo(), ...updatedUserInfo } };
    return new Promise(async (resolve, reject) => {
      await this.dataManagementService
        .postData(CollectionType.USER_INFO, url, body)
        .then(
          async (success) => resolve(),
          async (error) => reject()
        );
    });
  }
}
