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
  templateUrl: './client-testimonials.section.html',
  styleUrls: ['./client-testimonials.section.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ClientTestimonialsSection {
  @Output() scrollToNextScreen = new EventEmitter<void>();

  screens: TestimonialScreenContent[] = [
    {
      image: 'boschrivier-farm.jpg',
      content:
        'The app is really great - yeah sure there are features that you \
        would prefer a certain way - but what I love about e-Questrian is \
        that they really do try to go out their way to make the app better \
        for you - so all you need to do is provide the feedback and before \
        you know it - the app is updated as you asked',
      name: 'Boschrivier Farm',
    },
    {
      image: 'cloonlara.png',
      content:
        'This app really does the basics well. Other fancy software is so \
        complicated to use and understand and at the end of the day you only \
        need a fraction of what they offer. e-Questrian does the basics really \
        well and when you are busy running a yard - that is really what you \
        want and need',
      name: 'CloonLara',
    },
    {
      image: 'honingklip-equestrian.png',
      content:
        'To be honest - I have run my business a certain way for many years and \
        was skeptical to try new software, but I had a chat with **** and I \
        have no regrets signing up. Yeah sure, perhaps the way I did things needed \
        to be updated - but I am just so thankful for this app... its saves me hours \
        if not days each month',
      name: 'Honingklip Equestrian',
    },
    {
      image: 'horse-rides-at-petes.jpg',
      content:
        'To be honest I would rather be on an outride then at my desk doing accounts \
        or what ever, and with e-Questrian I really am able to do that now - I mean \
        that is the point to life! This app has been a life change for me',
      name: 'Horse Rides at Petes',
    },
    {
      image: 'pearly-beach-horse-trails.png',
      content:
        'The app is great. Its simple and its great and it does everything I really \
        need. But I love how there are constant improvements made all the time, and \
        not superficial improvements, imrprovements that really add value to my business',
      name: 'Pearly Beach Horse Trails',
    },
    {
      image: 'thandeka-stables.png',
      content:
        'We pride ourselves on being very well organised, but that takes a lot of effort, \
        which means we often have to make the choice to do less for the sake of doing it \
        well. e-Questrain has really had an impact for us in the sense that now we are \
        able to do more in general without sacrificing our standard because this app allows \
        us to be well organised with a lot less effort',
      name: 'Thandeka Stables',
    },
  ];

  screenCounter = 0;
  elementSwitch = false;
  currentHeader = 'How do our Clients feel about us?';
  currentCopy = '';
  currentImage = '';
  currentName = '';

  constructor() {
    this.switchScreen();
    setInterval(() => {
      this.switchScreen();
    }, 80000);
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
    this.currentName = this.screens[this.screenCounter].name;
    this.elementSwitch = !this.elementSwitch;
  }
}
