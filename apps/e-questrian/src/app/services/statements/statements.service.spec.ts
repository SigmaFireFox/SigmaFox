import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { PaymentType } from 'src/app/enums/payments.enum';
import { Invoices } from 'src/app/interfaces/invoices.interface';
import { Payments } from 'src/app/interfaces/payments.interface';
import { GenerateStatementParameters } from 'src/app/modals/generate-statement/generate-statement.modal';
import { environment } from 'src/environments/environment';
import { ClientNotificationService } from '../client-notification/client-notification.service';
import { ClientsService } from '../clients/clients.service';
import { InvoicesService } from '../invoices/invoices.service';
import { PaymentsService } from '../payments/payments.service';

import { StatementsService } from './statements.service';

describe('StatementsService', () => {
  let service: StatementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [InvoicesService, PaymentsService, ClientsService],
    });
    service = TestBed.inject(StatementsService);
  });

  const mockParams: GenerateStatementParameters = {
    client: {
      //TODO: Should be just the clientID
      displayName: 'Bob Hope',
      firstName: 'Bob',
      lastName: 'Hope',
      email: 'bob@hope.com',
      telephoneNumber: '0123456789',
    },
    startDate: new Date(2022, 1, 1),
    endDate: new Date(2022, 1, 28),
  };

  const mockInvoices = {
    1: { clientID: 1, date: new Date(2021, 12, 31), appointments: [1] }, // Before date scope
    2: { clientID: 1, date: new Date(2021, 12, 31), appointments: [2, 3] }, // Before date scope
    3: { clientID: 1, date: new Date(2022, 1, 7), appointments: [4] }, // Include
    4: { clientID: 1, date: new Date(2022, 1, 14), appointments: [5, 6, 7] }, // Include
    5: { clientID: 2, date: new Date(2022, 1, 21), appointments: [8] }, // Wrong client
    6: { clientID: 1, date: new Date(2022, 1, 8), appointments: [9] }, // Include
    7: { clientID: 1, date: new Date(2022, 2, 1), appointments: [9] }, // After date scope
  } as Invoices;
  const mockPayments = {
    1: {
      // Before date scope
      date: new Date(2021, 12, 31),
      client: 1,
      paymentType: PaymentType.EFT,
      amount: 100,
      voided: false,
    },
    2: {
      // Include EFT
      date: new Date(2022, 1, 7),
      client: 1,
      paymentType: PaymentType.EFT,
      amount: 100,
      voided: false,
    },
    3: {
      // Wrong client
      date: new Date(2022, 1, 7),
      client: 2,
      paymentType: PaymentType.EFT,
      amount: 100,
      voided: false,
    },
    4: {
      // Include EFT

      date: new Date(2022, 1, 10),
      client: 1,
      paymentType: PaymentType.EFT,
      amount: 50,
      voided: false,
    },
    5: {
      // Include Cash
      date: new Date(2022, 1, 14),
      client: 1,
      paymentType: PaymentType.CASH,
      amount: 75,
      voided: false,
    },
    6: {
      // After date scope
      date: new Date(2022, 2, 7),
      client: 1,
      paymentType: PaymentType.EFT,
      amount: 100,
      voided: false,
    },
  } as Payments;

  describe('generateStatement()', () => {
    it('should generate statement for client based on payment and invoice data and date rabge', () => {
      // Assemble
      spyOnProperty(
        TestBed.inject(InvoicesService),
        'invoices',
        'get'
      ).and.returnValue(mockInvoices);
      spyOnProperty(
        TestBed.inject(PaymentsService),
        'payments',
        'get'
      ).and.returnValue(mockPayments);
      spyOn(TestBed.inject(ClientsService), 'getClientID').and.returnValue(1);
      const expectedStatement = [
        {
          number: 0,
          date: new Date(2022, 1, 1),
          detail: 'Opening balance',
          amount: 650,
          docType: 4,
        },
        {
          number: 3,
          date: new Date(2022, 1, 7),
          detail: 'Invoice',
          amount: 250,
          docType: 2,
        },
        {
          number: 2,
          date: new Date(2022, 1, 7),
          detail: 'Payment',
          amount: -100,
          docType: 3,
        },
        {
          number: 6,
          date: new Date(2022, 1, 8),
          detail: 'Invoice',
          amount: 250,
          docType: 2,
        },
        {
          number: 4,
          date: new Date(2022, 1, 10),
          detail: 'Payment',
          amount: -50,
          docType: 3,
        },
        {
          number: 4,
          date: new Date(2022, 1, 14),
          detail: 'Invoice',
          amount: 750,
          docType: 2,
        },
        {
          number: 5,
          date: new Date(2022, 1, 14),
          detail: 'Payment',
          amount: -75,
          docType: 3,
        },
        {
          number: 0,
          date: new Date(2022, 1, 28),
          detail: 'Closing balance',
          amount: 1675,
          docType: 4,
        },
      ];

      // Act
      const resultStatement = service.generateStatement(mockParams);

      expect(resultStatement).toEqual(expectedStatement);
    });
  });
});
