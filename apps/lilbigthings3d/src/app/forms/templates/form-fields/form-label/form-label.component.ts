/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { AppField } from '../../../models/form-template.interface';
import { AppFieldType } from '../../../models/form-templates.enum';

@Component({
  selector: 'app-form-label',
  templateUrl: './form-label.component.html',
  styleUrls: ['./form-label.component.scss'],
})
export class FormLabelComponent {
  @Input() field: AppField | undefined;

  formFieldType = AppFieldType;
}
