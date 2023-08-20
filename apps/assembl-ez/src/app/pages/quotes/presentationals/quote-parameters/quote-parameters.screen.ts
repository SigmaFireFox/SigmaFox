import { Component, EventEmitter, Output } from '@angular/core';
import { FormFieldType } from 'app/enums/form.eum';
import { FormConfig } from 'app/interfaces/form-screen.interface';

@Component({
  selector: 'app-quote-parameters-screen',
  templateUrl: './quote-parameters.screen.html',
  styleUrls: ['./quote-parameters.screen.scss'],
})
export class QuoteParametersScreen {
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();

  quoteParametersFormConfig: FormConfig = {
    formTitle: 'Quote parameters',
    isInExpansionTable: false,
    isDynamic: false,
    canProceed: true,
    proceedBlocked: false,
    fields: [
      {
        fieldDisplay: 'Present non-required components',
        fieldName: 'presentNonRequiredComponents',
        fieldType: FormFieldType.CHECKBOX,
        defaultValue: false,
      },
    ],
    proceedText: 'Generate quotes',
  };

  onQuoteParametersFormSubmitted(formValue: { [key: string]: string }) {
    this.formSubmitted.emit(formValue);
  }
}
