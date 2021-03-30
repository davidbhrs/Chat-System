import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ChatRoom } from '../models/chat-room-model';
import { DataSharingService } from '../data-sharing.service';
import { User } from '../models/user-model';

import { ChatRoomListComponent } from './chat-room-list.component';
import { TextMessage } from '../models/text-message-model';

describe('ChatRoomListComponent', () => {
  let component: ChatRoomListComponent;
  let fixture: ComponentFixture<ChatRoomListComponent>;
  let mockDataSharingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatRoomListComponent ],
      providers: [ DataSharingService ]
    })
    .compileComponents();

    mockDataSharingService = TestBed.inject(DataSharingService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the current user', () => {
    expect(component.user).toEqual(new User(null, ''));

    const user = new User(1, 'Test User');
    mockDataSharingService.currentUser = of(user);

    component.ngOnInit();

    expect(component.user).toEqual(user);
  });

  it('should get the newest chatRoom', () => {
    expect(component.openChats).toEqual([]);

    const user = new User(1, 'Test User 1');
    const chatRoom = new ChatRoom(1, user, new User(2, 'Test User 2'));
    mockDataSharingService.currentUser = of(user);
    mockDataSharingService.observableNewestChatRoom = of(chatRoom);

    component.ngOnInit();

    expect(component.openChats).toEqual([chatRoom]);
  });

  it('should get the newest textMessage', () => {
    expect(component.openChatsDisplay).toEqual([]);

    const userOne = new User(1, 'Test User 1');
    const userTwo = new User(2, 'Test User 2');
    const chatRoom = new ChatRoom(1, userOne, userTwo);
    const textMessage = new TextMessage(1, 'Test message', new Date(), userOne, chatRoom);
    const chatEntry = [1, userOne, userTwo, textMessage.content, textMessage.timestamp];

    component.user = userOne;
    component.openChats.push(chatRoom);
    mockDataSharingService.observableNewestTextMessage = of(textMessage);

    component.ngOnInit();

    expect(component.openChatsDisplay).toEqual([chatEntry]);
  });

  it('should get the recently deleted user', () => {
    const userOne = new User(1, 'Test User 1');
    const userTwo = new User(2, 'Test User 2');
    const chatRoom = new ChatRoom(1, userOne, userTwo);

    component.user = userOne;
    component.openChats.push(chatRoom);
    component.chatRoom = chatRoom;
    mockDataSharingService.observableDeletedUser = of(userTwo);

    component.ngOnInit();

    expect(component.openChats).toEqual([]);
  });

  it('should choose the correct chat room', () => {
    expect(component.chatRoom).toBeUndefined();

    const chatRoom = new ChatRoom(1, new User(1, 'Test User 1'), new User(2, 'Test User 2'));
    component.openChatRoom(chatRoom, 1);

    expect(component.chatRoom).toBe(chatRoom);
  });
});
