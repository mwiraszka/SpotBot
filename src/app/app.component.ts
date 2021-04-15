import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <main id="flex-wrapper">
      <app-header></app-header>
      <app-login></app-login>
      <app-portal></app-portal>
      <app-footer></app-footer>
    </main>
  `,
})
export class AppComponent {}
