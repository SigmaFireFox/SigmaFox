import { TestBed } from '@angular/core/testing';

import { EstimatesCashFlowService } from './estimates-cashflows.service';

describe('EstimatesService', () => {
  let service: EstimatesCashFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstimatesCashFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
