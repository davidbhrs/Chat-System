import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-login-error-message',
  templateUrl: './pop-up-login-error-message.component.html',
  styleUrls: ['./pop-up-login-error-message.component.css']
})
export class PopUpLoginErrorMessageComponent {

  /** Class properties */
  errorCase: string;

  /**
   * Constructor
   *
   * @param data a string error case given by the component opening the pop up
   */
  constructor(@Inject(MAT_DIALOG_DATA) data: string) {
    this.errorCase = data;
  }

}
