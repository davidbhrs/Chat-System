import { Component, Input, OnInit } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service';
import { User } from '../user-model';

@Component({
  selector: 'app-pop-up-new-chat',
  templateUrl: './pop-up-new-chat.component.html',
  styleUrls: ['./pop-up-new-chat.component.css']
})
export class PopUpNewChatComponent implements OnInit {

  displayedColumns: string[] = ['name'];
  listOfActiveUsers: User[];

  @Input() user: User;

  constructor(private api: ApiEndpointService) { }

  ngOnInit(): void {
    this.api.getAllUsers().subscribe((data: User[]) => {
      this.listOfActiveUsers = data;
      console.log(this.listOfActiveUsers);
    });
  }

  newChat(chatPartner: User): void {
    this.api.createNewChatRoom(this.user, chatPartner).subscribe((data: any) => {
      console.log(data);
    });
  }
}
