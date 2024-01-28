import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RegisterDetails } from '@sigmafox/modals';
import { Observable, map } from 'rxjs';
import { SignInDetails } from '../../pages/sign-in/sign-in.page';

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
    this.afAuth
      .createUserWithEmailAndPassword(
        registerDetails.email,
        registerDetails.password
      )
      .then((userCredential) => {
        return userCredential;
      });

    const profile = {
      displayName: registerDetails.firstName + ' ' + registerDetails.lastName,
      photoURL: '',
    };

    const currentUser = await this.afAuth.currentUser;
    if (currentUser) {
      return currentUser.updateProfile(profile);
    }
  }

  UserSignIn(signInDetails: SignInDetails): Promise<unknown> {
    return this.afAuth.signInWithEmailAndPassword(
      signInDetails.email,
      signInDetails.password
    );
  }

  UserSignOut(): Promise<unknown> {
    return this.afAuth.signOut();
  }

  async isAuthenticated(): Promise<boolean> {
    return new Promise(async (resolve) => {
      await this.afAuth.onAuthStateChanged((user) => {
        user ? resolve(true) : resolve(false);
      });
    });
  }
}
