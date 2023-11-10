import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTiposaveriaComponent } from './listar-tiposaveria.component';

describe('ListarTiposaveriaComponent', () => {
  let component: ListarTiposaveriaComponent;
  let fixture: ComponentFixture<ListarTiposaveriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarTiposaveriaComponent]
    });
    fixture = TestBed.createComponent(ListarTiposaveriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
