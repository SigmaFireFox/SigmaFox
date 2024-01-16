/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Appointments } from '../../interfaces/appointments.interface';
import { CalendarData } from '../../interfaces/calander.interface';
import { Clients, ClientDetail } from '../../interfaces/clients.interface';
import {
  FinancialDocItem,
  FinancialDocType,
  DocView,
  ProcessResult,
  ResultType,
} from '../../interfaces/common-page-configs.interface';
import { Invoices } from '../../interfaces/invoices.interface';
import {
  ClientRange,
  DateRange,
  GenerateInvoiceParameters,
} from '../../modals/generate-invoice/generate-invoice.modal';
import { AppointmentsService } from '../appointments/appointments.service';
import {
  ClientsService,
  FinancialRecordType,
} from '../clients/clients.service';

export interface GenerateInvoiceResult {
  numberOfInvoices: number;
  clients: number[];
  startDate: Date;
  endDate: Date;
  totalValue: number;
  largestValue: number;
  averageValue: number;
}

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  today: Date = new Date();
  calendarData: CalendarData = {};
  currentInvoices: Invoices = {};
  currentAppointments: Appointments = {};
  test1: any;
  test2: any;
  test3: any;
  test4: any;
  test5: any;

  get invoicesOnFile(): Invoices {
    const appointmentString = localStorage.getItem('invoices');
    return JSON.parse(appointmentString || '{}');
  }

  get appointmentsOnFile(): Appointments {
    return this.appointmentsService.appointments;
  }

  get clients(): Clients {
    return this.clientsService.clientsOnFile;
  }

  constructor(
    private appointmentsService: AppointmentsService,
    private clientsService: ClientsService
  ) {
    this.currentInvoices = this.invoicesOnFile;
    this.currentAppointments = this.appointmentsOnFile;
  }

  setInvoiceDataForDisplay(): FinancialDocItem[] {
    const invoiceDocItems = [] as FinancialDocItem[];

    Object.keys(this.currentInvoices).forEach((key) => {
      const number = parseInt(key);
      invoiceDocItems.push({
        number: number,
        date: new Date(this.currentInvoices[number].date),
        detail:
          (this.currentAppointments[
            this.currentInvoices[number].appointments[0]
          ].client?.displayName as string) || '',
        amount: this.currentInvoices[number].appointments.length * 250,
        docType: FinancialDocType.INVOICE,
        voided: this.currentInvoices[number].voided,
      });
    });
    return invoiceDocItems;
  }

  setInvoiceDocForDisplay(selectedInvoiceID: number): DocView {
    const invoiceDocViewConfig: DocView = {} as DocView;
    this.currentInvoices[selectedInvoiceID];
    invoiceDocViewConfig.subHeader = 'Invoice #' + selectedInvoiceID;
    invoiceDocViewConfig.docNumber = selectedInvoiceID;
    const firstAppoinentNumber =
      this.currentInvoices[selectedInvoiceID]?.appointments[0];
    invoiceDocViewConfig.docClient =
      (this.currentAppointments[firstAppoinentNumber]
        ?.client as ClientDetail) || {};
    invoiceDocViewConfig.lineItems = [{ Lessons: [] }];
    this.currentInvoices[selectedInvoiceID]?.appointments.forEach(
      (appointmentID) => {
        invoiceDocViewConfig.lineItems[0]['Lessons'].push({
          number: appointmentID,
          date: new Date(this.currentAppointments[appointmentID].date),
          detail: this.currentAppointments[appointmentID].subject || '',
          amount: 250,
        });
      }
    );
    return invoiceDocViewConfig;
  }

  setInvoiceGenerationResultsForDisplay(results: GenerateInvoiceResult) {
    // TODO: This should return something?
    if (!results) {
      return;
    }

    const resultsToDisplay: ProcessResult[] = [];
    resultsToDisplay.push(
      {
        description: 'Clients invoiced:',
        resultType: ResultType.LIST,
        result: results.clients,
      },
      {
        description: 'Number of invoices:',
        resultType: ResultType.NUMBER,
        result: results.numberOfInvoices,
      },
      {
        description: 'Total value of invoices:',
        resultType: ResultType.NUMBER,
        result: results.totalValue,
      },
      {
        description: 'Average value of invoices:',
        resultType: ResultType.NUMBER,
        result: results.averageValue,
      },
      {
        description: 'Largest invoice value:',
        resultType: ResultType.NUMBER,
        result: results.largestValue,
      },
      {
        description: 'Earliest appointment date invoice:',
        resultType: ResultType.DATE,
        result: results.startDate,
      },
      {
        description: 'Latest appointment date invoice:',
        resultType: ResultType.DATE,
        result: results.endDate,
      }
    );
  }

  generateInvoices(params: GenerateInvoiceParameters): GenerateInvoiceResult {
    const results = {
      numberOfInvoices: 0,
      clients: [],
      startDate: new Date(new Date().setHours(0, 0, 0, 0)),
      endDate: new Date(new Date().setHours(0, 0, 0, 0)),
      totalValue: 0,
      largestValue: 0,
      averageValue: 0,
    } as GenerateInvoiceResult;

    const clientRefs = this.getClientIDRefs();
    const clientsToBeInvoiced = this.getListOfClientsToInvoice(
      params,
      clientRefs
    );
    const cutOffDate = this.getCutOffDate(params);
    const appointmentsToInvoice = this.getAppointmentsToBeInvoiced(
      clientsToBeInvoiced,
      clientRefs,
      cutOffDate,
      results
    );
    results.numberOfInvoices = this.setInvoices(appointmentsToInvoice);
    this.updateResultsAfterSettingInvoices(appointmentsToInvoice, results);
    this.setDataToLocal();
    this.test1 = clientRefs;
    this.test2 = clientsToBeInvoiced;
    this.test3 = cutOffDate;
    this.test4 = appointmentsToInvoice;
    this.test5 = results;

    return results;
  }

  private getClientIDRefs(): { [clientDisplayName: string]: number } {
    const clientRefs: { [clientDisplayName: string]: number } = {};
    Object.keys(this.clients).forEach((clientID) => {
      clientRefs[this.clients[parseInt(clientID)].displayName] =
        parseInt(clientID);
    });
    return clientRefs;
  }

  private getListOfClientsToInvoice(
    params: GenerateInvoiceParameters,
    clientRefs: { [clientDisplayName: string]: number }
  ): number[] {
    const clientsToBeInvoiced: number[] = [];

    if (params.clientRange == ClientRange.ALL) {
      Object.keys(this.clients).forEach((clientID) => {
        clientsToBeInvoiced.push(parseInt(clientID));
      });
      return clientsToBeInvoiced;
    }

    params.clients.forEach((client) => {
      clientsToBeInvoiced.push(clientRefs[client.displayName]);
    });
    return clientsToBeInvoiced;
  }

  private getCutOffDate(params: GenerateInvoiceParameters): Date {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    return params.dateRange === DateRange.LIMITED
      ? new Date(params.date)
      : new Date(
          today.getFullYear() + 1,
          today.getMonth(),
          today.getDate() - 1
        );
  }

  private getAppointmentsToBeInvoiced(
    clientsToBeInvoiced: number[],
    clientRefs: { [clientDisplayName: string]: number },
    cutOffDate: Date,
    results: GenerateInvoiceResult
  ): { [clientID: number]: number[] } {
    const appointmentsToInvoice = {} as { [clientID: number]: number[] };
    Object.keys(this.currentAppointments).forEach((appointmentIDStr) => {
      const appointmentID = parseInt(appointmentIDStr);
      // Has the appointment been invoiced?
      if (this.currentAppointments[appointmentID].invoice != 0) {
        return;
      }

      // Get the clientID
      const currentClient = this.currentAppointments[appointmentID].client;
      if (!currentClient?.displayName) {
        return;
      }
      const currentClientID = clientRefs[currentClient?.displayName];

      // Is the current client in list of clients to be invoiced
      if (!clientsToBeInvoiced.includes(currentClientID)) {
        return;
      }

      // Is the appointment date before or on the cut off date
      const appointmentDate = new Date(
        this.currentAppointments[appointmentID].date
      );
      if (appointmentDate > cutOffDate) {
        return;
      }
      results.endDate =
        appointmentDate > results.endDate ? appointmentDate : results.endDate;
      results.startDate =
        appointmentDate < results.startDate
          ? appointmentDate
          : results.startDate;

      currentClientID in appointmentsToInvoice
        ? appointmentsToInvoice[currentClientID].push(appointmentID)
        : (appointmentsToInvoice[currentClientID] = [appointmentID]);

      if (results.clients.includes(currentClientID)) {
        return;
      }
      results.clients.push(currentClientID);
    });
    return appointmentsToInvoice;
  }

  private setInvoices(appointmentsToInvoice: {
    [clientID: number]: number[];
  }): number {
    // Add an invoice for each assigning the appointments to that invoice
    let nextInvoiceNumber = Object.keys(this.currentInvoices).length + 1;
    let invoiceCount = 0;
    Object.keys(appointmentsToInvoice).forEach((clientIDStr) => {
      const clientID = parseInt(clientIDStr);
      // Generate invoice
      this.currentInvoices[nextInvoiceNumber] = {
        clientID: clientID,
        date: new Date(),
        appointments: appointmentsToInvoice[clientID],
        voided: false,
      };

      appointmentsToInvoice[clientID].forEach((appointmentID) => {
        this.currentAppointments[appointmentID].invoice = nextInvoiceNumber;
      });

      this.clientsService.addFinancialRecordToClient(
        clientID,
        FinancialRecordType.Invoice,
        nextInvoiceNumber
      );

      nextInvoiceNumber++;
      invoiceCount++;
    });
    return invoiceCount;
  }

  private updateResultsAfterSettingInvoices(
    appointmentsToInvoice: { [clientID: number]: number[] },
    results: GenerateInvoiceResult
  ) {
    Object.keys(appointmentsToInvoice).forEach((clientIDStr) => {
      const clientID = parseInt(clientIDStr);
      results.totalValue =
        results.totalValue + appointmentsToInvoice[clientID].length * 250;
      if (appointmentsToInvoice[clientID].length * 250 > results.largestValue) {
        results.largestValue = appointmentsToInvoice[clientID].length * 250;
      }
    });

    results.averageValue =
      Math.round((results.totalValue / results.numberOfInvoices) * 100) / 100;
  }

  private setDataToLocal() {
    // Write new invoices and appointements to stored data
    localStorage.setItem('invoices', JSON.stringify(this.currentInvoices));
    localStorage.setItem(
      'appointments',
      JSON.stringify(this.currentAppointments)
    );
  }
}
