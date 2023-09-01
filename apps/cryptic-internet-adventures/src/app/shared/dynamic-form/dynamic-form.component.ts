/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { AppButtonConfig } from '../../widgets/button/button.component';
import { ValidatiorType } from '../../widgets/text-input/text-input.component';

export interface AppFormConfig {
  header: string;
  fields: AppFieldConfig[];
  buttons: AppButtonConfig[];
}

export interface AppFieldConfig {
  name: string;
  type: AppFieldType;
  value?: string;
  placeholder?: string;
  error?: string;
  validators?: AppFormValidationParameter[];
}

export interface AppFormValidationParameter {
  validationFunction: ValidatorFn;
  validationType: ValidatiorType;
  errorMsg: string;
}

export enum AppFieldType {
  TextInput,
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent {
  @Input() formConfig: AppFormConfig | undefined;
  @Output() formResults = new EventEmitter<Record<string, string>>();
  @Output() buttonClicked = new EventEmitter<AppButtonConfig>();

  form = new FormGroup({});
  appFieldType = AppFieldType;

  ngOnInit() {
    this.setUpForm();
  }

  private setUpForm() {
    if (!this.formConfig) return;
    for (const field of this.formConfig?.fields) {
      const validators: ValidatorFn[] = [];
      if (field.validators) {
        for (const data of field.validators) {
          validators.push(data.validationFunction);
        }
      }

      this.form.addControl(
        field.name,
        new FormControl(field.value || '', validators)
      );
    }
  }

  onInput(fieldName: string, value: string) {
    if (!this.form.get(fieldName)) return;
    this.form.get(fieldName)?.setValue(value);
    this.formResults.emit(this.form.value);
  }

  onButtonClicked(button: AppButtonConfig) {
    this.buttonClicked.emit(button);
  }
}
