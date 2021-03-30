import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DataSharingService } from '../data-sharing.service';
import { PopUpLogoutComponent } from '../pop-up-logout/pop-up-logout.component';
import { PopUpNewChatComponent } from '../pop-up-new-chat/pop-up-new-chat.component';
import { User } from '../models/user-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /** Class Properties */
  loggedIn: boolean;
  subscription: Subscription;

  /**
   * Constructor
   *
   * @param dataSharing service to exchange data between components
   * @param dialog      angular material framework to display pop up messages
   */
  constructor(private dataSharing: DataSharingService, private dialog: MatDialog) { }

  /**
   * OnInit-Function when component is loaded
   * Asks for the current loggedInStatus
   */
  ngOnInit(): void {
    this.subscription = this.dataSharing.currentLoggedInStatus.subscribe(message => this.loggedIn = message);
  }

  /**
   * opens pop-up-new-chat.component
   */
  newChat(): void {
    this.dataSharing.currentUser.subscribe((message: User) => {
      this.dialog.open(PopUpNewChatComponent, {
        data: message,
        width: '400px',
        height: '500px'
      });
    }).unsubscribe();
  }

  /**
   * open pop-up-log-out.component
   */
  logOut(): void {
    this.dataSharing.currentUser.subscribe((message: User) => {
      this.dialog.open(PopUpLogoutComponent, {
        data: message,
        width: '600px',
        height: '300px'
      });
    }).unsubscribe();
  }
}
