import { TestBed } from '@angular/core/testing';

import { ManagepostService } from './managepost.service';

describe('ManagepostService', () => {
  let service: ManagepostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagepostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
