import {
  AfterContentInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChange,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonSize,
  ButtonStyleClass,
  StandardButton,
} from 'libs/components/buttons/src';
import { MatIconModule } from '@angular/material/icon';
import {
  FloatingCallToActionButtons,
  ImactHeader,
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
  @Input() floatingCallToActionButtons: FloatingCallToActionButtons | undefined;
  @Input() navigationPanel: NavigationPanel = {} as NavigationPanel;
  @Input() structuredPages: StructuredPageSeries = {} as StructuredPageSeries;

  @Output() scrollToNextScreenClicked = new EventEmitter<void>();
  @Output() floatingCallToActionButtonClicked = new EventEmitter<string>();
  @Output() structuredPageActionButtonClicked = new EventEmitter<string>();

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setDynamicStyling();
  }

  impactHeaderPhaseCounter = 0;
  structuredPageSeriesPhaseCounter = 0;

  headerSwitch = true;
  structuedPageSwitch = true;
  buttonSize = ButtonSize;
  buttonStyleClass = ButtonStyleClass;
  callToActionText = '';
  backgroundContainerDynamicStyling = {};
  headerContainerDynamicStyling = {};
  calltoActionContainerContainerDynamicStyling = {};
  calltoActionContainerDynamicStyling = {};
  navigationButtonsDynamicStyling = {};
  screenContainerDynamicStyling = {};

  private currentColourIndex = 0;

  ngAfterContentInit() {
    if (this.impactHeader.phaseTiming) {
      setInterval(() => {
        this.setNextImapctHeaderContentPhase();
      }, this.impactHeader.phaseTiming);
    }

    if (this.structuredPages.phaseTiming) {
      setInterval(() => {
        this.switchStruturedPagesSeriesScreen();
      }, this.structuredPages.phaseTiming);
    }

    this.setDynamicStyling();
    this.randomiseBackgroundColour();
  }

  onCallToActionButtonClick(buttonID: string) {
    this.floatingCallToActionButtonClicked.emit(buttonID);
  }

  onStructuredPageActionClick(buttonID: string) {
    this.structuredPageActionButtonClicked.emit(buttonID);
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

    if (this.floatingCallToActionButtons) {
      this.calltoActionContainerContainerDynamicStyling = {
        top: `${this.floatingCallToActionButtons.yLocation}%`,
      };
    }
  }

  private setNextImapctHeaderContentPhase() {
    if (!this.impactHeader.alternatingContentPhases) return;

    this.impactHeaderPhaseCounter += 1;
    if (
      this.impactHeaderPhaseCounter ===
      this.impactHeader.alternatingContentPhases
    ) {
      this.impactHeaderPhaseCounter = 0;
    }
    this.headerSwitch = !this.headerSwitch;
  }

  private switchStruturedPagesSeriesScreen() {
    this.structuredPageSeriesPhaseCounter =
      this.structuredPageSeriesPhaseCounter ===
      this.structuredPages.screens.length - 1
        ? 0
        : (this.structuredPageSeriesPhaseCounter += 1);

    this.structuedPageSwitch = !this.structuedPageSwitch;

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
