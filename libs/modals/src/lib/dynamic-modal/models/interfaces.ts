import { ValidatorFn } from '@angular/forms';
import { StandardButtonConfig } from 'libs/components/buttons/src';
import { DynamicModalFormFieldType as DynamicModalFieldType } from './enum';

export interface DynamicModalConfig {
  header: DynamicModalString;
  subHeader?: string[];
  editMode: boolean;
  form?: DynamicModalForm;
  actionPanel: DynamicModalActionPanel;
}

export interface DynamicModalString {
  value: string;
  editable: boolean;
}

export interface DynamicModalForm {
  fields: DynamicModalFields;
  fieldsOrder: string[];
  passwordFieldsToMatch?: DynamicModalFieldsToMatch;
  preventFieldLineWrap?: boolean;
}

export interface DynamicModalFields {
  [key: string]: DynamicModalFieldConfig;
}

export interface DynamicModalFieldConfig {
  fieldType: DynamicModalFieldType;
  label: string;
  value: string | number;
  showPassword?: boolean;
  validations?: ValidatorFn[];
  minChar?: number;
  errorMessage?: string;
}

export interface DynamicModalFieldsToMatch {
  password: string;
  confirmation: string;
}

export interface DynamicModalActionPanel {
  buttons: DynamicModalButtons;
  buttonsOrder: string[];
}

export interface DynamicModalButtons {
  [key: string]: DynamicModalButtonConfig;
}

export interface DynamicModalButtonConfig {
  requiresValidation: boolean;
  isSubmit: boolean;
  buttonConfig: StandardButtonConfig;
}
