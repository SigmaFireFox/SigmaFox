/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormFieldType } from 'apps/assemble-ez/src/app/enums/form.eum';
import { LeadsPageViewState as ViewState } from 'apps/assemble-ez/src/app/enums/viewstates.enum';
import {
  FormFieldOption,
  FormFieldConfig,
  FormConfig,
} from 'apps/assemble-ez/src/app/interfaces/form-screen.interface';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'apps/assemble-ez/src/app/interfaces/menu-screen.interface';

@Component({
  selector: 'app-lead-form-screen',
  templateUrl: './lead-form.screen.html',
  styleUrls: ['./lead-form.screen.scss'],
})
export class LeadFormScreen {
  @Input() assignToOptions: FormFieldOption[] = [];
  @Input() currentValues: { [key: string]: string } = {};
  @Output() leadAdded = new EventEmitter<{ [key: string]: string }>();
  @Output() viewStateSelected = new EventEmitter<number>();

  private opttableFields: { [key: string]: FormFieldConfig } = {
    email: {
      fieldDisplay: 'Email',
      fieldName: 'email',
      fieldType: FormFieldType.INPUT_GENERAL,
      defaultValue: '',
    },
    contactNumber: {
      fieldDisplay: 'Contact number',
      fieldName: 'contactNumber',
      fieldType: FormFieldType.INPUT_GENERAL,
      defaultValue: '',
    },
  };

  newLeadFormConfig: FormConfig = {
    formTitle: 'Add a new lead by filling out the details below',
    isInExpansionTable: false,
    isDynamic: true,
    canProceed: false,
    proceedBlocked: false,
    fields: [
      {
        fieldDisplay: 'Name',
        fieldName: 'name',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
      this.opttableFields['email'],
      {
        fieldDisplay: 'No email',
        fieldName: 'noEmail',
        fieldType: FormFieldType.OPT_OUT,
        defaultValue: false,
        optsOutOf: 'email',
      },
      this.opttableFields['contactNumber'],
      {
        fieldDisplay: 'No contact number',
        fieldName: 'noContactNumber',
        fieldType: FormFieldType.OPT_OUT,
        defaultValue: false,
        optsOutOf: 'contactNumber',
      },
      {
        fieldDisplay: 'Assign to',
        fieldName: 'assignedTo',
        fieldType: FormFieldType.SELECT,
        defaultValue: '',
      },
    ],
    proceedText: 'Proceed',
  };

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to lead menu',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.MENU,
    },
  ];

  ngOnInit() {
    this.newLeadFormConfig.fields[5].options = this.assignToOptions;
  }

  onLeadFormChanged(formValue: { [key: string]: string }) {
    this.removedOptedOutFields(formValue);
    this.addOptedInFields(formValue);
  }

  private removedOptedOutFields(formValue: {
    [key: string]: string | boolean;
  }) {
    const optedOutFields: string[] = [];
    this.newLeadFormConfig.fields.forEach((field) => {
      if (
        field.fieldType === FormFieldType.OPT_OUT &&
        formValue[field.fieldName] &&
        field.optsOutOf
      ) {
        optedOutFields.push(field.optsOutOf);
      }
    });
    this.newLeadFormConfig.fields.forEach((field, index) => {
      if (optedOutFields.includes(field.fieldName)) {
        this.newLeadFormConfig.fields.splice(index, 1);
      }
    });
  }

  private addOptedInFields(formValue: { [key: string]: string | boolean }) {
    const listOfFieldInForm: string[] = [];
    this.newLeadFormConfig.fields.forEach((field) => {
      listOfFieldInForm.push(field.fieldName);
    });

    const missingOptedInFields: { fieldName: string; index: number }[] = [];
    this.newLeadFormConfig.fields.forEach((field, index) => {
      if (
        field.fieldType === FormFieldType.OPT_OUT &&
        !formValue[field.fieldName] &&
        field.optsOutOf
      ) {
        if (!listOfFieldInForm.includes(field.optsOutOf)) {
          missingOptedInFields.push({
            fieldName: field.optsOutOf,
            index: index,
          });
        }
      }
    });

    missingOptedInFields.forEach((field) => {
      this.newLeadFormConfig.fields.splice(
        field.index,
        0,
        this.opttableFields[field.fieldName]
      );
    });
  }

  onLeadAdded(formValue: { [key: string]: string }) {
    this.leadAdded.emit(formValue);
  }

  onViewStateSelected(viewState: number) {
    this.viewStateSelected.emit(viewState);
  }
}
