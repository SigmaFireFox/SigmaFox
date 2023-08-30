import { FormFieldType } from '../enums/form.eum';

export interface FormConfig {
  formTitle: string;
  fields: FormFieldConfig[];
  isInExpansionTable: boolean;
  isDynamic: boolean;
  proceedText: string;
  canProceed: boolean;
  proceedBlocked: boolean;
  canCancel?: boolean;
}

export interface FormFieldConfig {
  fieldName: string;
  fieldDisplay: string;
  fieldType: FormFieldType;
  defaultValue?: number | boolean | string | unknown;
  options?: FormFieldOption[];
  optsOutOf?: string;
}

export interface FormFieldOption {
  display: string;
  value: number | string;
}
