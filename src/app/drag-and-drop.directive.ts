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

    /* es-lint ignore */
    if (evt.dataTransfer) {
      for (const file of evt.dataTransfer.files) {
        this.songsStore.addSong(file)
      }
    }
  }
}
