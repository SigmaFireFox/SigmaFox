/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, Output, EventEmitter } from '@angular/core';
import { FormFieldType } from 'apps/assemble-ez/src/app/enums/form.eum';
import { SettingsPageViewState as ViewState } from 'apps/assemble-ez/src/app/enums/viewstates.enum';
import { FormConfig } from 'apps/assemble-ez/src/app/interfaces/form-screen.interface';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'apps/assemble-ez/src/app/interfaces/menu-screen.interface';

@Component({
  selector: 'app-agent-password-screen',
  templateUrl: './agent-password.screen.html',
  styleUrls: ['./agent-password.screen.scss'],
})
export class AgentPasswordScreen {
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();
  @Output() isPasswordMismatched = new EventEmitter<void>();
  @Output() viewStateSelected = new EventEmitter<number>();

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to passwords menu',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.PASSWORDS_MENU,
    },
  ];

  passwordFormConfig: FormConfig = {
    formTitle: 'Please enter your new agent password below to change it',
    isInExpansionTable: false,
    isDynamic: true,
    canProceed: false,
    proceedBlocked: false,
    canCancel: false,
    fields: [
      {
        fieldDisplay: 'Password',
        fieldName: 'newPassword',
        fieldType: FormFieldType.PASSWORD,
        defaultValue: '',
      },
      {
        fieldDisplay: 'Confirm password',
        fieldName: 'confirmNewPassword',
        fieldType: FormFieldType.PASSWORD,
        defaultValue: '',
      },
    ],
    proceedText: 'Change password',
  };

  onViewStateSelected(viewState: number) {
    this.viewStateSelected.emit(viewState);
  }

  onPasswordFormSubmitted(formValue: { [key: string]: string }) {
    this.passwordsmatch(formValue)
      ? this.formSubmitted.emit(formValue)
      : this.isPasswordMismatched.emit();
  }

  private passwordsmatch(formValue: { [key: string]: string }): boolean {
    return formValue['newPassword'] === formValue['confirmNewPassword'];
  }
}
