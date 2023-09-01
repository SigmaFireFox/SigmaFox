/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
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
  selector: 'app-sign-in-screen',
  templateUrl: './sign-in.screen.html',
  styleUrls: ['./sign-in.screen.scss'],
})
export class SignInScreen {
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();
  @Output() viewStateSelected = new EventEmitter<ViewState>();

  menuOptions = [
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

  signInFormConfig: FormConfig = {
    formTitle: '',
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
      {
        fieldDisplay: 'Password',
        fieldName: 'password',
        fieldType: FormFieldType.PASSWORD,
        defaultValue: '',
      },
    ],
    proceedText: 'Sign in',
  };

  onSignInFormSubmitted(formValue: { [key: string]: string }) {
    this.formSubmitted.emit(formValue);
  }

  onViewStateSelected(viewState: ViewState) {
    this.viewStateSelected.emit(viewState);
  }
}
