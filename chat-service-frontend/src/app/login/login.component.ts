import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  /**
   * Constructor
   * @param {ApiEndpointService} api         service to send http requests to the backend
   * @param {DataSharingService} dataSharing service to exchange data between components
   */
  constructor(public api: ApiEndpointService, private dataSharing: DataSharingService) { }

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
    this.api.login(username);

    await delay(400)

    if (true) {
      this.dataSharing.changeLogedInStatus(true);
    }
  }

}


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}