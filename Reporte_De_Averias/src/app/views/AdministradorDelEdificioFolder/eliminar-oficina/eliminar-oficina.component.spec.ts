import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarOficinaComponent } from './eliminar-oficina.component';

describe('EliminarOficinaComponent', () => {
  let component: EliminarOficinaComponent;
  let fixture: ComponentFixture<EliminarOficinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarOficinaComponent]
    });
    fixture = TestBed.createComponent(EliminarOficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
