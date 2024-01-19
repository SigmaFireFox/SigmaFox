import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonSize } from '@sigmafox/buttons';

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
  content: string[];
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
      content: [
        'At e-Questrian, we acknowledge that no app can ever \
      be perfect and that users will always a little something extra \
      here and a little something extra there, and we are okay with \
      that. We have the view that the perfect app is not a distination \
      - its a journey, and one we love taking.',
        'So in light of our philosophy we endevour to constantly improve \
      our app to meet the needs our users with out making the app more \
      difficult to use. So we are constantly making changes and improvements.',
        'If you are curious to what are the latest changes we have made - \
      please feel free to view our change logs ',
      ],
    },
  ];

  buttonSize = ButtonSize;
  screenCounter = 0;
  currentHeader = 'Whats new? \n (Product updates)';
  currentCopy: string[] = [];
  currentImage = '';
  callToActionText = 'View change logs';

  constructor(private router: Router) {
    this.switchScreen();
    setInterval(() => {
      this.switchScreen();
    }, 8000);
  }

  scrollToNext() {
    this.scrollToNextScreen.emit();
  }

  callToActionClick() {
    throw new Error('Method not implemented.');
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
