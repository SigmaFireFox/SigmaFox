import { TestBed } from '@angular/core/testing';

import { AppInitialisationService } from './app-initialisation.service';

describe('AppInitialisationService', () => {
  let service: AppInitialisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppInitialisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
