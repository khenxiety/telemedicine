import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemedicineFooterComponent } from './telemedicine-footer.component';

describe('TelemedicineFooterComponent', () => {
  let component: TelemedicineFooterComponent;
  let fixture: ComponentFixture<TelemedicineFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelemedicineFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemedicineFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
