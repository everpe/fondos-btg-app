import { TestBed } from '@angular/core/testing';

import { FundValidatorsService } from './fund-validators.service';

describe('FundValidatorsService', () => {
  let service: FundValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
