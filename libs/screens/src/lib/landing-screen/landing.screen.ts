import {
  AfterContentInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonSize, StandardButton } from '@sigmafox/buttons';
import { MatIconModule } from '@angular/material/icon';
import {
  ImactHeader,
  FloatingCallToActionButton,
  NavigationPanel,
  StructuredPageSeries,
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
  @Input() floatingCallToActionButton: FloatingCallToActionButton | undefined;
  @Input() navigationPanel: NavigationPanel = {} as NavigationPanel;
  @Input() structuredPages: StructuredPageSeries = {} as StructuredPageSeries;

  @Output() scrollToNextScreenClicked = new EventEmitter<void>();
  @Output() floatingCallToActionButtonClicked = new EventEmitter<void>();
  @Output() structuredPageActionButtonClicked = new EventEmitter<void>();

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setDynamicStyling();
  }

  impactHeaderPhaseCounter = 0;
  structuredPageSeriesPhaseCounter = 0;

  elementSwitch = true;
  buttonSize = ButtonSize;
  callToActionText = '';
  backgroundContainerDynamicStyling = {};
  headerContainerDynamicStyling = {};
  calltoActionContainerDynamicStyling = {};
  navigationButtonsDynamicStyling = {};
  screenContainerDynamicStyling = {};

  private currentColourIndex = 0;

  ngAfterContentInit() {
    setInterval(() => {
      this.setNextImapctHeaderConentPhase();
    }, this.impactHeader.phaseTiming);

    if (Object.keys(this.structuredPages).length) {
      setInterval(() => {
        this.switchStruturedPagesSeriesScreen();
      }, this.structuredPages.phaseTiming);
    }

    this.setDynamicStyling();
    this.randomiseBackgroundColour();
  }

  onCallToActionButtonClick() {
    this.floatingCallToActionButtonClicked.emit();
  }

  onStructuredPageActionClick() {
    this.structuredPageActionButtonClicked.emit();
  }

  scrollToNextScreen() {
    this.scrollToNextScreenClicked.emit();
  }

  private setDynamicStyling() {
    if (this.backgroundPath) {
      this.backgroundContainerDynamicStyling = {
        'background-image': `url('${this.backgroundPath}')`,
        opacity: '0.5',
      };
    }

    const requiredWidth =
      window.innerWidth >= 900
        ? `${900 * ((100 - this.impactHeader.sidePadding * 2) / 100)}px`
        : `calc(100% - (${this.impactHeader.sidePadding}vw * 2))`;

    this.headerContainerDynamicStyling = {
      margin: `6% ${this.impactHeader.sidePadding}vw 0 ${this.impactHeader.sidePadding}vw`,
      width: requiredWidth,
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
      const requiredWidthAndHeight =
        window.innerWidth >= 900
          ? `${this.navigationPanel.nextScreen * (900 / window.innerWidth)}vw`
          : `${this.navigationPanel.nextScreen}vw`;
      this.navigationButtonsDynamicStyling = {
        height: requiredWidthAndHeight,
        width: requiredWidthAndHeight,
      };
    }

    if (this.floatingCallToActionButton) {
      this.calltoActionContainerDynamicStyling = {
        top: `${this.floatingCallToActionButton.yLocation}%`,
      };
    }
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

  private switchStruturedPagesSeriesScreen() {
    this.structuredPageSeriesPhaseCounter =
      this.structuredPageSeriesPhaseCounter ===
      this.structuredPages.screens.length - 1
        ? 0
        : (this.structuredPageSeriesPhaseCounter += 1);

    this.elementSwitch = !this.elementSwitch;

    this.randomiseBackgroundColour();
  }

  private randomiseBackgroundColour() {
    if (!this.structuredPages.backgroundColours) return;

    let colourIndex = 0;
    while (this.currentColourIndex === colourIndex) {
      colourIndex = Math.floor(
        Math.random() * (this.structuredPages.backgroundColours.length - 0) + 0
      ); // The maximum is exclusive and the minimum is inclusive
    }
    this.currentColourIndex = colourIndex;
    this.backgroundContainerDynamicStyling = {
      'background-color':
        this.structuredPages.backgroundColours[this.currentColourIndex],
      opacity: `${this.structuredPages.opacity}`,
    };
  }
}
