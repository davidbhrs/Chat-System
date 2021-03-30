import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiEndpointService } from '../api-endpoint.service';
import { ChatRoom } from '../models/chat-room-model';
import { DataSharingService } from '../data-sharing.service';
import { TextMessage } from '../models/text-message-model';
import { User } from '../models/user-model';
import { Websocket } from '../websocket';

import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let mockApiEndpointService: ApiEndpointService;
  let mockDataSharingService: DataSharingService;
  let mockWebsocket: Websocket;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ ApiEndpointService, DataSharingService, Websocket ]
    })
    .compileComponents();

    mockApiEndpointService = TestBed.inject(ApiEndpointService);
    mockDataSharingService = TestBed.inject(DataSharingService);
    mockWebsocket = TestBed.inject(Websocket);
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

    component.loggedInUser = userOne;
    component.chatRoom = chatRoom;
    component.messages = [];
    spyOn(mockApiEndpointService, 'getAllTextMessagesByChatRoomId').and.returnValue(of(textMessages));

    component.ngOnChanges();

    expect(component.messages).toEqual(textMessages);
  });

  it('should set chat partner correctly', () => {
    const userOne = new User(1, 'Test User 1');
    const userTwo = new User(2, 'Test User 2');
    const chatRoom = new ChatRoom(1, userOne, userTwo);

    component.loggedInUser = userOne;
    component.chatRoom = chatRoom;
    component.messages = [];
    spyOn(mockApiEndpointService, 'getAllTextMessagesByChatRoomId').and.returnValue(of([]));
    mockDataSharingService.observableNewestTextMessage = of();

    component.ngOnChanges();

    expect(component.chatPartner).toBe(userTwo);

    component.loggedInUser = userTwo;

    component.ngOnChanges();

    expect(component.chatPartner).toBe(userOne);
  });

  it('should send a text message', () => {
    const message = 'Test message';

    component.messages = [];
    component.inputForm.setValue({ message });
    spyOn(mockWebsocket, 'sendMessage').and.returnValue();

    component.sendMessage(message);

    expect(component.inputForm.getRawValue()).toEqual({ message: '' });
  });
});
