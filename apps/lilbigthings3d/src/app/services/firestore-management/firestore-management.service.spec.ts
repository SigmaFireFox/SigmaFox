import { TestBed } from '@angular/core/testing';

import { FirestoreManagementService } from './firestore-management.service';

describe('FirestoreManagementService', () => {
  let service: FirestoreManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
