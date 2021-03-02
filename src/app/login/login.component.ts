import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../spotify.service';

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

  constructor(private actRoute: ActivatedRoute,
    private spotifyService: SpotifyService) {
    this.actRoute.queryParamMap.subscribe(params =>
      {
          console.log(params);
          this.queryObject = {...params.keys, ...params};
          this.error = this.queryObject.params.error;
          this.access_token = this.queryObject.params.access_token;
          this.refresh_token = this.queryObject.params.refresh_token;
          console.log("Found access token=" + this.access_token);
          if (this.access_token) {
            this.loadUserDetails();
          }
       });
  }

  ngOnInit(): void {
  }

  loadUserDetails(){
    this.spotifyService.getUserProfile(this.access_token)
    .subscribe(result => {
      console.log("Found result details=" + JSON.stringify(result));
    });
  }
}
