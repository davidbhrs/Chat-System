import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders }from'@angular/common/http';
import{ Observable }from'rxjs';
import { logging } from 'selenium-webdriver';



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

  constructor(private http: HttpClient) {   }

  login(username: String): Observable<any> {
    return this.http.post<String>(("/users/" + username), username, httpOptions);
  }

  getAllUsers(): Observable<any> {
    return this.http.get("/users");
  }

}
