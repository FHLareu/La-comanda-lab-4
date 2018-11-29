import { TestBed } from '@angular/core/testing';

import { RetornarAccionesService } from './retornar-acciones.service';

describe('RetornarAccionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetornarAccionesService = TestBed.get(RetornarAccionesService);
    expect(service).toBeTruthy();
  });
});
