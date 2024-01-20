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
import { CallToActionButton, EffectType, ImactHeader } from '@sigmafox/screens';
import { ButtonSize, ButtonStyleClass } from '@sigmafox/buttons';

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

  isLoggedIn = true;
  backgroundPath =
    '../../../../../assets/landing-page-content/background-images/holding-mobile-in-jeans.png';
  impactHeader: ImactHeader = {
    lines: [
      [
        { content: ['Manage '] },
        {
          content: [
            'Clients',
            'Lessons',
            'Accounts',
            'Staff',
            'Livestock',
            'Liveries',
          ],
          effect: EffectType.Fade,
        },
      ],
      [{ content: ['within'] }],
      [{ content: ['the palm'] }],
      [{ content: ['of your hands'] }],
    ],
    alternatingContentPhases: 6,
  };
  callToActionButton: CallToActionButton = {
    buttonSize: ButtonSize.Large,
    text: '',
    buttonStyleClass: ButtonStyleClass.Primary,
  };

  constructor(private auth: AuthenticationService, private router: Router) {
    this.auth.isAuthenticated().then((result) => {
      this.isLoggedIn = result;
      this.callToActionButton.text = this.isLoggedIn
        ? 'To Dashboard'
        : 'Register for Free Demo';
    });
  }

  onCallToActionButtonClicked() {
    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  scrollToNext() {
    this.scrollToNextScreen.emit();
  }
}
