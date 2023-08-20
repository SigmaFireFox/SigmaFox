import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  SignInDetails,
} from 'app/services/authentication-service.service';
import { SignInPageViewState as ViewState } from 'app/enums/viewstates.enum';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { ErrorHandlingService } from 'app/services/error-handling.service';
import {
  Warning,
  WarningConfig,
  WarningType,
} from 'app/modals/warning/warning.modal';
import {
  Notification,
  NotificationConfig,
  NotificationType,
} from 'app/modals/notifications/notifications.modal';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from 'app/services/loading.service';
import { AppInitialisationService } from 'app/services/app-initialisation.service';
import { UserInfo } from 'app/interfaces/api.interface';
import { UserInfoService } from 'app/services/user-info.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  permissionToProceed$ = new BehaviorSubject<boolean>(false);
  _permissionToProceed$ = this.permissionToProceed$.asObservable();

  viewState = ViewState;
  currentViewState = ViewState.SIGN_IN;
  menuOptions: MenuOption[] = [];

  isWarning = false;
  warnigConfig: WarningConfig | undefined;
  isNotifying = false;
  notificationConfig: NotificationConfig | undefined;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userInfoService: UserInfoService,
    private errorHandlingService: ErrorHandlingService,
    private loadingService: LoadingService,
    private appInitialisationService: AppInitialisationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.authenticationService
      .isAuthenticated()
      .then((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['']);
          return;
        }
      });
    this.setMenuOptions();
  }

  async onSignIn(formValue: { [key: string]: string }) {
    const signInDetails: SignInDetails = {
      email: formValue['email'],
      password: formValue['password'],
    };
    this.loadingService.setLoading('Signing in');
    await this.authenticationService.userSignIn(signInDetails).then(
      async (success) => {
        this.appInitialisationService.intialise();
        this.router.navigate(['']);
        this.loadingService.cancelLoading();
      },
      (error) => {
        this.loadingService.cancelLoading();
        this.warnigConfig = this.errorHandlingService.getWarningConfig(error);
        this.isWarning = true;
      }
    );
  }

  async registerUser(formValue: { [key: string]: string }) {
    const signInDetails: SignInDetails = {
      email: formValue['email'],
      password: formValue['password'],
    };
    await this.authenticationService.userRegistration(signInDetails).then(
      (success) => {
        this.updateProfile(formValue);
        this.permissionToProceed$.next(true);
      },
      (error) => {
        this.warnigConfig = this.errorHandlingService.getWarningConfig(error);
        if (this.warnigConfig.warning === Warning.INVALID_EMAIL) {
          this.warnigConfig.type = WarningType.REGISTER;
        }
        this.isWarning = true;
      }
    );
  }

  async onRegistrationComplete(formValue: { [key: string]: string }) {
    await this.updateProfile(formValue);
    this.notificationConfig = {
      type: NotificationType.REGISTER,
      notification: Notification.REGISTRATION_COMPLETE,
    };
    this.isNotifying = true;
  }

  private updateProfile(formValue: { [key: string]: string }): Promise<void> {
    delete formValue['password'];
    delete formValue['confirmPassword'];
    this.loadingService.setLoading('Updating profile');
    return new Promise(async (resolve, reject) => {
      this.userInfoService
        .updateUserInfo(formValue as unknown as UserInfo)
        .then(
          async (success) => {
            resolve();
            this.loadingService.cancelLoading();
          },
          async (error) => {
            this.loadingService.cancelLoading();
            reject(error);
          }
        )
        .catch((error) => {
          reject(error);
          this.loadingService.cancelLoading();
        });
    });
  }

  onRegisterPasswordMismatch() {
    this.warnigConfig = {
      type: WarningType.REGISTER,
      warning: Warning.MISMATCHED_PASSWORD,
    };
    this.isWarning = true;
  }

  async onForgotPasswordSubmit(formValue: { [key: string]: string }) {
    let email = formValue['email'];
    await this.authenticationService.resetPassword(email).then(
      (success) => {
        this.notificationConfig = {
          type: NotificationType.FORGOT_PASSWORD,
          notification: Notification.RESET_PASSWORD_EMAIL_SENT,
        };
        this.isNotifying = true;
        this.currentViewState = ViewState.SIGN_IN;
        this.setMenuOptions();
      },
      (error) => {
        this.warnigConfig = this.errorHandlingService.getWarningConfig(error);
        this.warnigConfig.type = WarningType.FORGOT_PASSWORD;
        this.isWarning = true;
      }
    );
  }

  onViewStateSelected(viewState: ViewState) {
    this.currentViewState = viewState;
    this.setMenuOptions();
  }

  onNotificationProceed() {
    this.isNotifying = false;
    if (this.currentViewState === ViewState.REGISTER) {
      this.router.navigate(['']);
    }
  }

  private setMenuOptions() {
    switch (this.currentViewState) {
      case ViewState.SIGN_IN: {
        this.menuOptions = [
          {
            style: MenuOptionStyle.SECONDARY,
            display: `I'm a new user`,
            optionType: MenuOptionType.VIEWSTATE,
            viewState: ViewState.REGISTER,
          },
          {
            style: MenuOptionStyle.SECONDARY,
            display: `Forgot password`,
            optionType: MenuOptionType.VIEWSTATE,
            viewState: ViewState.FORGOT_PASSWORD,
          },
        ];
        break;
      }
      case ViewState.REGISTER:
      case ViewState.FORGOT_PASSWORD: {
        this.menuOptions = [
          {
            style: MenuOptionStyle.SECONDARY,
            display: 'Back to Sign in',
            optionType: MenuOptionType.VIEWSTATE,
            viewState: ViewState.SIGN_IN,
          },
        ];
      }
    }
  }
}
