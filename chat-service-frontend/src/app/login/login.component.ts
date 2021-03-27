import { Component, OnInit } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service';
import { Subscription } from 'rxjs';
import { DataSharingService } from '../data-sharing.service';
import { User } from '../user-model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpLoginErrorMessageComponent } from '../pop-up-login-error-message/pop-up-login-error-message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  subscription: Subscription;

  /**
   * Constructor
   * @param api         service to send http requests to the backend
   * @param dataSharing service to exchange data between components
   * @param router      routing service to navigate to other components
   */
  constructor(public api: ApiEndpointService, private dataSharing: DataSharingService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {}

  /**
   * Login Method
   * Calls the Login Method of the api-endpoint. --> Creates new User in Backend
   *
   * @param username name of the new user
   */
  async login(username: string): Promise<void> {
    if (username === '') {
      this.dialog.open(PopUpLoginErrorMessageComponent, {
        data: 'UsernameEmpty',
        width: '800px',
        height: '150px'
      });
      return;
    }

    let success = false;
    this.api.login(username).subscribe((user: User) => {
      this.dataSharing.changeCurrentUser(user);
      success = true;
    });

    await delay(400);

    if (success) {
      this.dataSharing.changeLogedInStatus(true);
      this.router.navigateByUrl('/chats');
    } else {
      this.dialog.open(PopUpLoginErrorMessageComponent, {
        data: 'UserAlreadyExists',
        width: '800px',
        height: '150px'
      });
    }
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
