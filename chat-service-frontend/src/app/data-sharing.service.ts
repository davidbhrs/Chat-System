import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private loggedInStatus = new BehaviorSubject(false);
  currentLoggedInStatus = this.loggedInStatus.asObservable();

  constructor() { }

  /**
   * Service for Sharing the login Status between header and login component.
   * 
   * @param message 
   */
  changeLogedInStatus(message: boolean) {
    this.loggedInStatus.next(message)
  }
}
