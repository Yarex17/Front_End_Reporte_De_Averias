import { TestBed } from '@angular/core/testing';

import { TraOficinaService } from './tra-oficina.service';

describe('TraOficinaService', () => {
  let service: TraOficinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraOficinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
