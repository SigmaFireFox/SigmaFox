/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { Button, ButtonType } from '../../interfaces/widgets.interface';
import { WidgetCallBacksService } from '../../services/widget-call-backs.service';

export interface PlainTextScreenConfig {
  screenTitle: string;
  paragraphs: string[];
  buttons: Button[];
}

@Component({
  selector: 'app-plain-text-screen',
  templateUrl: './plain-text.screen.html',
  styleUrls: ['./plain-text.screen.scss'],
})
export class PlainTextScreen {
  @Input() config = {} as PlainTextScreenConfig;

  buttonType = ButtonType;

  constructor(private widgetCallBackService: WidgetCallBacksService) {}

  onButtonClick(button: Button) {
    this.widgetCallBackService.actionButton(button);
  }
}
