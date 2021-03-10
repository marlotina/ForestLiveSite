import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VotesUserComponent } from './votes-user.component';

const routes: Routes = [{ path: '', component: VotesUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VotesUserRoutingModule { }
