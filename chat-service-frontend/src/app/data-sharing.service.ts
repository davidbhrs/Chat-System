import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ChatRoom } from './chat-room-model';
import { TextMessage } from './text-message-model';
import { User } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  // local variables to manipulate in the functions below
  private loggedInStatus = new BehaviorSubject(false);
  private user: BehaviorSubject<User> = new BehaviorSubject(new User(null, ''));
  private newestChatRoom: Subject<ChatRoom> = new Subject();
  private newestTextMessage: BehaviorSubject<TextMessage> = new BehaviorSubject(null);
  private deletedUser: BehaviorSubject<User> = new BehaviorSubject(new User(null, ''));
  
  // observables which can be subscribed on inside the components
  currentLoggedInStatus = this.loggedInStatus.asObservable();
  currentUser = this.user.asObservable();
  observableNewestChatRoom = this.newestChatRoom.asObservable();
  observableNewestTextMessage = this.newestTextMessage.asObservable();
  observableDeletedUser = this.deletedUser.asObservable();

  /**
   * Constructor
   */
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

  /**
   * Service for Sharing the newest text message between Websocket and ChatComponent.
   *
   * @param message the text message that was just sent
   */
  addNewestTextMessage(message: TextMessage): void {
    this.newestTextMessage.next(message);
  }

  /**
   * Service for Announcing that a user has been deleted
   *
   * @param message the user that was deleted
   */
   announceDeletionOfUser(message: User): void {
    this.deletedUser.next(message);
  }
}
