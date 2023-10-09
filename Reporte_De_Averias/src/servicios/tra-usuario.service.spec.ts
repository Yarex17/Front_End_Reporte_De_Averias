import { TestBed } from '@angular/core/testing';

import { TraUsuarioService } from './tra-usuario.service';

describe('TraUsuarioService', () => {
  let service: TraUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
