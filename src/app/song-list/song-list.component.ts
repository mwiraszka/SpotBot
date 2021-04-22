import { Component } from '@angular/core'

import { SongsStoreService } from '../songs-store.service'

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
})
export class SongListComponent {
  constructor(public songsStore: SongsStoreService) {}

  onGarbageBinClicked(index: number) {
    this.songsStore.removeSong(index)
  }
}
