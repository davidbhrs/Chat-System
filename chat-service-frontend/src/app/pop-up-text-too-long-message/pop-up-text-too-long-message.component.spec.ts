import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpTextTooLongMessageComponent } from './pop-up-text-too-long-message.component';

describe('PopUpTextTooLongMessageComponent', () => {
  let component: PopUpTextTooLongMessageComponent;
  let fixture: ComponentFixture<PopUpTextTooLongMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpTextTooLongMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpTextTooLongMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
