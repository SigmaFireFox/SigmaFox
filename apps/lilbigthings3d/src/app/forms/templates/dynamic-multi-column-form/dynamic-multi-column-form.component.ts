/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AppField,
  AppMultiColumnForm,
  FileData,
  FileDataWithParameters,
} from '../../models/form-template.interface';
import {
  AppFieldType,
  FORM_FIELD_TYPES,
} from '../../models/form-templates.enum';
import { isEqual } from 'lodash';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic--multi-column-form',
  templateUrl: './dynamic-multi-column-form.component.html',
  styleUrls: ['./dynamic-multi-column-form.component.scss'],
})
export class DynanmicMultiColumnFormComponent implements OnInit {
  // This component's object is to provide a template for a dynamic form
  // that can be split into multiple columns as may be required - specfically
  // for use of complex input screens as found in the admin portal of the application

  // The component requires a config strucuted as a AppMultiColumnForm as well
  @Input() config: AppMultiColumnForm | undefined;
  @Output() formResults = new EventEmitter<Record<string, unknown>>();

  formFieldType = AppFieldType;
  forms: Record<string, FormGroup> = {};
  formDefaults: Record<string, string> = {};

  get formFieldsWithDefaultValues(): string[] {
    const fieldsWithDefualtValues: string[] = [];

    Object.keys(this.forms).forEach((formName) => {
      Object.keys(this.forms[formName].controls).forEach((control) => {
        if (this.formDefaults[control]) {
          if (
            isEqual(
              this.forms[formName].get(control)?.value,
              this.formDefaults[control]
            )
          ) {
            fieldsWithDefualtValues.push(control);
          }
        }
      });
    });

    return fieldsWithDefualtValues;
  }

  get isAllFormsValid(): boolean {
    if (!this.config) return false;

    let allFormsValid = true;
    Object.keys(this.forms).forEach((formName) => {
      if (this.forms[formName].invalid) {
        allFormsValid = false;
      }
    });

    return allFormsValid;
  }

  get isValidForm(): boolean {
    return this.isAllFormsValid && !this.formFieldsWithDefaultValues.length;
  }

  constructor(private readonly cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.buildFormsFromConfigs();
    this.setFormDefaultValues();
  }

  private buildFormsFromConfigs(): void {
    if (!this.config) return;

    this.config.columns.forEach((column) => {
      column.forms.forEach((form) => {
        const formGroup = new FormGroup({});
        form.fields.forEach((field) => {
          if (field.type === AppFieldType.InputTextLong) {
            let value = '';
            const content = field.value as unknown as string[];
            for (const para of content) {
              value = `${value}${para}\n`;
              console.log(value);
            }
            formGroup.addControl(
              field.name,
              new FormControl(
                value || field.placeholder || '',
                field.validators
              )
            );
            return;
          }
          if (field.type === AppFieldType.MainImage) {
            formGroup.addControl(
              field.name,
              new FormControl(
                { url: field.value } || field.placeholder || '',
                field.validators
              )
            );
            return;
          }
          if (FORM_FIELD_TYPES.includes(field.type)) {
            formGroup.addControl(
              field.name,
              new FormControl(
                field.value || field.placeholder || '',
                field.validators
              )
            );
            return;
          }
        });
        this.forms[form.name] = formGroup;
      });
    });
  }

  private setFormDefaultValues(): void {
    if (!this.config) return;

    this.config.columns.forEach((column) => {
      column.forms.forEach((form) => {
        form.fields.forEach((field) => {
          if (FORM_FIELD_TYPES.includes(field.type) && field.placeholder) {
            this.formDefaults[field.name] = field.placeholder;
          }
        });
      });
    });
  }

  onFieldFocus(form: FormGroup, field: string): void {
    if (form.controls[field].value === this.formDefaults[field]) {
      form.controls[field].setValue('');
    }
  }

  onFieldBlur(form: FormGroup, field: string): void {
    if (form.controls[field].value === '') {
      form.controls[field].setValue(this.formDefaults[field]);
    }
  }

  updateFieldValue(form: FormGroup, field: string, updatedValue: string) {
    form.controls[field].setValue(updatedValue);
  }

  updateMultiColumnFieldValues(
    form: FormGroup,
    field: string,
    updatedValues: Record<string, string>
  ) {
    form.controls[field].setValue(updatedValues);
  }

  onFileSelection(
    form: FormGroup,
    field: string,
    fileData: FileData[] | FileData
  ): void {
    if (!fileData) return;
    form.controls[field].setValue(fileData);
  }

  onFileWithParametersSelection(
    form: FormGroup,
    field: string,
    fileWithParameters: FileDataWithParameters
  ) {
    if (!fileWithParameters.file) return;
    form.controls[field].setValue(fileWithParameters);
  }

  onImagesSelection(form: FormGroup, field: string, uploadedImagesNames: any) {
    form.controls[field].setValue(uploadedImagesNames);
    this.cd.detectChanges();
  }

  onSubmit(): void {
    if (this.isValidForm) {
      const collectiveFormValues: Record<string, unknown> = {};
      Object.keys(this.forms).forEach((formName) => {
        Object.keys(this.forms[formName].controls).forEach((control) => {
          collectiveFormValues[control] =
            this.forms[formName].get(control)?.value;
        });
      });
      console.log(collectiveFormValues);
      this.formResults.emit(collectiveFormValues);
    }
  }

  setPrimaryImage(imageReferance: {
    url: string;
    field: AppField;
    index: number;
  }) {
    this.forms['Product basic details'].controls['primary-image-url'].setValue({
      url: imageReferance.url,
      fieldName: imageReferance.field.name,
      index: imageReferance.index,
    });
  }
}
