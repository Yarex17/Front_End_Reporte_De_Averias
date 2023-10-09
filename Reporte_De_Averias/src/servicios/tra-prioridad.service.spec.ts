import { TestBed } from '@angular/core/testing';

import { TraPrioridadService } from './tra-prioridad.service';

describe('TraPrioridadService', () => {
  let service: TraPrioridadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraPrioridadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
