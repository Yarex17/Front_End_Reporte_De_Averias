import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerymodicarreporteTecnicoComponent } from './verymodicarreporte-tecnico.component';

describe('VerymodicarreporteTecnicoComponent', () => {
  let component: VerymodicarreporteTecnicoComponent;
  let fixture: ComponentFixture<VerymodicarreporteTecnicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerymodicarreporteTecnicoComponent]
    });
    fixture = TestBed.createComponent(VerymodicarreporteTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
