import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLabelsComponent } from './user-labels.component';

const routes: Routes = [{ path: '', component: UserLabelsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLabelsRoutingModule { }
