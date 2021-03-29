import { TestBed } from '@angular/core/testing';

import { BirdserviceService } from './birdservice.service';

describe('BirdserviceService', () => {
  let service: BirdserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BirdserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
