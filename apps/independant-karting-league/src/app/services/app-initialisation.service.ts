import { Injectable } from '@angular/core';
import {
  ClientData,
  FlagData,
  FlagDataClass,
  UserInfo,
} from 'app/interfaces/api.interface';
import { DataManagementService } from './data-management.service';
import { FeatureFlagsService } from './feature-flag.service';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitialisationService {
  constructor(
    private dataManagementService: DataManagementService,
    private featureFlagsService: FeatureFlagsService,
    private userInfoService: UserInfoService
  ) {}

  async intialise() {
    // await this.getClientData();
    // this.alphaUserSetUp();
  }

  private async getClientData(): Promise<void> {
    const url =
      'https://us-central1-assembl-ez.cloudfunctions.net/getClientData';

    return new Promise(async (resolve, reject) => {
      await this.dataManagementService.getData(url).then(
        async (response) => {
          const clientData = response as ClientData;
          this.setLocal('userInfo', clientData.profile?.userInfo);
          this.setLocal('flags', clientData.profile?.flags || {});
          this.setLocal('leads', clientData.leads);
          this.setLocal('agents', clientData.agents);
          resolve();
        },
        async (error) => reject(error)
      );
    });
  }

  private setLocal(dataDescription: string, data: Object) {
    sessionStorage.setItem(dataDescription, JSON.stringify(data));
  }

  private async alphaUserSetUp() {
    let flags: FlagData = this.featureFlagsService.getFlags();
    if (Object.keys(flags).length === 0) {
      if (this.isAlphaUser()) {
        flags = this.setDefaultFlags();
        this.featureFlagsService.updateFlags(flags);
        return;
      }
      if (await this.isNewAlphaUser()) {
        this.userInfoService.updateUserInfo({ isAlphaUser: true } as UserInfo);
        this.featureFlagsService.updateFlags(flags);
      }
    }
  }

  private isAlphaUser(): boolean {
    let profile = this.userInfoService.getUserInfo();
    return profile.isAlphaUser;
  }

  private isNewAlphaUser(): Promise<boolean> {
    const url = 'https://us-central1-assembl-ez.cloudfunctions.net/isAlphaUser';

    return new Promise(async (resolve, reject) => {
      await this.dataManagementService.getData(url).then(
        async (response) => {
          let isAlphaUserResponse = response as { isAlphaUser: boolean };
          resolve(isAlphaUserResponse.isAlphaUser);
        },
        async (error) => reject(error)
      );
    });
  }

  setDefaultFlags(): FlagData {
    let flags = {} as FlagData;
    type FlagDataPropsArray = Array<keyof FlagData>;
    const listOfFlags = Object.keys(new FlagDataClass()) as FlagDataPropsArray;

    listOfFlags.forEach((flag) => {
      flags[flag] = false;
    });
    return flags;
  }
}
