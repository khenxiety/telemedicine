import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemedicineTextAreaComponent } from './telemedicine-text-area.component';

describe('TelemedicineTextAreaComponent', () => {
  let component: TelemedicineTextAreaComponent;
  let fixture: ComponentFixture<TelemedicineTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelemedicineTextAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemedicineTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
