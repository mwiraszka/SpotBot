import { Component, Input } from '@angular/core'

import { Song } from '../song.model'

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
})
export class SongListComponent {
  @Input() files: File[] = []
  songs: Song[]

  constructor() {
    this.songs = []
  }

  addSong(newFiles: File[]) {
    this.files.push(...newFiles)
  }

  deleteSong(index: number) {
    this.files.splice(index, 1)
  }
}
