import { TestBed } from '@angular/core/testing';

import { UserLabelsService } from './user-labels.service';

describe('UserLabelsService', () => {
  let service: UserLabelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLabelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
