import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalPostComponent } from '../modal-post/modal-post.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    ModalPostComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ModalPostComponent]
})
export class LandingPageModule { }
