/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { FormItemType } from '../../components/form/form.component';
import { ButtonType, ButtonAction } from '../../interfaces/widgets.interface';
import { FormScreenConfig } from '../../screens/form/form.screen';
import { PlainTextScreenConfig } from '../../screens/plain-text/plain-text.screen';
import {
  FormValidationError,
  FormValidationService,
} from '../../services/form-validation.service';
import { WidgetCallBacksService } from '../../services/widget-call-backs.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  formScreenConfig = {} as FormScreenConfig;
  celebrationScreenConfig = {} as PlainTextScreenConfig;
  validFormSubmitted = false;
  submittionError = false;
  validationErrors: FormValidationError[] = [];

  constructor(
    private formValidationService: FormValidationService,
    private widgetCallBackService: WidgetCallBacksService
  ) {}

  ngOnInit(): void {
    this.initiliseSubscriptions();
    this.configureFormScreen();
  }

  private initiliseSubscriptions() {
    // For form validation response
    this.formValidationService._validationReponse.subscribe((reponse) => {
      if (!Object.keys(reponse).length) return;
      reponse.isValid
        ? this.configureCelebrationScreen()
        : this.configureValidationWarning(reponse.validationErrors);
    });

    // For modal management
    this.widgetCallBackService._closeClicked.subscribe((closed) => {
      closed ? (this.submittionError = false) : null;
    });
  }

  private configureFormScreen() {
    this.formScreenConfig = {} as FormScreenConfig;
    this.setScreenTile();
    this.setIntroParagraph();
    this.setForm();
    this.setScreenButtons();
  }

  private setScreenTile() {
    this.formScreenConfig.screenTitle = 'Contact us';
  }

  private setIntroParagraph() {
    this.formScreenConfig.introParagraph =
      'This it the form you fill in if you want to contact us';
  }

  private setForm() {
    this.formScreenConfig.form = [
      {
        type: FormItemType.FREE_TEXT_SHORT,
        title: 'Name',
        fieldName: 'name',
        required: true,
      },
      {
        type: FormItemType.FREE_TEXT_SHORT,
        title: 'Email',
        fieldName: 'email',
        required: true,
      },
      {
        type: FormItemType.FREE_TEXT_SHORT,
        title: 'Contact number',
        fieldName: 'contact-number',
        required: false,
      },
      {
        type: FormItemType.SELECT,
        title: 'Topic',
        fieldName: 'topic',
        options: [
          { text: 'Project idea', value: 'Project idea' },
          { text: 'Consultaltion request', value: 'Consultaltion request' },
          { text: 'Seeking work', value: 'Seeking work' },
        ],
        required: true,
      },
      {
        type: FormItemType.FREE_TEXT_LONG,
        title: 'Comment / Additional info',
        fieldName: 'comment',
        required: false,
      },
    ];
  }

  private setScreenButtons() {
    this.formScreenConfig.buttons = [
      {
        type: ButtonType.PRIMARY,
        text: 'Submit form',
        action: ButtonAction.SUMBIT,
      },
      {
        type: ButtonType.SECONDARY,
        text: 'Back to Home Page',
        action: ButtonAction.NAVIGATE,
        url: '',
        internalUrl: true,
      },
    ];
  }

  private configureCelebrationScreen() {
    this.celebrationScreenConfig.screenTitle = 'Form submitted';
    this.celebrationScreenConfig.paragraphs = [
      'Thank you for subitting your contact request - we will be in touch shortly',
    ];
    this.celebrationScreenConfig.buttons = [this.formScreenConfig.buttons[1]];
    this.validFormSubmitted = true;
  }

  private configureValidationWarning(validationErrors: FormValidationError[]) {
    this.validationErrors = validationErrors;
    this.submittionError = true;
  }
}
