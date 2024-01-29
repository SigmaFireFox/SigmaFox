import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { RegisterPage } from './register.page';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { DashboardPage } from '../dashboard/dashboard.page';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInModal } from '@sigmafox/modals';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from 'apps/e-questrian/src/environments/environment';
import { GeneralScreenHeaderComponent } from '../../components/general-screen-header/general-screen-header.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';

describe('SignInPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
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
            component: DashboardPage,
          },
        ]),
        ReactiveFormsModule,
      ],
      declarations: [RegisterPage, SignInModal, GeneralScreenHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
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
