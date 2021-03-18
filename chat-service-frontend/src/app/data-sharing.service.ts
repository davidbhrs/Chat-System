import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private loggedInStatus = new BehaviorSubject(false);
  private user: Subject<User> = new Subject();
  currentLoggedInStatus = this.loggedInStatus.asObservable();
  currentUser = this.user.asObservable();

  constructor() { }

  /**
   * Service for Sharing the login Status between header and login component.
   * 
   * @param message 
   */
  changeLogedInStatus(message: boolean) {
    this.loggedInStatus.next(message);
  }

  changeCurrentUser(message: User) {
    this.user.next(message);
  }
}
