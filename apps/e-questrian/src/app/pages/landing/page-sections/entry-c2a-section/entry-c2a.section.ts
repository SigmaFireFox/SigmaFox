/* eslint-disable @nx/enforce-module-boundaries */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  EffectType,
  FloatingCallToActionButtons,
  ImactHeader,
  NavigationPanel,
  SidePadding,
} from '@sigmafox/screens';
import { ButtonSize, ButtonStyleClass } from 'libs/components/buttons/src';
import {
  Alignment,
  NavigationButtonSize,
} from 'libs/screens/src/lib/landing-screen/models/enums';
import { AppRoutePaths } from 'apps/e-questrian/src/app/models/routing.enum';

export enum Buttons {
  Register = 'register',
  SignIn = 'sign-in',
}

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
export class EntryCallToActionSection implements OnInit {
  @Output() scrollToNextScreenClicked = new EventEmitter<void>();

  isLoggedIn = false;
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

  floatingCallToActionButtons: FloatingCallToActionButtons = {
    yLocation: 50,
    buttons: [
      {
        buttonID: Buttons.Register,
        buttonSize: ButtonSize.Large,
        buttonTextContent: '',
        buttonStyleClass: ButtonStyleClass.Primary,
        isDisabled: false,
      },
    ],
  };

  navigationPanel: NavigationPanel = {
    nextScreen: NavigationButtonSize.Medium,
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.auth.isAuthenticated().then((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
      this.floatingCallToActionButtons.buttons[0].buttonTextContent = this
        .isLoggedIn
        ? 'To Dashboard'
        : 'Register for Free Demo';
      if (!this.isLoggedIn) {
        this.floatingCallToActionButtons.buttons.push({
          buttonID: Buttons.SignIn,
          buttonLabel: 'Already registered?',
          buttonSize: ButtonSize.Large,
          buttonTextContent: 'Sign in',
          buttonStyleClass: ButtonStyleClass.Secondary,
          isDisabled: false,
        });
      }
    });
  }

  floatingCallToActionButtonClicked(buttonID: string) {
    switch (buttonID) {
      case Buttons.Register: {
        this.isLoggedIn
          ? this.router.navigate([AppRoutePaths.Dashboard])
          : this.router.navigate([AppRoutePaths.Register]);
        break;
      }
      case Buttons.SignIn: {
        this.router.navigate([AppRoutePaths.SignIn]);
      }
    }
  }

  scrollToNextScreen() {
    this.scrollToNextScreenClicked.emit();
  }
}
