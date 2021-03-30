import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ApiEndpointService } from '../api-endpoint.service';
import { ChatRoom } from '../models/chat-room-model';
import { DataSharingService } from '../data-sharing.service';
import { User } from '../models/user-model';
import { Websocket } from '../websocket';

import { PopUpNewChatComponent } from './pop-up-new-chat.component';

describe('PopUpNewChatComponent', () => {
  let component: PopUpNewChatComponent;
  let fixture: ComponentFixture<PopUpNewChatComponent>;
  const currentUser = new User(1, 'Test User');
  let mockApiEndpointService;
  let mockDataSharingService;
  let mockWebsocket;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpNewChatComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        ApiEndpointService,
        DataSharingService,
        Websocket,
        { provide: MAT_DIALOG_DATA, useValue: currentUser }
      ]
    })
    .compileComponents();

    mockApiEndpointService = TestBed.inject(ApiEndpointService);
    mockDataSharingService = TestBed.inject(DataSharingService);
    mockWebsocket = TestBed.inject(Websocket);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpNewChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.user).toEqual(currentUser);
  });

  it('should get the currently active users', () => {
    const users = [currentUser, new User(2, 'Test User 2'), new User(3, 'Test User 3')];
    const finalList = [new User(2, 'Test User 2'), new User(3, 'Test User 3')];
    spyOn(mockApiEndpointService, 'getAllUsers').and.returnValue(of(users));

    component.ngOnInit();

    expect(component.listOfActiveUsers).toEqual(finalList);
    expect(component.dataSource).toEqual(finalList);
  });

  it('should create a new chat room', () => {
    const chatPartner = new User(4, 'Test User 4');
    const chatRoom = new ChatRoom(1, currentUser, chatPartner);
    component.listOfChatRooms = [];
    spyOn(mockWebsocket, 'createChatRoom').and.returnValue(null);

    component.newChat(chatPartner);

    mockDataSharingService.observableNewestChatRoom.subscribe((newestChatRoom: ChatRoom) => {
      expect(newestChatRoom).toBe(chatRoom);
    });
  });

  it('should filter the users according to the search term', () => {
    const users = [new User(2, 'Test User 2'), new User(3, 'Test User 3'), new User(5, 'Musternutzer 5')];
    const finalList = [new User(2, 'Test User 2'), new User(3, 'Test User 3')];
    component.listOfActiveUsers = users;

    const inputField = document.getElementById('searchTerm');
    inputField.setAttribute('value', 'Test');
    inputField.dispatchEvent(new Event('keyup'));

    expect(component.dataSource).toEqual(finalList);
  });
});
