import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiEndpointService } from '../api-endpoint.service';
import { User } from '../user-model';

@Component({
  selector: 'app-pop-up-new-chat',
  templateUrl: './pop-up-new-chat.component.html',
  styleUrls: ['./pop-up-new-chat.component.css']
})
export class PopUpNewChatComponent implements OnInit {

  /** local variables */
  displayedColumns: string[] = ['name'];
  listOfActiveUsers: User[];
  dataSource: User[];
  searchword: String;

  // current user
  user: User;

  /**
   * Constructor
   * @param api service to send http requests to the backend
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: User, private api: ApiEndpointService) { 
    this.user = data;
  }

  /**
   * OnInit-Function when component is loaded
   * Asks for all active users in the database
   */
  ngOnInit(): void {
    this.api.getAllUsers().subscribe((data: User[]) => {
      data.splice(data.indexOf(this.user),1);
      this.listOfActiveUsers = data;
      this.dataSource = this.listOfActiveUsers;
    });
  }

  /**
   * Creating a new Chat with the current user and the chat partner
   * @param chatPartner user with which the current user wants to chat
   */
  newChat(chatPartner: User): void {
    this.api.createNewChatRoom(this.user, chatPartner).subscribe((data: any) => {
      console.log(data);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    var filteredList: User[] = [];

    this.listOfActiveUsers.forEach(user => {
      var comparisonValue = user.name.toLowerCase();
      if (comparisonValue.indexOf(filterValue) !== -1) {
        filteredList.push(user);
      }
    });

    this.dataSource = filteredList;
  }
}
