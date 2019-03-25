import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroConstantesComponent } from './registro-constantes.component';

describe('RegistroConstantesComponent', () => {
  let component: RegistroConstantesComponent;
  let fixture: ComponentFixture<RegistroConstantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroConstantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroConstantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
