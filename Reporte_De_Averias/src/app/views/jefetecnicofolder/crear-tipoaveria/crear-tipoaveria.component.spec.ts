import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoaveriaComponent } from './crear-tipoaveria.component';

describe('CrearTipoaveriaComponent', () => {
  let component: CrearTipoaveriaComponent;
  let fixture: ComponentFixture<CrearTipoaveriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearTipoaveriaComponent]
    });
    fixture = TestBed.createComponent(CrearTipoaveriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
