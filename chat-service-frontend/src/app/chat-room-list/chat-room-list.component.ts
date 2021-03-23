import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ChatRoom } from '../chat-room-model';
import { DataSharingService } from '../data-sharing.service';
import { PopUpNewChatComponent } from '../pop-up-new-chat/pop-up-new-chat.component';
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

  // Test data
  testUser: User = new User(69, 'Darth Vader');
  openChats: ChatRoom[] = [
    new ChatRoom(1, new User(42, 'Luke Skywalker'), new User(69, 'Darth Vader')),
    new ChatRoom(2, new User(69, 'Darth Vader'), new User(17, 'Obi-Wan Kenobi'))
  ];

  /**
   * Constructor
   * @param api service to send http requests to the backend
   */
  constructor(private dataSharing: DataSharingService, private dialog: MatDialog) { }

  /**
   * OnInit-Function when component is loaded
   * Asks for the user which is currently logged in
   */
  ngOnInit(): void {
    this.dataSharing.currentUser.subscribe((message: User) => {
      this.user = message;
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
