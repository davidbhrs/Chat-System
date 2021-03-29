import { Component, OnInit } from '@angular/core';
import { ChatRoom } from '../chat-room-model';
import { DataSharingService } from '../data-sharing.service';
import { User } from '../user-model';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.css']
})
export class ChatRoomListComponent implements OnInit {

  // User which is currently logged in
  user: User;
  chatRoom: ChatRoom;
  openChats: ChatRoom[] = [];

  /**
   * Constructor
   * @param dataSharing service to exchange data between components
   */
  constructor(private dataSharing: DataSharingService) { }

  /**
   * OnInit-Function when component is loaded
   * Asks for the user which is currently logged in and updates the chat room list
   */
  ngOnInit(): void {
    // get the currently logged in user
    this.dataSharing.currentUser.subscribe((message: User) => {
      this.user = message;
    });

    // get the information about a newly created chat room
    this.dataSharing.observableNewestChatRoom.subscribe((message: ChatRoom) => {
      // because the observable may also contain a chat room where the user does not participate
      // here needs to be checked whether the chat room belongs to the user
      if (message.participantOne.id === this.user.id || message.participantTwo.id === this.user.id) {
        // if the chat room is already in the list it does not need to be pushed into the chat room list
        if (!this.openChats.find(chatRoom => chatRoom.id === message.id)) {
          this.openChats.push(message);
        }
        this.openChatRoom(message);
      }
    });
  }

  /**
   * OnClick-Event to open a chat which another user
   * @param id UserId of the chat partner
   */
  openChatRoom(chatRoom: ChatRoom): void {
    this.chatRoom = chatRoom;
  }
}
