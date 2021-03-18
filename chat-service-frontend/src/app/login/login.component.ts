import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiEndpointService } from '../api-endpoint.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public api: ApiEndpointService, private router: Router) { }

  /**
   * Login Method
   * Calls the Login Method of the api-endpoint. --> Creates new User in Backend 
   * 
   * 
   * @param username 
   */
  login(username: String) {
    this.api.login(username);
  }

}
