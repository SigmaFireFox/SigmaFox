import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileData, LeadData, UserRecord } from '../interfaces/api.interface';
import { AuthenticationService } from './authentication-service.service';

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

export interface PostObject extends NonNullable<unknown> {
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataManagementService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  async getData(url: string): Promise<NonNullable<unknown>> {
    // eslint-disable-next-line no-async-promise-executor
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
    body: PostObject
  ): Promise<void> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        this.http
          .post(url, body, await this.setHttpPostOptions(collectionType, body))
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

  private setDocument(
    collectionType: CollectionType,
    body: unknown
  ): NonNullable<unknown> {
    const doc = {};
    switch (collectionType) {
      case CollectionType.USER_INFO: {
        const _body = body as ProfileData;
        return _body.userInfo;
      }
      case CollectionType.LEAD: {
        const _body = body as LeadData;
        return _body;
      }
    }
    return doc;
  }

  private setDocRef(collectionType: CollectionType, response: unknown): string {
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
    newDetails: unknown,
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

  private async setHttpPostOptions(
    collectionType: CollectionType,
    body: PostObject
  ) {
    const options = await this.setHttpOptions();

    if (collectionType === CollectionType.LEAD && body.id != undefined) {
      options.params = options.params.append('leadID', body.id);
    }

    return options;
  }

  private async setHttpOptions(): Promise<{
    headers: HttpHeaders;
    params: HttpParams;
  }> {
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
