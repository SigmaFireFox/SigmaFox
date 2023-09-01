import { TestBed } from '@angular/core/testing';

import { DateAndTimeService } from './date-time.service';

describe('DateService', () => {
  let service: DateAndTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateAndTimeService);
  });
});
