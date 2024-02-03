import { Injectable } from '@angular/core';
import { PaymentType } from '../../enums/payments.enum';
import {
  Appointments,
  AppointmentType,
} from '../../interfaces/appointments.interface';
import { Clients } from '../../interfaces/clients.interface';
import { CreditNotes } from '../../interfaces/credit-notes.interface';
import { Invoices } from '../../interfaces/invoices.interface';
import { Payments } from '../../interfaces/payments.interface';

@Injectable({
  providedIn: 'root',
})
export class TestDataService {
  // Date variables
  today: Date = new Date();
  tomorrow: Date = new Date();
  yesterday: Date = new Date();

  // Data variables
  clients = {} as Clients;
  appointments: Appointments = {};
  invoices = {} as Invoices;
  creditNotes = {} as CreditNotes;
  payments = {} as Payments;

  // Used enums

  loadTestDataToLocal() {
    this.setDates();
    this.setClientsList();
    localStorage.setItem('clients', JSON.stringify(this.clients));
    this.setAppointments();
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
    this.setInvoices();
    localStorage.setItem('invoices', JSON.stringify(this.invoices));
    this.setCreditNotes();
    localStorage.setItem('credit-notes', JSON.stringify(this.creditNotes));
    this.setPayments();
    localStorage.setItem('payments', JSON.stringify(this.payments));
  }

  private setDates() {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  private setClientsList() {
    this.clients = {
      1: {
        clientDetails: {
          displayName: 'Little Ash',
          firstName: 'Ashley',
          lastName: 'Novello',
          email: 'cedric@telkomsa.co.za',
          contactNumber: '072 462 4685',
          voided: false,
        },
        financialRecords: {
          invoices: [],
          payments: [1],
          creditNotes: [],
        },
      },
      2: {
        clientDetails: {
          displayName: 'Jill Henry',
          firstName: 'Jill',
          lastName: 'Henry',
          email: 'jill@gmail.com',
          contactNumber: '072 879 5421',
          voided: false,
        },
        financialRecords: {
          invoices: [],
          payments: [2],
          creditNotes: [],
        },
      },
      3: {
        clientDetails: {
          displayName: 'Kenny Timson',
          firstName: 'Kenny',
          lastName: 'Timson',
          email: 'kenny@yahoo.com',
          contactNumber: '083 357 2205',
          voided: false,
        },
        financialRecords: {
          invoices: [1],
          payments: [],
          creditNotes: [],
        },
      },
      4: {
        clientDetails: {
          displayName: 'Nurse Ash',
          firstName: 'Ashley',
          lastName: 'van der Merwe',
          email: 'nurseash@life.co.za',
          contactNumber: '066 565 0000',
          voided: false,
        },
        financialRecords: {
          invoices: [2],
          payments: [],
          creditNotes: [1],
        },
      },
      5: {
        clientDetails: {
          displayName: 'Jess van Wyk',
          firstName: 'Jess',
          lastName: 'van Wyk',
          email: 'vwykjess@gmail.com',
          contactNumber: '083 579 4251',
          voided: false,
        },
        financialRecords: {
          invoices: [],
          payments: [],
          creditNotes: [],
        },
      },
      6: {
        clientDetails: {
          displayName: 'Ruben Ferreira',
          firstName: 'Ruben',
          lastName: 'Ferreira',
          email: 'rubenf85@gmail.com',
          contactNumber: '072 761 0423',
          voided: false,
        },
        financialRecords: {
          invoices: [],
          payments: [],
          creditNotes: [],
        },
      },
    };
  }

  private setAppointments() {
    this.appointments = {
      1: {
        type: AppointmentType.Lesson,
        subject: 'Lesson with ' + this.clients[3].clientDetails.firstName,
        date: this.yesterday,
        startTime: { hours: 8, minutes: 0 },
        duration: { hours: 0, minutes: 30 },
        client: this.clients[3], // TODO: Should be the referance not the full client
        invoice: 1,
        cancelled: false,
      },
      2: {
        type: AppointmentType.Lesson,
        subject: 'Lesson with ' + this.clients[4].clientDetails.firstName,
        date: this.yesterday,
        startTime: { hours: 10, minutes: 0 },
        duration: { hours: 0, minutes: 30 },
        client: this.clients[4],
        invoice: 2,
        cancelled: false,
      },
      3: {
        type: AppointmentType.Lesson,
        subject: 'Lesson with ' + this.clients[4].clientDetails.firstName,
        date: this.yesterday,
        startTime: { hours: 14, minutes: 0 },
        duration: { hours: 0, minutes: 30 },
        client: this.clients[4],
        invoice: 2,
        cancelled: true,
        creditNote: 1,
      },
      4: {
        type: AppointmentType.Other,
        subject: 'Appointment',
        date: this.today,
        startTime: { hours: 8, minutes: 0 },
        duration: { hours: 0, minutes: 30 },
        invoice: 0,
        cancelled: false,
      },
      5: {
        type: AppointmentType.Lesson,
        subject: 'Lesson with ' + this.clients[2].clientDetails.firstName,
        date: this.today,
        startTime: { hours: 8, minutes: 0 },
        duration: { hours: 0, minutes: 30 },
        client: this.clients[2],
        invoice: 0,
        cancelled: false,
      },
      6: {
        type: AppointmentType.Lesson,
        subject: 'Lesson with ' + this.clients[3].clientDetails.firstName,
        date: this.today,
        startTime: { hours: 8, minutes: 30 },
        duration: { hours: 0, minutes: 0 },
        client: this.clients[3],
        invoice: 0,
        cancelled: false,
      },
      7: {
        type: AppointmentType.Lesson,
        subject: 'Lesson with ' + this.clients[4].clientDetails.firstName,
        date: this.tomorrow,
        startTime: { hours: 7, minutes: 30 },
        duration: { hours: 0, minutes: 0 },
        client: this.clients[4],
        invoice: 0,
        cancelled: false,
      },
      8: {
        type: AppointmentType.Lesson,
        subject: 'Lesson with ' + this.clients[1].clientDetails.firstName,
        date: this.tomorrow,
        startTime: { hours: 8, minutes: 0 },
        duration: { hours: 0, minutes: 30 },
        client: this.clients[1],
        invoice: 0,
        cancelled: false,
      },
      9: {
        type: AppointmentType.Lesson,
        subject: 'Lesson with ' + this.clients[2].clientDetails.firstName,
        date: this.tomorrow,
        startTime: { hours: 8, minutes: 0 },
        duration: { hours: 0, minutes: 30 },
        client: this.clients[2],
        invoice: 0,
        cancelled: false,
      },
      10: {
        type: AppointmentType.Lesson,
        subject: 'Lesson with ' + this.clients[5].clientDetails.firstName,
        date: this.tomorrow,
        startTime: { hours: 13, minutes: 0 },
        duration: { hours: 0, minutes: 30 },
        client: this.clients[5],
        invoice: 0,
        cancelled: false,
      },
    };
  }

  private setInvoices() {
    this.invoices = {
      1: {
        clientID: 3,
        date: this.yesterday,
        appointments: [1],
        voided: false,
      },
      2: {
        clientID: 4,
        date: this.yesterday,
        appointments: [2, 3],
        voided: false,
      },
      3: {
        clientID: 5,
        date: this.today,
        appointments: [10],
        voided: true,
      },
    };
  }

  private setCreditNotes() {
    this.creditNotes = {
      1: {
        date: new Date(),
        clientID: 4,
        invoices: [3],
        amount: 250,
      },
    };
  }

  private setPayments() {
    this.payments = {
      1: {
        date: this.today,
        clientID: 1,
        paymentType: PaymentType.EFT,
        amount: 175,
        voided: false,
      },
      2: {
        date: this.today,
        clientID: 2,
        paymentType: PaymentType.CASH,
        amount: 100,
        voided: false,
      },
    };
  }
}
