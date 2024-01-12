import { ChangeDetectorRef, Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'e-questrian-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate(2000)]),
    ]),
  ],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LandingPage {
  specialText = 'Test 1';

  constructor() {
    setInterval(() => {
      this.swithText();
    }, 5000);
  }

  private swithText() {
    if (this.specialText === 'Test 1') {
      this.specialText = 'Test 2';
    } else {
      this.specialText = 'Test 1';
    }
  }
}
