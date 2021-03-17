import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiEndpointService } from '../api-endpoint.service';
import { User } from '../user-model';

@Component({
  selector: 'app-pop-up-logout',
  templateUrl: './pop-up-logout.component.html',
  styleUrls: ['./pop-up-logout.component.css']
})
export class PopUpLogoutComponent {

  @Input() user: User = new User(1, "James T. Kirk");

  constructor(public api: ApiEndpointService, private router: Router) { }

  logOut(): void {
    this.api.logOut(this.user).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
