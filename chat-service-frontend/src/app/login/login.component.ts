import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiEndpointService } from '../api-endpoint.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /**
   * Constructor
   * @param {ApiEndpointService} api service to send http requests to the backend
   */
  constructor(public api: ApiEndpointService) { }

  /**
   * Login Method
   * Calls the Login Method of the api-endpoint. --> Creates new User in Backend 
   * 
   * @param username 
   */
  login(username: String) {
    this.api.login(username);
  }

}
