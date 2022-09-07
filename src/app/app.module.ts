import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavagacaoModule } from './navegacao/navagacao.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavagacaoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
