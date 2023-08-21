import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  User,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

export interface SignInDetails {
  email: string;
  password: string;
  parentProfile?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: Observable<User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState as unknown as Observable<User>;
  }

  get userID(): Promise<string> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      this.angularFireAuth.currentUser
        .then((user) => {
          resolve(user?.uid as string);
        })
        .catch(() => {
          reject('');
        });
    });
  }

  userRegistration(signInDetails: SignInDetails): Promise<void> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      this.angularFireAuth
        .createUserWithEmailAndPassword(
          signInDetails.email,
          signInDetails.password
        )
        .then(() => {
          resolve();
        })
        .catch((err: { message: unknown }) => {
          reject(err.message);
        });
    });
  }

  userSignIn(signInDetails: SignInDetails): Promise<void> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      this.angularFireAuth
        .signInWithEmailAndPassword(signInDetails.email, signInDetails.password)
        .then(() => {
          resolve();
        })
        .catch((err: { message: unknown }) => {
          reject(err.message);
        });
    });
  }

  signOut() {
    sessionStorage.clear();
    this.angularFireAuth.signOut();
  }

  resetPassword(email: string): Promise<unknown> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      this.angularFireAuth
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve({ response: 'password-reset/successful' });
        })
        .catch((err: { message: unknown }) => {
          reject(err.message);
        });
    });
  }

  async isAuthenticated(): Promise<boolean> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      await this.angularFireAuth.onAuthStateChanged((user: unknown) => {
        user ? resolve(true) : resolve(false);
      });
    });
  }

  async updatePassword(
    newPassword: string,
    oldPassword: string
  ): Promise<void> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userEmail = user.email;
        if (userEmail) {
          const credential = EmailAuthProvider.credential(
            userEmail,
            oldPassword
          );
          await reauthenticateWithCredential(user, credential).catch(
            (error: { message: unknown }) => {
              reject(error.message);
            }
          );
          updatePassword(user, newPassword)
            .then(() => {
              resolve();
            })
            .catch((error: { message: unknown }) => {
              reject(error.message);
            });
        } else {
          reject('no-user-email');
        }
      } else {
        reject('no-user-signed-in');
      }
    });
  }
}
