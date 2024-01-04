import { PaymentType } from '../enums/payments.enum';

export interface Payments {
  [invoiceID: number]: PaymentDetails;
}

export interface PaymentDetails {
  date: Date;
  client: number;
  paymentType: PaymentType;
  amount: number;
  voided: boolean;
}
