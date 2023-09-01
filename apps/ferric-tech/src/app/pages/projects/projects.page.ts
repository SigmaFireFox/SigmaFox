import { Component, OnInit } from '@angular/core';
import { CarouselOption } from 'src/app/components/carousel/carousel.component';
import {
  Button,
  ButtonAction,
  ButtonType,
} from 'src/app/interfaces/widgets.interface';
import { CarouselScreenConfig } from 'src/app/screens/carousel/carousel.screen';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  screenConfig = {} as CarouselScreenConfig;

  constructor() {}

  ngOnInit(): void {
    this.screenConfig = {} as CarouselScreenConfig;
    this.setScreenTile();
    this.setCarouselOptions();
    this.setScreenButtons();
  }

  private setScreenTile() {
    this.screenConfig.screenTitle = '';
  }

  private setCarouselOptions() {
    this.screenConfig.carouselOptions = [
      {
        image: '../../../assets/myDayGoal-logo.png',
        buttons: [
          {
            text: 'Go to myDayGoal',
            type: ButtonType.PRIMARY,
            action: ButtonAction.NAVIGATE,
            url: 'https://mydaygoal.firebaseapp.com/',
            internalUrl: false,
          },
        ],
      },
      {
        image: '../../../assets/equestrian-logo.png',
        buttons: [
          {
            text: 'Go to e-Questrian',
            type: ButtonType.PRIMARY,
            action: ButtonAction.NAVIGATE,
            url: 'https://e-questrian.web.app/home',
            internalUrl: false,
          },
        ],
      },
      {
        title: 'Go to Negocio',
        image: '../../../assets/negocio-logo.jpeg',
        buttons: [
          {
            text: 'Go to Negocio',
            type: ButtonType.PRIMARY,
            action: ButtonAction.NAVIGATE,
            url: 'https://negocio-3df71.firebaseapp.com/',
            internalUrl: false,
          },
        ],
      },
    ];
  }

  private setScreenButtons() {
    this.screenConfig.buttons = [
      {
        type: ButtonType.SECONDARY,
        text: 'Back to Home Page',
        action: ButtonAction.NAVIGATE,
        url: '',
        internalUrl: true,
      },
    ];
  }
}
