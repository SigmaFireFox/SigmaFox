import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import {
  EmailAuthProvider,
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { AppInitialisationService } from './app-initialisation.service';

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
    return new Promise(async (resolve, reject) => {
      this.angularFireAuth
        .createUserWithEmailAndPassword(
          signInDetails.email,
          signInDetails.password
        )
        .then((response) => {
          resolve();
        })
        .catch((err: any) => {
          reject(err.message);
        });
    });
  }

  userSignIn(signInDetails: SignInDetails): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.angularFireAuth
        .signInWithEmailAndPassword(signInDetails.email, signInDetails.password)
        .then((res: any) => {
          resolve();
        })
        .catch((err: any) => {
          reject(err.message);
        });
    });
  }

  signOut() {
    sessionStorage.clear();
    this.angularFireAuth.signOut();
  }

  resetPassword(email: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.angularFireAuth
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve({ response: 'password-reset/successful' });
        })
        .catch((err: any) => {
          reject(err.message);
        });
    });
  }

  async isAuthenticated(): Promise<boolean> {
    return new Promise(async (resolve) => {
      await this.angularFireAuth.onAuthStateChanged((user) => {
        user ? resolve(true) : resolve(false);
      });
    });
  }

  async updatePassword(
    newPassword: string,
    oldPassword: string
  ): Promise<void> {
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
            (error) => {
              reject(error.message);
            }
          );
          updatePassword(user, newPassword)
            .then(() => {
              resolve();
            })
            .catch((error) => {
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
