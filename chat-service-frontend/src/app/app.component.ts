import { Component, OnInit } from '@angular/core';
import { Websocket } from './websocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showOverlay = true;

  constructor(private websocket: Websocket) {}

  ngOnInit(): void {
    this.websocket.websocketReady.subscribe((websocketReady: boolean) => {
      this.showOverlay = websocketReady;
    });
  }


}
