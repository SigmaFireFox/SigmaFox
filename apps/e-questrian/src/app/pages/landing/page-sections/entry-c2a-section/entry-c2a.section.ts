/* eslint-disable @nx/enforce-module-boundaries */
import { Component, EventEmitter, Output } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';
import { AuthenticationService } from 'apps/e-questrian/src/app/services/authentication/authentication.service';
import {
  CallToActionButton,
  EffectType,
  ImactHeader,
  NavigationPanel,
  SidePadding,
} from '@sigmafox/screens';
import { ButtonSize, ButtonStyleClass } from '@sigmafox/buttons';
import {
  Alignment,
  NavigationButtonSize,
} from 'libs/screens/src/lib/landing-screen/models/enums';
import { FloatingCallToActionButton } from 'libs/screens/src/lib/landing-screen/models/interfaces';

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
  @Output() scrollToNextScreenClicked = new EventEmitter<void>();

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
          effect: EffectType.FadeIn,
        },
      ],
      [{ content: ['within'] }],
      [{ content: ['the palm'] }],
      [{ content: ['of your hands'] }],
    ],
    alternatingContentPhases: 6,
    phaseTiming: 3000,
    sidePadding: SidePadding.Medium,
    alignment: Alignment.Left,
    yLocation: 10,
  };

  floatingCallToActionButton: FloatingCallToActionButton = {
    buttonConfig: {
      buttonID: 'c2a-button',
      buttonSize: ButtonSize.Large,
      buttonTextContent: '',
      buttonStyleClass: ButtonStyleClass.Primary,
      isDisabled: false,
    },
    yLocation: 60,
  };

  navigationPanel: NavigationPanel = {
    nextScreen: NavigationButtonSize.Medium,
  };

  constructor(private auth: AuthenticationService, private router: Router) {
    this.auth.isAuthenticated().then((result) => {
      this.floatingCallToActionButton.buttonConfig.buttonTextContent = result
        ? 'To Dashboard'
        : 'Register for Free Demo';
    });
  }

  floatingCallToActionButtonClicked() {
    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  scrollToNextScreen() {
    this.scrollToNextScreenClicked.emit();
  }
}
