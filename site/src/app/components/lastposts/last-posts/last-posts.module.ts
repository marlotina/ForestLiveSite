import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LastPostsRoutingModule } from './last-posts-routing.module';
import { LastPostsComponent } from './last-posts.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [LastPostsComponent],
  imports: [
    CommonModule,
    SharedModule,
    LastPostsRoutingModule
  ]
})
export class LastPostsModule { }
