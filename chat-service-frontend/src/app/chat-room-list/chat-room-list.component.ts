import { Component, OnInit } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service';
import { ChatRoom } from '../chat-room-model';
import { User } from '../user-model';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.css']
})
export class ChatRoomListComponent implements OnInit {

  user: User;
  testUser: User = new User(69, "Darth Vader");
  openChats: ChatRoom[] = [
    new ChatRoom(1, new User(42, "Luke Skywalker"), new User(69, "Darth Vader")),
    new ChatRoom(2, new User(69, "Darth Vader"), new User(17, "Obi-Wan Kenobi"))
  ]
  constructor(private api: ApiEndpointService) { }

  ngOnInit(): void {
    this.api.getSubjectNewUser().subscribe((data: User) => {
      this.user = data;
    });
  }

  openChatRoom(id: number): void {
    console.log(id);
  }

}
