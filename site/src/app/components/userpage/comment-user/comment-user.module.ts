import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentUserRoutingModule } from './comment-user-routing.module';
import { CommentUserComponent } from './comment-user.component';


@NgModule({
  declarations: [CommentUserComponent],
  imports: [
    CommonModule,
    CommentUserRoutingModule
  ]
})
export class CommentUserModule { }
