import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificarReporteComponent } from './clasificar-reporte.component';

describe('ClasificarReporteComponent', () => {
  let component: ClasificarReporteComponent;
  let fixture: ComponentFixture<ClasificarReporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasificarReporteComponent]
    });
    fixture = TestBed.createComponent(ClasificarReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
