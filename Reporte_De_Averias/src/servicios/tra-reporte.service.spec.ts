import { TestBed } from '@angular/core/testing';

import { TraReporteService } from './tra-reporte.service';

describe('TraReporteService', () => {
  let service: TraReporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraReporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
