import { Injectable } from '@angular/core';
import { Clients } from '../../interfaces/clients.interface';
import { FinancialDocItem } from '../../interfaces/common-page-configs.interface';
import { Payments, PaymentDetails } from '../../interfaces/payments.interface';
import { ClientNotificationService } from '../client-notification/client-notification.service';

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

  constructor(private clientNotificationService: ClientNotificationService) {}

  addPayment(paymentDetails: PaymentDetails) {
    this.currentPayments = this.paymentsOnFile;
    const NewPaymentID = Object.keys(this.paymentsOnFile).length + 1;
    paymentDetails.voided = false;
    this.currentPayments[NewPaymentID] = paymentDetails;
    localStorage.setItem('payments', JSON.stringify(this.currentPayments));
    this.clientNotificationService.sendPaymentReceipt(paymentDetails);
  }

  editPayment(paymentID: number, payment: PaymentDetails) {
    this.currentPayments[paymentID] = payment;
    localStorage.setItem('payments', JSON.stringify(this.currentPayments));
  }

  voidPayment(paymentID: number) {
    if (this.paymentsOnFile[paymentID]) {
      this.paymentsOnFile[paymentID].voided = true;
    }
    localStorage.setItem('payments', JSON.stringify(this.paymentsOnFile));
  }

  setPaymentDocForDisplay(): FinancialDocItem[] {
    this.getClients();
    const payments: FinancialDocItem[] = [];
    Object.keys(this.paymentsOnFile).forEach((key) => {
      const finDoc = {} as FinancialDocItem;
      finDoc.number = parseInt(key);
      finDoc.amount = this.paymentsOnFile[parseInt(key)].amount as number;
      finDoc.date = this.paymentsOnFile[parseInt(key)].date as Date;
      const clientNum = this.paymentsOnFile[parseInt(key)].client;
      finDoc.detail = this.clients[clientNum]?.displayName;
      payments.push(finDoc);
    });
    return payments;
  }

  private getClients() {
    const clientList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientList || '[]');
  }
}
