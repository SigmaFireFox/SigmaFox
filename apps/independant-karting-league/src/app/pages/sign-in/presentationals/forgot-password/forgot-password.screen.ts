/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, Output, EventEmitter } from '@angular/core';
import { FormFieldType } from 'apps/independant-karting-league/src/app/enums/form.eum';
import { SignInPageViewState as ViewState } from 'apps/independant-karting-league/src/app/enums/viewstates.enum';
import { FormConfig } from 'apps/independant-karting-league/src/app/interfaces/form-screen.interface';
import {
  MenuOptionStyle,
  MenuOptionType,
} from 'apps/independant-karting-league/src/app/interfaces/menu-screen.interface';

@Component({
  selector: 'app-forgot-password-screen',
  templateUrl: './forgot-password.screen.html',
  styleUrls: ['./forgot-password.screen.scss'],
})
export class ForgotPasswordScreen {
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();
  @Output() viewStateSelected = new EventEmitter<ViewState>();

  menuOptions = [
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to Sign in',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.SIGN_IN,
    },
  ];

  forgotPasswordFormConfig: FormConfig = {
    formTitle: 'Please enter your registered email to have a reset email sent',
    isInExpansionTable: false,
    isDynamic: false,
    canProceed: false,
    proceedBlocked: false,
    fields: [
      {
        fieldDisplay: 'Email',
        fieldName: 'email',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
    ],
    proceedText: 'Send reset email',
  };

  forgotPasswordFormSubmitted(formValue: { [key: string]: string }) {
    this.formSubmitted.emit(formValue);
  }

  onViewStateSelected(viewState: ViewState) {
    this.viewStateSelected.emit(viewState);
  }
}
