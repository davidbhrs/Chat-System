import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { ChatRoom } from '../models/chat-room-model';
import { DataSharingService } from '../data-sharing.service';
import { TextMessage } from '../models/text-message-model';
import { User } from '../models/user-model';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.css']
})
export class ChatRoomListComponent implements OnInit {

  /** Class Properties */
  user: User;
  chatRoom: ChatRoom;
  openChats: ChatRoom[] = [];
  selectedIndex: number;
  openChatsDisplay = [];

  /**
   * Constructor
   *
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
      }
    });

    // get the information about the newest text message that arrived via websocket
    this.dataSharing.observableNewestTextMessage.subscribe((message: TextMessage) => {
      // initial subscription is always null
      if (message !== null) {
        // searching in openChats whether the text message is relevant for this client
        for (const openChat of this.openChats) {
          if (openChat.id === message.chatRoom.id) {
            const chatEntry: any[] = [
              message.chatRoom.id,
              message.chatRoom.participantOne,
              message.chatRoom.participantTwo,
              message.content,
              message.timestamp
            ];
            // check if openChatsDisplay already contains chatroom.id
            let found = false;
            for (let i = 0; i < this.openChatsDisplay.length; i++) {
              if (this.openChatsDisplay[i][0] === message.chatRoom.id) {
                found = true;
                this.openChatsDisplay[i] = chatEntry;
                break;
              }
            }
            if (!found) {
              this.openChatsDisplay.push(chatEntry);
            }
          }
        }
      }
    });

    // get the information about the recently deleted user
    this.dataSharing.observableDeletedUser.subscribe((message: User) => {
      // checking whether this client has an open chat room with the deleted user
      this.openChats.forEach((chatRoom: ChatRoom, index: number) => {
        if (chatRoom.participantOne.id === message.id || chatRoom.participantTwo.id === message.id) {
          if (chatRoom.id === this.chatRoom.id) {
            this.chatRoom = null;
          }
          this.openChats.splice(index, 1);
          return;
        }
      });
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
