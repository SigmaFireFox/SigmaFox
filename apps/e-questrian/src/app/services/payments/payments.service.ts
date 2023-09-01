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

  get payments(): Payments {
    const paymentString = localStorage.getItem('payments');
    return JSON.parse(paymentString || '{}');
  }

  constructor(private clientNotificationService: ClientNotificationService) {}

  addPayment(paymentDetails: PaymentDetails) {
    const NewPaymentID = Object.keys(this.payments).length + 1;
    paymentDetails.voided = false;
    this.payments[NewPaymentID] = paymentDetails;
    localStorage.setItem('payments', JSON.stringify(this.payments));
    this.clientNotificationService.sendPaymentReceipt(paymentDetails);
  }

  editPayment(paymentID: number, payment: PaymentDetails) {
    this.payments[paymentID] = payment;
    localStorage.setItem('payments', JSON.stringify(this.payments));
  }

  voidPayment(paymentID: number) {
    if (this.payments[paymentID]) {
      this.payments[paymentID].voided = true;
    }
    localStorage.setItem('payments', JSON.stringify(this.payments));
  }

  setPaymentDocForDisplay(): FinancialDocItem[] {
    this.getClients();
    const payments: FinancialDocItem[] = [];
    Object.keys(this.payments).forEach((key) => {
      const finDoc = {} as FinancialDocItem;
      finDoc.number = parseInt(key);
      finDoc.amount = this.payments[parseInt(key)].amount as number;
      finDoc.date = this.payments[parseInt(key)].date as Date;
      const clientNum = this.payments[parseInt(key)].client;
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
