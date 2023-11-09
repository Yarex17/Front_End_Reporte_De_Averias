import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEstadoComponent } from './crear-estado.component';

describe('CrearEstadoComponent', () => {
  let component: CrearEstadoComponent;
  let fixture: ComponentFixture<CrearEstadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearEstadoComponent]
    });
    fixture = TestBed.createComponent(CrearEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
