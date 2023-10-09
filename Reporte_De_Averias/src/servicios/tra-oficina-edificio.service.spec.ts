import { TestBed } from '@angular/core/testing';

import { TraOficinaEdificioService } from './tra-oficina-edificio.service';

describe('TraOficinaEdificioService', () => {
  let service: TraOficinaEdificioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraOficinaEdificioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
