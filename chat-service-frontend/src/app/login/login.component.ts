import { Component, OnInit } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service'
import { pipe, Subscription } from 'rxjs'
import { DataSharingService } from '../data-sharing.service'
import { User } from '../user-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loggedIn: boolean;
  subscription: Subscription;

  /**
   * Constructor
   * @param {ApiEndpointService} api         service to send http requests to the backend
   * @param {DataSharingService} dataSharing service to exchange data between components
   */
  constructor(public api: ApiEndpointService, private dataSharing: DataSharingService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.dataSharing.currentLoggedInStatus.subscribe(message => this.loggedIn = message);
  }

  /**
   * Login Method
   * Calls the Login Method of the api-endpoint. --> Creates new User in Backend 
   * 
   * @param username 
   */
  async login(username: String) {
    let success: Boolean = false;
    this.api.login(username).subscribe((user: User) => {
      this.dataSharing.changeCurrentUser(user);
      success = true
    });

    await delay(400)

    if (success) {
      this.dataSharing.changeLogedInStatus(true);
      this.router.navigateByUrl("/chats");
    }
  }

}


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}