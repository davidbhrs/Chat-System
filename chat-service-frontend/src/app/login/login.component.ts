import { Component, OnInit } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public api: ApiEndpointService) { }

  ngOnInit(): void {
  }

  /**
   * Login Method
   * Calls the Login Method of the api-endpoint. --> Creates new User in Backend 
   * 
   * 
   * @param username 
   */
  login(username: String) {
    let success: Boolean
    this.api.login(username).subscribe(data => {
      // User created successfully
      console.log(data)
      success = true;
    },
    error => {
      // User is not created successfully --> User needs to get feedback
      success = false;
      console.error("User existiert bereits.")
    });
  }

}
