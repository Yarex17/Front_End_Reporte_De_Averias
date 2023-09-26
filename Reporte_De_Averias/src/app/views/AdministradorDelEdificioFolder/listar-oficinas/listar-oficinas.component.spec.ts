import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOficinasComponent } from './listar-oficinas.component';

describe('ListarOficinasComponent', () => {
  let component: ListarOficinasComponent;
  let fixture: ComponentFixture<ListarOficinasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarOficinasComponent]
    });
    fixture = TestBed.createComponent(ListarOficinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
