import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user-model';
import { ChatRoom } from './models/chat-room-model';

// http request options to be sent with every request
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
   * @param http Angular library to send http requests to a server
   */
  constructor(private http: HttpClient) {   }

  /**
   * Login-function sending a post request to the user resource in backend
   *
   * @param username The name of the new user which tries to log in; must be unique
   * @returns observable of the new user object
   */
  login(username: string): Observable<User> {
    return this.http.post<User>((`/users/${username}`), username, httpOptions);
  }

  /**
   * function sending a get request to the user resource in the backend to get all active users
   *
   * @returns observable of all users
   */
  getAllUsers(): Observable<any> {
    return this.http.get('/users', httpOptions);
  }

  /**
   * function sending a get request to the chat room resource in the backend to get all open chat rooms
   *
   * @param user the user causing the request
   * @returns observable of all open chats
   */
  getAllChatRooms(user: User): Observable<any> {
    return this.http.get(`/users/${user.id}/chat-rooms`, httpOptions);
  }

  /**
   * function sending a get request to the text message resource in the backend to get all text messages sent
   *
   * @param user     the user causing the request
   * @param chatRoom the chat room in which the request was caused
   * @returns observable of all text messages sent
   */
  getAllTextMessagesByChatRoomId(user: User, chatRoom: ChatRoom): Observable<any> {
    return this.http.get(`/users/${user.id}/chat-rooms/${chatRoom.id}/text-messages`, httpOptions);
  }
}
