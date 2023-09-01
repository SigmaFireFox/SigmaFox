import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { SignInPage } from './sign-in.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SignInModal } from 'src/app/modals/sign-in/sign-in.modal';
import { Router } from '@angular/router';
import { HomePage } from '../home/home.page';
import { GeneralScreenHeaderComponent } from 'src/app/components/general-screen-header/general-screen-header.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('SignInPage', () => {
  let component: SignInPage;
  let fixture: ComponentFixture<SignInPage>;
  let authSpy: jasmine.Spy;
  let signinSpy: jasmine.Spy;
  let navigatorSpy: jasmine.Spy;

  const mockUserDetail = {
    email: 'email@domain.com',
    password: 'Password123',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            component: HomePage,
          },
        ]),
        ReactiveFormsModule,
      ],
      declarations: [SignInPage, SignInModal, GeneralScreenHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    navigatorSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');
  });

  describe('ngOnInit', () => {
    it('should call isAuthenticated', () => {
      // Assemble
      authSpy = spyOn(
        TestBed.inject(AuthenticationService),
        'isAuthenticated'
      ).and.callThrough();

      // Act
      component.ngOnInit();

      // Assert
      expect(authSpy).toHaveBeenCalled();
    });

    describe('given the user is authericated', () => {
      it('should navigate home', fakeAsync(() => {
        navigatorSpy.and.callThrough();
        spyOn(
          TestBed.inject(AuthenticationService),
          'isAuthenticated'
        ).and.returnValue(Promise.resolve(true));

        // Act
        component.ngOnInit();
        tick();

        // Assert
        expect(navigatorSpy).toHaveBeenCalledWith('home');
      }));
    });

    describe('given the user is NOT authericated', () => {
      it('should NOT navigate home', fakeAsync(() => {
        navigatorSpy.and.callThrough();
        spyOn(
          TestBed.inject(AuthenticationService),
          'isAuthenticated'
        ).and.returnValue(Promise.resolve(false));

        // Act
        component.ngOnInit();
        tick();

        // Assert
        expect(navigatorSpy).not.toHaveBeenCalled();
      }));
    });
  });

  describe('signin', () => {
    it('Should call UserSignIn', function (done) {
      // Assemble
      signinSpy = spyOn(
        TestBed.inject(AuthenticationService),
        'UserSignIn'
      ).and.returnValue(Promise.resolve({}));

      // Act and Assert
      component.signin(mockUserDetail).then(() => {
        expect(signinSpy).toHaveBeenCalled();
        done();
      });

      //
    });
  });

  describe('register', () => {
    it('should call UserRegistration with user details', () => {
      // Assemble
      authSpy = spyOn(
        TestBed.inject(AuthenticationService),
        'UserRegistration'
      );

      // Act
      component.register(mockUserDetail);

      // Assert
      expect(authSpy).toHaveBeenCalledOnceWith(mockUserDetail);
    });
  });
});
