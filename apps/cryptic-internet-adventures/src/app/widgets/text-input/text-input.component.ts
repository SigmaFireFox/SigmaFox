/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AppFieldConfig } from '../../shared/dynamic-form/dynamic-form.component';

export enum InputType {
  Text = 'text',
  Number = 'number',
}

export interface ValidatiorParameter {
  type: ValidatiorType;
  max?: number;
  min?: number;
}

export enum ValidatiorType {
  Required = 'required',
}

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
  @Input() config: AppFieldConfig | undefined;
  @Output() returnedValue = new EventEmitter<string>();

  formControl = new FormControl();
  listOfErrors: string[] = [];

  ngOnInit() {
    if (!this.config) return;
    this.formControl.setValue(this.config.value || '');

    const validators: ValidatorFn[] = [];
    if (this.config.validators) {
      for (const data of this.config.validators) {
        validators.push(data.validationFunction);
      }
    }
    this.formControl.setValidators(validators);
  }

  onInputBlur() {
    this.returnedValue.emit(this.formControl.value);
    this.updateErrorsList();
  }

  private updateErrorsList() {
    if (!this.config) return;
    this.listOfErrors = [];
    const controlErrors: ValidationErrors | null = this.formControl.errors;
    if (!controlErrors) return;
    if (this.config.validators) {
      for (const data of this.config.validators) {
        this.listOfErrors.push(data.errorMsg);
      }
    }
  }
}
