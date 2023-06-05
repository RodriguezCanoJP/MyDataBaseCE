import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XmltableComponent } from './xmltable/xmltable.component';
import { ParsingService } from './parsing.service';
import { ScriptService } from './script.service';

@NgModule({
  declarations: [
    AppComponent,
    XmltableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    FormsModule
  ],
  providers: [ParsingService, ScriptService],
  bootstrap: [AppComponent]
})
export class AppModule { }
