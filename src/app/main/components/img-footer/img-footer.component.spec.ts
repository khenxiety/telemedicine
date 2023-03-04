import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgFooterComponent } from './img-footer.component';

describe('ImgFooterComponent', () => {
  let component: ImgFooterComponent;
  let fixture: ComponentFixture<ImgFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
