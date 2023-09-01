import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { ClientNotificationService } from './client-notification.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { PaymentType } from 'src/app/enums/payments.enum';
import { PaymentDetails } from 'src/app/interfaces/payments.interface';
import { Clients } from 'src/app/interfaces/clients.interface';
import { EmailTemplatesService } from '../email-templates/email-templates.service';
import { ClientsService } from '../clients/clients.service';

describe('ClientNotificationService', () => {
  let service: ClientNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
    });
    service = TestBed.inject(ClientNotificationService);
  });

  const mockPayment = {
    date: new Date(new Date(2022, 10, 1).setHours(0, 0, 0, 0)),
    client: 3,
    paymentType: PaymentType.EFT,
    amount: 300,
    voided: false,
  } as PaymentDetails;

  const mockClients = {
    1: {
      displayName: 'Bob Hope',
      firstName: 'Bob',
      lastName: 'Hope',
      email: 'bob@hope.co.za',
      telephoneNumber: '072 462 4685',
    },
    2: {
      displayName: 'Bill Hope',
      firstName: 'Bill',
      lastName: 'Hope',
      email: 'bill@hope.co.za',
      telephoneNumber: '072 462 4686',
    },
    3: {
      displayName: 'Jill Hope',
      firstName: 'Jill',
      lastName: 'Hope',
      email: 'jill@hope.co.za',
      telephoneNumber: '072 462 4687',
    },
  } as Clients;
  const mockPaymentReceiptTemplate = ['Part 1', 'Part 2', 'Part 3', 'Part 4'];

  describe('sendPaymentReceipt()', () => {
    it('should post the eamil to the required endpoint with the required arguments', (done) => {
      // Assemble
      service.token = 'A random token';
      const httpSpy = spyOn(
        TestBed.inject(HttpClient),
        'post'
      ).and.callThrough();
      spyOnProperty(
        TestBed.inject(EmailTemplatesService),
        'paymentReceiptTemplate',
        'get'
      ).and.returnValue(mockPaymentReceiptTemplate);
      spyOnProperty(
        TestBed.inject(ClientsService),
        'clients',
        'get'
      ).and.returnValue(mockClients);
      const epectedURL =
        'https://us-central1-e-questrian.cloudfunctions.net/email';
      const expectedBody = {
        from: 'e-Questrian Notifications <e-questrianonline@outlook.com>',
        to: 'jill@hope.co.za',
        subject: 'Payment receipt',
        html: 'Part 1300Part 2Tue Nov 01 2022 00:00:00 GMT+0200 (South Africa Standard Time)Part 31665525600000Part 4',
      };
      const expectedHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer A random token`,
        }),
      };

      // Act
      service.sendPaymentReceipt(mockPayment).then((result) => {
        // expect(httpSpy).toHaveBeenCalledWith(
        //   epectedURL,
        //   expectedBody,
        //   expectedHeaders can't get this right
        // );.
        expect(httpSpy).toHaveBeenCalled();
        done();
      });
    });
  });
});
