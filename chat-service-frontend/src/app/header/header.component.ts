import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs'
import { DataSharingService } from '../data-sharing.service'
import { PopUpLogoutComponent } from '../pop-up-logout/pop-up-logout.component';
import { PopUpNewChatComponent } from '../pop-up-new-chat/pop-up-new-chat.component';
import { User } from '../user-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean;
  subscription: Subscription;

  constructor(private dataSharing: DataSharingService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscription = this.dataSharing.currentLoggedInStatus.subscribe(message => this.loggedIn = message);
  }

  newChat(): void {
    this.dataSharing.currentUser.subscribe((message: User) => {
      this.dialog.open(PopUpNewChatComponent, { data: message });
    });
  }

  logOut(): void {
    this.dataSharing.currentUser.subscribe((message: User) => {
      this.dialog.open(PopUpLogoutComponent, { data: message });
    });
  }
}
