import { Component, Input, OnChanges } from '@angular/core';
import { ChatRoom } from '../models/chat-room-model';
import { TextMessage } from '../models/text-message-model';
import { User } from '../models/user-model';
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

  /** Class properties */
  messages: TextMessage[] = [];
  chatPartner: User;
  @Input() chatRoom: ChatRoom;
  @Input() loggedInUser: User;
  maxLengthOfTextMessage = 140;
  remainingChars = 140;

  // InputForm containing the input field for new text messages
  inputForm: FormGroup = new FormGroup({
    message: new FormControl()
  });

  /**
   * Constructor
   *
   * @param api         service to send http requests to the backend
   * @param dataSharing service to exchange data between components
   * @param websocket   socket service dealing with data which is needed by multiple clients
   */
  constructor(private api: ApiEndpointService, private dataSharing: DataSharingService, private websocket: Websocket) {}

  /**
   * initial function when a new chat room is loaded
   */
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

        const msgHist = document.getElementById('msgHistory');
        msgHist.scrollTop = msgHist.scrollHeight;
      }
    });
  }

  /**
   * sending a new text message via websocket to the backend
   *
   * @param message a string text message which is the content of a TextMessage object
   */
  sendMessage(message: string): void {
    // clear input field
    this.inputForm.setValue({
      message: ''
    });

    // send message to Backend
    this.websocket.sendMessage(this.loggedInUser, this.chatRoom, message);
  }

  /**
   * counting remaining input chars in the input field (max. 140 chars)
   *
   * @param content a string text message which is the current value of the input field
   */
  countChars(content: string): void {
    this.remainingChars = this.maxLengthOfTextMessage - content.length;
  }
}
