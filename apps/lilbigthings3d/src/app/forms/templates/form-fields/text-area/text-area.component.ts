/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppField } from '../../../models/form-template.interface';
import { AppFieldType } from '../../../models/form-templates.enum';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent implements OnInit {
  @Input() field: AppField | undefined;
  @Output() updateFieldValue = new EventEmitter<string>();

  formFieldType = AppFieldType;
  fieldValue = '';

  ngOnInit() {
    if (!this.field) return;
    this.fieldValue =
      (this.field.value as string) || this.field.placeholder || '';
  }

  onFieldFocus(): void {
    if (this.fieldValue === this.field?.placeholder) {
      this.fieldValue = '';
    }
  }

  onFieldBlur(): void {
    if (this.fieldValue === '') {
      this.fieldValue = this.field?.placeholder || '';
    }

    this.updateFieldValue.emit(this.fieldValue);
  }
}
