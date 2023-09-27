import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarEdificioComponent } from './registrar-edificio.component';

describe('RegistrarEdificioComponent', () => {
  let component: RegistrarEdificioComponent;
  let fixture: ComponentFixture<RegistrarEdificioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarEdificioComponent]
    });
    fixture = TestBed.createComponent(RegistrarEdificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
