import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import { Song } from './song.model'
import { SpotifyService } from './spotify.service'

// (State management architecture courtesy of Aslan Vatsaev)
@Injectable({
  providedIn: 'root',
})
export class SongsStoreService {
  /* Set the initial state in BehaviorSubject's constructor - no one outside the Store
  should have access to the BehaviorSubject since it has the write rights;
  expose the observable part of the _songs subject (the readonly stream) */
  private readonly _songs = new BehaviorSubject<Song[]>([])
  readonly songs$ = this._songs.asObservable()

  private acceptedExtensions: string[] = ['.mp3', '.wav', '.aiff']

  constructor(private spotifyService: SpotifyService) {}

  // Getter returns last value emitted in _songs subject
  get songs(): Song[] {
    return this._songs.getValue()
  }

  set songs(val: Song[]) {
    this._songs.next(val)
  }

  get songsFound(): number {
    return this._songs.getValue().filter((x) => x.spotifyTrackName != null).length
  }

  /* Check if valid file format; if so, retrieve song info from inputted File object and
  push as a Song object by duplicating the current array and adding a new Song to it */
  addSong(file: File) {
    const fileExtension = file.name.slice(file.name.lastIndexOf('.'))
    if (this.acceptedExtensions.includes(fileExtension)) {
      const fileName = file.name.slice(0, file.name.lastIndexOf('.'))
      this.spotifyService.searchSong(fileName).subscribe((response) => {
        // If at least one track returned from Spotify, use the top result
        if (response.tracks.items[0]) {
          this.songs = [
            ...this.songs,
            {
              fileName,
              fileFormat: fileExtension.slice(1),
              spotifyTrackUri: response.tracks.items[0].uri,
              spotifyTrackName: response.tracks.items[0].name,
              spotifyTrackArtist: response.tracks.items[0].artists[0].name,
            },
          ]
        } else {
          // If no Spotify tracks returned, try again with amended search term with all
          // numbers at the start of the term removed
          const letters = /[A-Za-z]/g
          const newTerm = fileName.slice(fileName.search(letters))
          this.spotifyService.searchSong(newTerm).subscribe((response) => {
            const topResult = response.tracks.items[0]
            // If still no result, set all Spotify values to null
            this.songs = [
              ...this.songs,
              {
                fileName,
                fileFormat: fileExtension.slice(1),
                spotifyTrackUri: topResult ? topResult.uri : null,
                spotifyTrackName: topResult ? topResult.name : null,
                spotifyTrackArtist: topResult ? topResult.artists[0].name : null,
              },
            ]
          })
        }
      })
    }
  }

  addSongsToPlaylist(playlistName: string) {
    this.spotifyService.addSongsToPlaylist(this.songs, playlistName)
    this.songs = [] // Clear stored songs
  }

  /* 'songs' array is immutable, so first spread the parts of the array that come before
  and after the removed item; rebuild the array omitting the removed item, which
  ensures no gaps in the array's indices */
  removeSong(index: number) {
    this.songs = [...this.songs.slice(0, index), ...this.songs.slice(index + 1)]
  }

  clearAllSongs() {
    this.songs = []
  }
}
