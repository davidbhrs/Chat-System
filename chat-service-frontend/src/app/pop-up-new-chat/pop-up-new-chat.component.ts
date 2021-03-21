import { Component, Input, OnInit } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service';
import { User } from '../user-model';

@Component({
  selector: 'app-pop-up-new-chat',
  templateUrl: './pop-up-new-chat.component.html',
  styleUrls: ['./pop-up-new-chat.component.css']
})
export class PopUpNewChatComponent implements OnInit {

  /** local variables */
  displayedColumns: string[] = ['name'];
  listOfActiveUsers: User[];

  // current user -- initialization for test purposes
  @Input() user: User = new User(1, 'James T. Kirk');

  /**
   * Constructor
   * @param api service to send http requests to the backend
   */
  constructor(private api: ApiEndpointService) { }

  /**
   * OnInit-Function when component is loaded
   * Asks for all active users in the database
   */
  ngOnInit(): void {
    this.api.getAllUsers().subscribe((data: User[]) => {
      this.listOfActiveUsers = data;
      console.log(this.listOfActiveUsers);
    });
  }

  /**
   * Creating a new Chat with the current user and the chat partner
   * @param chatPartner user with which the current user wants to chat
   */
  newChat(chatPartner: User): void {
    this.api.createNewChatRoom(this.user, chatPartner).subscribe((data: any) => {
      console.log(data);
    });
  }
}
