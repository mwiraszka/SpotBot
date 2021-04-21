import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'

import { Song } from './song.model'

// (State management architecture courtesy of Aslan Vatsaev)
@Injectable({
  providedIn: 'root',
})
export class SongsStoreService {
  /* Set the initial state in BehaviorSubject's constructor - no one outside the Store
  should have access to the BehaviorSubject since it has the write rights */
  private readonly _songs = new BehaviorSubject<Song[]>([])

  // Expose the observable part of the _songs subject (the readonly stream)
  readonly songs$ = this._songs.asObservable()

  // Getter returns last value emitted in _songs subject
  get songs(): Song[] {
    return this._songs.getValue()
  }

  set songs(val: Song[]) {
    this._songs.next(val)
  }

  // Assign a new array of songs by duplicating current array and adding a new song to it
  async addSong(file: File) {
    this.songs = [
      ...this.songs,
      {
        id: this.songs.length + 1,
        fileName: 'song',
        fileExtension: 'extension',
      },
    ]
  }

  // Remove song from array using its id
  async removeSong(id: number) {
    const song = this.songs.find((s) => s.id === id)
    this.songs = this.songs.filter((song) => song.id !== id)
  }
}
