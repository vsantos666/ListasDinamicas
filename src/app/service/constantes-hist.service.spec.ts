import { TestBed, inject } from '@angular/core/testing';

import { ConstantesHistService } from './constantes-hist.service';

describe('ConstantesHistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConstantesHistService]
    });
  });

  it('should ...', inject([ConstantesHistService], (service: ConstantesHistService) => {
    expect(service).toBeTruthy();
  }));
});
