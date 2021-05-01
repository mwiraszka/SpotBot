import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { SpotifyService } from '../spotify.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  queryObject: any
  username = ''
  accessGranted = false

  // Load user details if still accessible using Activated Route
  constructor(private actRoute: ActivatedRoute, private spotifyService: SpotifyService) {
    this.actRoute.queryParamMap.subscribe((params) => {
      this.queryObject = { ...params.keys, ...params }
      this.spotifyService.accessToken = this.queryObject.params.access_token
      this.spotifyService.refreshToken = this.queryObject.params.refresh_token
      if (this.spotifyService.accessToken) {
        this.loadUserDetails()
      }
    })
  }

  loadUserDetails() {
    this.spotifyService.getUserProfile().subscribe((response) => {
      if (response) {
        const spotifyProfileData = JSON.parse(JSON.stringify(response))
        this.spotifyService.userDisplayName = spotifyProfileData.display_name
        this.spotifyService.userId = spotifyProfileData.id
        this.accessGranted = true

        // Local username variable for Login component
        this.username = this.spotifyService.userDisplayName
      }
    })
  }
}
