/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInPageViewState as ViewState } from '../../enums/viewstates.enum';
import { MenuOption } from '../../interfaces/menu-screen.interface';
import {
  NotificationConfig,
  NotificationType,
  Notification,
} from '../../modals/notifications/notifications.modal';
import {
  WarningConfig,
  Warning,
  WarningType,
} from '../../modals/warnings/warnings.modal';
import { AppInitialisationService } from '../../services/app-initialisation.service';
import {
  AuthenticationService,
  SignInDetails,
} from '../../services/authentication.service';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { LoadingService } from '../../services/loading.service';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
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
  }

  async onSignIn(formValue: { [key: string]: string }) {
    const signInDetails: SignInDetails = {
      email: formValue['email'],
      password: formValue['password'],
    };
    this.loadingService.setLoading('Signing in');
    await this.authenticationService.userSignIn(signInDetails).then(
      async () => {
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

  async onRegistration(formValue: { [key: string]: string }) {
    const signInDetails: SignInDetails = {
      email: formValue['email'],
      password: formValue['password'],
    };
    this.loadingService.setLoading('Registering');
    await this.authenticationService.userRegistration(signInDetails).then(
      () => {
        this.loadingService.cancelLoading();
        this.notificationConfig = {
          type: NotificationType.REGISTER,
          notification: Notification.REGISTRATION_COMPLETE,
        };
        this.isNotifying = true;
      },
      (error) => {
        this.loadingService.cancelLoading();
        this.warnigConfig = this.errorHandlingService.getWarningConfig(error);
        if (!this.warnigConfig) return;
        if (this.warnigConfig.warning === Warning.INVALID_EMAIL) {
          this.warnigConfig.type = WarningType.REGISTER;
        }
        this.isWarning = true;
      }
    );
  }

  onRegisterPasswordMismatch() {
    this.warnigConfig = {
      type: WarningType.REGISTER,
      warning: Warning.MISMATCHED_PASSWORD,
    };
    this.isWarning = true;
  }

  async onForgotPasswordSubmit(formValue: { [key: string]: string }) {
    const email = formValue['email'];
    await this.authenticationService.resetPassword(email).then(
      () => {
        this.notificationConfig = {
          type: NotificationType.FORGOT_PASSWORD,
          notification: Notification.RESET_PASSWORD_EMAIL_SENT,
        };
        this.isNotifying = true;
        this.currentViewState = ViewState.SIGN_IN;
      },
      (error) => {
        this.warnigConfig = this.errorHandlingService.getWarningConfig(error);
        if (!this.warnigConfig) return;
        this.warnigConfig.type = WarningType.FORGOT_PASSWORD;
        this.isWarning = true;
      }
    );
  }

  onViewStateSelected(viewState: ViewState) {
    this.currentViewState = viewState;
  }

  onNotificationProceed() {
    this.isNotifying = false;
    if (this.currentViewState === ViewState.REGISTER) {
      this.router.navigate(['']);
    }
  }
}
