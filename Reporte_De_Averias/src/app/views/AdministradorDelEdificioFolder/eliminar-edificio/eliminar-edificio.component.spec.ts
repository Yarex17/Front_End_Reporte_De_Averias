import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEdificioComponent } from './eliminar-edificio.component';

describe('EliminarEdificioComponent', () => {
  let component: EliminarEdificioComponent;
  let fixture: ComponentFixture<EliminarEdificioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarEdificioComponent]
    });
    fixture = TestBed.createComponent(EliminarEdificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
