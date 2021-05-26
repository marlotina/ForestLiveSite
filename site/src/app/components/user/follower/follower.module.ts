import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowerRoutingModule } from './follower-routing.module';
import { FollowerComponent } from './follower.component';


@NgModule({
  declarations: [FollowerComponent],
  imports: [
    CommonModule,
    FollowerRoutingModule
  ]
})
export class FollowerModule { }
