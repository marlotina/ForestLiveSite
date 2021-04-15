import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCommentVotesComponent } from './user-comment-votes.component';

const routes: Routes = [{ path: '', component: UserCommentVotesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCommentVotesRoutingModule { }
