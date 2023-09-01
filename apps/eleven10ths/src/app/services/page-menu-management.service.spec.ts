import { TestBed } from '@angular/core/testing';

import { PageMenuManagementService } from './page-menu-management.service';

describe('PageMenuManagementService', () => {
  let service: PageMenuManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageMenuManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
