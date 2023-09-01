import { TestBed } from '@angular/core/testing';
import {
  AppointmentDetail,
  AppointmentType,
} from 'src/app/interfaces/appointments.interface';
import { Clients } from 'src/app/interfaces/clients.interface';
import {
  DocView,
  FinancialDocItem,
  LineItemGroup,
} from 'src/app/interfaces/common-page-configs.interface';
import { Invoices } from 'src/app/interfaces/invoices.interface';
import {
  ClientRange,
  DateRange,
  GenerateInvoiceParameters as GenerateInvoiceParams,
  InvoiceRange,
} from 'src/app/modals/generate-invoice/generate-invoice.modal';
import { AppointmentsService } from '../appointments/appointments.service';
import { ClientsService } from '../clients/clients.service';

import { GenerateInvoiceResult, InvoicesService } from './invoices.service';

describe('InvoicesService', () => {
  let service: InvoicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoicesService);
  });

  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const dates = {
    today: today,
    yesterday: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    ),
    tomorrow: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    ),
    nextMonth: new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    ),
    nextYear: new Date(
      today.getFullYear() + 1,
      today.getMonth(),
      today.getDate()
    ),
  };

  const mockInvoices = {
    1: { clientID: 1, date: dates.yesterday, appointments: [1] },
    2: { clientID: 2, date: today, appointments: [2, 3] },
  } as Invoices;

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

  const mockAppointments = {
    1: {
      // Invoiced
      type: AppointmentType.Lesson,
      subject: 'Lesson with ' + mockClients[1].firstName,
      date: dates.yesterday,
      startTime: { hours: 8, minutes: 0 },
      duration: { hours: 0, minutes: 30 },
      client: mockClients[1],
      invoice: 1,
      cancelled: false,
    },
    2: {
      // Invoiced
      type: AppointmentType.Lesson,
      subject: 'Lesson with ' + mockClients[2].firstName,
      date: dates.yesterday,
      startTime: { hours: 10, minutes: 0 },
      duration: { hours: 0, minutes: 30 },
      client: mockClients[2],
      invoice: 2,
      cancelled: false,
    },
    3: {
      // Invoiced
      type: AppointmentType.Lesson,
      subject: 'Lesson with ' + mockClients[2].firstName,
      date: dates.yesterday,
      startTime: { hours: 14, minutes: 0 },
      duration: { hours: 0, minutes: 30 },
      client: mockClients[2],
      invoice: 2,
      cancelled: true,
      creditNote: 1,
    },
    4: {
      // Not invoiced - Client 1 - within month
      type: AppointmentType.Lesson,
      subject: 'Lesson with ' + mockClients[1].firstName,
      date: dates.tomorrow,
      startTime: { hours: 14, minutes: 0 },
      duration: { hours: 0, minutes: 30 },
      client: mockClients[1],
      cancelled: false,
      invoice: 0,
    },
    5: {
      // Not invoiced - Client 2 - within month
      type: AppointmentType.Lesson,
      subject: 'Lesson with ' + mockClients[2].firstName,
      date: dates.tomorrow,
      startTime: { hours: 14, minutes: 0 },
      duration: { hours: 0, minutes: 30 },
      client: mockClients[2],
      cancelled: false,
      invoice: 0,
    },
    6: {
      // Not invoiced - Client 3 - within month
      type: AppointmentType.Lesson,
      subject: 'Lesson with ' + mockClients[3].firstName,
      date: dates.tomorrow,
      startTime: { hours: 14, minutes: 0 },
      duration: { hours: 0, minutes: 30 },
      client: mockClients[3],
      cancelled: false,
      invoice: 0,
    },
    7: {
      // Not invoiced - Client 1 - next  month
      type: AppointmentType.Lesson,
      subject: 'Lesson with ' + mockClients[1].firstName,
      date: dates.nextMonth,
      startTime: { hours: 14, minutes: 0 },
      duration: { hours: 0, minutes: 30 },
      client: mockClients[1],
      cancelled: false,
      invoice: 0,
    },
    8: {
      // Not invoiced - Client 1 - next year
      type: AppointmentType.Lesson,
      subject: 'Lesson with ' + mockClients[1].firstName,
      date: dates.nextYear,
      startTime: { hours: 14, minutes: 0 },
      duration: { hours: 0, minutes: 30 },
      client: mockClients[1],
      cancelled: false,
      invoice: 0,
    },
  };

  describe('setInvoiceDataForDisplay()', () => {
    beforeEach(() => {
      spyOn(window.localStorage, 'getItem').and.returnValue(
        JSON.stringify(mockInvoices)
      );
      spyOnProperty(
        TestBed.inject(AppointmentsService),
        'appointments',
        'get'
      ).and.returnValue(mockAppointments);
      spyOnProperty(
        TestBed.inject(ClientsService),
        'clients',
        'get'
      ).and.returnValue(mockClients);
    });
    it('should call the invoices and return them as a FinancialDocItem list', () => {
      // Assemble
      const expectedInvoiceDocItems = [
        {
          number: 1,
          date: dates.yesterday,
          amount: 250,
          docType: 2,
          detail: 'Bob Hope',
        },
        {
          number: 2,
          date: today,
          amount: 500,
          docType: 2,
          detail: 'Bill Hope',
        },
      ] as FinancialDocItem[];

      // Act
      const invoiceDocItems = service.setInvoiceDataForDisplay();

      // Assert
      expect(invoiceDocItems).toEqual(expectedInvoiceDocItems);
    });
  });

  describe('setInvoiceDocForDisplay()', () => {
    beforeEach(() => {
      spyOn(window.localStorage, 'getItem').and.returnValue(
        JSON.stringify(mockInvoices)
      );
      spyOnProperty(
        TestBed.inject(AppointmentsService),
        'appointments',
        'get'
      ).and.returnValue(mockAppointments);
      spyOnProperty(
        TestBed.inject(ClientsService),
        'clients',
        'get'
      ).and.returnValue(mockClients);
    });
    it('should return invoiceDocViewConfig of the document requested', () => {
      // Assemble
      const expectedInvoiceDocViewConfig = {
        subHeader: 'Invoice #1',
        docNumber: 1,
        docClient: {
          displayName: 'Bob Hope',
          firstName: 'Bob',
          lastName: 'Hope',
          email: 'bob@hope.co.za',
          telephoneNumber: '072 462 4685',
        },
        lineItems: [
          {
            Lessons: [
              {
                number: 1,
                date: dates.yesterday,
                detail: 'Lesson with Bob',
                amount: 250,
              },
            ],
          },
        ] as LineItemGroup[],
      } as DocView;

      // Act
      const invoiceDocViewConfig = service.setInvoiceDocForDisplay(1);

      // Assert
      expect(invoiceDocViewConfig).toEqual(expectedInvoiceDocViewConfig);
    });
  });

  describe('generateInvoices()', () => {
    beforeEach(() => {
      spyOn(window.localStorage, 'getItem').and.returnValue(
        JSON.stringify(mockInvoices)
      );
      spyOnProperty(
        TestBed.inject(AppointmentsService),
        'appointments',
        'get'
      ).and.returnValue({
        1: {
          // Invoiced
          type: AppointmentType.Lesson,
          subject: 'Lesson with ' + mockClients[1].firstName,
          date: dates.yesterday,
          startTime: { hours: 8, minutes: 0 },
          duration: { hours: 0, minutes: 30 },
          client: mockClients[1],
          invoice: 1,
          cancelled: false,
        },
        2: {
          // Invoiced
          type: AppointmentType.Lesson,
          subject: 'Lesson with ' + mockClients[2].firstName,
          date: dates.yesterday,
          startTime: { hours: 10, minutes: 0 },
          duration: { hours: 0, minutes: 30 },
          client: mockClients[2],
          invoice: 2,
          cancelled: false,
        },
        3: {
          // Invoiced
          type: AppointmentType.Lesson,
          subject: 'Lesson with ' + mockClients[2].firstName,
          date: dates.yesterday,
          startTime: { hours: 14, minutes: 0 },
          duration: { hours: 0, minutes: 30 },
          client: mockClients[2],
          invoice: 2,
          cancelled: true,
          creditNote: 1,
        },
        4: {
          // Not invoiced - Client 1 - within month
          type: AppointmentType.Lesson,
          subject: 'Lesson with ' + mockClients[1].firstName,
          date: dates.tomorrow,
          startTime: { hours: 14, minutes: 0 },
          duration: { hours: 0, minutes: 30 },
          client: mockClients[1],
          cancelled: false,
          invoice: 0,
        },
        5: {
          // Not invoiced - Client 2 - within month
          type: AppointmentType.Lesson,
          subject: 'Lesson with ' + mockClients[2].firstName,
          date: dates.tomorrow,
          startTime: { hours: 14, minutes: 0 },
          duration: { hours: 0, minutes: 30 },
          client: mockClients[2],
          cancelled: false,
          invoice: 0,
        },
        6: {
          // Not invoiced - Client 3 - within month
          type: AppointmentType.Lesson,
          subject: 'Lesson with ' + mockClients[3].firstName,
          date: dates.tomorrow,
          startTime: { hours: 14, minutes: 0 },
          duration: { hours: 0, minutes: 30 },
          client: mockClients[3],
          cancelled: false,
          invoice: 0,
        },
        7: {
          // Not invoiced - Client 1 - next  month
          type: AppointmentType.Lesson,
          subject: 'Lesson with ' + mockClients[1].firstName,
          date: dates.nextMonth,
          startTime: { hours: 14, minutes: 0 },
          duration: { hours: 0, minutes: 30 },
          client: mockClients[1],
          cancelled: false,
          invoice: 0,
        },
        8: {
          // Not invoiced - Client 1 - next year
          type: AppointmentType.Lesson,
          subject: 'Lesson with ' + mockClients[1].firstName,
          date: dates.nextYear,
          startTime: { hours: 14, minutes: 0 },
          duration: { hours: 0, minutes: 30 },
          client: mockClients[1],
          cancelled: false,
          invoice: 0,
        },
      });
      spyOnProperty(
        TestBed.inject(ClientsService),
        'clients',
        'get'
      ).and.returnValue(mockClients);
    });
    describe('given the dateRage is all dates', () => {
      describe('given the clientRange is all clients', () => {
        it('should invoice accordingly', () => {
          // Assemble
          const mockParams = {
            dateRange: DateRange.ALL,
            clientRange: ClientRange.ALL,
          } as GenerateInvoiceParams;
          const expectedResults = {
            numberOfInvoices: 3,
            clients: [1, 2, 3],
            startDate: dates.today,
            endDate: dates.nextMonth,
            totalValue: 1000,
            largestValue: 500,
            averageValue: 333.33,
          } as GenerateInvoiceResult;

          // Act
          const results = service.generateInvoices(mockParams);

          // Assert
          expect(results).toEqual(expectedResults);
        });
      });

      describe('given the clientRange is limited', () => {
        it('should invoice accordingly', () => {
          // Assemble
          const mockParams = {
            dateRange: DateRange.ALL,
            clientRange: ClientRange.MULTI,
            clients: [
              {
                displayName: 'Bob Hope',
                firstName: 'Bob',
                lastName: 'Hope',
                email: 'bob@hope.co.za',
                telephoneNumber: '072 462 4685',
              },
              {
                displayName: 'Bill Hope',
                firstName: 'Bill',
                lastName: 'Hope',
                email: 'bill@hope.co.za',
                telephoneNumber: '072 462 4686',
              },
            ],
          } as GenerateInvoiceParams;
          const expectedResults = {
            numberOfInvoices: 2,
            clients: [1, 2],
            startDate: dates.today,
            endDate: dates.nextMonth,
            totalValue: 750,
            largestValue: 500,
            averageValue: 375,
          } as GenerateInvoiceResult;

          // Act
          const results = service.generateInvoices(mockParams);

          // Assert
          expect(results).toEqual(expectedResults);
        });
      });
    });

    describe('given the dateRage is limited', () => {
      describe('given the clientRange is all clients', () => {
        it('should invoice accordingly', () => {
          // Assemble
          const mockParams = {
            dateRange: DateRange.LIMITED,
            date: dates.tomorrow,
            clientRange: ClientRange.ALL,
          } as GenerateInvoiceParams;
          const expectedResults = {
            numberOfInvoices: 3,
            clients: [1, 2, 3],
            startDate: dates.today,
            endDate: dates.tomorrow,
            totalValue: 750,
            largestValue: 250,
            averageValue: 250,
          } as GenerateInvoiceResult;

          // Act
          const results = service.generateInvoices(mockParams);

          // Assert
          expect(results).toEqual(expectedResults);
        });
      });

      describe('given the clientRange is limited', () => {
        it('should invoice accordingly', () => {
          // Assemble
          const mockParams = {
            dateRange: DateRange.LIMITED,
            date: dates.tomorrow,
            clientRange: ClientRange.SINGLE,
            clients: [
              {
                displayName: 'Bob Hope',
                firstName: 'Bob',
                lastName: 'Hope',
                email: 'bob@hope.co.za',
                telephoneNumber: '072 462 4685',
              },
            ],
          } as GenerateInvoiceParams;
          const expectedResults = {
            numberOfInvoices: 1,
            clients: [1],
            startDate: dates.today,
            endDate: dates.tomorrow,
            totalValue: 250,
            largestValue: 250,
            averageValue: 250,
          } as GenerateInvoiceResult;

          // Act
          const results = service.generateInvoices(mockParams);

          // Assert
          expect(results).toEqual(expectedResults);
        });
      });
    });
  });
});
