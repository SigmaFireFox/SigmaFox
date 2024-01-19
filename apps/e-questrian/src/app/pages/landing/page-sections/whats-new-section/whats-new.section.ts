import { Component, EventEmitter, Output } from '@angular/core';

export const BackgroundColours = [
  'lime',
  'crimson',
  'coral',
  'hotpink',
  'yellow',
  'cyan',
];

export interface WhatsNewScreenContent {
  image: string;
  content: string;
}

@Component({
  selector: 'e-questrian-whats-new-section',
  templateUrl: './whats-new.section.html',
  styleUrls: ['./whats-new.section.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class WhatsNewSection {
  @Output() scrollToNextScreen = new EventEmitter<void>();

  screens: WhatsNewScreenContent[] = [
    {
      image: 'horse-head-icon.png',
      content: 'ksjdhfkshdkfjhs',
    },
  ];

  screenCounter = 0;
  currentHeader = 'Whats new? \n (Product updates)';
  currentCopy = '';
  currentImage = '';

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

    this.currentCopy = this.screens[this.screenCounter].content;
    this.currentImage =
      './../../../../../assets/landing-page-content/other-images/' +
      this.screens[this.screenCounter].image;
  }
}
