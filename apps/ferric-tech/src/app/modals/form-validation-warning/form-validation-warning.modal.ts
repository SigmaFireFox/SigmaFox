/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import {
  Button,
  ButtonType,
  ButtonAction,
} from '../../interfaces/widgets.interface';
import {
  FormValidationError,
  FormValidationErrorType,
} from '../../services/form-validation.service';
import { WidgetCallBacksService } from '../../services/widget-call-backs.service';

export interface ErrorExplination {
  explination: string;
  errorFields: string[];
}

@Component({
  selector: 'app-form-validation-warning-modal',
  templateUrl: './form-validation-warning.modal.html',
  styleUrls: ['./form-validation-warning.modal.scss'],
})
export class FormValidationWarningModal implements OnInit {
  @Input() validationErrors: FormValidationError[] = [];

  fieldsRequired: string[] = [];
  listOfErrors: ErrorExplination[] = [];
  buttons: Button[] = [];
  buttonType = ButtonType;
  marginTop = '';
  marginLeft = '';

  constructor(
    private widgetCallBackService: WidgetCallBacksService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setButtons();
    this.validationErrors.forEach((error: FormValidationError) => {
      switch (error.errorType) {
        case FormValidationErrorType.REQUIRED: {
          this.fieldsRequired.push(error.fieldName);
          return;
        }
      }
    });
    if (this.fieldsRequired) {
      this.listOfErrors.push({
        explination: 'The following fields are required but were not complete',
        errorFields: this.fieldsRequired,
      });
    }
  }

  ngAfterViewInit() {
    const cardH = document.getElementById('modal')?.offsetHeight;
    const cardW = document.getElementById('modal')?.offsetWidth;
    if (!cardH || !cardW) return;
    this.marginTop = '-' + cardH / 2 + 'px';
    this.marginLeft = '-' + cardW / 2 + 'px';
    this.cd.detectChanges();
  }

  private setButtons() {
    this.buttons = [
      {
        type: ButtonType.PRIMARY,
        text: 'Understood',
        action: ButtonAction.CLOSE,
      },
    ];
  }

  onButtonClick(button: Button) {
    this.widgetCallBackService.actionButton(button);
  }
}
