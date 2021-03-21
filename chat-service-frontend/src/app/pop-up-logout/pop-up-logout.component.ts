import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiEndpointService } from '../api-endpoint.service';
import { User } from '../user-model';

@Component({
  selector: 'app-pop-up-logout',
  templateUrl: './pop-up-logout.component.html',
  styleUrls: ['./pop-up-logout.component.css']
})
export class PopUpLogoutComponent {

  // Current user -- Initialization is for test purposes
  @Input() user: User = new User(1, 'James T. Kirk');

  /**
   * Constructor
   * @param api    service to send http requests to the backend
   * @param router routing service to navigate to other components
   */
  constructor(public api: ApiEndpointService, private router: Router) { }

  /**
   * Deletes the current user and navigates to the login page
   */
  logOut(): void {
    this.api.logOut(this.user).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
