import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core'

@Directive({
  selector: '[appDragAndDrop]',
})
export class AppDragAndDropDirective {
  @Output('droppedFiles') files: EventEmitter<File[]> = new EventEmitter()
  @HostBinding('style.border') public border = '2px dotted transparent'

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

    const files: File[] = []
    for (let i = 0; i < e.dataTransfer!.files.length; i++) {
      files.push(e.dataTransfer!.files[i])
    }
    if (files.length > 0) {
      this.files.emit(files)
    }
  }
}
