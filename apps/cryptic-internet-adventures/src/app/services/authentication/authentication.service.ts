/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  onAuthStateChanged,
  Auth,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import {} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UtilitiesService } from '../utilities/utilities.service';

export enum AppAuthError {
  // See full list of possible errors: https://firebase.google.com/docs/auth/admin/errors
  Unknown,
  UserNameNotFound,
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private auth: Auth,
    private readonly router: Router,
    private readonly utilitiesService: UtilitiesService
  ) {}

  get userID(): Promise<string | null> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(user?.uid || null);
      });
    });
  }

  signInWithUserNameOrEmail(
    userNameOrEmail: string,
    password: string
  ): Promise<UserCredential> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const email = await this.utilitiesService.validateEmail(userNameOrEmail);
      if (email) {
        await signInWithEmailAndPassword(this.auth, email, password)
          .then((userCredential) => {
            this.router.navigate(['dashboard']);
            resolve(userCredential);
          })
          .catch((error: { code: string; message: unknown }) => {
            reject({ error: this.classifyFBAuthError(error.code) });
          });
      }
      reject({ error: AppAuthError.UserNameNotFound });
    });
  }

  private classifyFBAuthError(code: string): AppAuthError {
    // switch (code) {
    //   case '': {
    //     return AppAuthError.Unknown;
    //   }
    // }
    return AppAuthError.Unknown;
  }
}
