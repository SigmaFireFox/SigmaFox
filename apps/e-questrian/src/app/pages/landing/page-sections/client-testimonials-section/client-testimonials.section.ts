/* eslint-disable @nx/enforce-module-boundaries */
import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationButtonSize } from 'libs/screens/src/lib/landing-screen/models/enums';
import {
  NavigationPanel,
  StructuredPageSeries,
} from 'libs/screens/src/lib/landing-screen/models/interfaces';

@Component({
  selector: 'e-questrian-client-testimonials-section',
  templateUrl: './client-testimonials.section.html',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ClientTestimonialsSection {
  @Output() scrollToNextScreenClicked = new EventEmitter<void>();

  heading = 'How do our Clients feel about us?';

  structuredPages: StructuredPageSeries = {
    phaseTiming: 8000,
    backgroundColours: ['aqua', 'aqua'],
    opacity: 0.5,
    imagesLocationPath:
      './../../../../../assets/landing-page-content/client-logos/',
    screens: [
      {
        heading: 'How do our Clients feel about us?',
        imageTop: 'boschrivier-farm.jpg',
        bodyTextSpread:
          'The app is really great - yeah sure there are features that you \
        would prefer a certain way - but what I love about e-Questrian is \
        that they really do try to go out their way to make the app better \
        for you - so all you need to do is provide the feedback and before \
        you know it - the app is updated as you asked',
        authorNameText: 'Boschrivier Farm',
      },
      {
        heading: 'How do our Clients feel about us?',
        imageTop: 'cloonlara.png',
        bodyTextSpread:
          'This app really does the basics well. Other fancy software is so \
        complicated to use and understand and at the end of the day you only \
        need a fraction of what they offer. e-Questrian does the basics really \
        well and when you are busy running a yard - that is really what you \
        want and need',
        authorNameText: 'CloonLara',
      },
      {
        heading: 'How do our Clients feel about us?',
        imageTop: 'honingklip-equestrian.png',
        bodyTextSpread:
          'To be honest - I have run my business a certain way for many years and \
        was skeptical to try new software, but I had a chat with **** and I \
        have no regrets signing up. Yeah sure, perhaps the way I did things needed \
        to be updated - but I am just so thankful for this app... its saves me hours \
        if not days each month',
        authorNameText: 'Honingklip Equestrian',
      },
      {
        heading: 'How do our Clients feel about us?',
        imageTop: 'horse-rides-at-petes.jpg',
        bodyTextSpread:
          'To be honest I would rather be on an outride then at my desk doing accounts \
        or what ever, and with e-Questrian I really am able to do that now - I mean \
        that is the point to life! This app has been a life change for me',
        authorNameText: 'Horse Rides at Petes',
      },
      {
        heading: 'How do our Clients feel about us?',
        imageTop: 'pearly-beach-horse-trails.png',
        bodyTextSpread:
          'The app is great. Its simple and its great and it does everything I really \
        need. But I love how there are constant improvements made all the time, and \
        not superficial improvements, imrprovements that really add value to my business',
        authorNameText: 'Pearly Beach Horse Trails',
      },
      {
        heading: 'How do our Clients feel about us?',
        imageTop: 'thandeka-stables.png',
        bodyTextSpread:
          'We pride ourselves on being very well organised, but that takes a lot of effort, \
        which means we often have to make the choice to do less for the sake of doing it \
        well. e-Questrain has really had an impact for us in the sense that now we are \
        able to do more in general without sacrificing our standard because this app allows \
        us to be well organised with a lot less effort',
        authorNameText: 'Thandeka Stables',
      },
    ],
  };

  navigationPanel: NavigationPanel = {
    nextScreen: NavigationButtonSize.Medium,
  };

  scrollToNextScreen() {
    this.scrollToNextScreenClicked.emit();
  }
}
