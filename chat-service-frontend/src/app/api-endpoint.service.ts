import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders }from'@angular/common/http';
import{ Observable, Subject }from'rxjs';
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

  newUser: Subject<User> = new Subject();

  constructor(private http: HttpClient, private router: Router) {   }

  login(username: String): any {
    this.http.post<User>(("/users/" + username), username, httpOptions).subscribe((newUser: User) => {
      this.newUser.next(newUser);
      this.router.navigateByUrl("/chats");
    });
  }

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
