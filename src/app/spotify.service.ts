import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { EMPTY, Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { Song } from './song.model'

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  userDisplayName = ''
  userId = ''
  userEmail = ''
  userCountry = ''
  accessToken = ''
  refreshToken = ''

  constructor(private http: HttpClient) {}

  getUserProfile() {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.accessToken }),
    }
    return this.http.get('https://api.spotify.com/v1/me', httpOptions)
  }

  searchSong(term: string): Observable<any> {
    return this.http
      .get(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
        headers: { Authorization: 'Bearer ' + this.accessToken },
      })
      .pipe(
        catchError((err, caught) => {
          const errMessage = JSON.parse(JSON.stringify(err)).statusText
          console.log(
            `Error: ${errMessage}. Slow down! It\'s a portal, not a time machine.`
          )
          return EMPTY
        }),
        map((response) => {
          return JSON.parse(JSON.stringify(response))
        })
      )
  }

  addSongsToPlaylist(songs: Song[], playlistName: string) {
    let playlistId = ''
    this.http
      .get(`https://api.spotify.com/v1/users/${this.userId}/playlists`, {
        headers: { Authorization: 'Bearer ' + this.accessToken },
      })
      .subscribe((response) => {
        // Check if user has already used SpotBot today
        for (const playlist of JSON.parse(JSON.stringify(response)).items) {
          if (playlist.name === playlistName) {
            playlistId = playlist.id
          }
        }

        // Create array of track URI's to be passed to API for post request
        const trackUris: string[] = []
        songs.forEach((song) => {
          if (song.spotifyTrackUri) {
            trackUris.push(song.spotifyTrackUri)
          }
        })

        if (!playlistId) {
          // Create a new playlist in user's account only if one doesn't already exist
          const body = {
            name: playlistName,
            description: 'Thanks for using SpotBot!',
            public: true,
          }
          this.http
            .post(`https://api.spotify.com/v1/users/${this.userId}/playlists`, body, {
              headers: { Authorization: 'Bearer ' + this.accessToken },
            })
            .subscribe((response) => {
              playlistId = JSON.parse(JSON.stringify(response)).id
              this.http
                .post(
                  `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                  { uris: trackUris },
                  { headers: { Authorization: 'Bearer ' + this.accessToken } }
                )
                .subscribe()
            })
        } else {
          // Push new songs to the top of the existing playlist
          this.http
            .post(
              `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
              { uris: trackUris, position: 0 },
              { headers: { Authorization: 'Bearer ' + this.accessToken } }
            )
            .subscribe()
        }
      })
  }
}
