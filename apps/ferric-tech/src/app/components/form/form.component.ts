/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/component-selector */

import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormValidationService } from '../../services/form-validation.service';
import { WidgetCallBacksService } from '../../services/widget-call-backs.service';

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum FormItemType {
  FREE_TEXT_SHORT,
  FREE_TEXT_LONG,
  SELECT,
}

export interface SelectOption {
  text: string;
  value: any;
}

export interface FormItem {
  type: FormItemType;
  fieldName: string;
  title: string;
  options?: SelectOption[];
  required: boolean;
}

@Component({
  selector: 'app-form-component',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() config: FormItem[] | undefined;

  form = new FormGroup({});
  formItemType = FormItemType;

  constructor(
    private widgetCallBackService: WidgetCallBacksService,
    private formValidationService: FormValidationService
  ) {}

  ngOnInit() {
    this.config?.forEach((item) => {
      const newControl = new FormControl('');
      this.form.addControl(item.fieldName, newControl);
    });
    this.widgetCallBackService.formSubmitted.subscribe((submitted) =>
      submitted ? this.validateForm(this.form.value) : null
    );
  }

  getFormControl(name: string) {
    return this.form.get(name) as FormControl;
  }

  private validateForm(formValues: any) {
    if (!this.config) return;
    this.formValidationService.validate(this.config, formValues);
  }
}
