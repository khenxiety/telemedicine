import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemedicineTableComponent } from './telemedicine-table.component';

describe('TelemedicineTableComponent', () => {
  let component: TelemedicineTableComponent;
  let fixture: ComponentFixture<TelemedicineTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelemedicineTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemedicineTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
