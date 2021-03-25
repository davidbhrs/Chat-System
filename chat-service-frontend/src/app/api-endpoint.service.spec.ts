import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiEndpointService } from './api-endpoint.service';
import { ChatRoom } from './chat-room-model';
import { TextMessage } from './text-message-model';
import { User } from './user-model';

fdescribe('ApiEndpointService', () => {
  let service: ApiEndpointService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiEndpointService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post a new user', (done) => {
    const username = 'Testname';
    const newUser = new User(1, username)

    service.login(username).subscribe((response: User) => {
      expect(response.name).toEqual(username);
      done();
    });

    const postUserRequest = httpMock.expectOne(`/users/${username}`);
    expect(postUserRequest.request.method).toBe('POST');
    postUserRequest.flush(newUser);
    
    httpMock.verify();
  });

  it('should get all active users', (done) => {
    const users = [new User(1, 'Test-User 1'), new User(2, 'Test-User 2'), new User(3, 'Test-User 3')];

    service.getAllUsers().subscribe((response: User[]) => {
      expect(response).toEqual(users);
      done();
    });

    const getUsersRequest = httpMock.expectOne(`/users`);
    expect(getUsersRequest.request.method).toBe('GET');
    getUsersRequest.flush(users);

    httpMock.verify();
  });

  it('should delete a user', (done) => {
    const username = 'Testname';
    const user = new User(1, username)

    service.logOut(user).subscribe(() => {
      done();
    });

    const deleteUserRequest = httpMock.expectOne(`/users/${user.id}`);
    expect(deleteUserRequest.request.method).toBe('DELETE');
    deleteUserRequest.flush({});

    httpMock.verify();
  });

  it('should create new chat room', (done) => {
    const userOne = new User(1, 'Test-User 1');
    const userTwo = new User(2, 'Test-User 2');
    const newChatRoom = new ChatRoom(1, userOne, userTwo);

    service.createNewChatRoom(userOne, userTwo).subscribe((response: ChatRoom) => {
      expect(response).toEqual(newChatRoom);
      done();
    });

    const postChatRoomRequest = httpMock.expectOne(`/users/${userOne.id}/chat-rooms`);
    expect(postChatRoomRequest.request.method).toBe('POST');
    postChatRoomRequest.flush(newChatRoom);
    
    httpMock.verify();
  });

  it('should get all text messages by chat room', (done) => {
    const userOne = new User(1, 'Test-User 1');
    const userTwo = new User(2, 'Test-User 2');
    const chatRoom = new ChatRoom(1, userOne, userTwo);
    const textMessages = [new TextMessage(), new TextMessage()];

    service.getAllTextMessagesByChatRoomId(userOne, chatRoom).subscribe((response: TextMessage[]) => {
      expect(response).toBe(textMessages);
      done();
    });

    const getTextMessagesRequest = httpMock.expectOne(`/users/${userOne.id}/chat-rooms/${chatRoom.id}/text-messages`);
    expect(getTextMessagesRequest.request.method).toBe('GET');
    getTextMessagesRequest.flush(textMessages);
    
    httpMock.verify();
  });

  it('should send a text message', (done) => {
    const userOne = new User(1, 'Test-User 1');
    const userTwo = new User(2, 'Test-User 2');
    const chatRoom = new ChatRoom(1, userOne, userTwo);

    const message = 'Test text message';
    const textMessage = new TextMessage();
    textMessage.content = message;

    service.sendMessage(userOne, chatRoom, message).subscribe((response: TextMessage) => {
      expect(response.content).toBe(textMessage.content);
      done();
    });

    const getTextMessagesRequest = httpMock.expectOne(`/users/${userOne.id}/chat-rooms/${chatRoom.id}/text-messages`);
    expect(getTextMessagesRequest.request.method).toBe('POST');
    getTextMessagesRequest.flush(textMessage);
    
    httpMock.verify();
  });
});
