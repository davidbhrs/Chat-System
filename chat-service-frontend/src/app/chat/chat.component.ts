import { Component, Input, OnChanges } from '@angular/core';
import { ChatRoom } from '../chat-room-model';
import { TextMessage } from '../text-message-model';
import { User } from '../user-model';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiEndpointService } from '../api-endpoint.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpTextTooLongMessageComponent } from '../pop-up-text-too-long-message/pop-up-text-too-long-message.component';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnChanges {

  messages: TextMessage[];
  chatPartner: User;
  maxLengthOfTextMessage = 140;
  @Input() chatRoom: ChatRoom;
  @Input() loggedInUser: User;

  inputForm: FormGroup = new FormGroup({
    message: new FormControl()
  });

  constructor(private api: ApiEndpointService, private dialog: MatDialog) {}

  ngOnChanges(): void {
    this.chatRoom.participantOne.id === this.loggedInUser.id ?
      this.chatPartner = this.chatRoom.participantTwo :
      this.chatPartner = this.chatRoom.participantOne;

    this.api.getAllTextMessagesByChatRoomId(this.loggedInUser, this.chatRoom).subscribe((listOfTextMessages: TextMessage[]) => {
      this.messages = listOfTextMessages;
    });
  }

  sendMessage(message: string): void {
    // send message to Backend
    if (message.length > this.maxLengthOfTextMessage) {
      this.dialog.open(PopUpTextTooLongMessageComponent, {
        data: this.maxLengthOfTextMessage,
        width: '800px',
        height: '150px'
      });
      return;
    }

    this.inputForm.setValue({
      message: ''
    });

    this.api.sendMessage(this.loggedInUser, this.chatRoom, message).subscribe((data: TextMessage) => {
      this.messages.push(data);
    });
  }
}
