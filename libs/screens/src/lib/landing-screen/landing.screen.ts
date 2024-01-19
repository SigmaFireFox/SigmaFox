import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonSize, StandardButton } from '@sigmafox/buttons';
import { Router } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [CommonModule, StandardButton, MatIconModule],
  selector: 'sigmafox-landing-screen',
  templateUrl: './landing.screen.html',
  styleUrls: ['./landing.screen.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ color: 'blue', opacity: 0 })),
      state('*', style({ color: 'blue', 'font-weight': 'bold' })),
      transition(':enter', [animate(2000)]),
    ]),
  ],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LandingScreen implements OnInit, AfterContentInit {
  @Input() isLoggedIn = false;
  @Input() backgroundPath = '';
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
  backgroundPathStyle = {};

  constructor(private router: Router) {
    setInterval(() => {
      this.switchText();
    }, 3000);
  }

  async ngOnInit() {
    this.callToActionText = this.isLoggedIn
      ? 'To Dashboard'
      : 'Register for Free Demo';
  }

  ngAfterContentInit() {
    if (this.backgroundPath) {
      this.backgroundPathStyle = {
        'background-image': `url('${this.backgroundPath}')`,
      };
    }
    console.log(this.backgroundPathStyle);
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
