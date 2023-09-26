import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorDelEdifcioComponent } from './administrador-del-edifcio.component';

describe('AdministradorDelEdifcioComponent', () => {
  let component: AdministradorDelEdifcioComponent;
  let fixture: ComponentFixture<AdministradorDelEdifcioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministradorDelEdifcioComponent]
    });
    fixture = TestBed.createComponent(AdministradorDelEdifcioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
