import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiEndpointService } from '../api-endpoint.service';
import { ChatRoom } from '../chat-room-model';
import { DataSharingService } from '../data-sharing.service';
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
  listOfChatRooms: ChatRoom[];
  dataSource: User[];
  searchword: string;

  // current user
  user: User;

  /**
   * Constructor
   * @param api service to send http requests to the backend
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: User, private api: ApiEndpointService, private dataSharing: DataSharingService) {
    this.user = data;
  }

  /**
   * OnInit-Function when component is loaded
   * Asks for all active users in the database
   */
  ngOnInit(): void {
    this.api.getAllUsers().subscribe((data: User[]) => {
      this.listOfActiveUsers = []
      data.forEach((user: User) => {
        if (user.id !== this.user.id) {
          this.listOfActiveUsers.push(user);
        }
      });
      this.dataSource = this.listOfActiveUsers;
    });

    this.api.getAllChatRooms(this.user).subscribe((data: ChatRoom[]) => {
      this.listOfChatRooms = data;
    });
  }

  /**
   * Creating a new Chat with the current user and the chat partner
   * @param chatPartner user with which the current user wants to chat
   */
  newChat(chatPartner: User): void {
    let shallCreate = true;
    this.listOfChatRooms.forEach((chatRoom: ChatRoom) => {
      if (chatRoom.participantOne.name === chatPartner.name || chatRoom.participantTwo.name === chatPartner.name) {
        this.dataSharing.addNewestChatRoom(chatRoom);
        shallCreate = false;
      }
    });

    if (shallCreate) {
      this.api.createNewChatRoom(this.user, chatPartner).subscribe((data: ChatRoom) => {
        this.dataSharing.addNewestChatRoom(data);
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredList: User[] = [];

    this.listOfActiveUsers.forEach(user => {
      const comparisonValue = user.name.toLowerCase();
      if (comparisonValue.indexOf(filterValue) !== -1) {
        filteredList.push(user);
      }
    });

    this.dataSource = filteredList;
  }
}
