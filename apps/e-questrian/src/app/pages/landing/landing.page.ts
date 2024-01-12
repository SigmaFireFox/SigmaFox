import { Component } from '@angular/core';
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
      state('void', style({ color: 'aqua', opacity: 0 })),
      state('*', style({ color: 'aqua', 'font-weight': 'bold' })),
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

  constructor() {
    setInterval(() => {
      this.swithText();
    }, 3000);
  }

  private swithText() {
    this.textCounter += 1;
    if (this.textCounter === this.alternatingText.length) {
      this.textCounter = 0;
    }
    this.elementSwitch = !this.elementSwitch;
  }
}
