import { Component, EventEmitter, Output } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthenticationService } from 'apps/e-questrian/src/app/services/authentication/authentication.service';

@Component({
  selector: 'e-questrian-entry-c2a',
  templateUrl: './entry-c2a.section.html',
  animations: [
    trigger('fade', [
      state('void', style({ color: 'blue', opacity: 0 })),
      state('*', style({ color: 'blue', 'font-weight': 'bold' })),
      transition(':enter', [animate(2000)]),
    ]),
  ],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class EntryCallToActionSection {
  @Output() scrollToNextScreen = new EventEmitter<void>();

  backgroundPath =
    '../../../../../assets/landing-page-content/background-images/holding-mobile-in-jeans.png';
  isLoggedIn = true;

  constructor(private auth: AuthenticationService, private router: Router) {
    this.auth.isAuthenticated().then((result) => {
      this.isLoggedIn = result;
    });
  }

  scrollToNext() {
    this.scrollToNextScreen.emit();
  }
}
