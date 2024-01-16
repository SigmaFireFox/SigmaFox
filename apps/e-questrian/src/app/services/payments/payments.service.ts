import { Injectable } from '@angular/core';
import { Clients } from '../../interfaces/clients.interface';
import { FinancialDocItem } from '../../interfaces/common-page-configs.interface';
import { Payments, PaymentDetails } from '../../interfaces/payments.interface';
import { ClientNotificationService } from '../client-notification/client-notification.service';
import {
  ClientsService,
  FinancialRecordType,
} from '../clients/clients.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  clients = {} as Clients;
  currentPayments: Payments = {};

  get paymentsOnFile(): Payments {
    const paymentString = localStorage.getItem('payments');
    return JSON.parse(paymentString || '{}');
  }

  constructor(
    private clientNotificationService: ClientNotificationService,
    private clientsService: ClientsService
  ) {
    this.currentPayments = this.paymentsOnFile;
  }

  addPayment(paymentDetails: PaymentDetails) {
    this.currentPayments = this.paymentsOnFile;
    const NewPaymentID = Object.keys(this.paymentsOnFile).length + 1;
    paymentDetails.voided = false;
    this.currentPayments[NewPaymentID] = paymentDetails;

    this.clientsService.addFinancialRecordToClient(
      paymentDetails.clientID,
      FinancialRecordType.Payment,
      NewPaymentID
    );

    localStorage.setItem('payments', JSON.stringify(this.currentPayments));
    this.clientNotificationService.sendPaymentReceipt(paymentDetails);
  }

  editPayment(paymentID: number, payment: PaymentDetails) {
    this.currentPayments[paymentID] = payment;
    localStorage.setItem('payments', JSON.stringify(this.currentPayments));
  }

  voidPayment(paymentID: number) {
    if (this.currentPayments[paymentID]) {
      this.currentPayments[paymentID].voided = true;
    }
    localStorage.setItem('payments', JSON.stringify(this.currentPayments));
  }

  setPaymentDocForDisplay(): FinancialDocItem[] {
    this.getClients();
    const payments: FinancialDocItem[] = [];
    Object.keys(this.currentPayments).forEach((key) => {
      const finDoc = {} as FinancialDocItem;
      finDoc.number = parseInt(key);
      finDoc.amount = this.currentPayments[parseInt(key)].amount as number;
      finDoc.date = this.currentPayments[parseInt(key)].date as Date;
      const clientNum = this.currentPayments[parseInt(key)].clientID;
      finDoc.detail = this.clients[clientNum]?.displayName;
      finDoc.voided = this.currentPayments[parseInt(key)].voided;
      payments.push(finDoc);
    });
    return payments;
  }

  private getClients() {
    const clientList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientList || '[]');
  }
}
