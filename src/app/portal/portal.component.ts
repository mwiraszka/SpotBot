import { Component, EventEmitter, Output } from '@angular/core'
import { FileItem, FileUploader } from 'ng2-file-upload'

// API used for File Upload through ng2-file-upload
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/'

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
})
export class PortalComponent {
  @Output() filesEmitter = new EventEmitter<File[]>()
  uploader: FileUploader;
  hasOverDropzone: boolean;

  onDrop(droppedFiles: File[]) {
    console.log('droppedFiles[0]: ...........')
    console.log(droppedFiles[0])
    this.filesEmitter.emit(droppedFiles)
  }
  onFileUpload(selectedFiles: File) {
    console.log(selectedFiles)
    this.filesEmitter.emit([selectedFiles])
  }

  constructor (){
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called
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
      }
    })
    this.hasOverDropzone = false
  }

  public overDropzone(evt: any): void {
    this.hasOverDropzone = evt;
  }
}
