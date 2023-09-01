import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import {
  Button,
  ButtonAction,
  ButtonType,
} from 'src/app/interfaces/widgets.interface';
import {
  FormValidationError,
  FormValidationErrorType,
} from 'src/app/services/form-validation.service';
import { WidgetCallBacksService } from 'src/app/services/widget-call-backs.service';

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
    let cardH = document.getElementById('modal')!.offsetHeight;
    let cardW = document.getElementById('modal')!.offsetWidth;
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
