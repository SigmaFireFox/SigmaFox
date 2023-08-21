import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormFieldType } from 'app/enums/form.eum';
import { SettingsPageViewState as ViewState } from 'app/enums/viewstates.enum';
import { FormConfig } from 'app/interfaces/form-screen.interface';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';

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
