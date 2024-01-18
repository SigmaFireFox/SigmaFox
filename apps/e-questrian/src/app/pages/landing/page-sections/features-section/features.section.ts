import { Component, EventEmitter, Output } from '@angular/core';

export const BackgroundColours = [
  'lime',
  'crimson',
  'coral',
  'hotpink',
  'yellow',
  'cyan',
];

export interface ScreenContent {
  header: string;
  copy: string;
  image: string;
}

@Component({
  selector: 'e-questrian-features-section',
  templateUrl: './features.section.html',
  styleUrls: ['./features.section.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class FeaturesSection {
  @Output() scrollToNextScreen = new EventEmitter<void>();

  screens: ScreenContent[] = [
    {
      header: 'Manage your day with EASE',
      copy: 'With e-Questrian your are able to move lessions with the slide \
      of a finger, set new lessions in seconds, cancel a lessons and we will \
      handle the paperwork',
      image: 'mock-up-calendar.png',
    },
    {
      header: 'Invoice EVERYONE with a few clicks',
      copy: 'Spending hours if not days invoicing your clients - not any more. \
      With our invoice generator - you are able to generate all outstanding \
      invoices in seconds',
      image: 'mock-up-invoice-generator.png',
    },
    {
      header: 'Generate USEFUL reports in a flash',
      copy: 'Need a report that you can actually understand? We do those as well. \
      Not only are our reports easy to generate - they are simple enough to actually \
      be of use',
      image: 'mock-up-reports.png',
    },
    {
      header: 'Get a HOLISTIC client view',
      copy: 'Want to see the big picture of your clients and at an individual level? \
      We have that. See clients lessons, accounts, communications and more in one \
      simple view',
      image: 'mock-up-reports.png',
    },
  ];

  // Make more images here: https://placeit.net/editor/macbook-pro-mockup-with-a-white-iphone-6-in-front-view-a11923?customG_0=s7ehrkdd09&customG_1=s7eht924f4

  screenCounter = 0;
  elementSwitch = false;
  currentHeader = '';
  currentCopy = '';
  currentImage = '';
  currentColourIndex = 0;
  backgroundColourStyle = {};

  constructor() {
    this.switchScreen();
    setInterval(() => {
      this.switchScreen();
    }, 8000);
  }

  scrollToNext() {
    this.scrollToNextScreen.emit();
  }

  private switchScreen() {
    this.screenCounter =
      this.screenCounter === this.screens.length - 1
        ? 0
        : (this.screenCounter += 1);

    this.currentHeader = this.screens[this.screenCounter].header;
    this.currentCopy = this.screens[this.screenCounter].copy;
    this.currentImage =
      './../../../../../assets/landing-page-content/mock-ups/' +
      this.screens[this.screenCounter].image;
    this.elementSwitch = !this.elementSwitch;

    this.randomiseBackgroundColour();
  }

  private randomiseBackgroundColour() {
    let colourIndex = 0;
    while (this.currentColourIndex === colourIndex) {
      colourIndex = Math.floor(
        Math.random() * (BackgroundColours.length - 0) + 0
      ); // The maximum is exclusive and the minimum is inclusive
    }
    this.currentColourIndex = colourIndex;
    this.backgroundColourStyle = {
      'background-color': BackgroundColours[this.currentColourIndex],
      opacity: '0.8',
    };
  }
}
