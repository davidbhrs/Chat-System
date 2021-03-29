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
  selectedIndex: number

  /**
   * Constructor
   * @param api service to send http requests to the backend
   */
  constructor(private dataSharing: DataSharingService) { }

  /**
   * OnInit-Function when component is loaded
   * Asks for the user which is currently logged in
   */
  ngOnInit(): void {
    this.dataSharing.currentUser.subscribe((message: User) => {
      this.user = message;
    });

    this.dataSharing.observableNewestChatRoom.subscribe((message: ChatRoom) => {
      if (!this.openChats.find(chatRoom => chatRoom.id === message.id)) {
        this.openChats.push(message);
      }
      this.openChatRoom(message, this.openChats.indexOf(message));
    });
  }

  /**
   * OnClick-Event to open a chat which another user
   * @param id UserId of the chat partner
   */
  openChatRoom(chatRoom: ChatRoom, index: number): void {
    this.chatRoom = chatRoom;
    this.selectedIndex = index;
  }
}
