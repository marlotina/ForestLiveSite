import { TestBed } from '@angular/core/testing';

import { FollowusersService } from './followusers.service';

describe('FollowusersService', () => {
  let service: FollowusersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowusersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
