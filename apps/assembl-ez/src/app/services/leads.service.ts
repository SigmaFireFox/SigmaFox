import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication-service.service';
import {
  CollectionType,
  DataManagementService,
} from './data-management.service';

@Injectable({
  providedIn: 'root',
})
export class LeadsService {
  constructor(private dataManagementService: DataManagementService) {}

  async getLeads(): Promise<Object> {
    return new Promise(async (resolve, reject) => {
      resolve(JSON.parse(sessionStorage['leads']));
      reject();
    });
  }

  async addLead(formValue: { [key: string]: string }): Promise<void> {
    const url = 'https://us-central1-assembl-ez.cloudfunctions.net/addLead';
    const body = formValue;

    return new Promise(async (resolve, reject) => {
      await this.dataManagementService
        .postData(CollectionType.LEAD, url, body)
        .then(
          async (success) => resolve(),
          async (error) => reject()
        );
    });
  }

  async editLead(formValue: { [key: string]: string }): Promise<void> {
    const url = 'https://us-central1-assembl-ez.cloudfunctions.net/editLead';
    const body = formValue;

    return new Promise(async (resolve, reject) => {
      await this.dataManagementService
        .postData(CollectionType.LEAD, url, body)
        .then(
          async (success) => resolve(),
          async (error) => reject()
        );
    });
  }
}
