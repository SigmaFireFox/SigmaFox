import { TestBed } from '@angular/core/testing';

import { TextRenderingService } from './text-rendering.service';

describe('TextRenderingService', () => {
  let service: TextRenderingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextRenderingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
