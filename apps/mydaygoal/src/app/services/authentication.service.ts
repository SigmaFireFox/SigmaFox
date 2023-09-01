import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
  updateProfile,
  updateEmail,
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { UserBasicDetails } from './user-profile.service';

export interface AuthServiceResponse {
  success: boolean;
  user: User;
  errorCode: any;
  errorMessage: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private afs: AngularFirestore) {
    this.getSignedInUser();
  }

  private user = new BehaviorSubject<AuthServiceResponse>(
    {} as AuthServiceResponse
  );
  user$ = this.user.asObservable();

  async getSignedInUser(): Promise<AuthServiceResponse> {
    const auth = getAuth();
    let loggedInUser = {} as AuthServiceResponse;
    return new Promise<AuthServiceResponse>((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          loggedInUser.success = true;
          loggedInUser.user = user;
        } else {
          loggedInUser.success = false;
          loggedInUser.user = {} as User;
        }
        this.user.next(loggedInUser);
        resolve(loggedInUser);
      });
    });
  }

  async signUpWithEmail(
    email: string,
    password: string
  ): Promise<AuthServiceResponse> {
    let authResponse = {} as AuthServiceResponse;
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        authResponse = {
          success: true,
          user: userCredential.user,
        } as AuthServiceResponse;
      })
      .catch((error) => {
        authResponse = {
          success: false,
          errorCode: error.code,
          errorMessage: error.message,
        } as AuthServiceResponse;
      });
    return authResponse;
  }

  async signInWithEmail(
    email: string,
    password: string
  ): Promise<AuthServiceResponse> {
    let authResponse = {} as AuthServiceResponse;
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        authResponse = {
          success: true,
          user: userCredential.user,
        } as AuthServiceResponse;
      })
      .catch((error) => {
        authResponse = {
          success: false,
          errorCode: error.code,
          errorMessage: error.message,
        } as AuthServiceResponse;
      });
    return authResponse;
  }

  signOutUser() {
    const auth = getAuth();
    return new Promise<void>((resolve, reject) => {
      signOut(auth)
        .then(() => {
          resolve();
        })
        .catch((error) => {});
    });
  }

  async resetUserPassword(email: string) {
    let authResponse = {} as AuthServiceResponse;

    const auth = getAuth();
    await sendPasswordResetEmail(auth, email)
      .then((userCredential) => {
        authResponse = {
          success: true,
        } as AuthServiceResponse;
      })
      .catch((error) => {
        authResponse = {
          success: false,
          errorCode: error.code,
          errorMessage: error.message,
        } as AuthServiceResponse;
      });
    return authResponse;
  }

  updateUserFirebaseProfile(userBasicDetails: UserBasicDetails): boolean {
    let firebaseProfileUpdated = false;
    const displayName =
      userBasicDetails.firstName + ' ' + userBasicDetails.lastName;
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      updateProfile(user, {
        displayName: displayName,
        photoURL: '',
      })
        .then(() => {
          updateEmail(user, userBasicDetails.email)
            .then(() => {
              firebaseProfileUpdated = true;
            })
            .catch((error) => {
              firebaseProfileUpdated = false;
            });
        })
        .catch((error) => {
          firebaseProfileUpdated = false;
        });
    } else {
      firebaseProfileUpdated = false;
    }
    return firebaseProfileUpdated;
  }
}
