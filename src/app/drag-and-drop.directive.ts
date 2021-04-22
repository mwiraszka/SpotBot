import { Directive, HostBinding, HostListener } from '@angular/core'

import { SongsStoreService } from './songs-store.service'

@Directive({
  selector: '[appDragAndDrop]',
})
export class AppDragAndDropDirective {
  // Transparent border used to ensure flex container elements don't get resized
  @HostBinding('style.border') public border = '2px dotted transparent'

  constructor(private songsStore: SongsStoreService) {}

  @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent) {
    evt.preventDefault()
    evt.stopPropagation()
    this.border = '2px dotted white'
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault()
    evt.stopPropagation()
    this.border = '2px dotted transparent'
  }

  @HostListener('drop', ['$event']) public onFileDrop(evt: DragEvent) {
    evt.preventDefault()
    evt.stopPropagation()
    this.border = '2px dotted transparent'

    /* Create File object array from input and change the app's Song State; use addSong()
    method to convert each File-type to a Song-type before pushing it to the array */
    const transfer = evt.dataTransfer
    if (transfer) {
      /* es-lint ignore */
      for (const file of transfer.files) {
        this.songsStore.addSong(file)
      }
    }
  }
}
