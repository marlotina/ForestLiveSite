import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentUserComponent } from './comment-user.component';

const routes: Routes = [{ path: '', component: CommentUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentUserRoutingModule { }
