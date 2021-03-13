import { Component, OnInit } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public api: ApiEndpointService) { }

  ngOnInit(): void {
  }

  login(username: String) {
    // Post to Backend
    let result: any
    this.api.getAllUsers().subscribe(data => {
      result = data;
      console.log(result);
    });
  }

}
