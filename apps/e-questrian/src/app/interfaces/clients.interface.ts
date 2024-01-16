export interface Clients {
  [cientID: number]: ClientDetail;
}

export interface ClientDetail {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  telephoneNumber: string;
  voided: boolean;
  finacialRecords: ClientFinancialRecords;
}

export interface ClientFinancialRecords {
  invoices: number[];
  payments: number[];
  creditNotes: number[];
}
