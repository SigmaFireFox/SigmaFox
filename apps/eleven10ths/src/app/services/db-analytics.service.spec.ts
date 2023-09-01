import { TestBed } from '@angular/core/testing';

import { DbAnalyticsService } from './db-analytics.service';

describe('DbAnalyticsService', () => {
  let service: DbAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
