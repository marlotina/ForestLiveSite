import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchMapPageComponent } from './search-map-page.component';

const routes: Routes = [{ path: '', component: SearchMapPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchMapPageRoutingModule { }
