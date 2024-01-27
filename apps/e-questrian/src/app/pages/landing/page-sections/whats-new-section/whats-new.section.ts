/* eslint-disable @nx/enforce-module-boundaries */
import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonSize, ButtonStyleClass } from '@sigmafox/buttons';
import {
  FloatingCallToActionButton,
  StructuredPageSeries,
} from 'libs/screens/src/lib/landing-screen/models/interfaces';

@Component({
  selector: 'e-questrian-whats-new-section',
  templateUrl: './whats-new.section.html',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class WhatsNewSection {
  @Output() scrollToNextScreen = new EventEmitter<void>();

  structuredPages: StructuredPageSeries = {
    phaseTiming: 0,
    backgroundColours: ['hotpink', 'hotpink'],
    opacity: 0.3,
    imagesLocationPath: './../../../../../assets/logos/',
    screens: [
      {
        heading: 'Whats new? \n (Product updates)',
        imageTop: 'horse-head-icon.png',
        bodyTextCondenced: [
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
        actionButton: {
          buttonID: 'view-logs',
          buttonSize: ButtonSize.Large,
          buttonTextContent: 'View Change Logs',
          buttonStyleClass: ButtonStyleClass.Primary,
          isDisabled: false,
        },
      },
    ],
  };

  scrollToNext() {
    this.scrollToNextScreen.emit();
  }

  onStructuredPageActionButtonClicked() {
    //TODO
  }
}
