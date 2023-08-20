import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RegisterScreenViewState as ViewState } from 'app/enums/viewstates.enum';
import { SignInPage } from '../../sign-in.page';

@Component({
  selector: 'app-register-flow',
  templateUrl: './register.flow.html',
  styleUrls: ['./register.flow.scss'],
})
export class RegisterFlow {
  @Input() currentViewState: ViewState | undefined;
  @Output() basicDetailsFormSubmitted = new EventEmitter<{
    [key: string]: string;
  }>();
  @Output() isPasswordMismatched = new EventEmitter<void>();
  @Output() registrationComplete = new EventEmitter<{
    [key: string]: string;
  }>();

  viewState = ViewState;
  registrationFormValue = {};
  constructor(private signInPage: SignInPage) {}

  ngOnInit() {
    this.currentViewState = ViewState.BASIC;
    this.signInPage._permissionToProceed$.subscribe((permissionGiven) => {
      if (permissionGiven) {
        switch (this.currentViewState) {
          case ViewState.BASIC: {
            this.currentViewState = ViewState.BUSINESS;
          }
        }
      }
    });
  }

  onPasswordMismatch() {
    this.isPasswordMismatched.emit();
  }

  onBasicDetailsSubmitted(formValue: { [key: string]: string }) {
    this.registrationFormValue = formValue;
    this.basicDetailsFormSubmitted.emit(formValue);
  }

  onBusinessDetailsSubmitted(formValue: { [key: string]: string }) {
    this.registrationFormValue = {
      ...this.registrationFormValue,
      ...formValue,
    };
    this.currentViewState = ViewState.CONTACT;
  }

  onContactDetailsSubmitted(formValue: { [key: string]: string }) {
    this.registrationFormValue = {
      ...this.registrationFormValue,
      ...formValue,
    };
    this.registrationComplete.emit(this.registrationFormValue);
    this.currentViewState = ViewState.SUCCESS;
  }
}
