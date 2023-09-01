import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorModalContent } from '../../modals/error-modal/error-modal.component';
import {
  RegistrationAsUserFirstError,
  UserNotFoundError,
} from './error-handling.constants';

export enum ErrorContext {
  AdminLogin = 'Admin login',
}

export enum ErrorState {
  // Firebase standard
  UserNotFound = 'auth/user-not-found',
  // Follow up
  RegistrationAsUserRequiredFirst = 'registration-as-user-required',
}

export interface ErrorAdditionalDetail {
  email?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  errorModelObs$: BehaviorSubject<ErrorModalContent> = new BehaviorSubject(
    {} as ErrorModalContent
  );
  errorModalContent = this.errorModelObs$.asObservable();

  handleDefinedError(error: ErrorState, detail?: ErrorAdditionalDetail): void {
    let errorContent = {} as ErrorModalContent;
    switch (error) {
      case ErrorState.UserNotFound:
        errorContent = UserNotFoundError;
        errorContent.subtitle = detail ? detail.email : '';
        errorContent.options[0].action.followUpError =
          ErrorState.RegistrationAsUserRequiredFirst;
        break;

      case ErrorState.RegistrationAsUserRequiredFirst:
        errorContent = RegistrationAsUserFirstError;
        errorContent.options[0].action.newRoute = '/register';
    }

    this.errorModelObs$.next(errorContent);
  }

  handleUndefinedError(
    context: ErrorContext,
    errorCode: unknown,
    errorMessage: unknown
  ): void {
    console.log(context);
    console.log(errorCode);
    console.log(errorMessage);
  }
}
