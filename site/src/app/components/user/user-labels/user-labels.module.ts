import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLabelsRoutingModule } from './user-labels-routing.module';
import { UserLabelsComponent } from './user-labels.component';


@NgModule({
  declarations: [UserLabelsComponent],
  imports: [
    CommonModule,
    UserLabelsRoutingModule
  ]
})
export class UserLabelsModule { }
