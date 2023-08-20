import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityType, FormFieldType } from 'app/enums/form.eum';
import {
  FormConfig,
  FormFieldConfig,
} from 'app/interfaces/form-screen.interface';

@Component({
  selector: 'app-business-details-screen',
  templateUrl: './business-details.screen.html',
  styleUrls: ['./business-details.screen.scss'],
})
export class BusinessDetailsScreen {
  @Input() isFirstTimeRegistration = false;
  @Input() currentValues: { [key: string]: string } = {};
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();
  @Output() editCancelled = new EventEmitter<void>();

  formStage = 1;
  selectedOpertateAs = 0;

  opertateAsField = {} as FormFieldConfig;
  tradingAsField = {} as FormFieldConfig;
  legalNameField = {} as FormFieldConfig;
  tradingUnderLegalNameField = {} as FormFieldConfig;
  businessDetailsFormConfig = {} as FormConfig;

  ngOnInit() {
    this.opertateAsField = {
      fieldDisplay: 'How do you operate',
      fieldName: 'entityType',
      fieldType: FormFieldType.RADIO,
      options: [
        {
          display: 'As a sole proprietor',
          value: EntityType.SOLE_PROPRIETOR,
        },
        {
          display: 'As a registered entity',
          value: EntityType.REGISTERED_ENTITY,
        },
      ],
      defaultValue: this.currentValues['entityType'] || 0,
    };

    this.tradingAsField = {
      fieldDisplay: 'Trading name',
      fieldName: 'tradingName',
      fieldType: FormFieldType.INPUT_GENERAL,
      defaultValue: this.currentValues['tradingName'] || '',
    };

    this.legalNameField = {
      fieldDisplay: 'Legal name',
      fieldName: 'legalName',
      fieldType: FormFieldType.INPUT_GENERAL,
      defaultValue: this.currentValues['legalName'] || '',
    };

    this.tradingUnderLegalNameField = {
      fieldDisplay: 'Trading and legam names differ',
      fieldName: 'tradingAndLegalNameDiffer',
      fieldType: FormFieldType.CHECKBOX,
      defaultValue: this.currentValues['tradingAndLegalNameDiffer'] || false,
    };

    this.businessDetailsFormConfig = {
      formTitle: this.isFirstTimeRegistration
        ? 'Great! You have been registered on our platform. \
        Let find out a little more about your business'
        : '',
      isInExpansionTable: false,
      isDynamic: true,
      canProceed: false,
      proceedBlocked: true,
      canCancel: true,
      fields: [this.opertateAsField],
      proceedText: 'Proceed',
    };
    this.setFormStage2(this.currentValues);
    this.onBusinessDetailsForChanged(this.currentValues);
  }

  onBusinessDetailsFormSubmitted(formValue: { [key: string]: string }) {
    this.formSubmitted.emit(formValue);
  }

  onBusinessDetailsForChanged(formValue: { [key: string]: string }) {
    this.businessDetailsFormConfig.proceedBlocked = !this.changeMade(formValue);

    switch (this.businessDetailsFormConfig.fields.length) {
      case 1: {
        this.setFormStage2(formValue);
        return;
      }
      case 2: {
        if (this.isEntityTypeAsChanged(formValue['entityType'])) {
          this.setFormStage2(formValue);
        }
        return;
      }
      case 3: {
        if (this.isEntityTypeAsChanged(formValue['entityType'])) {
          this.setFormStage2(formValue);
        }
        if (formValue['tradingAndLegalNameDiffer']) {
          this.businessDetailsFormConfig.fields.push(this.tradingAsField);
        }
        return;
      }
      case 4: {
        if (this.isEntityTypeAsChanged(formValue['entityType'])) {
          this.setFormStage2(formValue);
        }
        if (!formValue['tradingAndLegalNameDiffer']) {
          this.businessDetailsFormConfig.fields.pop();
        }
      }
    }
  }

  onFormCancelled() {
    this.editCancelled.emit();
  }

  private isEntityTypeAsChanged(currentValue: string) {
    return parseInt(currentValue) != this.selectedOpertateAs;
  }

  private setFormStage2(formValue: { [key: string]: string }) {
    this.selectedOpertateAs = parseInt(formValue['entityType']);
    this.businessDetailsFormConfig.fields = [this.opertateAsField];
    this.businessDetailsFormConfig.fields[0].defaultValue = parseInt(
      formValue['entityType']
    );

    if (parseInt(formValue['entityType']) === 1) {
      this.businessDetailsFormConfig.fields.push(this.tradingAsField);
    }
    if (parseInt(formValue['entityType']) === 2) {
      this.businessDetailsFormConfig.fields.push(
        this.legalNameField,
        this.tradingUnderLegalNameField
      );
    }
  }

  private changeMade(formValue: { [key: string]: string }): boolean {
    let changeMade = false;
    Object.keys(formValue).forEach((fieldName) => {
      if (formValue[fieldName] != this.currentValues[fieldName]) {
        changeMade = true;
      }
    });
    return changeMade;
  }
}
