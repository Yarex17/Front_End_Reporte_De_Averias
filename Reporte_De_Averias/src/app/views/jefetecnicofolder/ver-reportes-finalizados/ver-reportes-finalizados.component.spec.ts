import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerReportesFinalizadosComponent } from './ver-reportes-finalizados.component';

describe('VerReportesFinalizadosComponent', () => {
  let component: VerReportesFinalizadosComponent;
  let fixture: ComponentFixture<VerReportesFinalizadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerReportesFinalizadosComponent]
    });
    fixture = TestBed.createComponent(VerReportesFinalizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
