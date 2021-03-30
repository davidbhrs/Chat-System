import { Component } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service';
import { DataSharingService } from '../data-sharing.service';
import { User } from '../models/user-model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpLoginErrorMessageComponent } from '../pop-up-login-error-message/pop-up-login-error-message.component';
import { Websocket } from '../websocket';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  /**
   * Constructor
   * @param api         service to send http requests to the backend
   * @param dataSharing service to exchange data between components
   * @param router      routing service to navigate to other components
   * @param dialog      angular material framework to display pop up messages
   * @param websocket   socket service dealing with data which is needed by multiple clients
   */
  constructor(
    public api: ApiEndpointService,
    private dataSharing: DataSharingService,
    private router: Router,
    private dialog: MatDialog,
    private websocket: Websocket
  ) { }

  /**
   * Login Method
   * Calls the Login Method of the api-endpoint. --> Creates new User in Backend
   *
   * @param username name of the new user
   * @returns a promise that this asynchronous function will fucking end
   */
  async login(username: string): Promise<void> {
    // opening error message when input field is empty
    if (username === '') {
      this.dialog.open(PopUpLoginErrorMessageComponent, {
        data: 'UsernameEmpty',
        width: '800px',
        height: '150px'
      });
      return;
    }

    // calling api to create a POST-request on the user resource
    let success = false;
    this.api.login(username).subscribe((user: User) => {
      this.dataSharing.changeCurrentUser(user);
      success = true;
    });

    // waiting until the request is done
    await delay(400);

    // if the user could be created --> open websocket connection and navigate to the chat room list
    // else --> raise error message in pop up
    if (success) {
      this.dataSharing.changeLogedInStatus(true);
      this.websocket.connect();
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

/**
 * a synchronous function causing a delay
 *
 * @param ms amount of time the function shall wait
 * @returns a promise that this function will fucking end
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
