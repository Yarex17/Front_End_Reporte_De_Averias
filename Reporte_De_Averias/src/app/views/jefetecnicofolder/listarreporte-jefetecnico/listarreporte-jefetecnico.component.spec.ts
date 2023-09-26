import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarreporteJefetecnicoComponent } from './listarreporte-jefetecnico.component';

describe('ListarreporteJefetecnicoComponent', () => {
  let component: ListarreporteJefetecnicoComponent;
  let fixture: ComponentFixture<ListarreporteJefetecnicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarreporteJefetecnicoComponent]
    });
    fixture = TestBed.createComponent(ListarreporteJefetecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
