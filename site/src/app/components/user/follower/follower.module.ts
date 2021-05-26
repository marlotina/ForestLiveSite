import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowerRoutingModule } from './follower-routing.module';
import { FollowerComponent } from './follower.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [FollowerComponent],
  imports: [
    CommonModule,
    SharedModule,
    FollowerRoutingModule
  ]
})
export class FollowerModule { }
