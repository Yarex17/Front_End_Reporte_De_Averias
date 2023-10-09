import { TestBed } from '@angular/core/testing';

import { TraEdificioService } from './tra-edificio.service';

describe('TraEdificioService', () => {
  let service: TraEdificioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraEdificioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
