import { TestBed } from '@angular/core/testing';

import { TraEstadoService } from './tra-estado.service';

describe('TraEstadoService', () => {
  let service: TraEstadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraEstadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
