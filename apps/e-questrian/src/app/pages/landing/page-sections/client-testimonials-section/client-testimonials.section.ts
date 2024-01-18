import { Component, EventEmitter, Output } from '@angular/core';

export const BackgroundColours = [
  'lime',
  'crimson',
  'coral',
  'hotpink',
  'yellow',
  'cyan',
];

export interface TestimonialScreenContent {
  image: string;
  content: string;
  name: string;
}

@Component({
  selector: 'e-questrian-client-testimonials-section',
  templateUrl: './client-testimonials..section.html',
  styleUrls: ['./client-testimonials..section.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ClientTestimonialsSection {
  @Output() scrollToNextScreen = new EventEmitter<void>();

  screens: TestimonialScreenContent[] = [
    {
      image: 'boschrivier-farm.jpg',
      content:
        'With e-Questrian your are able to move lessions with the slide \
      of a finger, set new lessions in seconds, cancel a lessons and we will \
      handle the paperwork',
      name: 'Boschtivier Farm',
    },
    {
      image: 'cloonlara.png',
      content:
        'Spending hours if not days invoicing your clients - not any more. \
      With our invoice generator - you are able to generate all outstanding \
      invoices in seconds',
      name: 'Cloonlara',
    },
    {
      image: 'honingklip-equestrian.png',
      content:
        'Need a report that you can actually understand? We do those as well. \
      Not only are our reports easy to generate - they are simple enough to actually \
      be of use',
      name: 'Honingklip Equestrian',
    },
    {
      image: 'horse-rides-at-petes.jpg',
      content:
        'Want to see the big picture of your clients and at an individual level? \
      We have that. See clients lessons, accounts, communications and more in one \
      simple view',
      name: 'Horse Rides at Petes',
    },
  ];

  // Make more images here: https://placeit.net/editor/macbook-pro-mockup-with-a-white-iphone-6-in-front-view-a11923?customG_0=s7ehrkdd09&customG_1=s7eht924f4

  screenCounter = 0;
  elementSwitch = false;
  currentHeader = 'How do our Clients feel about us?';
  currentCopy = '';
  currentImage = '';
  currentColourIndex = 0;

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
      './../../../../../assets/landing-page-content/client-logos/' +
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
  }
}
