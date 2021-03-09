import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserVotesComponent } from './user-votes.component';

const routes: Routes = [{ path: '', component: UserVotesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserVotesRoutingModule { }
