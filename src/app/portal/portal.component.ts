import { Component } from '@angular/core'
import { FileItem, FileUploader } from 'ng2-file-upload'

import { SongsStoreService } from '../songs-store.service'

// API used for File Upload through ng2-file-upload
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/'

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
})
export class PortalComponent {
  uploader: FileUploader
  hasFilesOverDropzone: boolean

  constructor(public songsStore: SongsStoreService) {
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // Must be 'true' for formatDataFunction to be called
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item: FileItem) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date(),
          })
        })
      },
    })
    this.hasFilesOverDropzone = false
  }

  onDrop(droppedFiles: File[]) {
    for (const file of droppedFiles) {
      this.songsStore.addSong(file)
    }
  }
  onFileUpload(selectedFiles: File[]) {
    for (const file of selectedFiles) {
      this.songsStore.addSong(file)
    }
  }

  overDropzone(evt: any): void {
    this.hasFilesOverDropzone = evt
  }
}
