/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  ErrorAdditionalDetail,
  ErrorContext,
  ErrorHandlingService,
  ErrorState,
} from '../error-handling/error-handling.service';

export enum SignInContext {
  Admin,
  General,
  Checkout,
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  auth = getAuth();

  constructor(
    private readonly errorService: ErrorHandlingService,
    private readonly router: Router
  ) {}

  get userID(): Promise<string | null> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(user?.uid || null);
      });
    });
  }

  get user(): Promise<User | null> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(user || null);
      });
    });
  }

  signUpWithEmail(email: string, password: string): void {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  signInWithEmail(
    context: SignInContext,
    email: string,
    password: string
  ): Promise<User> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      await signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          switch (context) {
            case SignInContext.Admin:
              this.router.navigate(['admin/dashboard']);
              break;
            case SignInContext.General:
              this.router.navigate(['']);
          }
          resolve(user);
        })
        .catch((error: { code: unknown; message: unknown }) => {
          this.handleError(error, { email });
          reject();
        });
      reject();
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleError(error: any, detail: ErrorAdditionalDetail): void {
    Object.values(ErrorState).includes(error.code)
      ? this.errorService.handleDefinedError(error.code, {
          email: detail.email,
        })
      : this.errorService.handleUndefinedError(
          ErrorContext.AdminLogin,
          error.code,
          error.message
        );
  }

  signOutUser() {
    signOut(this.auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }
}
