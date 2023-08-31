/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormFieldType } from '../../enums/form.eum';
import { FormConfig } from '../../interfaces/form-screen.interface';

@Component({
  selector: 'app-form-component',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() formConfig: FormConfig = {
    formTitle: '',
    isInExpansionTable: false,
    isDynamic: false,
    fields: [],
    proceedText: '',
    canProceed: false,
    proceedBlocked: false,
  };
  @Input() currentValues: { [key: string]: any } = {};
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formChanged = new EventEmitter<any>();
  @Output() formCancelled = new EventEmitter<void>();

  fieldType = FormFieldType;
  form = this.fb.group({} as { [key: string]: any });
  hiddenFields = {} as { [key: number]: boolean };

  get validForm() {
    let formValid = true;
    this.formConfig.fields.forEach((field, index) => {
      if (typeof this.form.controls[field.fieldName]?.value === 'object') {
        // Complex logic required to test if multi-selector is empty
        if (this.form.controls[field.fieldName].value != null) {
          if (
            Object.keys((this.form.controls[field.fieldName] as any).value)
              .length === 0
          ) {
            formValid = false;
          }
        }
      }

      if (
        ![
          FormFieldType.CHECKBOX,
          FormFieldType.FIELD_GROUP_TITLE,
          FormFieldType.OPT_OUT,
        ].includes(this.formConfig.fields[index]?.fieldType)
      ) {
        if (!this.form.controls[field.fieldName].value) {
          formValid = false;
        }
      }
    });
    // canProceed amd proceedBlocked allows the parent to over-ride
    return (
      (formValid && this.form.valid && !this.formConfig.proceedBlocked) ||
      this.formConfig.canProceed
    );
  }

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setForm();
    this.assignFormValues();
  }

  private assignFormValues() {
    if (Object.keys(this.currentValues).length === 0) {
      return;
    }

    Object.keys(this.currentValues).forEach((key) => {
      this.form.controls[key]?.setValue(this.currentValues[key]);
    });
    this.formChanged.emit(this.form.value);
  }

  onSubmit() {
    this.removeFromGroupTitles();
    this.setOpttedOutFieldsAsEmpty();
    this.formSubmitted.emit(this.form.value);
  }

  onFormChange() {
    if (this.formConfig.isDynamic) {
      this.formChanged.emit(this.form.value);
      this.setForm();
    }
  }

  onFormCancelled() {
    this.formCancelled.emit();
  }

  toggleField(index: number) {
    this.hiddenFields[index] = !this.hiddenFields[index];
  }

  toggleOptOut(field: string) {
    this.form.controls[field].setValue(!this.form.controls[field].value);
    this.onFormChange();
  }

  private setForm() {
    this.addFormFields();
    this.removeFormFields();
    this.cd.detectChanges();
  }

  private addFormFields() {
    this.formConfig.fields.forEach((field, fieldIndex) => {
      this.form.addControl(
        field.fieldName,
        new FormControl(field.defaultValue, Validators.required)
      );
      this.form.controls[field.fieldName].setValidators([Validators.required]);
      this.form.controls[field.fieldName].setValidators([Validators.min(1)]);
      if (field.fieldType === FormFieldType.PASSWORD) {
        this.hiddenFields[fieldIndex] = true;
      }
    });
  }

  private removeFormFields() {
    const listOfFieldNames: string[] = [];
    this.formConfig.fields.forEach((field) => {
      listOfFieldNames.push(field.fieldName);
    });

    Object.keys(this.form.controls).forEach((key) => {
      if (!listOfFieldNames.includes(key)) {
        // this.form.removeControl(key);
      }
    });
  }

  private removeFromGroupTitles() {
    const listOfFormGroupTitles: string[] = [];
    this.formConfig.fields.forEach((field) => {
      if (field.fieldType === FormFieldType.FIELD_GROUP_TITLE) {
        listOfFormGroupTitles.push(field.fieldName);
      }
    });

    Object.keys(this.form.controls).forEach((key) => {
      if (listOfFormGroupTitles.includes(key)) {
        // this.form.removeControl(key);
      }
    });
  }

  private setOpttedOutFieldsAsEmpty() {
    this.formConfig.fields.forEach((field) => {
      if (
        field.fieldType === FormFieldType.OPT_OUT &&
        this.form.controls[field.fieldName]
      ) {
        field.optsOutOf
          ? this.form.addControl(field.optsOutOf, new FormControl(''))
          : null;
      }
    });
  }
}
