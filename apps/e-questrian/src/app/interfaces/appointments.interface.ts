import { Time } from '@angular/common';
import { ClientDetailWithFinancialRecords } from './clients.interface';

export enum AppointmentType {
  Lesson = 1,
  Other = 2,
}

export interface Appointments {
  [appointmentID: number]: AppointmentDetail;
}

export interface AppointmentDetail {
  type: AppointmentType;
  subject: string;
  date: Date;
  startTime: Time;
  duration: Time;
  client?: ClientDetailWithFinancialRecords;
  invoice: number;
  cancelled: boolean;
  creditNote?: number;
}
