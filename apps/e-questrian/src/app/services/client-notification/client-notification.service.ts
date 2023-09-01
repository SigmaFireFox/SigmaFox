import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first } from 'rxjs';
import { Clients } from '../../interfaces/clients.interface';
import { PaymentDetails } from '../../interfaces/payments.interface';
import { ClientsService } from '../clients/clients.service';
import { EmailTemplatesService } from '../email-templates/email-templates.service';

@Injectable({
  providedIn: 'root',
})
export class ClientNotificationService {
  token: string | undefined;
  options: HttpHeaders | undefined;

  get clients(): Clients {
    return this.clientsService.clients;
  }

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private clientsService: ClientsService,
    private emailTemplatesService: EmailTemplatesService
  ) {}

  async sendPaymentReceipt(payment: PaymentDetails) {
    const template = this.emailTemplatesService.paymentReceiptTemplate;
    const date = new Date().setHours(0, 0, 0, 0);
    const url = 'https://us-central1-e-questrian.cloudfunctions.net/email';
    const body = {
      from: 'e-Questrian Notifications <e-questrianonline@outlook.com>',
      to: this.clients[payment.client]?.email,
      subject: 'Payment receipt',
      html:
        template[0] +
        payment.amount +
        template[1] +
        payment.date +
        template[2] +
        date +
        template[3],
    };
    const options = { headers: await this.getAuthHeaders() };
    this.http.post(url, body, options);
  }

  private async getAuthHeaders() {
    const user = (await this.afAuth.user.pipe(first()).toPromise()) as User;
    this.token = await user?.getIdToken();

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
  }
}
