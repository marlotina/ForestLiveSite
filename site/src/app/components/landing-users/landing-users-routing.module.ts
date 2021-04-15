import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingUsersComponent } from './landing-users.component';

const routes: Routes = [{ path: '', component: LandingUsersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingUsersRoutingModule { }
