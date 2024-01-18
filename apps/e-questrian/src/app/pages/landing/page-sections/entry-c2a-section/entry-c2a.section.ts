import { Component, EventEmitter, Output } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ButtonSize } from '@sigmafox/buttons';
import { Router } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthenticationService } from 'apps/e-questrian/src/app/services/authentication/authentication.service';

@Component({
  selector: 'e-questrian-entry-c2a',
  templateUrl: './entry-c2a.section.html',
  styleUrls: ['./entry-c2a.section.scss'],
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
  alternatingText = [
    'Clients',
    'Lessons',
    'Accounts',
    'Staff',
    'Livestock',
    'Liveries',
  ];
  textCounter = 0;
  elementSwitch = true;
  buttonSize = ButtonSize;
  callToActionText = '';
  private isLoggedIn = true;

  constructor(private auth: AuthenticationService, private router: Router) {
    setInterval(() => {
      this.switchText();
    }, 3000);
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  async ngOnInit() {
    this.isLoggedIn = await this.auth.isAuthenticated();
    this.callToActionText = this.isLoggedIn
      ? 'To Dashboard'
      : 'Register for Free Demo';
  }

  onSignUpClick() {
    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  scrollToNext() {
    this.scrollToNextScreen.emit();
  }

  private switchText() {
    this.textCounter += 1;
    if (this.textCounter === this.alternatingText.length) {
      this.textCounter = 0;
    }
    this.elementSwitch = !this.elementSwitch;
  }
}
