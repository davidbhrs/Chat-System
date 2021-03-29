import { Component, Input, OnChanges } from '@angular/core';
import { ChatRoom } from '../chat-room-model';
import { TextMessage } from '../text-message-model';
import { User } from '../user-model';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiEndpointService } from '../api-endpoint.service';

import { DataSharingService } from '../data-sharing.service';
import { Websocket } from '../websocket';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnChanges {

  messages: TextMessage[] = [];
  chatPartner: User;
  @Input() chatRoom: ChatRoom;
  @Input() loggedInUser: User;

  inputForm: FormGroup = new FormGroup({
    message: new FormControl()
  });

  constructor(private api: ApiEndpointService, private dataSharing: DataSharingService, private websocket: Websocket) {}

  ngOnChanges(): void {
    // determining the chat partner
    this.chatRoom.participantOne.id === this.loggedInUser.id ?
      this.chatPartner = this.chatRoom.participantTwo :
      this.chatPartner = this.chatRoom.participantOne;

    // initial loading of the messages when opening a chat room
    this.api.getAllTextMessagesByChatRoomId(this.loggedInUser, this.chatRoom).subscribe((listOfTextMessages: TextMessage[]) => {
      this.messages = listOfTextMessages;
    });

    // receiving text messages which arrive via websocket
    this.dataSharing.observableNewestTextMessage.subscribe((textMessage: TextMessage) => {
      // bugfix: because of trouble concerning the asynchronous communication with the dataSharingService
      // it needs to be checked whether a message is already in the message history
      if (this.messages.length > 0 && textMessage.id === this.messages[this.messages.length - 1].id) {
        return;
      }

      // adding a text message to the chat and scrolling down to look at it
      if (textMessage !== null && textMessage.chatRoom.id === this.chatRoom.id) {
        this.messages.push(textMessage);

        let msgHist = document.getElementById("msgHistory");
        msgHist.scrollTop = msgHist.scrollHeight;
      }
    });
  }

  sendMessage(message: string): void {
    // clear input field
    this.inputForm.setValue({
      message: ''
    });

    // send message to Backend
    this.websocket.sendName(this.loggedInUser, this.chatRoom, message);
  }
}
