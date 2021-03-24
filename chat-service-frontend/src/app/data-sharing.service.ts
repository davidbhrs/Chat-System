import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { ChatRoom } from './chat-room-model';
import { User } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private loggedInStatus = new BehaviorSubject(false);
  private user: ReplaySubject<User> = new ReplaySubject();
  private newestChatRoom: Subject<ChatRoom> = new Subject();
  currentLoggedInStatus = this.loggedInStatus.asObservable();
  currentUser = this.user.asObservable();
  observableNewestChatRoom = this.newestChatRoom.asObservable();

  constructor() { }

  /**
   * Service for Sharing the login Status between header and login component.
   *
   * @param message the new LogInStatus
   */
  changeLogedInStatus(message: boolean): void {
    this.loggedInStatus.next(message);
  }

  /**
   * Service for Sharing the current user between components.
   *
   * @param message the user that just logged in
   */
  changeCurrentUser(message: User): void {
    this.user.next(message);
  }

  /**
   * Service for Sharing the newest chat room between PopUpNewChatComponent and ChatRoomListComponent.
   *
   * @param message the chat room that was just created
   */
  addNewestChatRoom(message: ChatRoom): void {
    this.newestChatRoom.next(message);
  }
}
