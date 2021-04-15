import { Component } from '@angular/core'

@Component({
  selector: 'app-footer',
  template: `
    © 2021 SpotBot <button (click)=onClickVersion()>version 0.2.0</button>
  `,
})
export class FooterComponent {
  onClickVersion(): void {
    window.location.href = 'https://github.com/mwiraszka/SpotBot#readme'
  }
}
