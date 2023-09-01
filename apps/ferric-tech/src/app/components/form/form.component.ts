import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { WidgetCallBacksService } from 'src/app/services/widget-call-backs.service';

export enum FormItemType {
  FREE_TEXT_SHORT,
  FREE_TEXT_LONG,
  SELECT,
}

export interface SelectOption {
  text: string;
  value: any;
}

export interface FormItem {
  type: FormItemType;
  fieldName: string;
  title: string;
  options?: SelectOption[];
  required: boolean;
}

@Component({
  selector: 'app-form-component',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() config: FormItem[] | undefined;

  form = new FormGroup({});
  formItemType = FormItemType;

  constructor(
    private widgetCallBackService: WidgetCallBacksService,
    private formValidationService: FormValidationService
  ) {}

  ngOnInit() {
    this.config?.forEach((item) => {
      let newControl = new FormControl('');
      this.form.addControl(item.fieldName, newControl);
    });
    this.widgetCallBackService.formSubmitted.subscribe((submitted) =>
      submitted ? this.validateForm(this.form.value) : null
    );
  }

  getFormControl(name: string) {
    return this.form.get(name) as FormControl;
  }

  private validateForm(formValues: any) {
    if (!this.config) return;
    this.formValidationService.validate(this.config, formValues);
  }
}
