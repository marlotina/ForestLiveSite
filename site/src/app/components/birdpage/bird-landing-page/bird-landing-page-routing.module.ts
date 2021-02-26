import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BirdLandingPageComponent } from './bird-landing-page.component';

const routes: Routes = [{ path: '', component: BirdLandingPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BirdLandingPageRoutingModule { }
