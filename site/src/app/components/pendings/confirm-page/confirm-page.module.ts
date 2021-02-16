import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmPageRoutingModule } from './confirm-page-routing.module';
import { ConfirmPageComponent } from './confirm-page.component';


@NgModule({
  declarations: [ConfirmPageComponent],
  imports: [
    CommonModule,
    ConfirmPageRoutingModule
  ]
})
export class ConfirmPageModule { }
