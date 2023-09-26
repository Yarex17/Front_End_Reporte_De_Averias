import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarreporteJefetecnicoComponent } from './modificarreporte-jefetecnico.component';

describe('ModificarreporteJefetecnicoComponent', () => {
  let component: ModificarreporteJefetecnicoComponent;
  let fixture: ComponentFixture<ModificarreporteJefetecnicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarreporteJefetecnicoComponent]
    });
    fixture = TestBed.createComponent(ModificarreporteJefetecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
