import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormFieldType } from 'app/enums/form.eum';
import { SignInPageViewState as ViewState } from 'app/enums/viewstates.enum';
import { FormConfig } from 'app/interfaces/form-screen.interface';
import {
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { SignInPage } from '../../sign-in.page';

@Component({
  selector: 'app-register-screen',
  templateUrl: './register.screen.html',
  styleUrls: ['./register.screen.scss'],
})
export class RegisterScreen implements OnInit {
  @Output() formSubmitted = new EventEmitter<{
    [key: string]: string;
  }>();
  @Output() isPasswordMismatched = new EventEmitter<void>();
  @Output() viewStateSelected = new EventEmitter<ViewState>();

  viewState = ViewState;
  registrationFormValue = {};
  constructor(private signInPage: SignInPage) {}

  registerFormConfig = {} as FormConfig;

  menuOptions = [
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to Sign in',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.SIGN_IN,
    },
  ];

  ngOnInit() {
    this.registerFormConfig = {
      formTitle: '',
      isInExpansionTable: false,
      isDynamic: false,
      canProceed: false,
      proceedBlocked: false,
      canCancel: false,
      fields: [
        {
          fieldDisplay: 'First name',
          fieldName: 'firstName',
          fieldType: FormFieldType.INPUT_GENERAL,
          defaultValue: '',
        },
        {
          fieldDisplay: 'Last name',
          fieldName: 'lastName',
          fieldType: FormFieldType.INPUT_GENERAL,
          defaultValue: '',
        },
        {
          fieldDisplay: 'Email',
          fieldName: 'email',
          fieldType: FormFieldType.INPUT_GENERAL,
          defaultValue: '',
        },
        {
          fieldDisplay: 'Contact number',
          fieldName: 'contactNumber',
          fieldType: FormFieldType.INPUT_GENERAL,
          defaultValue: '',
        },
        {
          fieldDisplay: 'Password',
          fieldName: 'password',
          fieldType: FormFieldType.PASSWORD,
          defaultValue: '',
        },
        {
          fieldDisplay: 'Confirm password',
          fieldName: 'confirmPassword',
          fieldType: FormFieldType.PASSWORD,
          defaultValue: '',
        },
      ],
      proceedText: 'Register',
    };
  }

  onPasswordMismatch() {
    this.isPasswordMismatched.emit();
  }

  onRegisterFormSubmitted(formValue: { [key: string]: string }) {
    this.passwordsmatch(formValue)
      ? this.formSubmitted.emit(formValue)
      : this.isPasswordMismatched.emit();
    return;
  }

  onViewStateSelected(viewState: ViewState) {
    this.viewStateSelected.emit(viewState);
  }

  private passwordsmatch(formValue: { [key: string]: string }): boolean {
    return formValue['password'] === formValue['confirmPassword'];
  }
}
