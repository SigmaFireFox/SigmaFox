import { TestBed } from '@angular/core/testing';

import { PaymentsPeachService } from './payments-peach.service';

describe('PaymentsPeachService', () => {
  let service: PaymentsPeachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsPeachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
