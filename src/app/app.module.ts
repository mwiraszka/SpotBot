import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';
import { SummaryComponent } from './summary/summary.component';
import { FooterComponent } from './footer/footer.component';
import { AngularFireFunctionsModule, ORIGIN } from '@angular/fire/functions';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

export function getProviders() {
  if (environment.production) {
    return [
      { provide: ORIGIN, useValue: 'https://spotbot-762b2.web.app' }
    ]
  } else {
    return [
      { provide: ORIGIN, useValue: 'http://localhost:5000' }
    ]
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireFunctionsModule,
    HttpClientModule
  ],
  providers: getProviders(),
  bootstrap: [ AppComponent ]
})
export class AppModule { }
