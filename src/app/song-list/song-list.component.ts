import { Component } from '@angular/core'

import { SongsStoreService } from '../songs-store.service'

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
})
export class SongListComponent {
  playlistName = 'SpotBot ' + new Date().toLocaleDateString()

  constructor(public songsStore: SongsStoreService) {}

  onGarbageBinClicked(index: number) {
    this.songsStore.removeSong(index)
  }

  onConfirmClicked() {
    this.songsStore.addSongsToPlaylist(this.playlistName)
    alert(`Success! Moved to playlist ${this.playlistName}.`)
  }

  onClearAllClicked() {
    this.songsStore.clearAllSongs()
  }
}
