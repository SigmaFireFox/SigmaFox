import { Injectable } from '@angular/core';
import { FlagData } from '../interfaces/api.interface';
import {
  CollectionType,
  DataManagementService,
  PostObject,
} from './data-management.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagsService {
  constructor(private dataManagementService: DataManagementService) {}

  getFlags(): FlagData {
    return sessionStorage['flags'] ? JSON.parse(sessionStorage['flags']) : {};
  }

  async updateFlags(updatedFlags: FlagData): Promise<void> {
    const url =
      'https://us-central1-assembl-ez.cloudfunctions.net/updateUserProfile';
    const body = {
      flags: { ...this.getFlags(), ...updatedFlags },
    };
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      await this.dataManagementService
        .postData(CollectionType.USER_INFO, url, body as PostObject)
        .then(
          async () => resolve(),
          async () => reject()
        );
    });
  }
}
