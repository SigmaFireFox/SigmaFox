import { TestBed } from '@angular/core/testing';

import { CommonUtilitiesService } from './common-utilities.service';

describe('CommonUtilitiesService', () => {
  let service: CommonUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonUtilitiesService);
  });
});
