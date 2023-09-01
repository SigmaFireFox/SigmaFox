import { Injectable } from '@angular/core';

export enum DateRangeSelector {
  THIS_MONTH,
  MONTH_TO_DATE,
  CUSTOM,
}

export interface DateRangeOption {
  display: string;
  value: DateRange;
}

export interface DateRange {
  selector: DateRangeSelector;
  startDate: Date;
  endDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class DateService {
  get dateRangeOptions(): DateRangeOption[] {
    return this.setDateRangeOptions();
  }

  constructor() {}

  private setDateRangeOptions(): DateRangeOption[] {
    const today = new Date();
    const yesterday =
      today.getDate() === 1
        ? new Date(today.getFullYear(), today.getMonth(), 0)
        : new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    return [
      {
        display: 'This month',
        value: {
          selector: DateRangeSelector.THIS_MONTH,
          startDate: firstDayOfMonth,
          endDate: lastDayOfMonth,
        },
      },
      {
        display: 'Month to date',
        value: {
          selector: DateRangeSelector.MONTH_TO_DATE,
          startDate: today,
          endDate: lastDayOfMonth,
        },
      },
      {
        display: 'Custom date range',
        value: {
          selector: DateRangeSelector.CUSTOM,
          startDate: yesterday,
          endDate: today,
        },
      },
    ];
  }
}
