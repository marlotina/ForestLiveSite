import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchMapPageRoutingModule } from './search-map-page-routing.module';
import { SearchMapPageComponent } from './search-map-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [SearchMapPageComponent],
  imports: [
    CommonModule,
    SearchMapPageRoutingModule,
    SharedModule,
    GoogleMapsModule
  ]
})
export class SearchMapPageModule { }
