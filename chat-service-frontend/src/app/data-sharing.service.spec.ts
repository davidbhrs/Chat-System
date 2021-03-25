import { TestBed } from '@angular/core/testing';
import { ChatRoom } from './chat-room-model';

import { DataSharingService } from './data-sharing.service';
import { User } from './user-model';

fdescribe('DataSharingService', () => {
  let service: DataSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change the value of loggedInStatus to true', () => {
    service.currentLoggedInStatus.subscribe((loggedInStatus: boolean) => {
      expect(loggedInStatus).toBeFalse();
    }).unsubscribe();

    service.changeLogedInStatus(true);

    service.currentLoggedInStatus.subscribe((loggedInStatus: boolean) => {
      expect(loggedInStatus).toBeTrue();
    }).unsubscribe();
  });

  it('should change the value of loggedInStatus to false', () => {
    service.changeLogedInStatus(true);

    service.currentLoggedInStatus.subscribe((loggedInStatus: boolean) => {
      expect(loggedInStatus).toBeTrue();
    }).unsubscribe();

    service.changeLogedInStatus(false);

    service.currentLoggedInStatus.subscribe((loggedInStatus: boolean) => {
      expect(loggedInStatus).toBeFalse();
    }).unsubscribe();
  });

  it('should change the value of currentUser', () => {
    const initialUser = new User(null, "");
    const newUser = new User(42, "Testname");

    service.currentUser.subscribe((user: User) => {
      expect(user).toEqual(initialUser);
    }).unsubscribe();

    service.changeCurrentUser(newUser);

    service.currentUser.subscribe((user: User) => {
      expect(user).toEqual(newUser);
    }).unsubscribe();
  });

  it('should change the value of newestChatRoom', () => {
    const userOne = new User(1, "Test-User 1");
    const userTwo = new User(2, "Test-User 2");
    const userThree = new User(3, "Test-User 3");
    const userFour = new User(4, "Test-User 4");
    const chatRoomOne = new ChatRoom(1, userOne, userTwo);
    const chatRoomTwo = new ChatRoom(2, userThree, userFour);

    service.addNewestChatRoom(chatRoomOne);

    service.observableNewestChatRoom.subscribe((chatRoom: ChatRoom) => {
      expect(chatRoom).toEqual(chatRoomOne);
    }).unsubscribe();

    service.addNewestChatRoom(chatRoomTwo);

    service.observableNewestChatRoom.subscribe((chatRoom: ChatRoom) => {
      expect(chatRoom).toEqual(chatRoomTwo);
    }).unsubscribe();
  });
});
