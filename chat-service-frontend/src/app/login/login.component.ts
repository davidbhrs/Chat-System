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
    let response: any
    this.api.login(username).subscribe(data => {
      response = data;
      console.log(response);
    });
  }

}
