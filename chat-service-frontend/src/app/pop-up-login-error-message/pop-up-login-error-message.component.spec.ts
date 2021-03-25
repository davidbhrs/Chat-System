import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PopUpLoginErrorMessageComponent } from './pop-up-login-error-message.component';

describe('PopUpLoginErrorMessageComponent', () => {
  let component: PopUpLoginErrorMessageComponent;
  let fixture: ComponentFixture<PopUpLoginErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpLoginErrorMessageComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
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
