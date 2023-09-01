import { TestBed } from '@angular/core/testing';

import { BasicAppInfoHandlerService } from './basic-app-info-handler.service';

describe('BasicAppInfoHandlerService', () => {
  let service: BasicAppInfoHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicAppInfoHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
