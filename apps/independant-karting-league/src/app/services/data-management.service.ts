/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-async-promise-executor */
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileData, UserRecord } from '../interfaces/api.interface';
import { AuthenticationService } from './authentication.service';

export interface Options {
  headers: HttpHeaders;
  params: HttpParams;
}

export enum CollectionType {
  AGENT = 'agents',
  LEAD = 'leads',
  USER_INFO = 'userInfo',
  FLAGS = 'flags',
}

@Injectable({
  providedIn: 'root',
})
export class DataManagementService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  async getData(url: string): Promise<object> {
    return new Promise(async (resolve, reject) => {
      try {
        this.http
          .get(url, await this.setHttpOptions())
          .subscribe((response) => {
            resolve(response);
          });
      } catch {
        reject();
      }
    });
  }

  async postData(
    collectionType: CollectionType,
    url: string,
    body: object
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        this.http
          .post(url, body, await this.setHttpOptions())
          .subscribe((response) => {
            const doc = this.setDocument(collectionType, body);
            const docRef = this.setDocRef(collectionType, response);
            this.updateSessionStorage(collectionType, doc, docRef);
            resolve();
          });
      } catch {
        reject();
      }
    });
  }

  private setDocument(collectionType: CollectionType, body: any): object {
    const doc = {};
    switch (collectionType) {
      case CollectionType.USER_INFO: {
        const _body = body as ProfileData;
        return _body.userInfo;
      }
    }
    return doc;
  }

  private setDocRef(collectionType: CollectionType, response: any): string {
    switch (collectionType) {
      case CollectionType.AGENT: {
        const userRecord = response as UserRecord;
        return userRecord.uid;
      }
      case CollectionType.LEAD: {
        const doc = response as { _path: { segments: string[] } };
        return doc._path.segments[3];
      }
    }
    return '';
  }

  private updateSessionStorage(
    collectionType: CollectionType,
    newDetails: any,
    docRef: string
  ) {
    let currentDocument =
      sessionStorage[collectionType] != undefined
        ? JSON.parse(sessionStorage[collectionType])
        : {};

    if (docRef) {
      currentDocument[docRef] = newDetails;
    } else {
      currentDocument = newDetails;
    }
    sessionStorage.setItem(collectionType, JSON.stringify(currentDocument));
  }

  private async setHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams().set(
        'userID',
        await this.authenticationService.userID
      ),
    };
  }
}
