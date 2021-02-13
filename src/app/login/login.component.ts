import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() {
    console.log("yo yo yo from login");
  }

  ngOnInit(): void {
    console.log("I'm in the ngOnInit and can't get out");
  }

}
