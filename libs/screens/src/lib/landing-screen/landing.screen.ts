import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonSize, StandardButton } from '@sigmafox/buttons';
import { MatIconModule } from '@angular/material/icon';
import {
  ImactHeader,
  CallToActionButton,
  NavigationPanel,
} from './models/interfaces';
import { fadeIn } from './models/animations';
import { NavigationButtonSize } from './models/enums';

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
  @Input() backgroundPath = '';
  @Input() impactHeader: ImactHeader = {} as ImactHeader;
  @Input() callToActionButton: CallToActionButton = {} as CallToActionButton;
  @Input() navigationPanel: NavigationPanel = {} as NavigationPanel;

  @Output() scrollToNextScreenClickced = new EventEmitter<void>();
  @Output() callToActionButtonClicked = new EventEmitter<void>();

  impactHeaderPhaseCounter = 0;
  elementSwitch = true;
  buttonSize = ButtonSize;
  callToActionText = '';
  backgroundContainerDynamicStyling = {};
  headerContainerDynamicStyling = {};
  calltoActionContainerDynamicStyling = {};
  navigationButtonsDynamicStyling = {};

  ngAfterContentInit() {
    setInterval(() => {
      this.setNextImapctHeaderConentPhase();
    }, this.impactHeader.phaseTiming);
    if (this.backgroundPath) {
      this.backgroundContainerDynamicStyling = {
        'background-image': `url('${this.backgroundPath}')`,
      };
    }
    this.headerContainerDynamicStyling = {
      margin: `6% ${this.impactHeader.sidePadding}vw 0 ${this.impactHeader.sidePadding}vw`,
      'min-width': `calc(100% - (${this.impactHeader.sidePadding}vw * 2))`,
      'align-items': this.impactHeader.alignment,
      top: `${this.impactHeader.yLocation}%`,
    };

    let setNavigationPanel = false;
    Object.values(this.navigationPanel).forEach(
      (value: NavigationButtonSize) => {
        if (value !== NavigationButtonSize.None) {
          setNavigationPanel = true;
        }
      }
    );
    if (setNavigationPanel) {
      this.navigationButtonsDynamicStyling = {
        height: `${this.navigationPanel.nextScreen}vw`,
        width: `${this.navigationPanel.nextScreen}vw`,
      };
    }

    this.calltoActionContainerDynamicStyling = {
      top: `${this.callToActionButton.yLocation}%`,
    };
  }

  onCallToActionButtonClick() {
    this.callToActionButtonClicked.emit();
  }

  scrollToNextScreen() {
    this.scrollToNextScreenClickced.emit();
  }

  private setNextImapctHeaderConentPhase() {
    if (!this.impactHeader.alternatingContentPhases) return;

    this.impactHeaderPhaseCounter += 1;
    if (
      this.impactHeaderPhaseCounter ===
      this.impactHeader.alternatingContentPhases
    ) {
      this.impactHeaderPhaseCounter = 0;
    }
    this.elementSwitch = !this.elementSwitch;
  }
}
