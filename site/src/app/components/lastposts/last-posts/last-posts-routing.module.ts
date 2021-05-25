import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LastPostsComponent } from './last-posts.component';

const routes: Routes = [{ path: '', component: LastPostsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LastPostsRoutingModule { }
