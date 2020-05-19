import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmemailComponent } from './confirmemail.component';

const routes: Routes = [{ path: '', component: ConfirmemailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmemailRoutingModule { }
