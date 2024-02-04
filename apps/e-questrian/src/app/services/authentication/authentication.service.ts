import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FirebaseAuthErrors,
  RegisterDetails,
  SignInDetails,
} from '@sigmafox/modals';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user: User | undefined | null;

  get isAuthenticated$(): Observable<boolean> {
    return this.afAuth.authState.pipe(map((user) => user !== null));
  }

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      this.user = user as User;
    });
  }

  async UserRegistration(registerDetails: RegisterDetails) {
    return new Promise(async (resolve, reject) => {
      this.afAuth
        .createUserWithEmailAndPassword(
          registerDetails.email,
          registerDetails.password
        )
        .then(async (userCredential) => {
          const profile = {
            displayName:
              registerDetails.firstName + ' ' + registerDetails.lastName,
            photoURL: '',
          };

          const currentUser = await this.afAuth.currentUser;
          if (currentUser) {
            return currentUser.updateProfile(profile);
          }
          resolve(userCredential);
        })
        .catch((error) => {
          reject(this.setErrorFromErrorMessage(error.message));
        });
    });
  }

  UserSignIn(signInDetails: SignInDetails): Promise<unknown> {
    return new Promise(async (resolve, reject) => {
      this.afAuth
        .signInWithEmailAndPassword(signInDetails.email, signInDetails.password)
        .then((user) => {
          resolve(true);
        })
        .catch((error) => {
          reject(this.setErrorFromErrorMessage(error.message));
        });
    });
  }

  UserSignOut(): Promise<unknown> {
    return this.afAuth.signOut();
  }

  resetPassword(signInDetails: SignInDetails): Promise<unknown> {
    return new Promise(async (resolve, reject) => {
      return this.afAuth
        .sendPasswordResetEmail(signInDetails.email)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(this.setErrorFromErrorMessage(error.message));
        });
    });
  }

  async isAuthenticated(): Promise<boolean> {
    return new Promise(async (resolve) => {
      await this.afAuth.onAuthStateChanged((user) => {
        user ? resolve(true) : resolve(false);
      });
    });
  }

  setErrorFromErrorMessage(errorMessage: string): FirebaseAuthErrors {
    let setError = FirebaseAuthErrors.None;
    Object.values(FirebaseAuthErrors).forEach((errorValue) => {
      if (errorMessage.includes(errorValue)) {
        setError = errorValue;
      }
    });
    return setError;
  }
}
