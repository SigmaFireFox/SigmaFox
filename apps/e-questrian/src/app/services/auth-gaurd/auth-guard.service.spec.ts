import { fakeAsync, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from './auth-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { SignInPage } from 'src/app/pages/sign-in/sign-in.component';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule.withRoutes([
          {
            path: 'signin',
            component: SignInPage,
          },
        ]),
      ],
      providers: [AuthenticationService],
    });
    service = TestBed.inject(AuthGuardService);
  });

  describe('canActivate()', () => {
    describe('given user is authenticated', () => {
      it('should return true', (done) => {
        // Assemble
        spyOn(
          TestBed.inject(AuthenticationService),
          'isAuthenticated'
        ).and.returnValue(Promise.resolve(true));

        // Act and Assert
        service.canActivate().then((result) => {
          expect(result).toBeTrue();
          done();
        });
      });
    });
    describe('given user is NOT authenticated', () => {
      it('should return true and navigate to signin', (done) => {
        // Assemble
        let navigatorSpy = spyOn(
          TestBed.inject(Router),
          'navigateByUrl'
        ).and.callThrough();
        spyOn(
          TestBed.inject(AuthenticationService),
          'isAuthenticated'
        ).and.returnValue(Promise.resolve(false));

        // Act and Assert
        service.canActivate().then((result) => {
          expect(result).toBeFalse();
          expect(navigatorSpy).toHaveBeenCalledWith('signin');
          done();
        });
      });
    });
  });
});
