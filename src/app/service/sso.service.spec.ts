/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { SsoService } from './sso.service';

describe('Service: Sso', () => {
  beforeEach(() => {
    addProviders([SsoService]);
  });

  it('should ...',
    inject([SsoService],
      (service: SsoService) => {
        expect(service).toBeTruthy();
      }));
});
