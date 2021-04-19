import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  newFiles: File[] = []
  moveFilesToList(files: File[]) {
    this.newFiles = files
  }

  onClickVersion(): void {
    window.location.href = 'https://github.com/mwiraszka/SpotBot#readme'
  }
}
