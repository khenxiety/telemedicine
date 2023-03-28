import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemedicineListComponent } from './telemedicine-list.component';

describe('TelemedicineListComponent', () => {
  let component: TelemedicineListComponent;
  let fixture: ComponentFixture<TelemedicineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelemedicineListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemedicineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
