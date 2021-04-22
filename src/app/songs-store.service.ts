import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'

import { Song } from './song.model'

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

  // Getter returns last value emitted in _songs subject
  get songs(): Song[] {
    return this._songs.getValue()
  }

  set songs(val: Song[]) {
    this._songs.next(val)
  }

  private acceptedExtensions: string[] = ['.mp3', '.wav', '.aiff']

  /* Check if valid file format; if so, retrieve song info from inputted File object and
  push as a Song object by duplicating the current array and adding a new Song to it */
  async addSong(file: File) {
    const fileExtension = file.name.slice(file.name.lastIndexOf('.'))
    if (this.acceptedExtensions.includes(fileExtension)) {
      this.songs = [
        ...this.songs,
        {
          id: this.songs.length,
          fileName: file.name.slice(0, file.name.lastIndexOf('.')),
          fileFormat: file.name.slice(file.name.lastIndexOf('.') + 1),
        },
      ]
    }
  }

  /* 'songs' array is immutable, so first spread the parts of the array that come before
  and after the removed item; rebuild the array omitting the removed item, which
  ensures no gaps in the array's indices */
  async removeSong(index: number) {
    this.songs = [...this.songs.slice(0, index), ...this.songs.slice(index + 1)]
  }
}
