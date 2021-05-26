import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FollowComponent } from './follow.component';

const routes: Routes = [{ path: '', component: FollowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FollowRoutingModule { }
