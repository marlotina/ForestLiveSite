import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WithoutSpeciePageComponent } from './without-specie-page.component';

const routes: Routes = [{ path: '', component: WithoutSpeciePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithoutSpeciePageRoutingModule { }
