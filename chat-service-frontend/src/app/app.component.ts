import { Component } from '@angular/core';
import { User } from './user-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = new User(1, "Frodo Baggins");
}
