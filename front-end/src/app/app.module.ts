import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPoiComponent } from './components/add-poi/add-poi.component';
import { PoiDetailsComponent } from './components/poi-details/poi-details.component';
import { PoiListComponent } from './components/poi-list/poi-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPoiComponent,
    PoiDetailsComponent,
    PoiListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
