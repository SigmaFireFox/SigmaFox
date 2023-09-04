import { ChangeDetectorRef, Component } from '@angular/core';
import { ViewState } from './viewstate.enum';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {
  userEmail = '';
  ViewState = ViewState;
  currentViewState = ViewState.SIGN_IN;

  resetPassword(userEmail?: string) {
    if (userEmail) {
      this.userEmail = userEmail;
    }
    this.currentViewState = ViewState.RESET;
  }

  signIn(signIn: boolean) {
    if (signIn) {
      this.currentViewState = ViewState.SIGN_IN;
    }
  }

  signUp(signUp: boolean) {
    if (signUp) {
      this.currentViewState = ViewState.SIGN_UP;
    }
  }
}
