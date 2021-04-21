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

  /* Retrieve all possible song information from inputted File object and push song as a
  Song object by duplicating the current array and adding a new Song to it */
  async addSong(file: File) {
    this.songs = [
      ...this.songs,
      {
        id: this.songs.length,
        fileName: file.name.slice(0, file.name.lastIndexOf('.')),
        fileFormat: file.name.slice(file.name.lastIndexOf('.') + 1),
      },
    ]
  }

  /* Update the immutable 'songs' array by disassembling the parts of the array before and
  after the removed item, and rebuilding the array, ensuring no gaps in the indices */
  async removeSong(index: number) {
    this.songs = [
      ...this.songs.slice(0, index), ...this.songs.slice(index + 1)
    ]
  }
}
