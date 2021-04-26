import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { SpotifyService } from '../spotify.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  error: any
  queryObject: any
  accessGranted = false
  username = ''
  email = ''

  // Load user details if still accessible using Activated Route
  constructor(private actRoute: ActivatedRoute, private spotifyService: SpotifyService) {
    this.actRoute.queryParamMap.subscribe((params) => {
      this.queryObject = { ...params.keys, ...params }
      this.error = this.queryObject.params.error
      this.spotifyService.accessToken = this.queryObject.params.access_token
      this.spotifyService.refreshToken = this.queryObject.params.refresh_token
      if (this.spotifyService.accessToken) {
        this.loadUserDetails()
      }
    })
  }

  loadUserDetails() {
    this.spotifyService.getUserProfile().subscribe((result) => {
      if (result) {
        const spotifyProfileData = JSON.parse(JSON.stringify(result))
        this.username = spotifyProfileData.display_name
        this.email = spotifyProfileData.email
        this.accessGranted = true
      }
    })
  }
}
