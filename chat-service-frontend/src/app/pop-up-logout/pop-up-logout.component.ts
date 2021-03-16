import { Component, Input, OnInit } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service';
import { User } from '../user-model';

@Component({
  selector: 'app-pop-up-logout',
  templateUrl: './pop-up-logout.component.html',
  styleUrls: ['./pop-up-logout.component.css']
})
export class PopUpLogoutComponent {

  @Input() user: User;

  constructor(public api: ApiEndpointService) { }

  logOut(): void {
    this.api.logOut(this.user).subscribe();
    // Routing
  }
}
