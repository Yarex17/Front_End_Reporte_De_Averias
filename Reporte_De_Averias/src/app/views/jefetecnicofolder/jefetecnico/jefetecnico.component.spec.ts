import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JefetecnicoComponent } from './jefetecnico.component';

describe('JefetecnicoComponent', () => {
  let component: JefetecnicoComponent;
  let fixture: ComponentFixture<JefetecnicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JefetecnicoComponent]
    });
    fixture = TestBed.createComponent(JefetecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
