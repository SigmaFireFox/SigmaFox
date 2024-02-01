import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { ButtonStyleClass } from 'libs/components/buttons/src';
import {
  DynamicModalConfig,
  DynamicModalFieldConfig,
} from '../dynamic-modal/models/interfaces';
import { DynamicModal } from '../dynamic-modal/dynamic.modal';
import { DynamicModalFormFieldType } from '../dynamic-modal/models/enum';

export interface ClientDetails {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  contactNumber: string;
  voided: boolean;
}

export enum ButtonNames {
  SaveNew = 'saveNew',
  SaveClose = 'saveClose',
  Void = 'void',
  Cancel = 'cancel',
  Edit = 'edit',
  Close = 'close',
}

export enum FormFieldNames {
  FirstName = 'firstName',
  LastName = 'lastName',
  Email = 'email',
  ContactNumber = 'contactNumber',
}

@Component({
  standalone: true,
  imports: [CommonModule, DynamicModal],
  selector: 'sigmafox-modal-client-details',
  templateUrl: './client-details.modal.html',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ClientDetailsModal implements OnInit {
  @Input() clientDetails: ClientDetails | undefined;
  @Input() editMode: boolean = false;

  @Output() update = new EventEmitter<ClientDetails>();
  @Output() void = new EventEmitter<ClientDetails>();
  @Output() close = new EventEmitter<void>();

  dynamicModalConfig: DynamicModalConfig | undefined;

  ngOnInit() {
    this.dynamicModalConfig = {
      header: {
        value: this.clientDetails?.displayName || 'New client',
        editable: true,
      },
      editMode: this.editMode,
      form: {
        preventFieldLineWrap: true,
        fields: {
          [FormFieldNames.FirstName]: {
            fieldType: DynamicModalFormFieldType.StandardInput,
            label: 'First name',
            value: this.clientDetails?.firstName || '',
            validations: [Validators.required],
            errorMessage: '',
          },
          [FormFieldNames.LastName]: {
            fieldType: DynamicModalFormFieldType.StandardInput,
            label: 'Last name',
            value: this.clientDetails?.lastName || '',
            validations: [Validators.required],
            errorMessage: '',
          },
          [FormFieldNames.Email]: {
            fieldType: DynamicModalFormFieldType.StandardInput,
            label: 'Email',
            value: this.clientDetails?.email || '',
            validations: [Validators.required, Validators.email],
            errorMessage: '',
          },
          [FormFieldNames.ContactNumber]: {
            fieldType: DynamicModalFormFieldType.StandardInput,
            label: 'Contact number',
            value: this.clientDetails?.contactNumber || '',
            validations: [Validators.required],
            minChar: 6,
            errorMessage: '',
          },
        },
        fieldsOrder: [
          FormFieldNames.FirstName,
          FormFieldNames.LastName,
          FormFieldNames.Email,
          FormFieldNames.ContactNumber,
        ],
      },
      actionPanel: {
        buttons: {
          [ButtonNames.SaveNew]: {
            requiresValidation: true,
            isSubmit: true,
            buttonConfig: {
              buttonID: ButtonNames.SaveNew,
              buttonTextContent: 'Save and New',
              buttonStyleClass: ButtonStyleClass.Primary,
              isDisabled: true,
            },
          },
          [ButtonNames.SaveClose]: {
            requiresValidation: true,
            isSubmit: true,
            buttonConfig: {
              buttonID: ButtonNames.SaveClose,
              buttonTextContent: 'Save and Close',
              buttonStyleClass: ButtonStyleClass.Primary,
              isDisabled: true,
            },
          },
          [ButtonNames.Void]: {
            requiresValidation: false,
            isSubmit: false,
            buttonConfig: {
              buttonID: ButtonNames.Void,
              buttonTextContent: 'Void Client',
              buttonStyleClass: ButtonStyleClass.Secondary,
              isDisabled: false,
            },
          },
          [ButtonNames.Cancel]: {
            requiresValidation: false,
            isSubmit: false,
            buttonConfig: {
              buttonID: ButtonNames.Cancel,
              buttonTextContent: 'Cancel Edit',
              buttonStyleClass: ButtonStyleClass.Secondary,
              isDisabled: false,
            },
          },
          [ButtonNames.Edit]: {
            requiresValidation: false,
            isSubmit: false,
            buttonConfig: {
              buttonID: ButtonNames.Edit,
              buttonTextContent: 'Edit Client',
              buttonStyleClass: ButtonStyleClass.Secondary,
              isDisabled: false,
            },
          },
          [ButtonNames.Close]: {
            requiresValidation: false,
            isSubmit: false,
            buttonConfig: {
              buttonID: ButtonNames.Close,
              buttonTextContent: 'Close',
              buttonStyleClass: ButtonStyleClass.Primary,
              isDisabled: false,
            },
          },
        },
        buttonsOrder: [],
      },
    };
    this.setButtonsOrder();
  }

  onButtonClicked(buttonID: string) {
    // Keep as switch to allow for possible updates for more buttons to be added in future
    switch (buttonID) {
      case ButtonNames.SaveNew: {
        // Button is a submit button - will emit onFormSubmitted
        // this is post form submittion requirements
        if (!this.dynamicModalConfig || !this.dynamicModalConfig.form) return;
        // Resets the form
        Object.values(this.dynamicModalConfig.form.fields).forEach(
          (field: DynamicModalFieldConfig) => {
            field.value = '';
          }
        );
        break;
      }
      case ButtonNames.SaveClose:
      case ButtonNames.Close: {
        // SaveClose button is a submit button - will emit onFormSubmitted
        // Close button is a non-submit button - so we don't get an updated form
        // this is post form submittion requirements
        this.close.emit();
        break;
      }
      case ButtonNames.Void: {
        // This is a submit button as we need to amend void status before emiting
        if (!this.clientDetails) return;
        this.clientDetails.voided = true;
        this.void.emit(this.clientDetails);
        break;
      }
      case ButtonNames.Edit:
      case ButtonNames.Cancel: {
        // These are non-submit buttons - so we don't get an updated form
        // Both perform the inverse function of each - so we can handle in one call
        if (!this.dynamicModalConfig) return;
        this.editMode = !this.editMode;
        this.dynamicModalConfig.editMode = this.editMode;
        this.setButtonsOrder();
        break;
      }
    }
  }

  onFormSubmitted(clientDetails: Object) {
    this.update.emit(clientDetails as ClientDetails);
  }

  private setButtonsOrder() {
    if (!this.dynamicModalConfig) return;
    this.dynamicModalConfig.actionPanel.buttonsOrder = this.editMode
      ? [
          ButtonNames.SaveNew,
          ButtonNames.SaveClose,
          ButtonNames.Void,
          ButtonNames.Cancel,
        ]
      : [ButtonNames.Edit, ButtonNames.Close];
  }
}
