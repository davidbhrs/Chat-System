import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiEndpointService } from '../api-endpoint.service';
import { ChatRoom } from '../models/chat-room-model';
import { DataSharingService } from '../data-sharing.service';
import { User } from '../models/user-model';
import { Websocket } from '../websocket';

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
   * @param data        user object representing the current user
   * @param api         service to send http requests to the backend
   * @param dataSharing service to exchange data between components
   * @param websocket   socket service dealing with data which is needed by multiple clients
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private api: ApiEndpointService,
    private dataSharing: DataSharingService,
    private websocket: Websocket
  ) {
    this.user = data;
  }

  /**
   * OnInit-Function when component is loaded
   * Asks for all active users in the database
   */
  ngOnInit(): void {
    // getting all users from the database and filtering so the user cannot see himself in the list
    this.api.getAllUsers().subscribe((data: User[]) => {
      this.listOfActiveUsers = [];
      data.forEach((user: User) => {
        if (user.id !== this.user.id) {
          this.listOfActiveUsers.push(user);
        }
      });
      // it needs to be distinguished between dataSource and listOfActiveUsers
      // because when using search term filters the dataSource is shortened
      this.dataSource = this.listOfActiveUsers;
    });

    // getting all existing chat rooms the user participates in to prevent creating a chat twice
    this.api.getAllChatRooms(this.user).subscribe((data: ChatRoom[]) => {
      this.listOfChatRooms = data;
    });
  }

  /**
   * Creating a new Chat with the current user and the chat partner
   *
   * @param chatPartner user with which the current user wants to chat
   */
  newChat(chatPartner: User): void {
    let shallCreate = true;
    // checking whether chat room already exists in the chat room list and opening it if so
    this.listOfChatRooms.forEach((chatRoom: ChatRoom) => {
      if (chatRoom.participantOne.name === chatPartner.name || chatRoom.participantTwo.name === chatPartner.name) {
        this.dataSharing.addNewestChatRoom(chatRoom);
        shallCreate = false;
      }
    });

    // creating a new chat room if it does not exist yet
    if (shallCreate) {
      this.websocket.createChatRoom(this.user, chatPartner);
    }
  }

  /**
   * function for filtering all active users by a search term
   *
   * @param event keyup-event on the HTMLInputElement to trigger the function
   */
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
