import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowRoutingModule } from './follow-routing.module';
import { FollowComponent } from './follow.component';


@NgModule({
  declarations: [FollowComponent],
  imports: [
    CommonModule,
    FollowRoutingModule
  ]
})
export class FollowModule { }
