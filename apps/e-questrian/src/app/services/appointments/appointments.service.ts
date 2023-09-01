import { Injectable } from '@angular/core';
import {
  Appointments,
  AppointmentDetail,
} from '../../interfaces/appointments.interface';
import { CreditNotesService } from '../credit-notes/credit-notes.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  get appointments(): Appointments {
    const appointmentString = localStorage.getItem('appointments');
    return JSON.parse(appointmentString || '{}');
  }

  constructor(private creditNoteService: CreditNotesService) {}

  newAppointment(newAppointment: AppointmentDetail) {
    newAppointment.invoice = 0;
    this.addAppointment(newAppointment);
    this.setAppointmentData();
  }

  cancelAppointment(appointmentID: number) {
    if (!this.appointments[appointmentID]) return;
    this.appointments[appointmentID].cancelled = true;
    this.appointments[appointmentID].invoice != 0
      ? this.creditNoteService.generateCreditNote(appointmentID)
      : this.setAppointmentData();
  }

  editAppointment(appointmentID: number, newDetails: AppointmentDetail) {
    this.appointments[appointmentID] = newDetails;
    this.setAppointmentData();
  }

  private addAppointment(appointment: AppointmentDetail) {
    const appointmentID = Object.keys(this.appointments).length + 1;
    this.appointments[appointmentID] = appointment;
  }

  private setAppointmentData() {
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
