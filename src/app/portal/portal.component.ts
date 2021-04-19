import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
})
export class PortalComponent {
  @Output() filesAdded = new EventEmitter<File[]>()

  onDrop(droppedFiles: File[]) {
    console.log(droppedFiles[0])
    this.filesAdded.emit(droppedFiles)
  }

  onFileUpload(selectedFiles: File) {
    console.log(selectedFiles)
    this.filesAdded.emit([selectedFiles])
  }
}
