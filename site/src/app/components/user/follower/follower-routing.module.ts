import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FollowerComponent } from './follower.component';

const routes: Routes = [{ path: '', component: FollowerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FollowerRoutingModule { }
