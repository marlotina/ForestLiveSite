import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BirdLandingPageRoutingModule } from './bird-landing-page-routing.module';
import { BirdLandingPageComponent } from './bird-landing-page.component';


@NgModule({
  declarations: [BirdLandingPageComponent],
  imports: [
    CommonModule,
    BirdLandingPageRoutingModule
  ]
})
export class BirdLandingPageModule { }
