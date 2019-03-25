import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaConstanteManualComponent } from './carga-constante-manual.component';

describe('CargaCostanteManualComponent', () => {
  let component: CargaConstanteManualComponent;
  let fixture: ComponentFixture<CargaConstanteManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaConstanteManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaConstanteManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
