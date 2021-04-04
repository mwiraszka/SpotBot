import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import * as Sentry from '@sentry/angular'
import { Integrations } from '@sentry/tracing'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

Sentry.init({
  dsn: 'https://2bbfe014aa61490484712e23acddf997@o564274.ingest.sentry.io/5704933',
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost', 'https://yourserver.io/api'],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

if (environment.production) {
  enableProdMode()
}
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((success) => console.log(`Bootstrap success`))
  .catch((err) => console.error(err))
