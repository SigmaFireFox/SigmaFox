import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  PrintFileParameters,
  PrintFileParametersMapping,
} from 'src/app/forms/dialogs/print-file-parameters-dialog/print-file-parameters-dialog.component';
import {
  AppField,
  FileDataWithParameters,
} from 'src/app/forms/models/form-template.interface';
import { AppFieldType } from 'src/app/forms/models/form-templates.enum';
import { AppFileData } from 'src/app/pages/admin-page/admin-dashboard/product-management/models/product.interface';

export enum FileParamaterType {
  None,
  PrintFile,
}

@Component({
  selector: 'app-file-uploader-with-parameters',
  templateUrl: './file-uploader-with-parameters.component.html',
  styleUrls: ['./file-uploader-with-parameters.component.scss'],
})
export class FileUploaderWithParametersComponent implements OnInit {
  @Input() field: AppField | undefined;
  @Output() fileSelectedWithParameters =
    new EventEmitter<FileDataWithParameters>();

  formFieldType = AppFieldType;
  fieldValue: FileDataWithParameters = { file: null, parameters: {} };
  fileName = '';
  showParameterDialog = false;
  currentParameterType = FileParamaterType.None;
  parameterType = FileParamaterType;
  PrintFileParametersMapping = PrintFileParametersMapping;

  ngOnInit() {
    if (!this.field?.parameterType) return;
    this.setValues();
    this.currentParameterType = this.field.parameterType;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelection(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;
    this.fieldValue.file = file;
    this.fileName = file.name;
    this.showParameterDialog = true;
  }

  onFileParametersSubmited(fileParameters: PrintFileParameters) {
    this.showParameterDialog = false;
    this.fieldValue.parameters = fileParameters as unknown as Record<
      string,
      unknown
    >;
    this.fileSelectedWithParameters.emit(this.fieldValue);
  }

  setValues() {
    if (!this.field) return;

    if (this.field.value) {
      if (typeof this.field.value === 'string') {
        this.fileName = this.field.value;
        return;
      }
      if ('displayValue' in this.field.value) {
        const fieldData = this.field.value as AppFileData;
        this.fileName = fieldData.displayValue;
        this.fieldValue.parameters = fieldData.parameters;
        return;
      }
      return;
    }

    if (this.field.placeholder) {
      this.fileName = this.field.placeholder;
    }
  }
}
