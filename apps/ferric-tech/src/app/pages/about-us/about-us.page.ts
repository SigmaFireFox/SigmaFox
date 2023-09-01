/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { ButtonType, ButtonAction } from '../../interfaces/widgets.interface';
import { PlainTextScreenConfig } from '../../screens/plain-text/plain-text.screen';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage {
  screenConfig: PlainTextScreenConfig = {
    screenTitle: 'About us',
    paragraphs: [
      'In world that is ever evolving at a fightening pace, how do you build your \
      technology to stand the test of time?',
      'We at FerricTech has battled with this question all our exsistance and we have \
      learnt that applications built with good solid fundimentals and principles, built \
      for scalabilty and the enevatable evolution of technology those applications last',
      'We believe strong in the priciple of Kaizen - Ever, constant (even if small) \
      improvements. The perfect application will never remain perfect as the world moves \
      forward, but if built right, your application can evolve with the times',
      'So if you are looking a developement house that will keep delivering the perfect \
      application over time - again and again - then you are at the right place',
    ],
    buttons: [
      {
        text: 'Get in touch',
        type: ButtonType.PRIMARY,
        action: ButtonAction.NAVIGATE,
        url: '/contact',
        internalUrl: true,
      },
      {
        type: ButtonType.SECONDARY,
        text: 'Back to Home Page',
        action: ButtonAction.NAVIGATE,
        url: '',
        internalUrl: true,
      },
    ],
  };
}
