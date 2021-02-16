import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmPageComponent } from './confirm-page.component';

const routes: Routes = [{ path: '', component: ConfirmPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmPageRoutingModule { }
