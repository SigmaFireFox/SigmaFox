import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonSize,
  ButtonStyleClass,
  StandardButton,
} from '@sigmafox/buttons';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';

export enum EffectType {
  Fade,
}

export interface ImactHeaderBlock {
  content: string[];
  effect?: EffectType;
}

export interface ImactHeader {
  lines: ImactHeaderBlock[][];
  alternatingContentPhases: number;
}
export interface CallToActionButton {
  buttonSize: ButtonSize;
  text: string;
  buttonStyleClass: ButtonStyleClass;
}

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
export class LandingScreen implements AfterContentInit {
  @Input() isLoggedIn = false;
  @Input() backgroundPath = '';
  @Input() impactHeader: ImactHeader = {
    lines: [],
    alternatingContentPhases: 0,
  };
  @Input() callToActionButton: CallToActionButton = {} as CallToActionButton;

  @Output() scrollToNextScreen = new EventEmitter<void>();
  @Output() callToActionButtonClicked = new EventEmitter<void>();

  textCounter = 0;
  elementSwitch = true;
  buttonSize = ButtonSize;
  callToActionText = '';
  backgroundPathStyle = {};

  constructor(private router: Router) {
    setInterval(() => {
      this.setNextPhaseContent();
    }, 3000);
  }

  ngAfterContentInit() {
    if (this.backgroundPath) {
      this.backgroundPathStyle = {
        'background-image': `url('${this.backgroundPath}')`,
      };
    }
  }

  onCallToActionButtonClick() {
    this.callToActionButtonClicked.emit();
  }

  scrollToNext() {
    this.scrollToNextScreen.emit();
  }

  private setNextPhaseContent() {
    if (!this.impactHeader.alternatingContentPhases) return;

    this.textCounter += 1;
    if (this.textCounter === this.impactHeader.alternatingContentPhases) {
      this.textCounter = 0;
    }
    this.elementSwitch = !this.elementSwitch;
  }
}
