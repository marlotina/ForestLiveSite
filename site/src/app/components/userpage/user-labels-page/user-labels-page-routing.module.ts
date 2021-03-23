import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLabelsPageComponent } from './user-labels-page.component';

const routes: Routes = [{ path: '', component: UserLabelsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLabelsPageRoutingModule { }
