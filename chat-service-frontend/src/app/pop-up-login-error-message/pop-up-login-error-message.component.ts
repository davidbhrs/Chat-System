import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-login-error-message',
  templateUrl: './pop-up-login-error-message.component.html',
  styleUrls: ['./pop-up-login-error-message.component.css']
})
export class PopUpLoginErrorMessageComponent {

  errorCase: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: string) {
    this.errorCase = data;
  }

}
