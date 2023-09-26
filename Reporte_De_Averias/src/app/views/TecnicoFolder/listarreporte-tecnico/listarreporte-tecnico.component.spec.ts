import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarreporteTecnicoComponent } from './listarreporte-tecnico.component';

describe('ListarreporteTecnicoComponent', () => {
  let component: ListarreporteTecnicoComponent;
  let fixture: ComponentFixture<ListarreporteTecnicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarreporteTecnicoComponent]
    });
    fixture = TestBed.createComponent(ListarreporteTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
