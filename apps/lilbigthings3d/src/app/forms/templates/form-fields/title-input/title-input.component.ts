import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppField } from 'src/app/forms/models/form-template.interface';

@Component({
  selector: 'app-title-input',
  templateUrl: './title-input.component.html',
  styleUrls: ['./title-input.component.scss'],
})
export class TitleInputComponent implements OnInit {
  @Input() field: AppField | undefined;
  @Output() updateFieldValue = new EventEmitter<string>();

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
