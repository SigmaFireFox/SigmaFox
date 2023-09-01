/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import {
  AppFormConfig,
  AppFieldType,
} from '../../shared/dynamic-form/dynamic-form.component';
import {
  ButtonAction,
  ButtonStyle,
  AppButtonConfig,
} from '../../widgets/button/button.component';
import { ValidatiorType } from '../../widgets/text-input/text-input.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  formResults: Record<string, string> = {};
  loginForm: AppFormConfig = {
    header: 'Log in',
    fields: [
      {
        name: 'userNameOrEmail',
        type: AppFieldType.TextInput,
        placeholder: 'User name or Email',
        validators: [
          {
            validationFunction: Validators.required,
            validationType: ValidatiorType.Required,
            errorMsg: 'Username or email is required',
          },
        ],
      },
      {
        name: 'password',
        type: AppFieldType.TextInput,
        placeholder: 'Password',
        validators: [
          {
            validationFunction: Validators.required,
            validationType: ValidatiorType.Required,
            errorMsg: 'Password is required',
          },
        ],
      },
    ],
    buttons: [
      {
        action: ButtonAction.PrimarySubmit,
        text: 'Log in',
        style: ButtonStyle.Primary,
        disabled: true,
      },
      {
        action: ButtonAction.SecondarySubmit,
        text: 'Register',
        style: ButtonStyle.Secondary,
        disabled: true,
      },
    ],
  };

  constructor(private readonly authService: AuthenticationService) {}

  onFormResultsReceived(formResults: Record<string, string>) {
    this.formResults = formResults;
  }

  onButtonClicked(button: AppButtonConfig) {
    if (!this.formResults['userNameOrEmail'] || !this.formResults['password'])
      return;

    switch (button.action) {
      case ButtonAction.PrimarySubmit: {
        this.authService.signInWithUserNameOrEmail(
          this.formResults['userNameOrEmail'],
          this.formResults['password']
        );
        break;
      }
      case ButtonAction.SecondarySubmit: {
        // TODO Register user
      }
    }
  }
}
