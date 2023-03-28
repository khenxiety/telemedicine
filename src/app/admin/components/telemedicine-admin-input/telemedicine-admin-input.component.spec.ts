import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemedicineAdminInputComponent } from './telemedicine-admin-input.component';

describe('TelemedicineAdminInputComponent', () => {
  let component: TelemedicineAdminInputComponent;
  let fixture: ComponentFixture<TelemedicineAdminInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelemedicineAdminInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemedicineAdminInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
