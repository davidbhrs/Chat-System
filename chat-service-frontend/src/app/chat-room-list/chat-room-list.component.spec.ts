import { ComponentFixture, TestBed } from '@angular/core/testing';
import { never, of } from 'rxjs';
import { ChatRoom } from '../chat-room-model';
import { DataSharingService } from '../data-sharing.service';
import { User } from '../user-model';

import { ChatRoomListComponent } from './chat-room-list.component';

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
    mockDataSharingService.observableNewestChatRoom = of();

    component.ngOnInit();

    expect(component.user).toEqual(user);
  });

  it('should get the newest chatRoom', () => {
    expect(component.openChats).toEqual([]);

    const chatRoom = new ChatRoom(1, new User(1, 'Test User 1'), new User(2, 'Test User 2'));
    mockDataSharingService.currentUser = of();
    mockDataSharingService.observableNewestChatRoom = of(chatRoom);

    component.ngOnInit();

    expect(component.openChats).toEqual([chatRoom]);
  });

  it('should choose the correct chat room', () => {
    expect(component.chatRoom).toBeUndefined();

    const chatRoom = new ChatRoom(1, new User(1, 'Test User 1'), new User(2, 'Test User 2'));
    component.openChatRoom(chatRoom);

    expect(component.chatRoom).toBe(chatRoom);
  });
});
