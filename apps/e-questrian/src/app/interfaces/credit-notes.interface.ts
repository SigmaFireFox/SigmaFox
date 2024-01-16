export interface CreditNotes {
  [creditNoteID: number]: CreditNoteDetails;
}

export interface CreditNoteDetails {
  date: Date;
  clientID: number;
  invoices: number[];
  amount: number;
}
