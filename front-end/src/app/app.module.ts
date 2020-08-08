import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPoiComponent } from './components/add-poi/add-poi.component';
import { PoiDetailsComponent } from './components/poi-details/poi-details.component';
import { PoiListComponent } from './components/poi-list/poi-list.component';
import { PoiFormComponent } from './components/poi-form/poi-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPoiComponent,
    PoiDetailsComponent,
    PoiListComponent,
    PoiFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
          apiKey: 'places_api_key',
          libraries: ["places"]
        })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
