import { Component } from '@angular/core'

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
})
export class PortalComponent {
  files: any = []

  uploadFile(event: any) {
    for (const element of event) {
      this.files.push(element)
    }
  }

  deleteAttachment(index: number) {
    this.files.splice(index, 1)
  }
}
