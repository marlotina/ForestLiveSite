import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCommentsComponent } from './user-comments.component';

const routes: Routes = [{ path: '', component: UserCommentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCommentsRoutingModule { }
