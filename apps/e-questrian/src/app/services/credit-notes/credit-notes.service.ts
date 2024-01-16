import { Injectable } from '@angular/core';
import { Appointments } from '../../interfaces/appointments.interface';
import { CreditNotes } from '../../interfaces/credit-notes.interface';
import {
  ClientsService,
  FinancialRecordType,
} from '../clients/clients.service';

@Injectable({
  providedIn: 'root',
})
export class CreditNotesService {
  creditNotes: CreditNotes = {};
  appointments: Appointments = {};

  get creditNotesOnFile(): CreditNotes {
    const creditNotesString = localStorage.getItem('credit-notes');
    if (creditNotesString) {
      return (this.creditNotes = JSON.parse(creditNotesString));
    }
    return {};
  }

  constructor(private clientsService: ClientsService) {
    this.creditNotes = this.creditNotesOnFile;
  }

  generateCreditNote(appointmentID: number, appointments: Appointments) {
    const cnNumber = Object.keys(this.creditNotes).length + 1;
    this.appointments = appointments;
    const clientDisplayName =
      this.appointments[appointmentID].client?.displayName || '';
    const clientID =
      this.clientsService.getClientIDFromDisplayName(clientDisplayName);

    this.creditNotes[cnNumber] = {
      date: new Date(new Date().setHours(0, 0, 0, 0)),
      appointment: appointmentID,
      clientID,
    };

    this.clientsService.addFinancialRecordToClient(
      clientID,
      FinancialRecordType.CreditNote,
      cnNumber
    );

    localStorage.setItem('credit-notes', JSON.stringify(this.creditNotes));
    this.updateAppointmentWithCreditNote(appointments, appointmentID, cnNumber);
  }

  private updateAppointmentWithCreditNote(
    appointments: Appointments,
    appointmentID: number,
    cnNumber: number
  ) {
    this.appointments[appointmentID].creditNote = cnNumber;
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
