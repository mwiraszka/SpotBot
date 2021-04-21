import { Directive, HostBinding, HostListener } from '@angular/core'
import { SongsStoreService } from './songs-store.service'

@Directive({
  selector: '[appDragAndDrop]',
})
export class AppDragAndDropDirective {
  @HostBinding('style.border') public border = '2px dotted transparent'

  constructor(private songsStore: SongsStoreService) {}

  @HostListener('dragover', ['$event']) public onDragOver(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    this.border = '2px dotted white'
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    this.border = '2px dotted transparent'
  }

  @HostListener('drop', ['$event']) public onDrop(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    this.border = '2px dotted transparent'

    /* Create File object array from input and change the app's Song State; use addSong()
    method to convert each File-type to a Song-type before pushing it to the array */
    const files: File[] = []
    for (let i = 0; i < e.dataTransfer!.files.length; i++) {
      files.push(e.dataTransfer!.files[i])
    }
    if (files.length > 0) {
      for (let file of files) {
        this.songsStore.addSong(file)
      }
    }
  }
}
