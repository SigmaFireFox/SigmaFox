import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  screens: ScreenContent[] = [
    {
      header: 'Manage your day with ease',
      copy: 'We give a bit of a longer story here to the user to know what the feature is',
      image: 'mock-up-calendar.png',
    },
    {
      header: 'Another story',
      copy: 'Another spiel about how great our stuff is',
      image: 'mock-up-calendar.png',
      // Make more images here: https://placeit.net/editor/macbook-pro-mockup-with-a-white-iphone-6-in-front-view-a11923?customG_0=s7ehrkdd09&customG_1=s7eht924f4
    },
  ];
  screenCounter = 0;
  elementSwitch = false;
  currentHeader = '';
  currentCopy = '';
  currentImage = '';
  currentColourIndex = 0;
  backgroundColourStyle = {};

  constructor(private router: Router) {
    this.switchScreen();
    setInterval(() => {
      this.switchScreen();
    }, 5000);
  }

  private switchScreen() {
    this.screenCounter =
      this.screenCounter === this.screens.length - 1
        ? 0
        : (this.screenCounter += 1);

    this.currentHeader = this.screens[this.screenCounter].header;
    this.currentCopy = this.screens[this.screenCounter].copy;
    this.currentImage =
      './../../../../../assets/' + this.screens[this.screenCounter].image;
    this.elementSwitch = !this.elementSwitch;

    this.randomiseBackgroundColour();
  }

  randomiseBackgroundColour() {
    let colourIndex = 0;
    while (this.currentColourIndex === colourIndex) {
      colourIndex = Math.floor(
        Math.random() * (BackgroundColours.length - 0) + 0
      ); // The maximum is exclusive and the minimum is inclusive
    }
    this.currentColourIndex = colourIndex;
    this.backgroundColourStyle = {
      'background-color': BackgroundColours[this.currentColourIndex],
    };
  }
}
