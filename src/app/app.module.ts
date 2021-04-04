import { HttpClientModule } from '@angular/common/http'
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core'
import { AngularFireFunctionsModule, ORIGIN } from '@angular/fire/functions'
import { BrowserModule } from '@angular/platform-browser'
import { Router } from '@angular/router'
import * as Sentry from '@sentry/angular'

import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DragAndDropDirective } from './drag-and-drop.directive'
import { FooterComponent } from './footer/footer.component'
import { HeaderComponent } from './header/header.component'
import { LoginComponent } from './login/login.component'
import { PortalComponent } from './portal/portal.component'
import { SummaryComponent } from './summary/summary.component'

export function provideOrigin() {
  if (environment.production) {
    return [{ provide: ORIGIN, useValue: 'https://spotbot-762b2.web.app' }]
  } else {
    return [{ provide: ORIGIN, useValue: 'http://localhost:5001' }]
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PortalComponent,
    SummaryComponent,
    FooterComponent,
    DragAndDropDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireFunctionsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
    provideOrigin(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
