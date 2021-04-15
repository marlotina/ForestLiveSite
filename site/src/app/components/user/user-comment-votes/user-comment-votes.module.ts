import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCommentVotesRoutingModule } from './user-comment-votes-routing.module';
import { UserCommentVotesComponent } from './user-comment-votes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [UserCommentVotesComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserCommentVotesRoutingModule,
    MatIconModule
  ]
})
export class UserCommentVotesModule { }
