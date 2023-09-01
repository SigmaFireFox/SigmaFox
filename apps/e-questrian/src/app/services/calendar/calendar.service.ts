/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Appointments } from '../../interfaces/appointments.interface';
import {
  CalendarBlock,
  CalendarData,
} from '../../interfaces/calander.interface';
import { AppointmentsService } from '../appointments/appointments.service';
import { CommonUtilitiesService } from '../common-utilities/common-utilities.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private calenderBlocks: CalendarBlock[] = [];
  private calendarData = {} as CalendarData;

  get appointments(): Appointments {
    return this.appointmentsService.appointments;
  }

  constructor(
    private commonUtilities: CommonUtilitiesService,
    private appointmentsService: AppointmentsService
  ) {}

  setCalendar(date: number): CalendarBlock[] {
    this.setCalendarBlocks();
    this.setCalendarFromAppointments();
    const stringDate = new Date(date).toDateString();

    if (!this.calendarData[stringDate]) {
      return [];
    }

    this.calendarData[stringDate].forEach((timeBlock) => {
      this.calenderBlocks.forEach((block) => {
        if (
          block.time?.hours == timeBlock.time?.hours &&
          block.time.minutes == timeBlock.time.minutes
        ) {
          timeBlock.appointments.forEach((appointmentID) => {
            !this.appointments[appointmentID].cancelled
              ? block.appointments.push(appointmentID)
              : null;
          });
        }
      });
    });

    return this.calenderBlocks;
  }

  private setCalendarBlocks() {
    this.calenderBlocks = [];
    for (let hour = 6; hour < 18; hour++) {
      this.calenderBlocks.push({
        time: { hours: hour, minutes: 0 },
        appointments: [],
      });
      this.calenderBlocks.push({
        time: { hours: hour, minutes: 30 },
        appointments: [],
      });
    }
  }

  private setCalendarFromAppointments() {
    this.calendarData = {};

    Object.keys(this.appointments).forEach((IDStr) => {
      const ID = parseInt(IDStr);
      const appDateStr = new Date(this.appointments[ID].date).toDateString();
      const newTimeBlock = {
        time: this.appointments[ID].startTime,
        appointments: [ID],
      };

      if (appDateStr in this.calendarData) {
        const dateBlock = this.calendarData[appDateStr];
        let timeFound = false;

        for (let index = 0; index < dateBlock.length; index++) {
          const timeBlock = this.calendarData[appDateStr][index];

          // If date and time exsist in the calendar
          if (this.isEqual(timeBlock.time, this.appointments[ID].startTime)) {
            timeBlock.appointments.push(ID);
            timeFound = true;
            break;
          }
        }

        // If date exsist in the calendar but there is no matching time block with in that date
        if (!timeFound) {
          this.calendarData[appDateStr].push(newTimeBlock);
        }
      } else {
        // If date does not exsist in the calendar
        this.calendarData[appDateStr] = [newTimeBlock];
      }
    });
  }

  private isEqual(object1: any, object2: any) {
    return this.commonUtilities.isEqualObjects(object1, object2);
  }
}
