import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user-model';
import { ChatRoom } from './chat-room-model';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200/',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Content-Language': 'de-DE',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointService {

  /**
   * Constructor
   * @param http   Angular library to send http requests to a server
   */
  constructor(private http: HttpClient) {   }

  /**
   * Login-function sending a post request to the user resource in backend
   * After positive response is given, the function navigates to the ChatRoomListComponent
   * @param username The name of the new user which tries to log in; must be unique
   */
  login(username: string): Observable<User> {
    return this.http.post<User>((`/users/${username}`), username, httpOptions);
  }

  getAllUsers(): Observable<any> {
    return this.http.get('/users', httpOptions);
  }

  getAllChatRooms(user: User): Observable<any> {
    return this.http.get(`/users/${user.id}/chat-rooms`, httpOptions);
  }

  logOut(user: User): Observable<any> {
    return this.http.delete(`/users/${user.id}`, httpOptions);
  }

  createNewChatRoom(participantOne: User, participantTwo: User): Observable<any> {
    return this.http.post(`/users/${participantOne.id}/chat-rooms`, { participantOne, participantTwo }, httpOptions);
  }

  getAllTextMessagesByChatRoomId(user: User, chatRoom: ChatRoom): Observable<any> {
    return this.http.get(`/users/${user.id}/chat-rooms/${chatRoom.id}/text-messages`, httpOptions);
  }

  sendMessage(user: User, chatRoom: ChatRoom, message: string): Observable<any> {
    return this.http.post(`/users/${user.id}/chat-rooms/${chatRoom.id}/text-messages`, { content: message }, httpOptions);
  }
}
