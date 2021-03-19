import { Component, OnInit } from '@angular/core';
import { ChatRoom } from '../chat-room-model';
import { TextMessage } from '../text-message-model'
import { User } from '../user-model';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: TextMessage[];
  //test id
  myID = 13

  constructor() { }

  ngOnInit(): void {
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

    this.messages = [msg1, msg2, msg3, msg4]
  }

  sendMessage(message: String) {
    // send message to Backend - oder wohin auch immer
  }

}
