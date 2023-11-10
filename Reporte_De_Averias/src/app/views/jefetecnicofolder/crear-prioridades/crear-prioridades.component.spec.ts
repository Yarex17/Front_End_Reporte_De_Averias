import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPrioridadesComponent } from './crear-prioridades.component';

describe('CrearPrioridadesComponent', () => {
  let component: CrearPrioridadesComponent;
  let fixture: ComponentFixture<CrearPrioridadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearPrioridadesComponent]
    });
    fixture = TestBed.createComponent(CrearPrioridadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
