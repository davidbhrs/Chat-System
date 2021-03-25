import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiEndpointService } from '../api-endpoint.service';
import { ChatRoom } from '../chat-room-model';
import { TextMessage } from '../text-message-model';
import { User } from '../user-model';

import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let mockApiEndpointService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ ApiEndpointService ]
    })
    .compileComponents();

    mockApiEndpointService = TestBed.inject(ApiEndpointService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all text message in a chat room', () => {
    const userOne = new User(1, 'Test User 1');
    const userTwo = new User(2, 'Test User 2');
    const chatRoom = new ChatRoom(1, userOne, userTwo);

    const textMessageOne = new TextMessage(1, 'Test message 1', null, null, null);
    const textMessageTwo = new TextMessage(2, 'Test message 2', null, null, null);
    const textMessages = [textMessageOne, textMessageTwo];

    fixture.componentInstance.loggedInUser = userOne;
    fixture.componentInstance.chatRoom = chatRoom;
    fixture.componentInstance.messages = [];
    spyOn(mockApiEndpointService, 'getAllTextMessagesByChatRoomId').and.returnValue(of(textMessages));

    fixture.componentInstance.ngOnChanges();

    expect(fixture.componentInstance.messages).toEqual(textMessages);
  });

  it('should set chat partner correctly', () => {
    const userOne = new User(1, 'Test User 1');
    const userTwo = new User(2, 'Test User 2');
    const chatRoom = new ChatRoom(1, userOne, userTwo);

    fixture.componentInstance.loggedInUser = userOne;
    fixture.componentInstance.chatRoom = chatRoom;
    fixture.componentInstance.messages = [];
    spyOn(mockApiEndpointService, 'getAllTextMessagesByChatRoomId').and.returnValue(of([]));

    fixture.componentInstance.ngOnChanges();

    expect(fixture.componentInstance.chatPartner).toBe(userTwo);

    fixture.componentInstance.loggedInUser = userTwo;

    fixture.componentInstance.ngOnChanges();

    expect(fixture.componentInstance.chatPartner).toBe(userOne);
  });

  it('should send a text message', () => {
    const message = 'Test message';
    const textMessage = new TextMessage(1, message, null, null, null);

    fixture.componentInstance.messages = [];
    fixture.componentInstance.inputForm.setValue({ message: message });
    spyOn(mockApiEndpointService, 'sendMessage').and.returnValue(of(textMessage));

    fixture.componentInstance.sendMessage(message);

    expect(fixture.componentInstance.inputForm.getRawValue()).toEqual({ message: '' });
    expect(fixture.componentInstance.messages).toEqual([textMessage]);
  });
});
