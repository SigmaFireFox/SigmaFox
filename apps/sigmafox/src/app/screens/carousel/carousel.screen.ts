/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CarouselOption } from '../../components/carousel/carousel.component';
import { Button, ButtonType } from '../../interfaces/widgets.interface';
import { WidgetCallBacksService } from '../../services/widget-call-backs.service';

export interface CarouselScreenConfig {
  screenTitle: string;
  carouselOptions: CarouselOption[];
  buttons: Button[];
}

@Component({
  selector: 'app-carousel-screen',
  templateUrl: './carousel.screen.html',
  styleUrls: ['./carousel.screen.scss'],
})
export class CarouselScreen {
  @Input() config = {} as CarouselScreenConfig;

  buttonType = ButtonType;
  buttonWidth: string | undefined;

  constructor(
    private widgetCallBackService: WidgetCallBacksService,
    private cd: ChangeDetectorRef
  ) {}

  onButtonClick(button: Button) {
    this.widgetCallBackService.actionButton(button);
  }

  setButtonWidth(width: number) {
    this.buttonWidth = width ? width + 'px' : '0px';
    this.cd.detectChanges();
  }
}
