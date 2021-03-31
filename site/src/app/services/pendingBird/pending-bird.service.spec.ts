import { TestBed } from '@angular/core/testing';

import { PendingBirdService } from './pending-bird.service';

describe('PendingBirdService', () => {
  let service: PendingBirdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingBirdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
