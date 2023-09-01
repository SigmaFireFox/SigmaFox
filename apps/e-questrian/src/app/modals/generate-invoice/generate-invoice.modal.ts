import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ClientDetail, Clients } from 'src/app/interfaces/clients.interface';
import { ClientsService } from 'src/app/services/clients/clients.service';

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
  clients: ClientDetail[];
}

@Component({
  selector: 'app-generate-invoice-modal',
  templateUrl: './generate-invoice.modal.html',
  styleUrls: ['./generate-invoice.modal.scss'],
})
export class GenerateInvoiceModal {
  @Output() generateInvoiceParameters =
    new EventEmitter<GenerateInvoiceParameters>();
  @Output() cancelled = new EventEmitter<void>();

  clientSelectorType = ClientRange;
  invoiceRange = InvoiceRange.NONE;
  dateRange = DateRange.NONE;
  clientRange = ClientRange.NONE;
  selectedDate = new Date();
  selectedClients = [] as ClientDetail[];
  generateInvoicesParametersForm = new UntypedFormGroup({
    invoiceRange: new UntypedFormControl(1),
    dateRange: new UntypedFormControl(1),
    clientRange: new UntypedFormControl(0),
    date: new UntypedFormControl(this.selectedDate),
    clients: new UntypedFormControl(''),
  });

  isGenerate = false;

  get clients(): Clients {
    return this.clientService.clients;
  }

  constructor(private clientService: ClientsService) {}

  // Button callbacks
  onSubmitClick() {
    if (this.isGenerate) {
      let params = {} as GenerateInvoiceParameters;
      params.invoiceRange = this.invoiceRange;
      params.dateRange = this.dateRange;
      params.clientRange = this.clientRange;
      params.date = this.selectedDate;
      params.clients = this.selectedClients;
      this.generateInvoiceParameters.emit(params);
      return;
    }
    this.cancelled.emit();
  }

  onGenerateInvoicesClick() {
    this.isGenerate = true;
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
  compareClients(client: ClientDetail, displayName: string) {
    return client.displayName == displayName;
  }
}
