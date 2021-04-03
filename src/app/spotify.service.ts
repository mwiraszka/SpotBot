import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private SPOTIFY_USER_ENDPOINT = 'https://api.spotify.com/v1/me'

  constructor(private http: HttpClient) {}

  getUserProfile(accessToken: string) {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + accessToken }),
    }
    return this.http.get(this.SPOTIFY_USER_ENDPOINT, httpOptions)
  }
}
