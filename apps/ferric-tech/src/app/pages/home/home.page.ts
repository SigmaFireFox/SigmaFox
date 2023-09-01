import { Component, OnInit } from '@angular/core';
import { CarouselOption } from 'src/app/components/carousel/carousel.component';
import { ButtonAction, ButtonType } from 'src/app/interfaces/widgets.interface';
import { CarouselScreenConfig } from 'src/app/screens/carousel/carousel.screen';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  screenConfig = {} as CarouselScreenConfig;

  constructor() {}

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
