import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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

  UserRegistration(signInDetails: SignInDetails) {
    this.afAuth
      .createUserWithEmailAndPassword(
        signInDetails.email,
        signInDetails.password
      )
      .then((userCredential) => {
        return userCredential;
      });
  }

  UserSignIn(signInDetails: SignInDetails): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(
      signInDetails.email,
      signInDetails.password
    );
  }

  UserSignOut(): Promise<any> {
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
