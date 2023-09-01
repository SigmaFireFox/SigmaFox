import { ValidatorFn } from '@angular/forms';
import { AppFieldType } from './form-templates.enum';
import { FileParamaterType } from '../templates/form-fields/file-uploader-with-parameters/file-uploader-with-parameters.component';
import { ProductForm } from 'src/app/pages/admin-page/admin-dashboard/product-management/models/product.enum';
import { AppFileData } from 'src/app/pages/admin-page/admin-dashboard/product-management/models/product.interface';

export interface AppMultiColumnForm {
  columns: AppFormColumn[];
}

export interface AppFormColumn {
  name: string;
  forms: AppForm[];
}

export interface AppForm {
  name: ProductForm;
  fields: AppField[];
}

export interface AppField {
  name: string;
  type: AppFieldType;
  label?: string;
  placeholder?: string;
  value?: string | AppFileData;
  displayValue?: string;
  urls?: string[];
  validators?: ValidatorFn[];
  multiColumnFieldSetting?: MultiColumnFieldSetting[];
  parameterType?: FileParamaterType;
  parameters?: Record<string, unknown>;
  multiFileImport?: boolean;
  characterLimit?: number;
}

export interface MultiColumnFieldSetting {
  name: string;
  label: string;
  placeholder?: string;
  value?: string | number;
  validators?: ValidatorFn[];
}

export interface FileData {
  file: File | null;
  url?: string | ArrayBuffer | null;
}

export interface FileDataWithParameters extends FileData {
  parameters: Record<string, unknown>;
}
