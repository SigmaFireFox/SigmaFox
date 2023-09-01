import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarService);
  });

  describe('setCalendar()', () => {
    describe('should set the calendar from appointments', () => {});
    describe('should set the calendar blocks', () => {});
  });
});
