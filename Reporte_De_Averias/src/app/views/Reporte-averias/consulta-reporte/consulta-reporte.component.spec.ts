import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaReporteComponent } from './consulta-reporte.component';

describe('ConsultaReporteComponent', () => {
  let component: ConsultaReporteComponent;
  let fixture: ComponentFixture<ConsultaReporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaReporteComponent]
    });
    fixture = TestBed.createComponent(ConsultaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
