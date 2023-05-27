import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XmltableComponent } from './xmltable/xmltable.component';
import { ParsingService } from './parsing.service';

@NgModule({
  declarations: [
    AppComponent,
    XmltableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ParsingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
