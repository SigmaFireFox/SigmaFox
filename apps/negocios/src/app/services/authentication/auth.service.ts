/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable, NgZone } from '@angular/core';
import { AppUser, GoogleProfile } from './user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GoogleAuthProvider, FacebookAuthProvider, User } from 'firebase/auth';
import { first } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: AppUser | undefined;
  _isLoggedIn: boolean | undefined;

  $_isLoggedIn = new BehaviorSubject(false);

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.postUserDataLocal();
  }

  get isLoggedIn(): boolean {
    this.$_isLoggedIn.next(this._isLoggedIn!);
    return this._isLoggedIn!;
  }

  // --------------- Sign in methods -----------------------
  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result) {
          this._isLoggedIn = true;
          this.postUserDataLocal();
        }
      })
      .catch((error: { message: any }) => {
        return error;
      });
  }

  signInGoogle() {
    return this.authLogin(new GoogleAuthProvider());
  }

  signInFacebook() {
    return this.authLogin(new FacebookAuthProvider());
  }

  private authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        if (result) {
          this._isLoggedIn = true;
          this.postUserDataLocal();
          this.updateUserDataFirebaseFromGoogle(
            result.additionalUserInfo?.profile as GoogleProfile
          );
        }
      })
      .catch((error: { message: any }) => {
        return error;
      });
  }

  // --------------- Sign out methods -----------------------
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this._isLoggedIn = false;
      this.router.navigateByUrl('/sign-in');
    });
  }

  // --------------- Sign up methods -----------------------
  signUp(firstName: string, lastName: string, email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result: { user: any }) => {
        this.sendVerificationMail();
        this._isLoggedIn = true;
        this.postUserDataFirebase(result.user, firstName, lastName);
      })
      .catch((error: { message: any }) => {
        return error;
      });
  }

  async sendVerificationMail() {
    (await this.afAuth.currentUser)!.sendEmailVerification();
  }

  // --------------- Reset password methods -----------------------
  resetPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // --------------- User Data posting methods -----------------------
  async postUserDataFirebase(user: User, firstName: string, lastName: string) {
    if (!user) return;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: AppUser = {
      uid: user.uid,
      email: user.email!,
      firstName: firstName,
      lastName: lastName,
      displayName: firstName + ' ' + lastName,
      photoURL: user.photoURL!,
      emailVerified: user!.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  async updateUserDataFirebaseFromGoogle(googleProfile: GoogleProfile) {
    const user: firebase.default.User | null =
      (await this.getUser()) as unknown as firebase.default.User;
    const userRef: AngularFirestoreDocument<any> = await this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: googleProfile.email,
      firstName: googleProfile.given_name,
      lastName: googleProfile.family_name,
      displayName: googleProfile.name!,
      photoURL: googleProfile.picture!,
      emailVerified: googleProfile.verified_email,
    } as AppUser;
    return userRef.set(userData, {
      merge: true,
    });
  }

  private postUserDataLocal() {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        await this.getUser();
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // --------------- User Enquiries -----------------------
  async getUser() {
    const user: firebase.default.User | null | undefined =
      await this.afAuth.authState.pipe(first()).toPromise();
    if (user) {
      this.userData = user as unknown as AppUser;
    }
    return user;
  }

  async getUserProfile() {
    const user: firebase.default.User | null =
      (await this.getUser()) as unknown as firebase.default.User;
    let userProfile = {} as AppUser;
    const doc: any = await this.afs
      .collection('users')
      .doc(user.uid)
      .get()
      .toPromise();
    if (doc.exists) {
      userProfile = doc.data();
    }
    return userProfile;
  }
}
