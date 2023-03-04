import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemedicineHeaderComponent } from './telemedicine-header.component';

describe('TelemedicineHeaderComponent', () => {
  let component: TelemedicineHeaderComponent;
  let fixture: ComponentFixture<TelemedicineHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelemedicineHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemedicineHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
