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
import { StoresComponent } from './stores/stores.component';

@NgModule({
  declarations: [
    AppComponent,
    XmltableComponent,
    StoresComponent
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
