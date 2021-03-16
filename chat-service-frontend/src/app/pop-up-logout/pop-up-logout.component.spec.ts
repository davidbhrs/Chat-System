import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpLogoutComponent } from './pop-up-logout.component';

describe('PopUpLogoutComponent', () => {
  let component: PopUpLogoutComponent;
  let fixture: ComponentFixture<PopUpLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpLogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
