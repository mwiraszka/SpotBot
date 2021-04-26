import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Song } from './song.model'
import { SongsStoreService } from './songs-store.service'

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  accessToken = ''
  refreshToken = ''

  constructor(private http: HttpClient, private songsStore: SongsStoreService) {}

  getUserProfile() {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.accessToken }),
    }
    return this.http.get('https://api.spotify.com/v1/me', httpOptions)
  }


  // Drag & Drop / Upload -->
  searchSong(song: Song) {
    // series of string-combinations based on song filename to check (if nothing found, leave property empty)
    // Search for an Item (try type=track and type=artist for starters):
    const ENDPOINT1 = 'https://api.spotify.com/v1/search'

  }

  // Click Confirm -->
  createPlaylist() {
    // Get a List of a User's Playlists:
    const ENDPOINT1 = 'https://api.spotify.com/v1/me/playlists'

    // Check if playlist exists by comparing each playlist to a SpotBot playlist name made with today's date
    const playlistName = 'SpotBot ' + new Date().toLocaleDateString()

    // If doesn't already exist, create a playlist using playlistName variable above:
    const ENDPOINT2 = 'https://api.spotify.com/v1/users/{user_id}/playlists'

  }

  moveSongsToPlaylist() {
    // Filter only the songs that have 'spotify song id' field filled; add each one with id

    // Get track using id = song.spotify_id
    const ENDPOINT1 = 'https://api.spotify.com/v1/tracks/{id}'

    // Add items to playlist:
    const ENDPOINT2 = 'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'
  }

}
