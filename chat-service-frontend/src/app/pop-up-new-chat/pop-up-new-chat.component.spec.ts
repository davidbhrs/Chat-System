import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpNewChatComponent } from './pop-up-new-chat.component';

describe('PopUpNewChatComponent', () => {
  let component: PopUpNewChatComponent;
  let fixture: ComponentFixture<PopUpNewChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpNewChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpNewChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
