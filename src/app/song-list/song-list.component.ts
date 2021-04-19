import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
})
export class SongListComponent {
  @Input() files: File[] = []

  addFile(newFiles: File[]) {
    this.files.push(...newFiles)
  }

  deleteFile(index: number) {
    this.files.splice(index, 1)
  }
}
