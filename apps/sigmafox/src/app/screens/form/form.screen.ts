/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { FormItem } from '../../components/form/form.component';
import { Button, ButtonType } from '../../interfaces/widgets.interface';
import { WidgetCallBacksService } from '../../services/widget-call-backs.service';

export interface FormScreenConfig {
  screenTitle: string;
  introParagraph: string;
  form: FormItem[];
  buttons: Button[];
}

@Component({
  selector: 'app-form-screen',
  templateUrl: './form.screen.html',
  styleUrls: ['./form.screen.scss'],
})
export class FormScreen {
  @Input() config = {} as FormScreenConfig;

  formSubmitted: any;
  buttonType = ButtonType;

  constructor(private widgetCallBackService: WidgetCallBacksService) {}

  onButtonClick(button: Button) {
    this.widgetCallBackService.actionButton(button);
  }
}
