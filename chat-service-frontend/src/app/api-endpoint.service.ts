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

  login(username: String) {
    return this.http.post("/", username, httpOptions);
  }

}
