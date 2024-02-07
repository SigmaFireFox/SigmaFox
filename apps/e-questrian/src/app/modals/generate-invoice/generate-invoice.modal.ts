/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import {
  MatDatepickerModule,
  MatDateSelectionModel,
} from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {
  ButtonSize,
  ButtonStyleClass,
  StandardButton,
  StandardButtonConfig,
} from '@sigmafox/buttons';
import {
  ClientDetailWithFinancialRecords,
  Clients,
} from '../../interfaces/clients.interface';
import { ClientsService } from '../../services/clients/clients.service';

export enum InvoiceRange {
  NONE,
  ALL,
  CUSTOM,
}

export enum DateRange {
  NONE,
  ALL,
  LIMITED,
}

export enum ClientRange {
  NONE,
  ALL,
  SINGLE,
  MULTI,
}

export interface GenerateInvoiceParameters {
  invoiceRange: InvoiceRange;
  dateRange: DateRange;
  clientRange: ClientRange;
  date: Date;
  clients: ClientDetailWithFinancialRecords[];
}

export enum ButtonNames {
  Generate = 'generate',
  Cancel = 'cancel',
}

@Component({
  selector: 'app-generate-invoice-modal',
  templateUrl: './generate-invoice.modal.html',
  styleUrls: ['./generate-invoice.modal.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    StandardButton,
  ],
})
export class GenerateInvoiceModal {
  @Output() generateInvoiceParameters =
    new EventEmitter<GenerateInvoiceParameters>();
  @Output() cancelled = new EventEmitter<void>();

  clientSelectorType = ClientRange;
  invoiceRange = InvoiceRange.ALL;
  dateRange = DateRange.ALL;
  clientRange = ClientRange.ALL;
  selectedDate = new Date();
  selectedClients = [] as ClientDetailWithFinancialRecords[];
  generateInvoicesParametersForm = new UntypedFormGroup({
    invoiceRange: new UntypedFormControl(1),
    dateRange: new UntypedFormControl(1),
    clientRange: new UntypedFormControl(0),
    date: new UntypedFormControl(this.selectedDate),
    clients: new UntypedFormControl(''),
  });

  isGenerate = false;

  actionButtons: StandardButtonConfig[] = [
    {
      buttonID: ButtonNames.Generate,
      buttonSize: ButtonSize.Standard,
      buttonTextContent: 'Generate invoices',
      buttonStyleClass: ButtonStyleClass.Primary,
      isDisabled: false,
    },
    {
      buttonID: ButtonNames.Cancel,
      buttonSize: ButtonSize.Standard,
      buttonTextContent: 'Cancel',
      buttonStyleClass: ButtonStyleClass.Secondary,
      isDisabled: false,
    },
  ];

  get clients(): Record<string, string> {
    const clientsOnFile: Clients = this.clientService.clientsOnFile;
    const _clients: Record<string, string> = {};
    Object.keys(clientsOnFile).forEach((key) => {
      _clients[key] = clientsOnFile[parseInt(key)].clientDetails.displayName;
    });
    return _clients;
  }

  constructor(private clientService: ClientsService) {}

  onButtonClicked(buttonID: string) {
    switch (buttonID) {
      case ButtonNames.Generate: {
        const params = {} as GenerateInvoiceParameters;
        params.invoiceRange = this.invoiceRange;
        params.dateRange = this.dateRange;
        params.clientRange = this.clientRange;
        params.date = this.selectedDate;
        params.clients = this.selectedClients;
        this.generateInvoiceParameters.emit(params);
        return;
      }
      case ButtonNames.Cancel: {
        this.cancelled.emit();
      }
    }
  }

  // Field callbacks
  onInvoiceRangeRadioClick() {
    this.invoiceRange = parseInt(
      this.generateInvoicesParametersForm.controls['invoiceRange'].value
    );
    if (this.invoiceRange === InvoiceRange.ALL) {
      this.clientRange = ClientRange.NONE;
      this.dateRange = DateRange.NONE;
    }
  }

  onDateRangeRadioClick() {
    this.dateRange = parseInt(
      this.generateInvoicesParametersForm.controls['dateRange'].value
    );
  }

  onClientRangeClick() {
    this.clientRange = parseInt(
      this.generateInvoicesParametersForm.controls['clientRange'].value
    );
  }

  onClientSelected() {
    if (this.clientRange === ClientRange.SINGLE) {
      this.selectedClients = [
        this.generateInvoicesParametersForm.controls['clients'].value,
      ];
      return;
    }
    this.selectedClients =
      this.generateInvoicesParametersForm.controls['clients'].value;
  }

  onDateChange() {
    this.selectedDate =
      this.generateInvoicesParametersForm.controls['date'].value;
  }

  // Call backs to set options
  compareClients(
    client: ClientDetailWithFinancialRecords,
    displayName: string
  ) {
    return client.clientDetails.displayName == displayName;
  }
}
