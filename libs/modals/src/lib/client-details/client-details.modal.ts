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
  DisplayName = 'displayName',
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

  @Output() update = new EventEmitter<ClientDetails>();
  @Output() close = new EventEmitter<void>();

  dynamicModalConfig: DynamicModalConfig | undefined;
  editMode = false;

  ngOnInit() {
    this.editMode = !this.clientDetails;
    this.dynamicModalConfig = {
      header: {
        value: this.clientDetails?.displayName || 'New client',
        editable: true,
        fieldName: FormFieldNames.DisplayName,
        feederFields: [FormFieldNames.FirstName, FormFieldNames.LastName],
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
            isSubmit: true,
            requiresFormReset: true,
            buttonConfig: {
              buttonID: ButtonNames.SaveNew,
              buttonTextContent: 'Save and New',
              buttonStyleClass: ButtonStyleClass.Primary,
              isDisabled: true,
            },
          },
          [ButtonNames.SaveClose]: {
            isSubmit: true,
            buttonConfig: {
              buttonID: ButtonNames.SaveClose,
              buttonTextContent: 'Save and Close',
              buttonStyleClass: ButtonStyleClass.Primary,
              isDisabled: true,
            },
          },
          [ButtonNames.Void]: {
            buttonConfig: {
              buttonID: ButtonNames.Void,
              buttonTextContent: 'Void Client',
              buttonStyleClass: ButtonStyleClass.Secondary,
              isDisabled: false,
            },
          },
          [ButtonNames.Cancel]: {
            requiresFormReset: true,
            specialSubmitState: {
              onSubmit: ButtonStyleClass.Secondary,
              onUnSubmit: ButtonStyleClass.Primary,
            },
            buttonConfig: {
              buttonID: ButtonNames.Cancel,
              buttonTextContent: this.clientDetails ? 'Cancel Edit' : 'Cancel',
              buttonStyleClass: ButtonStyleClass.Primary,
              isDisabled: false,
            },
          },
          [ButtonNames.Edit]: {
            buttonConfig: {
              buttonID: ButtonNames.Edit,
              buttonTextContent: 'Edit Client',
              buttonStyleClass: ButtonStyleClass.Secondary,
              isDisabled: false,
            },
          },
          [ButtonNames.Close]: {
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
        // Dynamic form will reset itself - nothing more to do here
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
        // TODO: requires warning before doing this!
        this.update.emit(this.clientDetails);
        this.close.emit();
        break;
      }
      case ButtonNames.Edit:
      case ButtonNames.Cancel: {
        // These are non-submit buttons - so we don't get an updated form
        // Both perform the inverse function of each - so we can handle in one call
        if (!this.clientDetails) return this.close.emit();
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

    // Edit mode buttons
    if (this.editMode) {
      this.dynamicModalConfig.actionPanel.buttonsOrder = [
        ButtonNames.SaveNew,
        ButtonNames.SaveClose,
        ButtonNames.Void,
        ButtonNames.Cancel,
      ];
      if (this.clientDetails) {
        // Remove save and new if its an exsisting client
        this.dynamicModalConfig.actionPanel.buttonsOrder.splice(0, 1);
      } else {
        this.dynamicModalConfig.actionPanel.buttonsOrder.splice(2, 1);
      }
      return;
    }

    // View mode buttons
    this.dynamicModalConfig.actionPanel.buttonsOrder = [
      ButtonNames.Edit,
      ButtonNames.Close,
    ];
  }
}
