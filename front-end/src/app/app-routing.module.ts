import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoiListComponent } from './components/poi-list/poi-list.component';
import { PoiDetailsComponent } from './components/poi-details/poi-details.component';
import { AddPoiComponent } from './components/add-poi/add-poi.component';
import { PoiMapComponent } from './components/poi-map/poi-map.component';


const routes: Routes = [
  { path: '', redirectTo: 'poi', pathMatch: 'full' },
  { path: 'poi', component: PoiListComponent },
  { path: 'draft', component: PoiListComponent },
  { path: 'poi/:id', component: PoiDetailsComponent },
  { path: 'add', component: AddPoiComponent },
  { path: 'map', component: PoiMapComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
