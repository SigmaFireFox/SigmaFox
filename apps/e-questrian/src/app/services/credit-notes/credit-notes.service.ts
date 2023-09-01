import { Injectable } from '@angular/core';
import { Appointments } from '../../interfaces/appointments.interface';
import { CreditNotes } from '../../interfaces/credit-notes.interface';

@Injectable({
  providedIn: 'root',
})
export class CreditNotesService {
  creditNotes: CreditNotes = {};
  appointments: Appointments = {};

  generateCreditNote(appointmentID: number) {
    this.getCreditNoteData();
    this.getAppointmentData();
    const cnNumber = Object.keys(this.creditNotes).length + 1;
    this.creditNotes[cnNumber] = {
      date: new Date(new Date().setHours(0, 0, 0, 0)),
      appointment: appointmentID,
    };
    this.appointments[appointmentID].creditNote = cnNumber;
    this.appointments[appointmentID].cancelled = true;
    localStorage.setItem('credit-notes', JSON.stringify(this.creditNotes));
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }

  private getCreditNoteData() {
    let creditNotesString = localStorage.getItem('credit-notes');
    if (creditNotesString) {
      this.creditNotes = JSON.parse(creditNotesString);
    }
  }

  private getAppointmentData() {
    let appointmentString = localStorage.getItem('appointments');
    if (appointmentString) {
      this.appointments = JSON.parse(appointmentString);
    }
  }
}
