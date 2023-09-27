import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarEdificioComponent } from './actualizar-edificio.component';

describe('ActualizarEdificioComponent', () => {
  let component: ActualizarEdificioComponent;
  let fixture: ComponentFixture<ActualizarEdificioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarEdificioComponent]
    });
    fixture = TestBed.createComponent(ActualizarEdificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
