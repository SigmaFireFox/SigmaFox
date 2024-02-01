import { ClientDetails } from '@sigmafox/modals';

export interface Clients {
  [cientID: number]: ClientDetailWithFinancialRecords;
}

export interface ClientDetailWithFinancialRecords {
  clientDetails: ClientDetails;
  financialRecords: ClientFinancialRecords;
}

export interface ClientFinancialRecords {
  invoices: number[];
  payments: number[];
  creditNotes: number[];
}
