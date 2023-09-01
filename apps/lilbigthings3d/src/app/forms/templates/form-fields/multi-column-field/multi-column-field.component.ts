/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppField } from '../../../models/form-template.interface';

@Component({
  selector: 'app-multi-column-field',
  templateUrl: './multi-column-field.component.html',
  styleUrls: ['./multi-column-field.component.scss'],
})
export class MultiColumnFieldComponent implements OnInit {
  @Input() field: AppField | undefined;
  @Output() updateFieldValues = new EventEmitter<Record<string, string>>();

  fieldValues: Record<string, string> = {};

  ngOnInit() {
    if (!this.field?.multiColumnFieldSetting) return;
    this.field.multiColumnFieldSetting.forEach((fieldColumn) => {
      this.fieldValues[fieldColumn.name] =
        (fieldColumn.value as string) || fieldColumn.placeholder || '';
    });
  }

  onFieldFocus(fieldColumnName: string, index: number): void {
    if (!this.field?.multiColumnFieldSetting) return;
    if (
      this.fieldValues[fieldColumnName] ===
      this.field?.multiColumnFieldSetting[index].placeholder
    ) {
      this.fieldValues[fieldColumnName] = '';
    }
  }

  onFieldBlur(fieldColumnName: string, index: number): void {
    if (!this.field?.multiColumnFieldSetting) return;
    if (this.fieldValues[fieldColumnName] === '') {
      this.fieldValues[fieldColumnName] =
        this.field?.multiColumnFieldSetting[index].placeholder || '';
    }
    this.updateFieldValues.emit(this.fieldValues);
  }
}
