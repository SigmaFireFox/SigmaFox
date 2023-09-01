import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormItem } from '../components/form/form.component';

export enum FormValidationErrorType {
  REQUIRED,
}

export interface FormValidationError {
  fieldName: string;
  errorType: FormValidationErrorType;
}

export interface FormValidationResponse {
  isValid: boolean;
  validationErrors: FormValidationError[];
}

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  private validationReponse = new BehaviorSubject<FormValidationResponse>(
    {} as FormValidationResponse
  );
  _validationReponse = this.validationReponse.asObservable();

  constructor() {}

  validate(form: FormItem[], formValues: object) {
    const response = this.validationTest(form, formValues);
    this.validationReponse.next(response);
  }

  validationTest(form: FormItem[], formValues: object): FormValidationResponse {
    let response = {
      isValid: true,
      validationErrors: [],
    } as FormValidationResponse;

    Object.keys(formValues).forEach((key) => {
      let value = formValues[key as keyof {}];
      if (!value) {
        for (let i = 0; i < form.length; i++) {
          if (form[i].fieldName === key && form[i].required) {
            response.isValid = false;
            response.validationErrors.push({
              fieldName: form[i].title,
              errorType: FormValidationErrorType.REQUIRED,
            });
            break;
          }
        }
      }
    });
    return response;
  }
}
