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

  messages: TextMessage[];
  chatPartner: User;
  @Input() chatRoom: ChatRoom;
  @Input() loggedInUser: User;

  inputForm: FormGroup = new FormGroup({
    message: new FormControl()
  });

  constructor(private api: ApiEndpointService, private dataSharing: DataSharingService, private websocket: Websocket) {}

  ngOnChanges(): void {
    this.chatRoom.participantOne.id === this.loggedInUser.id ?
      this.chatPartner = this.chatRoom.participantTwo :
      this.chatPartner = this.chatRoom.participantOne;

    this.api.getAllTextMessagesByChatRoomId(this.loggedInUser, this.chatRoom).subscribe((listOfTextMessages: TextMessage[]) => {
      this.messages = listOfTextMessages;
    });

    this.dataSharing.observableNewestTextMessage.subscribe((textMessage: TextMessage) => {
      if (textMessage !== null && textMessage.chatRoom.id === this.chatRoom.id) {
        this.messages.push(textMessage);
      }
    });
  }

  sendMessage(message: string): void {
    // send message to Backend

    this.inputForm.setValue({
      message: ''
    });

    this.websocket.sendName(this.loggedInUser, this.chatRoom, message);

    /* this.api.sendMessage(this.loggedInUser, this.chatRoom, message).subscribe((data: TextMessage) => {
      this.messages.push(data);

      let msgHist = document.getElementById("msgHistory");
      msgHist.scrollTop = msgHist.scrollHeight;
    }); */
  }
}
