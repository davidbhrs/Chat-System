import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiEndpointService } from '../api-endpoint.service';
import { User } from '../user-model';
import { DataSharingService } from '../data-sharing.service';
import { Websocket } from '../websocket';


@Component({
  selector: 'app-pop-up-logout',
  templateUrl: './pop-up-logout.component.html',
  styleUrls: ['./pop-up-logout.component.css']
})
export class PopUpLogoutComponent {

  // Current user -- Initialization is for test purposes
  user: User;

  /**
   * Constructor
   * @param api         service to send http requests to the backend
   * @param router      routing service to navigate to other components
   * @param dataSharing service to exchange data between components
   * @param websocket   socket service dealing with data which is needed by multiple clients
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) data: User,
    public api: ApiEndpointService,
    private router: Router,
    private dataSharing: DataSharingService,
    private websocket: Websocket
  ) {
    this.user = data;
  }

  /**
   * Deletes the current user, disconnects from the websocket and navigates to the login page
   */
  logOut(): void {
    this.dataSharing.changeLogedInStatus(false);
    this.websocket.deleteUser(this.user);
    this.websocket.disconnect();
    this.router.navigateByUrl('/login');
  }
}
