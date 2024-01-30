/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { AppClientDetail, Clients } from '../../interfaces/clients.interface';
import { ClientsService } from '../../services/clients/clients.service';
import {
  DateRangeSelector,
  DateRangeOption,
  DateService,
  DateRange,
} from '../../services/date/date.service';

export interface GenerateStatementParameters {
  client: unknown;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-generate-statement-modal',
  templateUrl: './generate-statement.modal.html',
  styleUrls: ['./generate-statement.modal.scss'],
})
export class GenerateStatementModal {
  @Output() generateStatementParameters =
    new EventEmitter<GenerateStatementParameters>();
  @Output() cancelled = new EventEmitter<void>();

  dateRangeSelector = DateRangeSelector;
  selectedClient = {} as AppClientDetail;
  selectedDateRange = {} as DateRange;
  startDate = new Date();
  endDate = new Date();
  generateStatementParametersForm = new UntypedFormGroup({
    client: new UntypedFormControl(''),
    dateRange: new UntypedFormControl(1),
    startDate: new UntypedFormControl(this.startDate),
    endDate: new UntypedFormControl(this.endDate),
  });
  isGenerate = false;

  get clients(): Record<string, string> {
    const clientsOnFile: Clients = this.clientService.clientsOnFile;
    const _clients: Record<string, string> = {};
    Object.keys(clientsOnFile).forEach((key) => {
      _clients[key] = clientsOnFile[parseInt(key)].displayName;
    });
    return _clients;
  }

  get dateRangeOptionsFromService(): DateRangeOption[] {
    return this.dateService.dateRangeOptions;
  }

  get dateRangeOptions(): Record<string, string> {
    const _dateOptions: Record<string, string> = {};
    Object.keys(this.dateRangeOptionsFromService).forEach((key) => {
      _dateOptions[key] =
        this.dateRangeOptionsFromService[parseInt(key)].display;
    });
    return _dateOptions;
  }

  constructor(
    private clientService: ClientsService,
    private dateService: DateService
  ) {}

  // Button callbacks
  onSubmitClick() {
    if (this.isGenerate) {
      const params = {} as GenerateStatementParameters;
      params.client = this.selectedClient;
      params.startDate = this.startDate;
      params.endDate = this.endDate;
      this.generateStatementParameters.emit(params);
      return;
    }
    this.cancelled.emit();
  }

  onGenerateStatementClick() {
    this.isGenerate = true;
  }

  // Field callbacks
  onClientSelected() {
    this.selectedClient =
      this.generateStatementParametersForm.controls['client'].value;
  }

  onDateRangeSelected() {
    this.selectedDateRange =
      this.dateService.dateRangeOptions[
        this.generateStatementParametersForm.controls['dateRange'].value
      ].value;

    this.startDate = this.selectedDateRange.startDate;
    this.endDate = this.selectedDateRange.endDate;
    this.generateStatementParametersForm.controls['startDate'].setValue(
      this.startDate
    );
    this.generateStatementParametersForm.controls['endDate'].setValue(
      this.endDate
    );
  }

  onStartDateChange() {
    this.startDate =
      this.generateStatementParametersForm.controls['startDate'].value;
  }

  onEndDateChange() {
    this.endDate =
      this.generateStatementParametersForm.controls['endDate'].value;
  }

  // Call backs to set options
  compareClients(client: AppClientDetail, displayName: string) {
    return client.displayName == displayName;
  }
}
