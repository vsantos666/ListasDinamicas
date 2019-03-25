import { TestBed, inject } from '@angular/core/testing';

import { ConstantesService } from './constantes.service';

describe('ConstantesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConstantesService]
    });
  });

  it('should ...', inject([ConstantesService], (service: ConstantesService) => {
    expect(service).toBeTruthy();
  }));
});
