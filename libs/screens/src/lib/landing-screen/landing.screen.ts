import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonSize, StandardButton } from '@sigmafox/buttons';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ImactHeader, CallToActionButton } from './models/interfaces';
import { fadeIn } from './models/animations';

@Component({
  standalone: true,
  imports: [CommonModule, StandardButton, MatIconModule],
  selector: 'sigmafox-landing-screen',
  templateUrl: './landing.screen.html',
  styleUrls: ['./landing.screen.scss'],
  animations: [fadeIn],
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
