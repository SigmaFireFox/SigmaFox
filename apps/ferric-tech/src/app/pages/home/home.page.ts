/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { ButtonType, ButtonAction } from '../../interfaces/widgets.interface';
import { CarouselScreenConfig } from '../../screens/carousel/carousel.screen';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  screenConfig = {} as CarouselScreenConfig;

  ngOnInit(): void {
    this.screenConfig = {} as CarouselScreenConfig;
    this.setScreenTile();
    this.setCarouselOptions();
  }

  private setScreenTile() {
    this.screenConfig.screenTitle = '';
  }

  private setCarouselOptions() {
    this.screenConfig.carouselOptions = [
      {
        image: '../../../assets/projects-image.jpg',
        buttons: [
          {
            text: 'View our Projects',
            type: ButtonType.PRIMARY,
            action: ButtonAction.NAVIGATE,
            url: '/projects',
            internalUrl: true,
          },
        ],
      },
      {
        title: 'Learn about us',
        image: '../../../assets/about-us-image.jpg',
        buttons: [
          {
            text: 'Learn about us',
            type: ButtonType.PRIMARY,
            action: ButtonAction.NAVIGATE,
            url: '/about',
            internalUrl: true,
          },
        ],
      },
      {
        title: 'Get in touch',
        image: '../../../assets/contact-us-image.jpg',
        buttons: [
          {
            text: 'Get in touch',
            type: ButtonType.PRIMARY,
            action: ButtonAction.NAVIGATE,
            url: '/contact',
            internalUrl: true,
          },
        ],
      },
    ];
  }
}
