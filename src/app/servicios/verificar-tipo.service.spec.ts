import { TestBed } from '@angular/core/testing';

import { VerificarTipoService } from './verificar-tipo.service';

describe('VerificarTipoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerificarTipoService = TestBed.get(VerificarTipoService);
    expect(service).toBeTruthy();
  });
});
