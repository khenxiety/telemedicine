import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgBgComponent } from './img-bg.component';

describe('ImgBgComponent', () => {
  let component: ImgBgComponent;
  let fixture: ComponentFixture<ImgBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgBgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
