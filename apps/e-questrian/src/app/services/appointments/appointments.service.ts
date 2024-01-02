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
  currentAppointments: Appointments = {};

  get appointmentsOnFile(): Appointments {
    const appointmentString = localStorage.getItem('appointments');
    return JSON.parse(appointmentString || '{}');
  }

  constructor(private creditNoteService: CreditNotesService) {
    this.currentAppointments = this.appointmentsOnFile;
  }

  newAppointment(newAppointment: AppointmentDetail) {
    newAppointment.invoice = 0;
    this.addAppointment(newAppointment);
    console.log(this.appointmentsOnFile);
    this.setAppointmentData();
  }

  cancelAppointment(appointmentID: number) {
    if (!this.appointmentsOnFile[appointmentID]) return;
    this.appointmentsOnFile[appointmentID].cancelled = true;
    this.appointmentsOnFile[appointmentID].invoice != 0
      ? this.creditNoteService.generateCreditNote(appointmentID)
      : this.setAppointmentData();
  }

  editAppointment(appointmentID: number, newDetails: AppointmentDetail) {
    this.appointmentsOnFile[appointmentID] = newDetails;
    this.setAppointmentData();
  }

  private addAppointment(appointment: AppointmentDetail) {
    const appointmentID = Object.keys(this.appointmentsOnFile).length + 1;
    this.currentAppointments[appointmentID] = appointment;
  }

  private setAppointmentData() {
    localStorage.setItem(
      'appointments',
      JSON.stringify(this.currentAppointments)
    );
  }
}
