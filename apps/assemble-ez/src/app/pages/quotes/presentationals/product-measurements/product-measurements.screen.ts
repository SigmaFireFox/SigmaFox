/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Output } from '@angular/core';
import { FormFieldType } from 'apps/assemble-ez/src/app/enums/form.eum';
import { FormConfig } from 'apps/assemble-ez/src/app/interfaces/form-screen.interface';

@Component({
  selector: 'app-product-measurements-screen',
  templateUrl: './product-measurements.screen.html',
  styleUrls: ['./product-measurements.screen.scss'],
})
export class ProductMeasurementsScreen {
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();

  productMeasurementFormConfig: FormConfig = {
    formTitle: 'Provide product measurements',
    isInExpansionTable: false,
    isDynamic: false,
    canProceed: false,
    proceedBlocked: false,
    fields: [
      {
        fieldDisplay: 'Width (mm)',
        fieldName: 'width',
        fieldType: FormFieldType.INPUT_WHOLE_NUMBER,
        defaultValue: 0,
      },
      {
        fieldDisplay: 'Projection (mm)',
        fieldName: 'projection',
        fieldType: FormFieldType.INPUT_WHOLE_NUMBER,
        defaultValue: 0,
      },
    ],
    proceedText: 'Proceed',
  };

  onProductMeasurementFormSubmitted(formValue: { [key: string]: string }) {
    this.formSubmitted.emit(formValue);
  }
}
