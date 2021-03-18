import { Component, OnInit } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service'
import { Subscription } from 'rxjs'
import { DataSharingService } from '../data-sharing.service'
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loggedIn: boolean;
  subscription: Subscription;

  constructor(public api: ApiEndpointService, private dataSharing: DataSharingService) { }

  ngOnInit(): void {
    this.subscription = this.dataSharing.currentLoggedInStatus.subscribe(message => this.loggedIn = message);
  }

  /**
   * Login Method
   * Calls the Login Method of the api-endpoint. --> Creates new User in Backend 
   * 
   * 
   * @param username 
   */
  async login(username: String) {
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

    await delay(400)

    if (success) {
      this.dataSharing.changeLogedInStatus(true);
    }
    
  }

}


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}