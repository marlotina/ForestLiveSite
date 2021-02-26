import { TestBed } from '@angular/core/testing';

import { SearchBirdsService } from './search-birds.service';

describe('SearchBirdsService', () => {
  let service: SearchBirdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchBirdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
