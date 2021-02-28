import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserMapPageComponent } from './user-map-page.component';

const routes: Routes = [{ path: '', component: UserMapPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMapPageRoutingModule { }
