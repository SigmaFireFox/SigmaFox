import { TestBed } from '@angular/core/testing';

import { EstimatesForecastsService } from './estimates-forecasts.service';

describe('EstimatesForecastsService', () => {
  let service: EstimatesForecastsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstimatesForecastsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
