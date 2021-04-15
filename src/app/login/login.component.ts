import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { SpotifyService } from '../spotify.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  error: any
  accessToken = ''
  refreshToken = ''
  queryObject: any

  username = ''
  email = ''

  constructor(private actRoute: ActivatedRoute, private spotifyService: SpotifyService) {
    this.actRoute.queryParamMap.subscribe((params) => {
      console.log(params)
      this.queryObject = { ...params.keys, ...params }
      this.error = this.queryObject.params.error
      this.accessToken = this.queryObject.params.access_token
      this.refreshToken = this.queryObject.params.refresh_token
      console.log('Found access token=' + this.accessToken)
      if (this.accessToken) {
        this.loadUserDetails()
      }
    })
  }

  ngOnInit(): void {}

  loadUserDetails() {
    this.spotifyService.getUserProfile(this.accessToken).subscribe((result) => {
      console.log('Found result details=' + JSON.stringify(result))
      if (result) {
        const spotifyProfileData = JSON.parse(JSON.stringify(result))
        this.username = spotifyProfileData.display_name
        this.email = spotifyProfileData.email
      }
    })
  }
}
