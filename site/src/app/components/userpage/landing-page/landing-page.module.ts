import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalPostComponent } from '../modal-post/modal-post.component';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    LandingPageComponent,
    ModalPostComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    LandingPageRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ModalPostComponent]
})
export class LandingPageModule { }
