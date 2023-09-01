/* eslint-disable no-async-promise-executor */
import { Injectable } from '@angular/core';
import { FlagData } from '../interfaces/api.interface';
import {
  CollectionType,
  DataManagementService,
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
    return new Promise(async (resolve, reject) => {
      await this.dataManagementService
        .postData(CollectionType.USER_INFO, url, body)
        .then(
          async () => resolve(),
          async () => reject()
        );
    });
  }
}
