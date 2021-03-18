import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
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
   * Subject containing the new user which is created in the backend
   * Subject is used to get this data in all components
   */
  newUser: Subject<User> = new Subject();

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
  login(username: String): any {
    this.http.post<User>(("/users/" + username), username, httpOptions).subscribe((newUser: User) => {
      this.newUser.next(newUser);
      this.router.navigateByUrl("/chats");
    });
  }

  /**
   * Subscribable function for other components to get asynchronous data from the API
   * @returns Subject containing the new user which was created in the backend
   */
  getSubjectNewUser(): Subject<User> {
    return this.newUser;
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
