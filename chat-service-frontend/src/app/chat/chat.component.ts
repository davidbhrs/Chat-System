import { Component, OnInit, Input } from '@angular/core';
import { ChatRoom } from '../chat-room-model';
import { TextMessage } from '../text-message-model'
import { User } from '../user-model';
import { FormControl, FormGroup } from "@angular/forms";
import { ApiEndpointService } from '../api-endpoint.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: TextMessage[];
  @Input() chatRoom: ChatRoom;
  @Input() loggedInUser: User;

  inputForm: FormGroup = new FormGroup({
    message: new FormControl() });

  constructor(private api: ApiEndpointService) { }

  ngOnInit(): void {

    this.api.getAllTextMessagesByChatRoomId(this.loggedInUser, this.chatRoom).subscribe((listOfTextMessages) => {
      console.log(listOfTextMessages);
    });

    // Test data
    let user1 = new User(13, "test")
    let user2 = new User(14, "testytest")

    let msg1: TextMessage = {
      id : 1,
      content: "Beispielnachricht",
      timestamp: new Date('2020-04-01'),
      sentBy: user1,
      chatRoom: new ChatRoom(13, user1, user2)
    }

    let msg2: TextMessage = {
      id : 2,
      content: "Beispielnachricht",
      timestamp: new Date('2020-04-01'),
      sentBy: user1,
      chatRoom: new ChatRoom(13, user1, user2)
    }

    let msg3: TextMessage = {
      id : 3,
      content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      timestamp: new Date('2020-04-01'),
      sentBy: user2,
      chatRoom: new ChatRoom(13, user1, user2)
    }

    let msg4: TextMessage = {
      id : 4,
      content: "Beispielnachricht",
      timestamp: new Date('2020-04-01'),
      sentBy: user2,
      chatRoom: new ChatRoom(13, user1, user2)
    }

    this.messages = [msg1, msg2, msg3, msg4];
  }

  sendMessage(message: String) {
    // send message to Backend - oder wohin auch immer
    
    // test data
    let user2 = new User(14, "testytest");
    this.loggedInUser = new User(13, "test")

    this.inputForm.setValue({
      message: ''
    });

    let newMsg: TextMessage = {
      id : 42, // Woher weiß ich die ID???
      content: message,
      timestamp: new Date(Date.now()),
      sentBy: this.loggedInUser,
      chatRoom: new ChatRoom(13, this.loggedInUser, user2)
    }

    this.messages.push(newMsg);
  }

}
