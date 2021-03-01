import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: any;
  access_token: string = "";
  refresh_token: string = "";
  queryObject: any;

  constructor(private actRoute: ActivatedRoute) {
    this.actRoute.queryParamMap.subscribe(params =>
      {
          console.log(params);
          this.queryObject = {...params.keys, ...params};
          this.error = this.queryObject.params.error;
          this.access_token = this.queryObject.params.access_token;
          this.refresh_token = this.queryObject.params.refresh_token;
          console.log("Found access token=" + this.access_token);
       });
  }

  ngOnInit(): void {
  }
}
