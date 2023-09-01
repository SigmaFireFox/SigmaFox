import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { TimeOption } from '../../modals/appointment-details/appointment-detail.modal';

@Injectable({
  providedIn: 'root',
})
export class DateAndTimeService {
  get todayDate(): number {
    return new Date().setHours(0, 0, 0, 0);
  }

  get appointmentStartTimeOptions(): TimeOption[] {
    return this.setStartTimeOptions();
  }

  get appointmentDurationOptions(): TimeOption[] {
    return this.setDurationTimeOptions();
  }

  changeDate(currentDate: number, movement: number): number {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + movement);
    return date.setHours(0, 0, 0, 0);
  }

  private setStartTimeOptions(): TimeOption[] {
    const timeOptions = [] as TimeOption[];
    for (let hour = 6; hour < 18; hour++) {
      const onHour = {
        value: { hours: hour, minutes: 0 } as Time,
        display: hour + ':00',
      };
      const onHalfHour = {
        value: { hours: hour, minutes: 30 } as Time,
        display: hour + ':30',
      };

      timeOptions.push(onHour, onHalfHour);
    }
    return timeOptions;
  }

  private setDurationTimeOptions(): TimeOption[] {
    return [
      { display: '0:05', value: { hours: 0, minutes: 5 } },
      { display: '0:10', value: { hours: 0, minutes: 10 } },
      { display: '0:15', value: { hours: 0, minutes: 15 } },
      { display: '0:30', value: { hours: 0, minutes: 30 } },
      { display: '0:45', value: { hours: 0, minutes: 45 } },
      { display: '1:00', value: { hours: 1, minutes: 0 } },
      { display: '1:30', value: { hours: 1, minutes: 30 } },
      { display: '2:00', value: { hours: 2, minutes: 0 } },
      { display: '3:00', value: { hours: 3, minutes: 0 } },
      { display: '4:00', value: { hours: 4, minutes: 0 } },
      { display: '6:00', value: { hours: 6, minutes: 0 } },
      { display: '8:00', value: { hours: 8, minutes: 0 } },
    ];
  }
}
