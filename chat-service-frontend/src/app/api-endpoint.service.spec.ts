import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiEndpointService } from './api-endpoint.service';
import { ChatRoom } from './models/chat-room-model';
import { TextMessage } from './models/text-message-model';
import { User } from './models/user-model';

describe('ApiEndpointService', () => {
  let service: ApiEndpointService;
  let httpMock: HttpTestingController;

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
    const newUser = new User(1, username);

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

  it('should get all text messages by chat room', (done) => {
    const userOne = new User(1, 'Test-User 1');
    const userTwo = new User(2, 'Test-User 2');
    const chatRoom = new ChatRoom(1, userOne, userTwo);
    const textMessages = [
      new TextMessage(1, 'Test message 1', new Date(), userOne, chatRoom),
      new TextMessage(2, 'Test message 2', new Date(), userTwo, chatRoom)
    ];

    service.getAllTextMessagesByChatRoomId(userOne, chatRoom).subscribe((response: TextMessage[]) => {
      expect(response).toBe(textMessages);
      done();
    });

    const getTextMessagesRequest = httpMock.expectOne(`/users/${userOne.id}/chat-rooms/${chatRoom.id}/text-messages`);
    expect(getTextMessagesRequest.request.method).toBe('GET');
    getTextMessagesRequest.flush(textMessages);

    httpMock.verify();
  });
});
