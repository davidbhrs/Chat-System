import { Component, OnInit } from '@angular/core';
import { Websocket } from './websocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /** Class properties */
  showOverlay = true;

  /**
   * Constructor
   *
   * @param websocket socket service dealing with data which is needed by multiple clients
   */
  constructor(private websocket: Websocket) {}

  /**
   * OnInit-Function when component is loaded
   * asks for the status of the websocket
   */
  ngOnInit(): void {
    this.websocket.websocketReady.subscribe((websocketReady: boolean) => {
      this.showOverlay = websocketReady;
    });
  }
}
