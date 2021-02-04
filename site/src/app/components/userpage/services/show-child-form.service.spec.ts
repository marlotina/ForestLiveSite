import { TestBed } from '@angular/core/testing';

import { ShowChildFormService } from './show-child-form.service';

describe('ShowChildFormService', () => {
  let service: ShowChildFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowChildFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
