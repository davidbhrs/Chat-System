import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpLoginErrorMessageComponent } from './pop-up-login-error-message.component';

describe('PopUpLoginErrorMessageComponent', () => {
  let component: PopUpLoginErrorMessageComponent;
  let fixture: ComponentFixture<PopUpLoginErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpLoginErrorMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpLoginErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
