import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPrioridadesComponent } from './listar-prioridades.component';

describe('ListarPrioridadesComponent', () => {
  let component: ListarPrioridadesComponent;
  let fixture: ComponentFixture<ListarPrioridadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarPrioridadesComponent]
    });
    fixture = TestBed.createComponent(ListarPrioridadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
