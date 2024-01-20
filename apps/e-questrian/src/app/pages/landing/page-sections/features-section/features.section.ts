/* eslint-disable @nx/enforce-module-boundaries */
import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationPanel } from '@sigmafox/screens';
import { NavigationButtonSize } from 'libs/screens/src/lib/landing-screen/models/enums';
import { StructuredPageSeries } from 'libs/screens/src/lib/landing-screen/models/interfaces';

@Component({
  selector: 'e-questrian-features-section',
  templateUrl: './features.section.html',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class FeaturesSection {
  @Output() scrollToNextScreenClicked = new EventEmitter<void>();

  structuredPages: StructuredPageSeries = {
    phaseTiming: 8000,
    backgroundColours: [
      'red',
      'orange',
      'yellow',
      'lime',
      'blue',
      'indigo',
      'violet',
    ],
    opacity: 0.5,
    imagesLocationPath:
      './../../../../../assets/landing-page-content/mock-ups/',
    screens: [
      {
        heading: 'Manage your day with EASE',
        subHeading:
          'With e-Questrian your are able to move lessions with the slide \
      of a finger, set new lessions in seconds, cancel a lessons and we will \
      handle the paperwork',
        imageBottom: 'mock-up-calendar.png',
      },
      {
        heading: 'Invoice EVERYONE with a few clicks',
        subHeading:
          'Spending hours if not days invoicing your clients - not any more. \
      With our invoice generator - you are able to generate all outstanding \
      invoices in seconds',
        imageBottom: 'mock-up-invoice-generator.png',
      },
      {
        heading: 'Generate USEFUL reports in a flash',
        subHeading:
          'Need a report that you can actually understand? We do those as well. \
      Not only are our reports easy to generate - they are simple enough to actually \
      be of use',
        imageBottom: 'mock-up-reports.png',
      },
      {
        heading: 'Get a HOLISTIC client view',
        subHeading:
          'Want to see the big picture of your clients and at an individual level? \
      We have that. See clients lessons, accounts, communications and more in one \
      simple view',
        imageBottom: 'mock-up-reports.png',
      },
    ],
  };
  // Make more images here: https://placeit.net/editor/macbook-pro-mockup-with-a-white-iphone-6-in-front-view-a11923?customG_0=s7ehrkdd09&customG_1=s7eht924f4

  navigationPanel: NavigationPanel = {
    nextScreen: NavigationButtonSize.Medium,
  };

  scrollToNextScreen() {
    this.scrollToNextScreenClicked.emit();
  }
}
