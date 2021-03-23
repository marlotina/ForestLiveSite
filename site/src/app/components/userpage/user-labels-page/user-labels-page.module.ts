import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLabelsPageRoutingModule } from './user-labels-page-routing.module';
import { UserLabelsPageComponent } from './user-labels-page.component';


@NgModule({
  declarations: [UserLabelsPageComponent],
  imports: [
    CommonModule,
    UserLabelsPageRoutingModule
  ]
})
export class UserLabelsPageModule { }
