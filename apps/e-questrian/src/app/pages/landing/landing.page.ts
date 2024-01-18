import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ButtonSize } from '@sigmafox/buttons';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'e-questrian-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ color: 'blue', opacity: 0 })),
      state('*', style({ color: 'blue', 'font-weight': 'bold' })),
      transition(':enter', [animate(2000)]),
    ]),
  ],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LandingPage {
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
      this.swithText();
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

  scrollToNextScreen(target: HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth' });
  }

  private swithText() {
    this.textCounter += 1;
    if (this.textCounter === this.alternatingText.length) {
      this.textCounter = 0;
    }
    this.elementSwitch = !this.elementSwitch;
  }
}
