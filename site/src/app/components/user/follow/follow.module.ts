import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowRoutingModule } from './follow-routing.module';
import { FollowComponent } from './follow.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [FollowComponent],
  imports: [
    CommonModule,
    SharedModule,
    FollowRoutingModule
  ]
})
export class FollowModule { }
