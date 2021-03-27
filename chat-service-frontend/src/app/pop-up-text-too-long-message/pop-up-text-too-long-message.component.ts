import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-text-too-long-message',
  templateUrl: './pop-up-text-too-long-message.component.html',
  styleUrls: ['./pop-up-text-too-long-message.component.css']
})
export class PopUpTextTooLongMessageComponent implements OnInit {

  maxLength: number;

  constructor(@Inject(MAT_DIALOG_DATA) maxLengthOfTextMessage: number) {
    this.maxLength = maxLengthOfTextMessage;
  }

  ngOnInit(): void {
  }

}
