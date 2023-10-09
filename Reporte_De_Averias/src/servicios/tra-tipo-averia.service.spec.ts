import { TestBed } from '@angular/core/testing';

import { TraTipoAveriaService } from './tra-tipo-averia.service';

describe('TraTipoAveriaService', () => {
  let service: TraTipoAveriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraTipoAveriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
