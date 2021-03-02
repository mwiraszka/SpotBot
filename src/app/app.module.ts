import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';
import { SummaryComponent } from './summary/summary.component';
import { FooterComponent } from './footer/footer.component';
import { DragAndDropDirective } from './drag-and-drop.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PortalComponent,
    SummaryComponent,
    FooterComponent,
    DragAndDropDirective
  ],
  imports: [ BrowserModule, AppRoutingModule ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
