import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiEndpointService } from '../api-endpoint.service';
import { User } from '../user-model';
import { DataSharingService } from '../data-sharing.service';

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
   * @param api    service to send http requests to the backend
   * @param router routing service to navigate to other components
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) data: User,
    public api: ApiEndpointService,
    private router: Router,
    private dataSharing: DataSharingService
  ) {
    this.user = data;
  }

  /**
   * Deletes the current user and navigates to the login page
   */
  logOut(): void {
    this.dataSharing.changeLogedInStatus(false);
    this.api.logOut(this.user).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
