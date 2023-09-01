import { TestBed } from '@angular/core/testing';

import { WidgetCallBacksService } from './widget-call-backs.service';

describe('WidgetCallBacksService', () => {
  let service: WidgetCallBacksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetCallBacksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
