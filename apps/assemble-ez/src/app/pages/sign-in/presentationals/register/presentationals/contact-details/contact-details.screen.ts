import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormFieldType } from '../../../../../../../app/enums/form.eum';
import {
  FormConfig,
  FormFieldConfig,
} from '../../../../../../../app/interfaces/form-screen.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-contact-details-screen',
  templateUrl: './contact-details.screen.html',
  styleUrls: ['./contact-details.screen.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ContactDetailsScreen {
  @Input() isFirstTimeRegistration = false;
  @Input() currentValues: { [key: string]: unknown } = {};
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();
  @Output() editCancelled = new EventEmitter<void>();

  private opttableFields: { [key: string]: FormFieldConfig } = {};
  private primaryContactFields = [] as FormFieldConfig[];
  contactDetailsFormConfig = {} as FormConfig;

  isPrimaryContactSelected = true;

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.opttableFields = {
      companyEmail: {
        fieldDisplay: 'Email',
        fieldName: 'companyEmail',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: this.currentValues['companyEmail'] || '',
      },
      companyContactNumber: {
        fieldDisplay: 'Contact number',
        fieldName: 'companyContactNumber',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: this.currentValues['companyContactNumber'] || '',
      },
      companyWebsite: {
        fieldDisplay: 'Website',
        fieldName: 'companyWebsite',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: this.currentValues['companyWebsite'] || '',
      },
    };

    this.primaryContactFields = [
      {
        fieldDisplay: 'First name',
        fieldName: 'primaryContactFirstName',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: this.currentValues['primaryContactFirstName'] || '',
      },
      {
        fieldDisplay: 'Last name',
        fieldName: 'primaryContactLastName',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: this.currentValues['primaryContactLastName'] || '',
      },
      {
        fieldDisplay: 'Email',
        fieldName: 'primaryContactEmail',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: this.currentValues['primaryContactEmail'] || '',
      },
      {
        fieldDisplay: 'ContactNumber',
        fieldName: 'primaryContactContactumber',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: this.currentValues['primaryContactContactumber'] || '',
      },
    ];

    this.contactDetailsFormConfig = {
      formTitle: this.isFirstTimeRegistration
        ? 'Now that we know about your businsess, \
                we need to get the contact details for \
                your business'
        : '',
      isInExpansionTable: false,
      isDynamic: true,
      canProceed: false,
      proceedBlocked: false,
      canCancel: true,
      fields: [
        {
          fieldName: 'groupTitleCompany',
          fieldDisplay: 'Company contacts',
          fieldType: FormFieldType.FIELD_GROUP_TITLE,
        },
        this.opttableFields['companyEmail'],
        {
          fieldDisplay: 'No email',
          fieldName: 'noCompanyEmail',
          fieldType: FormFieldType.OPT_OUT,
          defaultValue: this.currentValues['noCompanyEmail'] || false,
          optsOutOf: 'companyEmail',
        },
        this.opttableFields['companyContactNumber'],
        {
          fieldDisplay: 'No contact number',
          fieldName: 'noCompanyContactNumber',
          fieldType: FormFieldType.OPT_OUT,
          defaultValue: this.currentValues['noCompanyContactNumber'] || false,
          optsOutOf: 'companyContactNumber',
        },
        this.opttableFields['companyWebsite'],
        {
          fieldDisplay: 'No Website',
          fieldName: 'noCompanyWebsite',
          fieldType: FormFieldType.OPT_OUT,
          defaultValue: this.currentValues['noCompanyWebsite'] || false,
          optsOutOf: 'companyWebsite',
        },
        {
          fieldName: 'groupPrimaryContact',
          fieldDisplay: 'Primary contact person',
          fieldType: FormFieldType.FIELD_GROUP_TITLE,
        },
        {
          fieldDisplay: 'Make me primary contact',
          fieldName: 'isPrimaryContact',
          fieldType: FormFieldType.CHECKBOX,
          defaultValue: this.currentValues['isPrimaryContact'] || true,
        },
      ],
      proceedText: 'Proceed',
    };
    this.onContacDetailsFormChanged(
      this.currentValues as { [key: string]: string }
    );
  }

  onContactDetailsFormSubmitted(formValue: { [key: string]: string }) {
    this.formSubmitted.emit(formValue);
  }

  onContacDetailsFormChanged(formValue: { [key: string]: string | boolean }) {
    this.contactDetailsFormConfig.proceedBlocked = !this.changeMade(formValue);

    if (this.isPrimaryContactSelected != formValue['isPrimaryContact']) {
      this.isPrimaryContactSelected = formValue['isPrimaryContact'] as boolean;
      this.isPrimaryContactSelected
        ? this.removePrimaryContactFields()
        : this.addPrimaryContactFields();
    }
    this.removedOptedOutFields(formValue);
    this.addOptedInFields(formValue);
  }

  private addPrimaryContactFields() {
    this.contactDetailsFormConfig.fields =
      this.contactDetailsFormConfig.fields.concat(this.primaryContactFields);
  }

  private removePrimaryContactFields() {
    for (let i = 1; i < 5; i++) {
      this.contactDetailsFormConfig.fields.pop();
    }
  }

  private removedOptedOutFields(formValue: {
    [key: string]: string | boolean;
  }) {
    const optedOutFields: string[] = [];
    this.contactDetailsFormConfig.fields.forEach((field) => {
      if (
        field.fieldType === FormFieldType.OPT_OUT &&
        formValue[field.fieldName] &&
        field.optsOutOf
      ) {
        optedOutFields.push(field.optsOutOf);
      }
    });
    this.contactDetailsFormConfig.fields.forEach((field, index) => {
      if (optedOutFields.includes(field.fieldName)) {
        this.contactDetailsFormConfig.fields.splice(index, 1);
      }
    });
  }

  onFormCancelled() {
    this.editCancelled.emit();
  }

  private addOptedInFields(formValue: { [key: string]: string | boolean }) {
    const listOfFieldInForm: string[] = [];
    this.contactDetailsFormConfig.fields.forEach((field) => {
      listOfFieldInForm.push(field.fieldName);
    });

    const missingOptedInFields: { fieldName: string; index: number }[] = [];
    this.contactDetailsFormConfig.fields.forEach((field, index) => {
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
      this.contactDetailsFormConfig.fields.splice(
        field.index,
        0,
        this.opttableFields[field.fieldName]
      );
    });
  }

  private changeMade(formValue: { [key: string]: string | boolean }): boolean {
    let changeMade = false;
    Object.keys(formValue).forEach((fieldName) => {
      if (formValue[fieldName] != this.currentValues[fieldName]) {
        changeMade = true;
      }
    });
    return changeMade;
  }
}
