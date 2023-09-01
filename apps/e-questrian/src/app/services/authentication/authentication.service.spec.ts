import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '@firebase/auth';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SignInDetails } from 'src/app/modals/sign-in/sign-in.modal';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

const mockSignInDetails = {
  email: 'bob@hope.com',
  password: 'BobbyBoy',
} as SignInDetails;

const userMock = {
  uid: 'ABC123',
  email: mockSignInDetails.email,
} as User;

const fakeAuthState = new BehaviorSubject<null | User>(null); // <= Pay attention to this guy

const fakeSignInHandler = (email: any, password: any): Promise<any> => {
  fakeAuthState.next(userMock);
  return Promise.resolve(userMock);
};

const fakeSignOutHandler = (): Promise<any> => {
  fakeAuthState.next(null);
  return Promise.resolve();
};

const angularFireAuthStub = {
  authState: fakeAuthState,
  createUserWithEmailAndPassword: jasmine
    .createSpy('createUserWithEmailAndPassword')
    .and.callFake(fakeSignInHandler),
  signInWithEmailAndPassword: jasmine
    .createSpy('signInWithEmailAndPassword')
    .and.callFake(fakeSignInHandler),
  signOut: jasmine.createSpy('signOut').and.callFake(fakeSignOutHandler),
};

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let afAuth: AngularFireAuth;
  let isAuth$: Subscription;
  let isAuthRef: boolean;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
      ],
      providers: [{ provide: AngularFireAuth, useValue: angularFireAuthStub }],
    });
    service = TestBed.inject(AuthenticationService);
    afAuth = TestBed.inject(AngularFireAuth);
  });

  beforeEach(() => {
    isAuth$ = service.isAuthenticated$.subscribe((isAuth) => {
      isAuthRef = isAuth;
    });
  });

  afterEach(() => {
    fakeAuthState.next(null);

    isAuth$.unsubscribe();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be initially authenticated', () => {
    expect(isAuthRef).toBe(false);
  });

  it('should be authenticated after register', () => {
    service.UserRegistration(mockSignInDetails);

    expect(afAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      mockSignInDetails.email,
      mockSignInDetails.password
    );
    expect(isAuthRef).toBe(true);
    expect(service.user!.email).toEqual(mockSignInDetails.email);
  });

  it('should be authenticated after logging in', () => {
    service.UserSignIn(mockSignInDetails);

    expect(afAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      mockSignInDetails.email,
      mockSignInDetails.password
    );
    expect(isAuthRef).toBeTruthy();
    expect(service.user!.email).toEqual(mockSignInDetails.email);
  });

  it('should not be authenticated after logging out', () => {
    fakeAuthState.next(userMock);
    expect(isAuthRef).toBe(true);
    expect(service.user!.email).toEqual(mockSignInDetails.email);

    service.UserSignOut();

    expect(isAuthRef).toBe(false);
    expect(service.user).toBe(null);
  });
});
