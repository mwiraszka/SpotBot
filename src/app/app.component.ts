import { Component } from '@angular/core'

import { SongsStoreService } from './songs-store.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  newFiles: File[] = []

  constructor(public songsStore: SongsStoreService) {}

  moveFilesToList(files: File[]) {
    this.newFiles = files
  }
  onClickVersion(): void {
    window.location.href = 'https://github.com/mwiraszka/SpotBot#readme'
  }
}
