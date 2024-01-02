/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AppointmentType,
  Appointments,
  AppointmentDetail,
} from '../../interfaces/appointments.interface';
import {
  CalendarBlock,
  CalendarData,
} from '../../interfaces/calander.interface';
import { AppointmentsService } from '../../services/appointments/appointments.service';
import { CalendarService } from '../../services/calendar/calendar.service';
import { DateAndTimeService } from '../../services/date-time/date-time.service';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  calenderBlocks: CalendarBlock[] = [];

  appointmentType = AppointmentType;
  date: number = 0;
  dateFormatted = '';
  displayAppointmentForm = false;
  proposedStartTime: Time = {} as Time;
  currentAppointmentID = 0;
  appointmentEditActive = false;
  calendarData = {} as CalendarData;

  get appointments(): Appointments {
    return this.appointmentService.appointmentsOnFile;
  }

  constructor(
    private appointmentService: AppointmentsService,
    private calendarService: CalendarService,
    private dateService: DateAndTimeService
  ) {}

  ngOnInit(): void {
    this.date = this.dateService.todayDate;
    this.setCalendar();
  }

  changeDate(movement: number) {
    this.date = this.dateService.changeDate(this.date, movement);
    this.setCalendar();
  }

  calendarBlockClicked(blockTime: Time) {
    if (this.appointmentEditActive) return;
    this.currentAppointmentID = 0;
    this.proposedStartTime = blockTime;
    this.displayAppointmentForm = true;
  }

  appointmentClicked(appointmentID: number) {
    this.appointmentEditActive = true;
    this.currentAppointmentID = appointmentID;
    this.displayAppointmentForm = true;
  }

  appointmentDetailModalClosed() {
    this.appointmentEditActive = false;
    this.displayAppointmentForm = false;
  }

  appointmentCreated(appointment: AppointmentDetail) {
    this.appointmentService.newAppointment(appointment);
    this.setCalendar();
    this.displayAppointmentForm = false;
  }

  appointmentEdited(appointment: AppointmentDetail) {
    this.appointmentEditActive = false;
    this.appointmentService.editAppointment(
      this.currentAppointmentID,
      appointment
    );
    this.setCalendar();
  }

  appointmentCanceled() {
    this.appointmentEditActive = false;
    this.appointmentService.cancelAppointment(this.currentAppointmentID);
    this.setCalendar();
    this.displayAppointmentForm = false;
  }

  private setCalendar() {
    this.calenderBlocks = this.calendarService.setCalendar(this.date);
  }
}
