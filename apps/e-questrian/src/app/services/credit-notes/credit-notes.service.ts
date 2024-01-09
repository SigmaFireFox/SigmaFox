import { Injectable } from '@angular/core';
import { Appointments } from '../../interfaces/appointments.interface';
import { CreditNotes } from '../../interfaces/credit-notes.interface';

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

  constructor() {
    this.creditNotes = this.creditNotesOnFile;
  }

  generateCreditNote(appointmentID: number, appointments: Appointments) {
    this.appointments = appointments;
    const cnNumber = Object.keys(this.creditNotes).length + 1;
    this.creditNotes[cnNumber] = {
      date: new Date(new Date().setHours(0, 0, 0, 0)),
      appointment: appointmentID,
    };
    localStorage.setItem('credit-notes', JSON.stringify(this.creditNotes));
    this.updateAppointmentWithCreditNote(appointmentID, cnNumber);
  }

  private updateAppointmentWithCreditNote(
    appointmentID: number,
    cnNumber: number
  ) {
    this.appointments[appointmentID].creditNote = cnNumber;
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
