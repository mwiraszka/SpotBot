import { Component } from '@angular/core'

import { SongsStoreService } from '../songs-store.service'

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
})
export class PortalComponent {
  constructor(public songsStore: SongsStoreService) {}

  // Single and multi-file drag & drop functionality outsourced to its own directive
  onDirectoryUpload($event: any) {
    if ($event) {
      for (const file of $event.target.files) {
        this.songsStore.addSong(file)
      }
    }
  }
}
