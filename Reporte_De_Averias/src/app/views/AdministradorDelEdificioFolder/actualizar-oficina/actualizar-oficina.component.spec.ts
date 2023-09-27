import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarOficinaComponent } from './actualizar-oficina.component';

describe('ActualizarOficinaComponent', () => {
  let component: ActualizarOficinaComponent;
  let fixture: ComponentFixture<ActualizarOficinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarOficinaComponent]
    });
    fixture = TestBed.createComponent(ActualizarOficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
