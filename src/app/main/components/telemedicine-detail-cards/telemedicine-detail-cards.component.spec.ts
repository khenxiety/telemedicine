import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemedicineDetailCardsComponent } from './telemedicine-detail-cards.component';

describe('TelemedicineDetailCardsComponent', () => {
  let component: TelemedicineDetailCardsComponent;
  let fixture: ComponentFixture<TelemedicineDetailCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelemedicineDetailCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemedicineDetailCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
