import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import{ HttpClient, HttpHeaders } from '@angular/common/http';
import{ Observable } from 'rxjs';
import { logging } from 'selenium-webdriver';
import { User } from './user-model';
import { Router } from '@angular/router';



const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
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
   * @param {HttpClient} http   Angular library to send http requests to a server
   * @param {Router}     router routing service to navigate to other components
   */
  constructor(private http: HttpClient, private router: Router) {   }

  /**
   * Login-function sending a post request to the user resource in backend
   * After positive response is given, the function navigates to the ChatRoomListComponent
   * @param {String} username The name of the new user which tries to log in; must be unique
   */
  login(username: String): Observable<User> {
    return this.http.post<User>(("/users/" + username), username, httpOptions)
  }

  getAllUsers(): Observable<any> {
    return this.http.get("/users");
  }

  logOut(user: User): Observable<any> {
    return this.http.delete(`/users/${user.id}`);
  }

  createNewChatRoom(participantOne: User, participantTwo: User): Observable<any> {
    return this.http.post(`/users/${participantOne.id}/chat-rooms`, { participantOne, participantTwo });
  }

}
