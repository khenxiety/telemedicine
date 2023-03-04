import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemedicineInputComponent } from './telemedicine-input.component';

describe('TelemedicineInputComponent', () => {
  let component: TelemedicineInputComponent;
  let fixture: ComponentFixture<TelemedicineInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelemedicineInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemedicineInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
