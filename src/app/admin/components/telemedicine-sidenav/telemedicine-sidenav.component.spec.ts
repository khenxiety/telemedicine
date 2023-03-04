import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemedicineSidenavComponent } from './telemedicine-sidenav.component';

describe('TelemedicineSidenavComponent', () => {
  let component: TelemedicineSidenavComponent;
  let fixture: ComponentFixture<TelemedicineSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelemedicineSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemedicineSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
